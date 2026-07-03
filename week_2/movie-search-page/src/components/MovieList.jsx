import Movie from "./Movie";

function MovieList({ movies }) {

    console.log("movies: ", movies)

    return (
        <div className='grid grid-cols-6 gap-8 mt-10'>
            {movies != null && movies.length > 0 && (
                movies.map((movie, index) => {
                    return(
                        <Movie key={index} movie={movie} />
                    )
                })
            )}
        </div>
    )

}

export default MovieList;