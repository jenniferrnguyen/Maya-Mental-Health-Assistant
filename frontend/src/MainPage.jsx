import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicRecorder from 'mic-recorder-to-mp3';
import { useState } from 'react';

const Dictaphone = () => {
    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const MicRecorder = require('mic-recorder-to-mp3');

    const Mp3Recorder = new MicRecorder({ bitRate: 128});
  
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  
    return (
      <div>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={() => {
          Mp3Recorder.start().then(() =>  {
            //something
          }).catch((e) => {
            console.error(e);
          });
          }}>Start</button>
        <button onClick={() => {
          Mp3Recorder.stop().getMp3().then(([buffer, blob]) => {
            const file = new File(buffer, "input.mp3", {
              type: blob.type,
              lastModified: Date.now()
            });

            const player = new Audio(URL.createObjectURL(file));
            player.play();
            
            }).catch((e) => {
              alert("We could not retrieve your message");
              console.log(e);
            });
          }}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
      </div>
    );

    
  };

const Response = () => {
    // TODO Create response for May
    return null;
}

export default function MainPage() {
    return (
        <main className="bg-blue-500 w-screen h-screen grid place-items-center">
        <div className="text-2xl text-white">Let's Talk!</div>
            <Dictaphone />
            <Response />
        </main>
    )
}