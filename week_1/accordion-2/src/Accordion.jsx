import { useState } from "react"
import SubTask from "./SubTask"

function Accordion({ items }) {

    const [ isOpenIndex, setIsOpenIndex ] = useState(null)

    const toggleBtn = (index) => setIsOpenIndex(isOpenIndex === index ? null: index)

    return (
        <div className='text-white'>
            {
                items.map((item, index) => {
                    const isOpen = isOpenIndex === index
                    return (
                        <div key={index} className='text-left'>
                            <div className='flex justify-between mt-5'>
                                <h3>{item.title}</h3>
                                <button onClick={()=>toggleBtn(index)}>🔽</button>
                            </div>
                            <SubTask description={item.description} isOpen={isOpen} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Accordion