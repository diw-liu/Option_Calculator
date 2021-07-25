import React, {useState, useEffect} from 'react';

const OptionDate = (props) =>{

    const handleLeft = async () =>{
        props.setIndex(props.index-1)
        props.switchModal(true);
    }
    const handleRight = async () =>{
        props.setIndex(props.index+1);
        props.switchModal(true);
    }
    const handleSelect = async () =>{
        props.getOptionChain(props.dateList[props.index]);
    }

    return(
       <div>
            <button onClick={props.index == 0 ? () => {} : handleLeft }>
                <span className="material-icons">arrow_back_ios</span>
            </button>
            <button onClick={handleSelect}>
                <span>{ props.dateList[props.index] }</span>
            </button>
            <button onClick={props.index == props.dateList.length-1 ? () => {} : handleRight }>
                <span className="material-icons">arrow_forward_ios</span>
            </button>
       </div>
    )
}

export default OptionDate;