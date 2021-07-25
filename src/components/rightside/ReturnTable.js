import React, {useState, useEffect} from 'react'; 
import ReturnTableEntry from './ReturnTableEntry';
import ReturnTableHeader from './ReturnTableHeader';

const ReturnTable = (props) =>{

   const handleReturn = () =>{
      props.returnTable();
   
   }

   const getColor = (value) => {
      //value from 0 to 1
      var hue=((1-(-value+1))*120).toString(10);
      return ["hsl(",hue,",100%,50%)"].join("");
   }

   return(
      <div >
         <div onClick={handleReturn}>
            Return Table 
         </div>  
         {
            props.table !== undefined && props.table.length > 0 ?
            <div className="overflow-auto" style={{height: "80vh"}}>
               <table className="table-fixed min-w-full divide-y divide-gray-200" >
                  <thead className="bg-gray-50">
                     <ReturnTableHeader data={props.table[0]}/>
                  </thead>
                  
                  <tbody className="bg-white divide-y divide-gray-200" >
                  {
                     props.table.map((entry,index) => ( 
                        <ReturnTableEntry data={entry} />
                     ))
                  }
                  </tbody>
               </table>
            </div>
            :<div></div>
         }
      </div>
   )
}

export default ReturnTable;