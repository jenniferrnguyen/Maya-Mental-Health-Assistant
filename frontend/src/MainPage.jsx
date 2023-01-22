import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicRecorder from 'mic-recorder-to-mp3';
import { useState, useEffect, useRef } from 'react';
import { checkPropTypes } from 'prop-types';
import axios from "axios";

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

const Dictaphone = () => {

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
        <div className="bg-white text-black rounded-lg p-10 my-5">
          <p>{transcript}</p>
        </div>
        <p className="text-center">Microphone: {listening ? 'on' : 'off'}</p>
        {/* <audio ref={audioPlayer} src={blobURL} controls='controls' />          */}
        <div>
          <button className="btn btn-success m-5"  onClick={startRecording}>
          Start
          </button>
          <button className="btn btn-error m-5" onClick={stopRecording}>
            Stop</button>
          <button className="btn btn-warning m-5" onClick={resetTranscript}>Reset</button>
        </div>
        </div>
    );
  };

const Response = (props) => {
    return (
      <div className={props.resp ? "bg-white text-black rounded-lg p-10 my-5" : "bg-blue-600"}>
      <p>{props.resp}</p>
      </div>
    );
}

export default function MainPage({name}) {
    const [resp, setResp] = useState("")
    const [name1, setName] = useState("")
  
    const msg = new SpeechSynthesisUtterance()

    useEffect(() => {
      setName(localStorage.getItem("name"));
      let text = name ? "Hey " + name + ", what's on your mind?" : "Hey, what's on your mind?"
      msg.text = text
      window.speechSynthesis.speak(msg)
    }, []);


    return (
        <main className="bg-blue-500 w-screen h-screen grid place-items-center
        bg-gradient-to-tr from-blue-200 to-blue-600 via-blue-400 animate-gradient-xy">
        <div className="text-2xl text-white">
          <h1 className="text-6xl text-white m-9">Hey {name}, what's on your mind?</h1>
            <Dictaphone/>
            <Response resp={resp}/>
        </div>
        </main>
    )
}

/**
 * VISIBLE PROBLEMS:
 * All the text to speech stuff goes twice every single page and it's incredibly annoying 
 * 
 */

