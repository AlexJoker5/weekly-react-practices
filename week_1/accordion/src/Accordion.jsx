import React, { useState } from 'react'

function Accordion({ items }) {

    const [openIndex, setOpenIndex] = useState([])

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    }

    return (
        <div className="margin-top-large">
            {
                items.map((item, index) => {
                    const isOpen = openIndex == index

                    return (
                        <div key={index} className='card' style={{ marginBottom: '15px' }}>
                            <div
                            className='card-header'
                            onClick={() => toggleItem(index)}
                            style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                                <h3 style={{ margin: 0, fontSize: '1.2rem'}}>{item.title}</h3>
                                <span>{isOpen ? '🔼' : '🔽'}</span>
                            </div>
                            {
                                isOpen && (
                                    <div className='card-body'>
                                        <p className='card-text'>{item.content}</p>
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )

}

export default Accordion