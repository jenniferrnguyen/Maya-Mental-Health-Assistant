import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicRecorder from 'mic-recorder-to-mp3';
import { useState, useEffect, useRef } from 'react';
import { checkPropTypes } from 'prop-types';
import axios from "axios";

import mute from "./icons8-mute-unmute-30.png"
import mic from "./icons8-microphone-24.png"

/*
Ok so basically everything that's been added here is some AI api call shit to try and make the mp3 parse 
All of the stuff I was doing earlier still works it just works different.

firstly run:
npm install axios --save
npm install mic-recorder-to-mp3 --save 
if you haven't already

https://www.assemblyai.com/blog/react-speech-recognition-with-react-hooks/ was using this tutorial.

when you launch the package there's gonna be an audio controller on the screen, you can press start to record
with your mic, stop will stop it (obviously) and then you can play it back.

The submit button is supposed to send the file to the AI for it to parse, and the check status button is supposed to
tell us what the progress on it is, whether it's queued, pending, or completed. 

The tutorial the AI folks have for it has some object showing up in the console log, and while I can get it to show up
I can only force it by removing the line in the assembly declaration immediately beneath the end of this comment
containing the bit about the transfer encoding. 

If the transfer encoding is there, the thing throws an error saying "Refused to set unsafe header 'transfer-encoding'"
If it isn't there, I'm pretty sure just nothing happens. I'm honestly not sure, all I know is the output that's expected
to the console never shows up, and the status never changes from queued, as far as I can tell. 
*/


const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: "123a7d1e21d34b8ab2eebd38982e4c1f",           
    //I have an API key but they say to keep it private and not commit it or anything
    //there's a whole section like "more on that later" but they don't actually touch on it once after they initially bring it up
    //if you need it I'll just send it to you in discord if I'm awake but like the shit's free if you need to get your own
    //that's probably easier 
    "content-type": "application/json",
    // "transfer-encoding":"chunked",      //TODO: this line is the problem child I think 
  },
})


function speech(index, name) {
  if (index == 1) {
    return ("Hi " + name + ", can you tell me a little bit about how you're doing and what brings you here today?")
  } else if (index == 2) {
    return ("I'm sorry to hear that. Can you tell me a little bit more about it? "
    + "Everything we talk about here is confidential so it's important that you feel safe "
    + "and comfortable, even when you are talking about sensitive information.")
  } else if (index == 3) {
    return ("I understand that you are very stressed about your studies " + name + ". Why do you feel this way?")
  } else if (index == 4) {
    return ("It seems like you find yourself in a place where things aren’t going "
    + "as you had planned, and that’s why you think you are to blame. Your emotions are justified and normal. ")
  } else if (index == 5) {
    return ("I hear you" + name + " , and I also understand why you might feel "
    + "disappointed. Right now, I think you are overgeneralizing and jumping to conclusions "
    + "- you are extending the negative thoughts that come from from a small negative experience. "
    + "After all, messing up on one single exam does not hinder your chances to get into medical school. ")
  } else if (index == 6) {
    return ("Disappointing situations are a part of life, and your response "
    + "can affect how quickly you can move forward. Someone going through a breakup might "
    + "blame him or herself or even gain weight, thinking, \"What’s the point in looking good? "
    + "I’ll never meet anyone else.\" \n" 
    + "A better approach might be to allow yourself to feel disappointed and remember that "
    + "some things are out of your control. You can work on what is within your control by doing "
    + "this exercise - Write down what happened, what you learned from this experience, and what you "
    + "can do differently next time, watching out for overly negative thoughts. I hope this can help you "
    + "move on and feel better about your future, " + name + ".")
  } else if (index == 7) {
    return ("No problem, " + name + ". I’m happy to help anytime.")
  }
}

