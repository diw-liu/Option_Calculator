import React, {useState, useEffect} from 'react';
import LeftSide                     from '../leftside/LeftSide'
import RightSide                    from '../rightside/RightSide'

const InformContent = (props) =>{
    console.log(props.ticker['symbol'])
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (Object.entries(props.ticker).length !== 0) {
                props.getTicker(props.ticker['symbol'])
            }
        }, 5000);
        return () => clearInterval(intervalId)
    },[])

    return(
       <div className="grid grid-cols-2 divide-x">
           <LeftSide getOptionDate={props.getOptionDate} ticker={props.ticker}
                optionList={props.optionList} deleteOptions={props.deleteOptions}/>
           <RightSide ticker={props.ticker} 
                returnGraph={props.returnGraph} graph={props.graph}
                returnTable={props.returnTable} table={props.table}
                cost={props.cost}/>
       </div>
    )
}

export default InformContent;