import React, {useState, useEffect} from 'react'; 
import ReturnTableEntry from './ReturnTableEntry';
import ReturnTableHeader from './ReturnTableHeader';

const ReturnTable = (props) =>{
   const [showTable, setShow] = useState(false) 
   
   const handleReturn = () =>{
      if(showTable==false){
         props.returnTable();
         setShow(true)
      }else{
         setShow(false)
      }  
   }

   const getColor = (value) => {
      //value from 0 to 1
      var hue=((value+1)/2*120).toString(10);
      // hue = hue > 120 ? 120 : hue
      // hue = hue < 0 ? 0 : hue
      return ["hsl(",hue,",100%,50%)"].join("");
   }

   return(
      <div className="m-3 ">
         <div className="w-10/12 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handleReturn}>
            Return Table 
         </div>  
         {
            showTable && props.table !== undefined && props.table.length > 0 ?
            <div className="overflow-auto" style={{height: "80vh"}}>
               <table className="table-fixed min-w-full divide-y divide-gray-200" >
                  <thead className="bg-gray-50">
                     <ReturnTableHeader data={props.table[0]}/>
                  </thead>
                  
                  <tbody className="bg-white divide-y divide-gray-200" >
                  {
                     props.table.map((entry,index) => ( 
                        <ReturnTableEntry data={entry} getColor={getColor} cost={props.cost}/>
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