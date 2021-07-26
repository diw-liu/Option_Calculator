import React, {useState, useEffect} from 'react';

const OptionHeader = (props) =>{

   const handleAddOption = async () =>{
      props.getOptionDate();
   }

    return(
      <div className="mx-8 grid grid-cols-3 grid-flow-col gap-20">  
           <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider "> Option Name </div>
           <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider "> Type </div>
           <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider "> Price </div>
           <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">  </div>
      </div>
    )
}

export default OptionHeader;