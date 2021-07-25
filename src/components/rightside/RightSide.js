import React, {useState, useEffect} from 'react';
import StockChart                   from './StockChart';
import ReturnGraph                  from './ReturnGraph';
import ReturnTable                  from './ReturnTable';

const RightSide = (props) =>{
    return(
       <div>
           <StockChart ticker={props.ticker}/>
           <ReturnTable returnTable={props.returnTable} table={props.table}/>
           <ReturnGraph returnGraph={props.returnGraph} graph={props.graph}/>
       </div>
    )
}

export default RightSide;