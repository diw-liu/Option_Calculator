import React, {useState, useEffect} from 'react';


const OptionChainEntry = (props) =>{
    const handleGreek = () =>{
        props.getOptionGreek(props.dateList[props.index],props.data.strike)
    }
    
    const handleCall = (e) =>{
        console.log(e.target.innerHTML)
        props.addOptions(props.dateList[props.index],props.data.strike,parseFloat(e.target.innerHTML),'C', props.showLong, props.data.impliedVolatility_x )
        props.switchModal(true);
    }

    const handlePut = (e) =>{
        console.log("Put")
        props.addOptions(props.dateList[props.index],props.data.strike,parseFloat(e.target.innerHTML),'P', props.showLong, props.data.impliedVolatility_y)
        props.switchModal(true);
    }

    return(
        <div>
            <div className="my-4 grid grid-cols-7 grid-flow-col gap-10 ">  
                {/* call is x, put is y*/}
                <div onClick={handleCall}>{props.data.bid_x != null ? props.data.bid_x.toFixed(2) : "N/A"}</div>
                <div onClick={handleCall}>{props.data.mid_x != null ? props.data.mid_x.toFixed(2) : "N/A"}</div>
                <div onClick={handleCall}>{props.data.ask_x != null ? props.data.ask_x.toFixed(2) : "N/A"}</div>
                <div onClick={handleGreek}>{props.data.strike != null ? props.data.strike : "N/A"}</div>
                <div onClick={handlePut}>{props.data.bid_y != null ? props.data.bid_y.toFixed(2) : "N/A"}</div> 
                <div onClick={handlePut}>{props.data.mid_y != null ? props.data.mid_y.toFixed(2) : "N/A"}</div>
                <div onClick={handlePut}>{props.data.ask_y != null ? props.data.ask_y.toFixed(2) : "N/A"}</div> 
            </div>
       </div>
    )
}
           
export default OptionChainEntry;