import React, {useState, useEffect} from 'react'; 

const ReturnTableEntry = (props) =>{
   
   return(
        <tr>
            {
                Object.values(props.data).map(x =>(
                    <td className="px-6 py-4 whitespace-nowrap">{parseFloat(x).toFixed(2)}</td>
                ))
            }
        </tr>
   )
}

export default ReturnTableEntry;