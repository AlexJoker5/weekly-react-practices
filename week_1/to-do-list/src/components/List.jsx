function List ({ todos, isComplete = false, onComplete, onRemove }) {

  return (
    <div className='text-left text-white'>
      {todos.map((todo, index) => {
        return (
          <div className='flex flex-row justify-between mt-2' key={todo.id}>
            <div>
              <span>{++index}.</span> &nbsp;
              {todo.text}
            </div>
            {!isComplete && (
              <div>
                <button
                  className='bg-green-700 rounded-xl px-3 py-1 hover:bg-green-800 me-3'
                  onClick={() => onComplete(todo.id)}
                >
                  complete
                </button>
                <button
                  className='bg-red-600 rounded-xl px-3 py-1 hover:bg-red-800'
                  onClick={() => onRemove(todo.id)}
                >
                  remove
                </button>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default List
