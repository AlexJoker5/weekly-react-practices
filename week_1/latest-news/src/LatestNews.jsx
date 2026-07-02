import { useState, useEffect } from "react";
import GetNews from "./GetNews";


function LatestNews({ fetchUrl }) {

    const [latestNews, setLatestNews] = useState([])

    useEffect(()=> {

        const fetchLatestNews = async () => {
            try {
                const response = await fetch(fetchUrl);
                const data = await response.json();
                setLatestNews(data.slice(0, 10));
            } catch (error) {
                console.error("Error fetching top stoires: ", error);
            }
        }
        fetchLatestNews();
    }, [fetchUrl]);

    return(
        <div className='grid grid-cols-1 p-10 gap-4 text-left'>
            {latestNews.length > 0 && (
                latestNews.map((news, index) => {
                    return (
                        <div key={index}>
                            <GetNews newsId={news} />
                        </div>
                    )
                })
            )}
        </div>
    )

}

export default LatestNews;