function Movie({ movie }) {

    return (
        <div className='text-white min-h-50' >
            <img className='w-full' src={`${import.meta.env.VITE_MOVIES_POSTER_URL}/${movie.poster_path}`} />
            <div className='text-md font-bold mt-1'>{movie.title}</div>
            <p className='text-[12px]/3 line-clamp-4'>{movie.overview}</p>
        </div>
    )
}

export default Movie;