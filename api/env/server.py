from flask import Flask, request, jsonify
from py_vollib.black_scholes.greeks.analytical import delta, gamma, vega, theta, rho
from datetime import datetime, timedelta

import yfinance as yf
import pandas as pd
import numpy as np
import simplejson as json

app = Flask(__name__)

@app.route('/api/ticker', methods=['POST'])
def hello_world():
    request_data = request.json
    ticker = yf.Ticker(request_data['content'])

    if "symbol" in ticker.info:
        return {'symbol' : ticker.info['symbol'], 'close': ticker.info['regularMarketPreviousClose'],  
                'price': ticker.history(period="1d")['Close'][0], 'name':ticker.info['longName']}
    else:
        return {'404':'Invalid Ticker'}

@app.route('/api/optionsDate', methods=['POST'])
def get_optionsDate():
    request_data = request.json
    ticker = yf.Ticker(request_data['content'])
    if "symbol" in ticker.info:
        return jsonify(ticker.options)
    else:
        return {'404':'Invalid Ticker'}

@app.route('/api/optionsChain', methods=['POST'])
def get_optionsChain():
    request_data = request.json
    ticker = yf.Ticker(request_data['content'])
    index = ticker.options.index(request_data["date"])
    DF_calls, DF_puts = ticker.option_chain(ticker.options[index])

    print(DF_calls)
    print(DF_puts)
    
    features=['strike','bid','mid','ask','impliedVolatility']
    DF_calls['mid'] = DF_calls.apply(lambda row: (row.bid+row.ask)/2, axis=1)
    DF_puts['mid'] = DF_puts.apply(lambda row: (row.bid+row.ask)/2, axis=1)

    DF_calls=DF_calls[features]
    DF_puts=DF_puts[features]

    temp = DF_calls.merge(DF_puts,on='strike',how='outer')

    if "symbol" in ticker.info:
        return temp.to_json(orient = 'records')
    else:
        return {'404':'Invalid Ticker'}

@app.route('/api/greek', methods=['POST'])
def get_greek():
    request_data = request.json
    cSigma, pSigma, current, t = getNC(request_data['symbol'],request_data['date'],request_data['strike'])

    cg = alphabet( cSigma, current, request_data['strike'],  t/365, 0.01, 'c')
    pg = alphabet( pSigma, current, request_data['strike'],  t/365, 0.01, 'p')

    return { 'call':cg, 'put':pg }

@app.route('/api/returnGraph', methods=['POST'])
def get_returnGraph():
    request_data = json.loads(request.data)
    list = request_data['content']
    
    price = yf.Ticker(list[0]['symbol']).history(period='1d')['Close'][0]
    S = np.linspace( price*0.90, price*1.03, 50)
    result = 0
    cost = 0
    for i in list:
        K = i['strike']
        C = float(i['price'])
        
        if i['type'] == 'C':
            P = np.maximum(0, S-K)
        else:
            P = np.maximum(0, K-S)
        
        if i['long']:
            result += P
            cost += C
        else:
            result -= P
            cost -= C

    if len(list) == 0 :
        return {'404':'Invalid Ticker'}
    else :
        return jsonify({'S': np.array(S).tolist(), 'profit': np.array((result - cost)*100).tolist()})

