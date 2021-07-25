import React, { useState, useEffect } 	from 'react';
import NavBar                           from "../bar/NavBar"
import InformContent                    from "../tickers/InformContent"
import Modal                            from '../modal/Modal';   
import Greek                            from '../modal/Greek';

const HomeScreen = (props) => {
    
    const [id, setId]                   = useState(0);
    const [ticker,setTicker]            = useState({});

    const [optionList,setList]          = useState([]);
    const [dateList,setDateList]        = useState([]);
    const [chain, setChain]             = useState([]);

    const [loading, setLoading]         = useState(false);
    const [flag, setFlag]               = useState(false);
    const [showModal, setShowModal]     = useState(false);
    const [showGreek,setGreek]          = useState(false);
    
    const [call,setCall]                = useState({});
    const [put,setPut]                  = useState({});

    const [graph, setGraph]             = useState({});
    const [table, setTable]             = useState([]);
    const [cost, setCost]               = useState(0);

    const clickHome = async () => {
        setTicker("");
        // fetch("/api/greek'");
    }

    const getTicker = async (ticker) => {
        fetch('/api/ticker', {
            method: 'POST',
            body: JSON.stringify({
                content:ticker
            }),
            headers:{ 'Content-Type' : 'application/json'}
        }).then(response => response.json())
          .then(message => {
            if(message["404"] == null){
                setTicker(message);
            }else{
                console.log(message);
            }
        })
    }
      
    const getOptionDate = async () => {
        try{
            setShowModal(true)
            setLoading(true)
            fetch('/api/optionsDate', {
                method: 'POST',
                body: JSON.stringify({
                    content:ticker.symbol
                }),
                headers:{ 'Content-Type' : 'application/json'}
            }).then(response => response.json())
              .then(message => {
                if(message["404"] == null){
                    setDateList(message);
                    setLoading(false);
                }else{
                    console.log(message);
                }
            })
            
        }catch (e){
            console.log(e);
        }  
    }
    
    const getOptionChain = async ( date ) => {
        fetch('/api/optionsChain',{
            method: 'POST',
            body: JSON.stringify({
                content: ticker.symbol,
                date: date
            }),
            headers:{ 'Content-Type' : 'application/json'}
        }).then(response => response.json())
          .then(message =>  {
            if(message["404"] == null){
                setChain(message);
                setFlag(true);
            }else{
                console.log(message);
            }
        })
    }

    const getOptionGreek = async ( date, strike ) => {
        // console.log("Hello")
        setGreek(false)
        fetch('/api/greek',{
            method: 'POST',
            body: JSON.stringify({
                symbol: ticker.symbol,
                date: date,
                strike: strike
            }),
            headers:{ 'Content-Type' : 'application/json'}
        }).then(response => response.json())
          .then(message =>  {
            if(message["404"] == null){
                setCall(message.call)
                setPut(message.put)
                setGreek(true)
            }else{
                console.log(message);
            }
        })
    }

    const addOptions = (date, strike, price, type, long, iv) => {
        const option = {
            id: id,
            symbol: ticker.symbol,
            date: date,
            type: type,
            strike: strike,
            price: price,
            long: long,
            iv : iv
        }
        setId(id+1);
        setList([...optionList, option])
        console.log(optionList)
    }
    
    const returnGraph = () =>{
        console.log(optionList)
        fetch('api/returnGraph', {
            method:'POST',
            body: JSON.stringify({
                content: optionList
            }),
            header:{'Content-Type': 'application/json'}
        }).then(response => response.json())
          .then(message =>{
            setGraph(message);
          })
    }

    const returnTable = () =>{
        fetch('api/returnTable', {
            method:'POST',
            body: JSON.stringify({
                content: optionList
            }),
            headers:{'Content-Type': 'application/json'}
        }).then(response => response.json())
          .then(message =>{
            if(message["404"] == null){
                setTable(message);
            }else{
                console.log(message);
            }
        })
        fetch('api/returnCost', {
            method:'POST',
            body: JSON.stringify({
                content: optionList
            }),
            headers:{'Content-Type': 'application/json'}
        }).then(response => response.json())
          .then(message =>{
            if(message["404"] == null){
                console.log(message.cost)
                setCost(message.cost);
            }else{
                console.log(message);
            }
        })
        
    }

    const deleteOptions = ( id ) => {
        console.log(id)
        console.log(optionList)
        const temp = optionList.filter(option => option.id !== id);
        setList(temp);
        console.log(optionList)
    }

    const switchModal = (modal) =>{
        setFlag(false);
        setGreek(false);
        setShowModal(modal);
    }

    return(
        // <div className={`${loading ? 'animate-spin' : ''} sidebar-buttons`}>
        <div>

            <NavBar handleClickHome={clickHome} getTicker={getTicker} />
            <div className=" h-5/6 ">
                {
                    Object.entries(ticker).length == 0 
                        ? <div></div>
                        : <InformContent ticker={ticker} setTicker={setTicker} 
                            getTicker={getTicker} getOptionDate={getOptionDate}
                            optionList={optionList} deleteOptions={deleteOptions}
                            returnGraph={returnGraph} graph={graph}
                            returnTable={returnTable} table={table}
                          />
                }
            </div>

            {
                showModal && (<Modal showModal={showModal} setShowModal={setShowModal} 
                                    dateList={dateList} getOptionChain={getOptionChain}
                                    loading={loading} chain={chain} getOptionGreek={getOptionGreek}
                                    flag={flag} switchModal={switchModal}
                                    addOptions={addOptions}/>)
            }
 
            {
                showGreek && (<Greek call={call} put={put} setGreek={setGreek}/>)
            }  
        </div>
               


    )
}

export default HomeScreen;