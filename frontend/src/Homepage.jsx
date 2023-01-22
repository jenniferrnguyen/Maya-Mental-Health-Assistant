import { useEffect, React, useState } from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Speech from 'react-speech';

import MainPage from './MainPage';

export default function Homepage() {

    const [message, setMessage] = useState(null);
    const [userName, setUsername] = useState(false)

    const submit = (e) => {
        e.preventDefault();
        console.log(message)
        setUsername(true)
    }

    useEffect(() => {

    }, [message])



    return (
        <>
        {
            userName ? 
            ( <MainPage name={message}/> )
            :
            (<main className="grid place-items-center w-screen h-screen 
        bg-gradient-to-tr from-blue-200 to-blue-600 via-blue-400 animate-gradient-xy">
            <div className="grid place-items-center w-3/4 rounded bg-">
                <h1 className="text-6xl text-white">Hi, I'm Maya</h1>
                <span className="label-text text-lg text-white my-5">What is your name?</span>
                <form onSubmit={submit}>
                    <div className="form-control w-full max-w-xs ">
                        <input onChange={(event) => setMessage(event.target.value)} type="text" placeholder="Your Name Here" className="input input-bordered w-full max-w-xs bg-white" />
                        <button to="/Mainpage" className="btn btn-wide glass bg-white text-blue-600 m-2 mt-5">Continue</button>

                    </div>
                </form>
                
                {/* TODO: Send Name to Backend, read name from  */}
                <a href="/Mainpage" className="text-sm m-2 text-white hover:text-blue-600">Continue without name</a>
            </div>
            
        </main>)
        }
        
        </>
    )
}