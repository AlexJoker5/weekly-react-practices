import { useState } from 'react'
import './App.css'
import LatestNews from './LatestNews'

function App() {

  const latestNewsAPI = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";

  return (
    <>
      <LatestNews fetchUrl={latestNewsAPI} />
    </>
  )
}

export default App
