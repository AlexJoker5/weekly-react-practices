import { useState } from 'react';
import { DragDropProvider } from '@dnd-kit/react'

import Form from './Form';
import DeleteZone from './DeleteZone';
import List from './List';
import TaskCard from './TaskCard';

function TodoList({ todos: initialTodos = [] }) {

    const [tasks, setTasks] = useState(initialTodos);
    const [inputValue, setInputValue] = useState("");

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(!inputValue.trim()) return;

        const newTask = {
            id: Date.now().toString(),
            text: inputValue.trim(),
            status: 'to-do',
        };

        setTasks([...tasks, newTask]);
        
        setInputValue("");
    }

    const dragEndHandler = (e) => {
        
        const {operation, canceled} = e;
        const {source, target} = operation;

        if(canceled) return;

        const taskId = source.id;
        const targetDestination = target.id;

        if(targetDestination == 'delete-zone') {
            setTasks(tasks.filter((task) => task.id.toString() !== taskId.toString()));
        } else {
            setTasks(
                tasks.map((task) => task.id.toString() === taskId.toString() 
                        ? {...task, status: targetDestination} 
                        : task)
            )
        }
    }


    return (
        <div className='text-center'>
            <h1>To Do List</h1>
            <Form text={inputValue} setText={setInputValue} submitHandler={onSubmitHandler} />
            <DragDropProvider onDragEnd={dragEndHandler}>
                <div className='flex justify-center gap-16'>
                    <List id="to-do" title="To Do">
                        {tasks
                            .filter((task) => task.status === 'to-do')
                            .map((task) => <TaskCard key={task.id} id={task.id} text={task.text} />)
                        }
                    </List>
                    <List id="in-progress" title="In Progress">
                        {tasks
                            .filter((task) => task.status === 'in-progress')
                            .map((task) => <TaskCard key={task.id} id={task.id} text={task.text} />)
                        }
                    </List>
                    <List id="done" title="Done">
                        {tasks
                            .filter((task) => task.status === 'done')
                            .map((task) => <TaskCard key={task.id} id={task.id} text={task.text} />)
                        }
                    </List>
                </div>
                <DeleteZone />
            </DragDropProvider>
        </div>
    )
}

export default TodoList;