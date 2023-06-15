import React from 'react';
import { useState, } from 'react';
import { BASE_URL } from '../api';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Update = (props) => {
    const { postId,posts,setPosts,token,fetchPosts,} = props;
    const history = useHistory();
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);
    const [price, setPrice] = useState([]);


    const updatePost = async (event) => {
        event.preventDefault();
        const response = await fetch(`${BASE_URL}/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'Application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title, description, price,
            })
        });

        const data = await response.json();

        if (data && data.title) {
            const newPosts = posts.map(post => {
                if (post.id === postId) {
                    return data;
                } else {
                    return post;
                }
            });

            setPosts(newPosts);
            setTitle('');
            setDescription('');
            setPrice('');
            history.push('/posts');
            await fetchPosts();
        }
    }
    return (
        <>

            <h1>Share Your Thoughts!</h1>
            <div className="postin">
                <form onSubmit={updatePost}>
                    <label htmlFor="Title">Title</label>
                    <input
                        type="text"
                        name="Title"
                        className="loginuser"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    ></input>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        name="Description"
                        className="loginuser"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    ></input>
                    <label htmlFor="Price">Price</label>
                    <input
                        type="text"
                        name="Price"
                        className="loginuser"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                    ></input>
                    <button type="submit">Send</button>
                </form>

            </div>
        </>
    )
}


export default Update;