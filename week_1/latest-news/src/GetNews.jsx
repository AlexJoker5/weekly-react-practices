import { useState, useEffect } from 'react';

function GetNews({ newsId }) {

    const [singleNews, setSingleNews] = useState({});
    const baseUrl = "https://hacker-news.firebaseio.com/v0/item/";

    useEffect(() => {
        const fetchSingleNews = async () => {
            try {
                const fetchUrl = baseUrl + newsId + ".json?print=pretty";
                const response = await fetch(fetchUrl);
                const data = await response.json();
                // console.log("Data: ", data)
                setSingleNews(data);
            } catch (error) {
                console.error("Error fetching single news: ", error); 
            }
        }

        fetchSingleNews();
    }, [newsId]);

    

    if(!singleNews) return <h3>Loading...</h3>

    return (
        <div>
            {/* {console.log("NewList: ", singleNews)} */}
            {singleNews && (
                <li>
                    <a className='underline decoration-sky-500 text-sky-500 decoration-solid' href={singleNews.url}>{singleNews.title}</a>
                    <br></br>
                    <span>{singleNews.score} by {singleNews.by}</span>
                </li>
            )}
        </div>
    )

}

export default GetNews;