@app.route('/api/returnTable', methods=['POST'])
def get_returnTable():
    request_data = json.loads(request.data)
    list = request_data['content']
    print(list)
    price = yf.Ticker(list[0]['symbol']).history(period='1d')['Close'][0]

    today = datetime.now().date()
    maxDate = today
    for i in list:
        tempDate = datetime.strptime(i['date'], '%Y-%m-%d').date() 
        print(tempDate)
        maxDate = tempDate if tempDate>maxDate else maxDate
    maxDate = maxDate + timedelta(days=1)

    time = np.arange(np.datetime64(today), np.datetime64(maxDate))[::-1]

    t = (time - np.datetime64(today)).astype(int)
    S = np.linspace( price*0.95, price*1.05, 50)[::-1]

    df = pd.DataFrame(columns = t, index = S )

    n = 10
    r = 0.01

    for rowIndex, row in df.iterrows(): #iterate over rows
        for columnIndex, value in row.items():
            result = 0
            cost = 0
            for i in list:
                P = Binomial(n, rowIndex, i['strike'], r, i['iv'], columnIndex/356, i['type'])
                if i['long']:
                    result += P
                    cost += i['price']
                else:
                    result -= P
                    cost -= i['price']
            df.at[rowIndex, columnIndex] =  (result - cost)*100

    df.columns = np.datetime_as_string(time[::-1],unit='D')
    df['price'] = df.index
    cols = df.columns.tolist()
    cols = cols[-1:] + cols[:-1]
    df = df[cols]

    if len(list) == 0 :
        return {'404':'Invalid Ticker'}
    else :
        return df.to_json(orient = 'records')

@app.route('/api/returnCost', methods=['POST'])    
def get_returnCost():
    request_data = json.loads(request.data)
    list = request_data['content']
    result = 0
    cost = 0
    for i in list:
        if i['long']:
            cost += i['price']
        else:
            cost -= i['price']

    if len(list) == 0 :
        return {'404':'Invalid Ticker'}
    else :
        return {'cost':cost*100}

def Binomial(n, S, K, r, v, t, PutCall):  
    At = t/n 
    u = np.exp(v*np.sqrt(At))
    d = 1./u
    p = (np.exp(r*At)-d) / (u-d) 

    #Binomial price tree
    stockvalue = np.zeros((n+1,n+1))
    stockvalue[0,0] = S
    for i in range(1,n+1):
        stockvalue[i,0] = stockvalue[i-1,0]*u
        for j in range(1,i+1):
            stockvalue[i,j] = stockvalue[i-1,j-1]*d
    
    #option value at final node   
    optionvalue = np.zeros((n+1,n+1))
    for j in range(n+1):
        if PutCall=="C": # Call
            optionvalue[n,j] = max(0, stockvalue[n,j]-K)
        elif PutCall=="P": #Put
            optionvalue[n,j] = max(0, K-stockvalue[n,j])
    
    #backward calculation for option price    
    for i in range(n-1,-1,-1):
        for j in range(i+1):
            if PutCall=="P":
                optionvalue[i,j] = max(0, K-stockvalue[i,j], np.exp(-r*At)*(p*optionvalue[i+1,j]+(1-p)*optionvalue[i+1,j+1]))
            elif PutCall=="C":
                optionvalue[i,j] = max(0, stockvalue[i,j]-K, np.exp(-r*At)*(p*optionvalue[i+1,j]+(1-p)*optionvalue[i+1,j+1]))
    return optionvalue[0,0]

# Sigma IV, S price, K strike, T time, R  0.01, flag 'p' or 'c'
def alphabet(sigma, S, K, T, r, flag):
    de = delta(flag, S, K, T, r, sigma)
    ga = gamma(flag, S, K, T, r, sigma)
    th = theta(flag, S, K, T, r, sigma)
    ve = vega(flag, S, K, T, r, sigma)
    rh = rho(flag, S, K, T, r, sigma)
    return { 'delta':de, 'gamma':ga, 'theta': th, 'vega': ve, 'rho': rh}

def getNC(symbol, date, strike):
    ticker = yf.Ticker(symbol)
    index = ticker.options.index(date)
    
    DF_calls, DF_puts = ticker.option_chain(ticker.options[index])

    cSigma = DF_calls[DF_calls['strike']==strike]["impliedVolatility"].values[0]

    pSigma = DF_puts[DF_puts['strike']==strike]["impliedVolatility"].values[0]

    current = ticker.history(period="1d")['Close'][0]

    today = datetime.now().date()
    target = datetime.strptime(date, '%Y-%m-%d').date()
    t = abs(today-target).days

    return cSigma, pSigma, current, t

if __name__ == "__main__":
    print("okay")
    app.run(debug=True)