import { useState } from 'react'
import './App.css'
import { DragDropProvider } from '@dnd-kit/react'
import TodoList from './components/TodoList';

function App() {

  const todoList = [
    { id: 1, text: "buy milk", status: "to-do" },
    { id: 2, text: "wash bike", status: "in-progress" },
    { id: 3, text: "do the budget", status: "done" },
    { id: 4, text: "call jane", status: "to-do" },
  ];

  return (
    <TodoList todos={todoList} />
  )
}

export default App
