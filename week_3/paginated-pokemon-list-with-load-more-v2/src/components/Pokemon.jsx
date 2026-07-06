import { useEffect, useState } from "react";
import { isMatchedBgColor, getTextColor } from "./ColorList";
import Skeleton from 'react-loading-skeleton';

function Pokemon({ name, url }) {

    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!url) return;
        let isMounted = true;
        const fetchPokemon = async () => {
            setLoading(true);
            const response = await fetch(url);
            const data = await response.json();
            // console.log("Data: ", data);
            if(isMounted) setPokemon(data);
        }
        fetchPokemon().then(()=>{
            if(isMounted) {
                console.log("Then")
                setLoading(false);
            }
        })
        return () => isMounted = false;
    }, [url]);

    // console.log("Pokemon: ", name);
    return (
        <div className='list-disc'>
            {/* {console.log("Pokemon: ", pokemon)} */}
            {loading ? (
                <div>
                    <Skeleton width={220} height={250} />
                    <Skeleton style={{ marginTop: '10px' }} width={120} height={20} />
                    <Skeleton style={{ marginTop: '5px' }} count={2} />
                </div>
            ): (
                <div>
                    <img className='bg-gray-200 rounded-md m-h-250' src={pokemon?.sprites?.other?.['official-artwork']?.front_default} />
                    <div className='mx-5'>
                        <p className='text-[13px] text-zinc-500'>#{pokemon?.id.toString().padStart(4, "0")}</p>
                        <h2 className='mt-3 text-xl capitalize'>{name}</h2>
                        {pokemon?.types.length > 0 && (
                            <div className='flex'>
                                {pokemon.types.map((poke, index) => {
                                    return (
                                        <div key={index} 
                                            className='capitalize me-2 mt-2 text-[12px] px-5 rounded-sm' 
                                            style={{ background: isMatchedBgColor(poke?.type?.name), color: getTextColor(poke?.type?.name) }} >
                                            {poke?.type?.name}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default Pokemon;