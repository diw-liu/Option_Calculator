import React, {useState, useEffect} from 'react'; 

const ReturnTableHeader = (props) =>{

   return(
        <tr>
            {
                Object.keys(props.data).map(x =>(
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{x}</th>
                ))
            }
        </tr>
   )
}

export default ReturnTableHeader;