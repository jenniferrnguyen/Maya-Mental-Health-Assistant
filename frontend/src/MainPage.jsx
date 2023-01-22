import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicRecorder from 'mic-recorder-to-mp3';
import { useState, useEffect, useRef } from 'react';
import { checkPropTypes } from 'prop-types';

const Dictaphone = () => {

  const recorder = useRef(null);
  const audioPlayer = useRef(null) //Ref for the HTML Audio Tag
  const [blobURL, setBlobUrl] = useState(null)
  const [audioFile, setAudioFile] = useState(null)
  const [isRecording, setIsRecording] = useState(null)

  useEffect(() => {
    //Declares the recorder object and stores it inside of ref
    recorder.current = new MicRecorder({ bitRate: 128 })
  }, [])


  const startRecording = () => {
    recorder.current.start().then(() => {
      setIsRecording(true)
    })
  }


  const stopRecording = () => {
    recorder.current
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "audio.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        })
        const newBlobUrl = URL.createObjectURL(blob)
        setBlobUrl(newBlobUrl)
        setIsRecording(false)
        setAudioFile(file)
      })
      .catch((e) => console.log(e))
  }
  

  
    return (
      <div>
        <audio ref={audioPlayer} src={blobURL} controls='controls' />
          <button className="btn btn-success mx-5" disabled={isRecording} onClick={startRecording}>
          Start
          </button>
          <button className="btn btn-error mx-5" disabled ={!isRecording} onClick={stopRecording}>
            Stop</button>
          <button className="btn btn-warning mx-5" onClick={null}>Reset</button>
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

export default function MainPage() {
    const [resp, setResp] = useState("")

    return (
        <main className="bg-blue-500 w-screen h-screen grid place-items-center">
          <h1 className="text-6xl text-white">Let's Talk!</h1>
        <div className="text-2xl text-white">
            <Dictaphone />
            <Response resp={resp}/>
        </div>
        <button className="btn bg-white text-black" onClick={() => setResp("This is random ass text")}>ahhhhh</button>
        </main>
    )
}

