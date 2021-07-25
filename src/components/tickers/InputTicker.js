import React, {useState, useEffect} from 'react';

const InputTicker = (props) =>{
    const [input,setInput] = useState("");

    const handleChange = async (event) =>{
        setInput(event.target.value);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        props.getTicker(input);
    }

    return(
        <form onSubmit={handleSubmit} >
            <div className="pt-2 relative mx-auto text-gray-600">
                <input className="w-full border-2 border-gray-300 bg-white h-8 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                type="search" name="search" placeholder="Search" onChange={handleChange}/>
                <button type="submit" className="absolute right-0 top-0 mt-4 mr-4">
                    <span className="material-icons">search</span>
                </button>
            </div>
        </form>
    )
}

export default InputTicker;