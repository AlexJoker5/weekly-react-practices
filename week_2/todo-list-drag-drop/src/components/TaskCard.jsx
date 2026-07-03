import { useDraggable } from "@dnd-kit/react"

function TaskCard({id, text}) {

    const draggable = useDraggable({ id });

    return (
        <div ref={draggable.ref} className={`px-7 py-2 bg-white border border-solid border-neutral-200 cursor-grab touch-none ${draggable.isDragging ? 'dragging' : ''}`}
        style={{ 
            boxShadow: draggable.isDragging ? "0 5px 15px rgba(0,0,0,0.15)" : "0 2px 4px rgba(0,0,0,0.05)", 
            opacity: draggable.isDragging ? 0.5 : 1 }}>
            {text}
        </div>
    )

}

export default TaskCard