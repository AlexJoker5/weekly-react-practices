function SearchForm({keyword, setKeyword, handleSubmit}) {

    return(
        <form className='p-5 border border-solid border-neutral-700' onSubmit={handleSubmit}>
            <label className='text-sm' htmlFor='search-input' >Search for a movie</label>
            <div className='mt-2'>
                <input id='search-input' className='border border-solid border-neutral-700 text-left rounded-sm px-5 w-full py-2' placeholder="Search by movie names"
                name='movieName' type='text' value={keyword} onChange={(e) => setKeyword(e.target.value)}  />
            </div>
            <button className='bg-sky-500 hover:bg-sky-700 text-white px-5 py-2 h-full w-full rounded-sm mt-2' type='submit'>Search</button>
        </form>
    )

}

export default SearchForm;