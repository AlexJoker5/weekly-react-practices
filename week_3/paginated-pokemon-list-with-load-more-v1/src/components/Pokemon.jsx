import { useEffect, useState } from "react";

function Pokemon({ name, url }) {
    console.log("Pokemon: ", name);
    return (
        <li className='list-disc'>{name}</li>
    )
}

export default Pokemon;