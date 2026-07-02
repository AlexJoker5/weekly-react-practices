import { useState } from 'react'
import './App.css'
import Accordion from './Accordion'

const faqData = [
  {
    title: "What is Github and how does it work?",
    content: "GitHub is the home for all developers—a platform where you can share code, contribute to open source projects, or even automate your workflow with tools like GitHub Actions and Packages. If you’re just getting started with GitHub, you may know us best as a place for version control and collaboration.",
  },
  {
    title: "How do I see GitHub's availability?",
    content: "Check our real-time status report",
  },
  {
    title: "Why is GitHub so popular?",
    content: "GitHub is built by developers for developers, and we’re proud to be home to the world’s largest open source community. With 50 million developers and millions more open source projects, GitHub has become the go-to place to collaborate and build software together.",
  },
];

function App() {
  return (
    <div className="container paper">
      <header className='margin-bottom-large'>
        <h1>💬 GitHub FAQ</h1>
        <p className='secondary-text'>Click the headers below to expand or collapse the answers.</p>
      </header>
      <main className='margin-top-large'>
        <Accordion items={faqData} />
      </main>
    </div>
  )
}

export default App
