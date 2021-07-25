import React, { useState } from 'react'

const Greek = (props) =>{
    const [showCall, setCall] = useState(true);
    const [greeks, setGreeks] = useState(props.call)

    const handleSetCall = () =>{
        setCall(true)
        setGreeks(props.call)
    }

    const handleSetPut = () =>{
        setCall(false)
        setGreeks(props.put)
    }

    return(
        <div className={`${props.loading ? 'animate-pulse' : ''} fixed inset-0 z-10 h-screen p-10 overflow-y-auto`}>
            <div className="px-4 text-center">
                <span
                    className="inline-block align-middle " aria-hidden="true"
                >
                    &#8203;
                </span>

                <div className="inline-block w-full max-w-max p-6 my-8 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <div>
                        <ul className="flex border-b">
                            <li className={`${showCall ? '-mb-px' : ''} mr-1`}>
                                <a className={`bg-white inline-block py-2 px-4 font-semibold ${showCall ? 'border-l border-t border-r rounded-t text-blue-700' : 'text-blue-500 hover:text-blue-800'}`} 
                                    onClick={handleSetCall}>Call</a>
                            </li>
                            <li className={`${!showCall ? '-mb-px' : ''} mr-1`}>
                                <a className={`bg-white inline-block py-2 px-4 font-semibold ${!showCall ? 'border-l border-t border-r rounded-t text-blue-700' : 'text-blue-500 hover:text-blue-800'}`} 
                                    onClick={handleSetPut}>Put</a>
                            </li>
                            <li className="absolute right-0 ">
                                <div className="bg-white inline-block py-2 px-4 font-semibold" onClick={() =>props.setGreek(false)}>
                                    X
                                </div>
                            </li>
                        </ul>
                    </div>
                
                
                    <div className="my-4 grid grid-cols-4 grid-flow-col gap-10 ">  
                        <div>Delta</div>
                        <div>Gamma</div>
                        <div>Theta</div>
                        <div>Vega</div>
                    </div>
                    <div className="my-4 grid grid-cols-4 grid-flow-col gap-10 ">  
                        <div>{greeks.delta.toFixed(2)}</div>
                        <div>{greeks.gamma.toFixed(2)}</div>
                        <div>{greeks.theta.toFixed(2)}</div>
                        <div>{greeks.vega.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Greek;