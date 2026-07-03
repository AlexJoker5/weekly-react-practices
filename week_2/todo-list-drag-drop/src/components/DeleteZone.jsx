import { useDroppable } from "@dnd-kit/react";

function DeleteZone() {

    const droppable = useDroppable({ id: "delete-zone" });
    
    return (
        <div ref={droppable.ref} style={{ backgroundColor: droppable.isDropTarget ? '#ffebee' : '#fafafa', color: droppable.isDropTarget ? '#c62828' : '#9e9e9e', borderColor: droppable.isDropTarget ? '#c62828' : '#9e9e9e' }}
        className="mt-10 p-10 border-2 border-dashed rounded-lg text-center font-bold transition duration-2 ease">
            {droppable.isDropTarget ? "💥 Release to Delete!": "Drop here to delete"}
        </div>
    )

}

export default DeleteZone;