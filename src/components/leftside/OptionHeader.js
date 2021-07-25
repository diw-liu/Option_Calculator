import React, {useState, useEffect} from 'react';

const OptionHeader = (props) =>{

   const handleAddOption = async () =>{
      props.getOptionDate();
   }

    return(
       <div className="mx-8 grid grid-cols-2 grid-flow-col gap-4">  
           <div className="font-mono "> Option Name </div>
           <div className="font-mono "> Type </div>
           <div className="font-mono "> Price </div>
       </div>
    )
}

export default OptionHeader;