import React, {useState, useEffect} from 'react';
import OptionTable                  from './OptionTable';
import OptionHeader                 from './OptionHeader'
const OptionList = (props) =>{

   const handleAddOption = async () =>{
      props.getOptionDate();
   }

    return(
      <div className="m-8 rounded-lg overflow-auto" style={{ height: "60vh" }}>
         <table className="table-fixed min-w-full divide-y divide-gray-200" style={{ height: "55vh" }} >
            <thead className="bg-gray-50">
               <OptionHeader />
            </thead>
            <tbody className="bg-white divide-y divide-gray-200" >
               <OptionTable optionList={props.optionList} deleteOptions={props.deleteOptions}/>
            </tbody>
         </table>
         <div className="flex gap-4 bg-gray-300">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddOption}> Add Option </button>
         </div>
      </div>
    )
}

export default OptionList;