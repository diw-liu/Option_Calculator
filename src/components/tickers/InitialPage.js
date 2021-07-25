import React, {useState, useEffect} from 'react';
import InputTicker                  from "./InputTicker"

const InitialPage = (props) =>{

    return(
        <div className="flex h-screen">
            <div className="flex-none w-16 h-16 "></div>

            <div className="flex-grow h-16">
                <InputTicker getTicker={props.getTicker} />
            </div>
            
            <div className="flex-none w-16 h-16 "></div>
        </div>
        
    )
}

export default InitialPage;