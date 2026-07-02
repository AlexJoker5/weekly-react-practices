function SubTask({ description, isOpen }) {

    return (
        <div className={`mx-2 ${isOpen ? 'max-h-40 opacity-100 py-2' : 'max-h-0 opacity-0 py-0'}`}>
            <span>{description}</span>
        </div>
    )

}

export default SubTask