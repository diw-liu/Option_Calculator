import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';

const ReturnGraph = (props) =>{
   const [showGraph, setShow] = useState(false) 
   const map = props.graph['S'] ? props.graph['S'].map(x => x.toFixed(2)) : props.graph['S']
   const data = {
      labels: map,
      datasets: [
        {
          label: 'Profit @ Price',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: props.graph['profit']
        }
      ]
    }

   const handleReturn = () =>{
      if(showGraph==false){
         props.returnGraph();
         setShow(true)
      }else{
         setShow(false)
      }
   }

   return(
      <div className="m-3 ">
         <div className="w-10/12 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handleReturn}>
            Return Graph 
         </div>  
         {
            showGraph &&
               (<Line
                  data={data}
                  options={{
                     title:{
                        display:true,
                        text:'Option Price Graph',
                        fontSize:20
                     },
                     legend:{
                        display:true,
                        position:'right'
                     }
                  }}
               />)
         }
         
      </div>
      
   )
}

export default ReturnGraph;