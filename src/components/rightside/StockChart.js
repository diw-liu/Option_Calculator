import React, {useState, useEffect}       from 'react';
// import TradingViewWidget, { Themes }      from 'react-tradingview-widget';

const StockChart = (props) =>{
   const [showChart, setShow] = useState(false) 
   console.log(props.ticker.symbol)
   
   return(
      <div>
         <div onClick={() => setShow(!showChart)}>
          Stock Chart
         </div>

         {/* {
            showChart &&
               (<TradingViewWidget
                  symbol={props.ticker.symbol}
                  theme={Themes.DARK}
                  locale="fr"
                />)
         } */}
      </div>
    )
}

export default StockChart;