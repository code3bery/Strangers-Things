import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useLocation, Link } from "react-router-dom";

import Message from './Message';


const Search = ({ posts, token, fetchPosts }) => {

    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [, setPostId] = useState('');


    const history = useHistory();
    const { search } = useLocation();

    const query = new URLSearchParams(search);
    const searchValue = query.get('searchValue') || '';


    const filterPosts = (posts, substring) => {
        return posts.filter(post =>
            post.description.toLowerCase().includes(substring.toLowerCase().trim()) ||
            post.location.toLowerCase().includes(substring.toLowerCase().trim())
        );
    }

    const handleSearch = (event) => {
        const substring = event.target.value;
        if (substring.trim() !== "") {
            const filteredPosts = filterPosts(posts, substring)

            const search = new URLSearchParams({ searchValue: substring.trim() });
            history.push('/posts?' + search.toString());
            setFilteredPosts(filteredPosts);
        } else {
            history.push('/posts');
        }
    }

    useEffect(() => {
        const filteredPosts = filterPosts(posts, searchValue);
        setFilteredPosts(filteredPosts);
    }, [posts, searchValue]);


    return (
        <>
            <input
                type="text"
                name="search"
                className="searchBar"
                placeholder="Search Something"
                onChange={handleSearch}
                value={searchValue}
            />
            <div className="contentcontainer">
                {filteredPosts.length ?
                    filteredPosts.map(({ _id, isAuthor, author, title, description, price, idx }) => (
                        <div key={_id ?? idx}>
                            <h1>{title}</h1>
                            <h3>Description:{description}</h3>
                            <h4>Price:{price}</h4>
                            <h3>Created By: {author.username}</h3>
                            {!isAuthor && token && (

                                <Message id={_id} token={token} />
                            )}
                            {
                                isAuthor ?
                                    <> <Link to="/edit">
                                        <button className="edit" type="button" onClick={() => setPostId(_id)}>Edit</button>
                                    </Link>

                                   </> : null

                            }

                        </div>

                    )
                    ) : <div>Cannot Locate request.</div>
                }
            </div>


        </>
    );
}



export default Search;