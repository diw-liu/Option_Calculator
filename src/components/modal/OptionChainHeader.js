import React, {useState, useEffect} from 'react';

const OptionChainHeader = (props) =>{
    return(
       <div className="my-8 grid grid-cols-7 grid-flow-col gap-10 ">  
           {/* call is x, put is y*/}
           <div> Call Bid </div>
           <div> Call Mid </div>
           <div> Call Ask </div>
           <div> Strike_Price </div>
           <div> Put Bid </div> 
           <div> Put Mid </div>
           <div> Put Ask </div>
       </div>
    )
}

export default OptionChainHeader;