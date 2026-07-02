import { useState } from 'react'
import List from './components/List';
import Form from './components/Form'

const getSavedTask = (key) => {
  return window.localStorage.getItem(key)
}

function App() {

  let key = 1;

  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  })

  const [completeTodos, setCompleteTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("completedTodos")) || [];
  })
  
  const [taskText, setTaskText] = useState('');

  const [completeTaskText, setCompleteTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!taskText.trim()) return;

    const newKey = todos.length +1;

    const newTodo = {
      id: crypto.randomUUID(),
      text: taskText.trim(),
      completed: false
    }

    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]))
    
    setTodos([...todos, newTodo])
    setTaskText('')

  }

  const handleRemove = (removeKey) => removeFromTodoList(removeKey);

  const removeFromTodoList = (key) => {
    const updatedTasks = todos.filter((todo)=> todo.id != key);

    localStorage.setItem("todos", JSON.stringify(updatedTasks));

    setTodos(updatedTasks);
  }

  const handleComplete = (key) => {

    // Re-render Todo UI
    removeFromTodoList(key);

    const todo = todos.find((todo)=> todo.id == key);

    const completedTodo = { ...todo, completed: true };

    // Update Complete Keys

    const completedTodos = JSON.parse(localStorage.getItem("completedTodos")) || [];

    const updatedCompletedTasks = [...completedTodos, completedTodo];

    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedTasks));

    // Re-render Complete Todo UI

    setCompleteTodos([...completedTodos, completedTodo])
    

  }

  return (
    <div className='px-50'>
      
      <Form text={taskText} setText={setTaskText} onSubmit={handleSubmit} />

      <List todos={todos} isComplete={false} onComplete={handleComplete} onRemove={handleRemove} />

      {
        completeTodos.length > 0 && (
          <div>
            <h2 className='pt-10'>Complete Task List</h2>

            <List todos={completeTodos} isComplete={true} />
          </div>
        )
      }
    </div>
  )
}

export default App
