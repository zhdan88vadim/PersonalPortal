﻿import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import Post from './post.jsx';
import TagsCloud from './tagsCloud.jsx';

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: { currentPage: 0, totalPages: 0, pageSize: 0, records: [] }, tags: [] };
        this.getPosts = this.getPosts.bind(this);
        this.getTags = this.getTags.bind(this);
    }

    componentDidMount() {
        this.getPosts();
        this.getTags();
    }
    
    getPosts() {
        const parsed = queryString.parse(location.search);
        var params = Object.keys(parsed)
            .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(parsed[key]))
            .join("&");

        fetch(constants.posts + params)
            .then((response) => {
                return response.json()
            }).then((json) => {
                this.setState({ data: json });
            }).catch((ex) => {
                console.log('parsing failed', ex)
            });
    }

    getTags() {
        fetch(constants.tags)
            .then((response) => {
                return response.json()
            }).then((json) => {
                this.setState({ tags: json });
            }).catch((ex) => {
                console.log('parsing failed', ex)
            });
    }

    render() {
        let posts = this.state.data.records.map(item => {
            return (
                <Post key={item.postId} data={item} />
            );
        });

        return (
            <div id="blog">
                <div id="lenta">
                    {posts}
                </div>
                <div id="cloud">
                    <TagsCloud data={this.state.tags} refresh={this.getPosts} />
                </div>
            </div>
        );
    }
};

module.exports = Blog
