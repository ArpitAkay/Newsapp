import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(1);
    const [topic, setTopic] = useState(props.topic);
    const [runFetchMoreData, setRunFetchMoreData] = useState(false);

    const details = {
        apiKey: process.env.REACT_APP_NEWS_API,
        pageSize: 20,
        from: function () {
            let today = new Date();
            let date = today.setDate(today.getDate() - 2);
            let dayBeforeYesterDay = new Date(date).toISOString();
            return dayBeforeYesterDay.split("T")[0];
        },
        to: function () {
            let today = new Date();
            let date = today.setDate(today.getDate() - 1);
            let yesterday = new Date(date).toISOString();
            return yesterday.split("T")[0];
        }
    };

    const updateNews = async () => {
        props.setProgress(20);
        const url = `https://newsapi.org/v2/everything?q=${topic}&from=${details.from()}&to=${details.to()}&page=${page}&pageSize=${details.pageSize}&apiKey=${details.apiKey}`;
        props.setProgress(40);
        let data = await fetch(url);
        props.setProgress(60);
        let parsedData = await data.json();
        props.setProgress(100);
        setTotalResults(parsedData.totalResults);
        setArticles(parsedData.articles);
        setRunFetchMoreData(true);
    }

    useEffect(() => {
        console.log("useEffect called");
        document.title = `NewsMonkey - ${topic.charAt(0).toUpperCase() + topic.slice(1)}`
        updateNews();
    }, []);

    const fetchMoreData = async () => {
        if(runFetchMoreData) {
            const url = `https://newsapi.org/v2/everything?q=${topic}&from=${details.from()}&to=${details.to()}&page=${page + 1}&pageSize=${details.pageSize}&apiKey=${details.apiKey}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            setTotalResults(parsedData.totalResults);
            setArticles(articles.concat(parsedData.articles));
            setPage(page + 1);
        }
    };

    return (
        <div className="container my-4">
            <h3 className="text-center" style={{ marginTop: "70px" }}>NewsMonkey - Top {topic.charAt(0).toUpperCase() + topic.slice(1)} Headlines</h3>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < 100}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return (<div className="col-md-3" key={element.url}>
                                <NewsItem source={element.source} author={element.author} title={element.title} description={element.description} url={element.url} urlToImage={element.urlToImage} publishedAt={element.publishedAt} />
                            </div>);
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default News;

News.propTypes = {
    topic: PropTypes.string
}

News.defaultProps = {
    topic: "cricket"
}