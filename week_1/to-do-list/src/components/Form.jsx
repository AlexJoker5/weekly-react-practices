function Form({ text, setText, onSubmit}) {
    
    return (
        <form className='px-2 mt-5 mb-5' onSubmit={onSubmit}>
            <input 
          className='text-sm text-gray-900 py-1 px-3 bg-white rounded-lg me-4'
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="What needs to be done?"
        />
            <button className='text-sm px-2 py-1 rounded-lg bg-indigo-800 text-white hover:bg-indigo-900' type="submit">Add Todo</button>
      </form>
    )
}

export default Form