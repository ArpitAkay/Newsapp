import React, { Component } from 'react'

class NewsItem extends Component {

    render() {
        let { source, author, title, description, url, urlToImage , publishedAt } = this.props;
        let imagePath = process.env.PUBLIC_URL + "/Image_not_available.png";
        return (
            <div className="my-4">
                <div className="card">
                    <img src={urlToImage === null ? imagePath : urlToImage} className="card-img-top" alt="Error loading"/>
                    <div className="card-body">
                        <h5 className="card-title">{title} <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill text-bg-primary">{source.name}</span></h5>
                        <p className="card-text">{description}</p>
                        <a href={url} target="_blank" className="btn btn-sm btn-primary" rel="noreferrer">Read More</a>
                        <p className="card-text"><small className="text-muted">By {author ? author : "unknown"} on date {new Date(publishedAt).toGMTString()}</small></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem;