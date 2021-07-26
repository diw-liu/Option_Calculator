import React, {useState, useEffect} from 'react';
import StockChart                   from './StockChart';
import ReturnGraph                  from './ReturnGraph';
import ReturnTable                  from './ReturnTable';

const RightSide = (props) =>{
    
    return(
       <div>
           <ReturnTable returnTable={props.returnTable} table={props.table} cost={props.cost}/>
           <ReturnGraph returnGraph={props.returnGraph} graph={props.graph}/>
       </div>
    )
}

export default RightSide;