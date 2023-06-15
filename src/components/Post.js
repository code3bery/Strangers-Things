import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Search from './Search';


const Post = ({fetchPosts,token}) => {


const [posts, setPosts] = useState([]);


useEffect(() => {    
    async function getPost(){
        const results = await fetchPosts();    
        setPosts(results.data.posts);
    }
    getPost();
   
},[fetchPosts])

    return  (
        <>
     <h1>Welcome!</h1>
        {token && <Link to="/post/createpost"> Share your Thoughts!</Link>}
        <Search posts={posts} token={token} fetchPosts={fetchPosts} />
   
   </> 
);

}
export default Post;