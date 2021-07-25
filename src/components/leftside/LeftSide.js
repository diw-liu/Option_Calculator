import React, {useState, useEffect} from 'react';
import InputTicker                  from '../tickers/InputTicker';
import OptionList                   from './OptionList'

const LeftSide = (props) =>{
    const name = props.ticker.name;
    const symbol = props.ticker.symbol;
    const price = props.ticker.price;
    const close = props.ticker.close;
    const red = props.ticker.close > props.ticker.price ? true : false;
    
    return(
       <div>
           <div className="m-5">
               <div class="flex flex-row space-x-4 m-4"> 
                    <div className="font-mono text-3xl">{symbol}</div>
                    <div className="font-mono pt-2">{name}</div>
               </div>
               
               <div className="font-mono text-4xl m-4">{price.toFixed(2)}</div>
               <div class="flex flex-row space-x-2 m-4"> 
                    <div className={`${red ? 'text-red-600' : 'text-green-600'} font-mono`}>{(price-close).toFixed(2)}</div>
                    <div className={`${red ? 'text-red-600' : 'text-green-600'} font-mono`}>({((price-close)/close*100).toFixed(2)}) %</div>
               </div>
           </div>
           <OptionList getOptionDate={props.getOptionDate} optionList={props.optionList} 
                deleteOptions={props.deleteOptions}/>
       </div>
    )
}

export default LeftSide;