export default function MainPage() {
    const [resp, setResp] = useState("")
    const [name, setName] = useState("")
    const [index, setIndex] = useState(2)
    const [isTurn, setTurn] = useState(false);
  
    const msg = new SpeechSynthesisUtterance()

    useEffect(() => {
      setName(localStorage.getItem("name"));
      let text = name ? "Hey " + name + ", what's on your mind?" : "Hey, what's on your mind?"
      msg.text = text
      window.speechSynthesis.speak(msg)
    }, []);

    const Response = (props) => {

      const msging = new SpeechSynthesisUtterance()
    
      if (isTurn) {

        return (
          <div className={resp ? "grid bg-white text-black rounded-lg p-10 my-5 place-items-center place-self-center" : "bg-blue-600"}>
            <div className="w-3/4 mx-5">
              <p className="">{resp}</p>
            </div>
          </div>
        )
      } else {
        return (
          <div className="grid place-items-center p-10">
            <h1 className="text-center">Maya is Listening...</h1>
            <div className="grid place-items-center">
            <div role="status place-self-center">
                <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
            </div>
          </div>
        )
      }
    }

    const Dictaphone = (props) => {

      const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
    
      if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
      }
    
      // const recorder = useRef(null);
      // const audioPlayer = useRef(null) 
      // const [blobURL, setBlobUrl] = useState(null)
      // const [audioFile, setAudioFile] = useState(null)
      // const [isRecording, setIsRecording] = useState(null)
    
      // useEffect(() => {
      //   recorder.current = new MicRecorder({ bitRate: 128 })
      // }, [])
    
    
      const startRecording = () => {
        SpeechRecognition.startListening();
        // recorder.current.start().then(() => {
        //   setIsRecording(true)
        // })
      }
    
    
      const stopRecording = () => {
        SpeechRecognition.stopListening();
        // recorder.current
        //   .stop()
        //   .getMp3()
        //   .then(([buffer, blob]) => {
        //     const file = new File(buffer, "audio.mp3", {
        //       type: blob.type,
        //       lastModified: Date.now(),
        //     })
        //     const newBlobUrl = URL.createObjectURL(blob)
        //     setBlobUrl(newBlobUrl) //sets source for audio controller - I'm assuming this is what we need to use
        //     //if we try and make it go to the backend 
        //     setIsRecording(false)
        //     setAudioFile(file) //stores it in the state variable, I guess. 
        //   })
        //   .catch((e) => console.log(e))
      }
      
      // const [uploadURL, setUploadURL] = useState("")
      // const [transcriptID, setTranscriptID] = useState("")
      // const [transcriptData, setTranscriptData] = useState("")
      // const [transcript, setTranscript] = useState("")
    
        // Submit the Upload URL to AssemblyAI and retrieve the Transcript ID
        // const submitTranscriptionHandler = () => {
        //   assembly
        //     .post("/transcript", {
        //       audio_url: uploadURL,
        //     })
        //     .then((res) => {
        //       setTranscriptID(res.data.id)
        //     })
        //     .catch((err) => console.error(err))
        // }
    
        /*
        Reason we do it like this instead of just having it like automatically check the status is I guess it's easier to debug
        this way? Honestly a little confused here but like I'm confused everywhere. 
        */
        // const checkStatusHandler = async () => {
        //   try {
        //     await assembly.get(`/transcript/${transcriptID}`).then((res) => {
        //       setTranscriptData(res.data)
        //   setTranscript(transcriptData.text)
        //     })
        //   } catch (err) {
        //     console.error(err)
        //   }
        // }
    
      // // Upload the Audio File and retrieve the Upload URL
      // useEffect(() => {
      //   if (audioFile) {
      //     assembly
      //       .post("/upload", audioFile)
      //       .then((res) => setUploadURL(res.data.upload_url))
      //       .catch((err) => console.error(err))
      //   }
      // }, [audioFile])
    
      // //this part works, actually. A little too well even. Usually the uploadURL gets printed to the console twice.
      // //Not really sure why. 
      // console.log(uploadURL)
      
      //We really don't need the audio player but it's a good sanity check to make sure the audio is recording
        return (
          <div className="grid place-items-center">
            <div className={ transcript ? "bg-white text-black rounded-lg p-10 my-5" : "hidden"}>
              <p>{transcript}</p>
            </div>
            <p className="text-center">Microphone: {listening ? 'on' : 'off'}</p>
            {/* <audio ref={audioPlayer} src={blobURL} controls='controls' />          */}
            <div>
              <button className="btn btn-success m-5"  onClick={() => {
                setTurn(false)
                startRecording()}}>
              Start
              </button>
              <button className="btn btn-error m-5" onClick={ () => {
                stopRecording()
                setIndex(index + 1)
                setTurn(true)
                let message = speech(index, name) 
                msg.text = message
                setResp(message)
                window.speechSynthesis.speak(msg)
                
              }}>
                Stop</button>
              <button className="btn btn-warning m-5" onClick={resetTranscript}>Reset</button>
            </div>
            </div>
        );
      };

    return (
        <main className="bg-blue-500 w-screen h-screen grid place-items-center
        bg-gradient-to-tr from-blue-200 to-blue-600 via-blue-400 animate-gradient-xy">
        <div className="text-2xl text-white grid place-items-center place-self-center">
          <h1 className="text-6xl text-white m-9">Hey {name}, what's on your mind?</h1>
            <Dictaphone indicator={setIndex} indicating={index} isTurn={isTurn}/>
            <Response resp={resp} indicating={index} setTurn={setTurn}/>
        </div>
        </main>
    )
}

/**
 * VISIBLE PROBLEMS:
 * All the text to speech stuff goes twice every single page and it's incredibly annoying 
 * 
 */

