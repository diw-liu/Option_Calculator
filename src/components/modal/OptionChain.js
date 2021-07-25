import React, {useState, useEffect} from 'react';
import OptionChainEntry             from './OptionChainEntry';
import OptionChainHeader            from './OptionChainHeader';
import Greek                        from './Greek';

const OptionChain = (props) =>{
    
    console.log(props.chain)
    // const getGreek = async (date, strike) =>{
    //     // console.log("hg")
    //     const greek = await props.getOptionGreek(date, strike)
        
    //     console.log("okay")
    // }
    return(
        <div>
            <OptionChainHeader/>
            {   
                props.chain !== undefined && props.chain.length > 0 ?
                <div>
                    {
                        props.chain.map((entry,index) =>(
                            <OptionChainEntry data={entry} getOptionGreek={props.getOptionGreek}
                                dateList={props.dateList} index={props.index} addOptions={props.addOptions}
                                switchModal={props.switchModal} showLong={props.showLong}/>
                        ))
                    }
                </div>
                :<div></div>  
            }              
       </div>
    )
}

export default OptionChain;