import React, {useState, useEffect} from 'react';
import OptionEntry                  from './OptionEntry'; 

const OptionTable = (props) =>{
    return(
       <div className="h-5/6">
         {
            props.optionList !== undefined && props.optionList.length > 0 ?
            <div>
               {
                  props.optionList.map((entry,index) =>(
                     <OptionEntry 
                        data={entry} deleteOptions={props.deleteOptions}
                     />
                  ))
               }
            </div> 
            :<div></div>  
         }
       </div>
    )
}

export default OptionTable;