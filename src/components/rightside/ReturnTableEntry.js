import React, {useState, useEffect} from 'react'; 

const ReturnTableEntry = (props) =>{

   return(
        <tr>
            {
                Object.values(props.data).map((x,index) =>(
                    <td className="px-6 py-4 whitespace-nowrap" >{parseFloat(x).toFixed(2)}</td>
                ))
            }
        </tr>
        // style={{backgroundColor: index > 0 ? props.getColor((x-props.cost)/props.cost) : ""}}
   )
}

export default ReturnTableEntry;