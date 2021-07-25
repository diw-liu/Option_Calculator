import React, {useState, useEffect} from 'react';
import InputTicker                  from '../tickers/InputTicker';  

const NavBar = (props) =>{
    return(
        <nav className="flex items-center justify-between flex-wrap bg-gray-800 bg-opacity-75 p-6" >
            <div onClick={props.handleClickHome} className="flex items-center flex-shrink-0 text-gray-200 mr-6">
                <a className="font-semibold text-xl tracking-tight hover:text-white ">Option Calculator</a>
            </div>
            <div className="flex">
                <InputTicker getTicker={props.getTicker} />
            </div>
            
        </nav >
        
    )
}

export default NavBar;