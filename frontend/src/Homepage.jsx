import { useEffect, React } from 'react';
import Speech from 'react-speech';


export default function Homepage() {

    useEffect(() => {
        
    }, [])

    return (
        <main className="grid place-items-center w-screen h-screen 
        bg-gradient-to-tr from-blue-200 to-blue-600 via-blue-400 animate-gradient-xy">
            <div className="grid place-items-center w-3/4 rounded bg-">
                <h1 className="text-6xl text-white">Hi, I'm Maya</h1>
                <span className="label-text text-lg text-white my-5">What is your name?</span>
                <div className="form-control w-full max-w-xs ">
                    <input type="text" placeholder="Your Name Here" className="input input-bordered w-full max-w-xs bg-white" />
                </div>
                <a href="/Mainpage" className="btn btn-wide glass bg-white text-blue-600 m-2 mt-5">Continue</a>
                {/* TODO: Send Name to Backend, read name from  */}
                <a href="/Mainpage" className="text-sm m-2 text-white hover:text-blue-600">Continue without name</a>
            </div>
            
        </main>
    )
}