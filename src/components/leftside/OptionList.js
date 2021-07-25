import React, {useState, useEffect} from 'react';
import OptionTable                  from './OptionTable';
import OptionHeader                 from './OptionHeader'
const OptionList = (props) =>{

   const handleAddOption = async () =>{
      props.getOptionDate();
   }

    return(
       <div className="m-8 rounded-lg border-red-500 bg-gray-300" style={{ height: "60vh" }}>
          <OptionHeader />
          <OptionTable optionList={props.optionList} deleteOptions={props.deleteOptions}/>
          <div className="flex gap-4 ">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddOption}> Add Option </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Calculate </button> 
          </div>
       </div>
    )
}

export default OptionList;