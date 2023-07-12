import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {

    static defaultProps = {
        topic: "cricket"
    }

    static propTypes = {
        topic: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            apiKey: process.env.REACT_APP_NEWS_API,
            articles: [],
            totalResults: 0,
            // loading: false,
            page: 1,
            pageSize: 20,
            topic: props.topic,
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
        }
        document.title = `NewsMonkey - ${props.topic.charAt(0).toUpperCase() + props.topic.slice(1)}`
    }

    updateNews = async () => {
        this.props.setProgress(20);
        const url = `https://newsapi.org/v2/everything?q=${this.state.topic}&from=${this.state.from()}&to=${this.state.to()}&page=${this.state.page}&pageSize=${this.state.pageSize}&apiKey=${this.state.apiKey}`;
        this.props.setProgress(40);
        // this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(60);
        let parsedData = await data.json();
        this.props.setProgress(100);
        this.setState({
            totalResults: parsedData.totalResults,
            articles: parsedData.articles,
            // loading: false
        })
    }

    componentDidMount() {
        this.updateNews();
    }

    /* handlePreviousClick = async () => {
        this.setState({
            page: this.state.page - 1
        })
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({
            page: this.state.page + 1
        })
        this.updateNews();
    } */

    fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/everything?q=${this.state.topic}&from=${this.state.from()}&to=${this.state.to()}&page=${this.state.page + 1}&pageSize=${this.state.pageSize}&apiKey=${this.state.apiKey}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            totalResults: parsedData.totalResults,
            articles: this.state.articles.concat(parsedData.articles),
            page: this.state.page + 1
        })
    };

    render() {
        return (
            <div className="container my-4">
                <h3 className="text-center">NewsMonkey - Top {this.state.topic.charAt(0).toUpperCase() + this.state.topic.slice(1)} Headlines</h3>
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== 100}
                    loader={<Spinner />}
                >
                    <div className="row">
                        {/*!this.state.loading &&*/ this.state.articles.map((element) => {
                            return (<div className="col-md-3" key={element.url}>
                                <NewsItem source={element.source} author={element.author} title={element.title} description={element.description} url={element.url} urlToImage={element.urlToImage} publishedAt={element.publishedAt}/>
                            </div>);
                        })}
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex flex-row justify-content-between">
                    <button type="button" className="btn btn-dark" disabled={this.state.page === 1} onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button type="button" className="btn btn-dark" disabled={this.state.page + 1 > Math.ceil(5)} onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </div>
        )
    }
}

export default News;