import React, {useState, useEffect} from 'react';

const OptionType = (props) =>{
    const showLong = props.showLong;
    const handleSetLong = () =>{
        props.setLong(true);
    }
    const handleSetShort= () =>{
        props.setLong(false);
    }
    
    return(
        <div>
            <ul className="flex border-b">
                 <li className={`${showLong ? '-mb-px' : ''} mr-1`}>
                     <span className={`bg-white inline-block py-2 px-4 font-semibold ${showLong ? 'border-l border-t border-r rounded-t text-blue-700' : 'text-blue-500 hover:text-blue-800'}`} 
                        onClick={handleSetLong}> Long </span>
                 </li>
                 <li className={`${!showLong ? '-mb-px' : ''} mr-1`}>
                     <span className={`bg-white inline-block py-2 px-4 font-semibold ${!showLong ? 'border-l border-t border-r rounded-t text-blue-700' : 'text-blue-500 hover:text-blue-800'}`} 
                        onClick={handleSetShort}> Short </span>
                 </li>
             </ul>
            {/* <button onClick={props.index == 0 ? () => {} : handleLeft }>
                <span className="material-icons">arrow_back_ios</span>
            </button>
            <button onClick={props.index == props.dateList.length-1 ? () => {} : handleRight }>
                <span className="material-icons">arrow_forward_ios</span>
            </button> */}
       </div>

        // <div className="inline-block w-full max-w-max p-6 my-8 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        //     <ul className="flex border-b">
        //         <li className={`${showLong ? '-mb-px' : ''} mr-1`}>
        //             <a className={`bg-white inline-block py-2 px-4 font-semibold ${showCall ? 'border-l border-t border-r rounded-t text-blue-700' : 'text-blue-500 hover:text-blue-800'}`} 
        //                 onClick={handleSetCall}> Long </a>
        //         </li>
        //         <li className={`${!showLong ? '-mb-px' : ''} mr-1`}>
        //             <a className={`bg-white inline-block py-2 px-4 font-semibold ${!showCall ? 'border-l border-t border-r rounded-t text-blue-700' : 'text-blue-500 hover:text-blue-800'}`} 
        //                 onClick={handleSetPut}> Put </a>
        //         </li>
        //     </ul>
        // </div>  
    )
}

export default OptionType;