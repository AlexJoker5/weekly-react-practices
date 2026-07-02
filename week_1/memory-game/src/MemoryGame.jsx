import { useEffect, useState } from "react";
import shuffle from 'lodash.shuffle'

function MemoryGame({ images }) {

    const [cards, setCards] = useState([]);
    const [selectedIndices, setSelectedIndices] = useState([]);
    const [matchImages, setMatchImages] = useState([]);
    const [isLocking, setIsLocking] = useState(false);

    useEffect(() => {
        const duplicatedImages = [...images, ...images];
        const shuffledCards = shuffle(duplicatedImages).map((img, index) => ({
            id: index,
            url: img,
        }));

        setCards(shuffledCards);
    }, [images]);

    const handleCardClick = (currentIndex) => {
        if(isLocking || matchImages.includes(cards[currentIndex].url) || selectedIndices.includes(currentIndex)) return;
        
        const newSelection = [...selectedIndices, currentIndex];
        setSelectedIndices(newSelection);

        if(newSelection.length == 2) {
            console.log("new selection: ")
            const [firstIndex, secondIndex] = newSelection;

            if(cards[firstIndex].url === cards[secondIndex].url) {
                setMatchImages((prev) => [...prev, cards[firstIndex].url]);
                setSelectedIndices([]);
            } else {
                setIsLocking(true);
                setTimeout(() => {
                    setSelectedIndices([]);
                    setIsLocking(false);
                }, 1000)
            }
        }
    }

    return (
        <div className='p-20 text-center'>
            <h2>Memory Game</h2>
            <div className='grid grid-cols-4 gap-15 max-w-xl m-0 m-auto '>
                {cards.map((card, index) => {
                    const isFlipped = selectedIndices.includes(index) || matchImages.includes(card.url);

                    return (
                        <div key={index} onClick={() => {handleCardClick(index)}} 
                        className='card' style={{ backgroundColor: isFlipped ? '#fff' : '#2c3e50' }}>
                            {isFlipped ? (
                                <img src={card.url} alt="memory-card" className='w-full h-full object-cover rounded-lg' />
                            ): (
                                <div className='text-white text-3xl font-bold'>?</div>
                            )}
                        </div>
                    )
                })}
            </div>

            {matchImages.length == images.length && (
                <h3 className='text-green-500 mt-20'>🎉 You won 🎉</h3>
            )}
        </div>
    )
}

export default MemoryGame;