import React, { Fragment, useState }            from 'react';
import OptionDate                               from './OptionDate';  
import OptionChain                              from './OptionChain';        
import OptionType                               from './OptionType'
const Modal = (props) =>{
    const [index, setIndex] = useState(0);
    const [showLong, setLong] = useState(true);

    return(
        <div className={`${props.loading ? 'animate-pulse' : ''} fixed inset-0 z-10 h-screen p-10 overflow-y-auto`}>
          <div className="px-4 text-center ">
            <span
              className="inline-block align-middle " aria-hidden="true"
            >
              &#8203;
            </span>
            
              {/* className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl" */}
              <div className="inline-block w-full max-w-max p-6 my-8 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex justify-center">
                  <div className="text-lg font-medium leading-6 text-gray-900">
                    <h3> Select the expiration date of option </h3> 
                  </div>
          
                  <div className="bg-white inline-block py-2 px-4 font-semibold absolute top-0 right-0"  onClick={() => props.switchModal(false)}>
                    X
                  </div>
                 
                </div>
               

                <div className="mt-2">
                    <OptionDate index={index} setIndex={setIndex} switchModal={props.switchModal}
                        dateList={props.dateList} getOptionChain={props.getOptionChain}
                        />
                </div>
                
                <div className="mt-2">
                    { props.flag ? <OptionType setLong={setLong} showLong={showLong}/>
                                 : <div></div>
                      }
                </div>

                <div className="mt-2">
                    { props.flag ? <OptionChain chain={props.chain} getOptionGreek={props.getOptionGreek}
                                      dateList={props.dateList} index={index} addOptions={props.addOptions}
                                      switchModal={props.switchModal} showLong={showLong}/>
                                 : <div></div> 
                      }
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => props.setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
          </div> 
        </div>
    )
}

export default Modal;