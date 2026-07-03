import { useState, useEffect, useRef } from 'react'
import './App.css'
import Button from './components/Button';

function App() {

  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState('initial'); // initial, run, stop
  
  const intervalRef = useRef(null);

  useEffect(() => {
    
    console.log("status: ", status);

    if(status === 'initial') {
      clearInterval(intervalRef.current);
      setSeconds(0);
    } else if(status === 'run') {

      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);

    } else {
      console.log("Else : ")
      clearInterval(intervalRef.current);
    }

  }, [status]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds/60);
    const second = totalSeconds%60;
    return `${minutes}:${second.toString().padStart(2, '0')}`
  }

  return (
    <div className='mt-50 m-auto text-center'>
      <h2 className='text-4xl font-bold'>Timer</h2>
      <p className='mt-6 text-3xl'>{formatTime(seconds)}</p>
      <div className='flex flex-row justify-center gap-10 mt-10 text-white'>
        <Button buttonStyle={'rounded-lg px-5 py-2 bg-green-700 hover:bg-green-600 border border-solid border-neutral-700'} clickHandler={() => setStatus('run')} buttonName={'Start'}  />
        <Button buttonStyle={'rounded-lg px-5 py-2 bg-red-700 hover:bg-red-600 border border-solid border-neutral-700'} clickHandler={() => setStatus('stop')} buttonName={'Stop'}  />
        <Button buttonStyle={'rounded-lg px-5 py-2 text-black bg-white border hover:bg-neutral-400 border-solid border-neutral-700'} clickHandler={() => setStatus('initial')} buttonName={'Reset'}  />
      </div>
      
    </div>
  )
}

export default App
