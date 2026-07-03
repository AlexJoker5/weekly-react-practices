import { useDroppable } from "@dnd-kit/react";

function List({ id, title, children }) {

    const droppable = useDroppable({ id });

    return (
        <div ref={droppable.ref} style={{ backgroundColor: droppable.isDropTarget ? '#e3f2fd' : '#f5f5f5' }}
        className='px-10 py-7 border-2 border-dashed min-h-50 transition delay-200 ease-in-out'>
            <h3 className='text-2xl border-b-2 border-solid border-neutral-900 pb-5'>{title}</h3>
            <div className='grid gap-8 mt-5'>
                {children}
            </div>
        </div>
    )

}

export default List;