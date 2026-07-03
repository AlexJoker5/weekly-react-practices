function Form({text, setText, submitHandler}) {

    return (
        <form className='flex justify-center gap-10 mb-12' onSubmit={submitHandler}>
            <input type='text' value={text} 
            onChange={(e)=>setText(e.target.value)}
            placeholder='Type a new task...'
            className='ps-10 pe-50 text-lg text-neutral-950 bg-white rounded-lg border border-solid border-neutral-900' />
            <button type='submit' className='py-2 px-4 text-lg bg-sky-500 hover:bg-sky-700 text-white border-none rounded-lg cursor-pointer'>Add Task</button>
        </form>
    )

}

export default Form;