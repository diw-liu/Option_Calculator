import React, {useState, useEffect} from 'react'; 

const ReturnTableEntry = (props) =>{
   const okay = (x) =>{
       console.log(props.getColor(props.cost/x))
   }
   return(
        <tr>
            {
                Object.values(props.data).map((x,index) =>(
                    <td className="px-6 py-4 whitespace-nowrap" onClick={() =>okay(x)} style={{backgroundColor: index > 0 ? props.getColor(x/props.cost) : ""}}>{parseFloat(x).toFixed(2)}</td>
                ))
            }
        </tr>
   )
}

export default ReturnTableEntry;