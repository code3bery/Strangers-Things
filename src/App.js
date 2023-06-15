import React, { useState, useEffect, useCallback } from 'react';
import { Route, Link, NavLink, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { BASE_URL } from './api';
import { Login, Profile, Post, Update, Delete, Message } from './components';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') ?? null);
  const [, setGuest] = useState(null);
  const history = useHistory();

  const fetchPosts = useCallback(async () => {
    const response = await fetch(`${BASE_URL}/posts`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
  
    const result = await response.json();
    setPosts(result.data.posts);
    return result;
  }, [token]);

  useEffect(() => {
    token !== ""
      ? localStorage.setItem('token', token)
      : localStorage.removeItem("token");

    fetchPosts();
  }, [token, fetchPosts]);

  const onLogout = async () => {
    setToken("");
    setGuest(null);
    history.push('/posts');
  }

  return (
    <>

  <nav>
    <NavLink activeClassName="active" className="nav" to="/posts">Home</NavLink>
    <NavLink activeClassName="active" className="nav" to="/profile/login">Login</NavLink>
    <NavLink exact activeClassName="active" className="nav" to="/profile/">Profile</NavLink>

   

  </nav>

    
  <Route exact path = "/">
    <Redirect path to="/posts"/>
  </Route>
  
  <Route exact path ="/posts">  
  <Post fetchPosts={fetchPosts} token={token} Delete={Delete} />
  </Route>
  <Route exact path ="/profile">    
      {   token
            ? ( <>
              <button className="logout" onClick={onLogout}>Log Out</button>
            </>
          ) : <Link className="linklog" to="/profile/login">Welcome Back!</Link>

    }
    <Profile token={token} fetchPosts={fetchPosts} Delete={Delete} posts={posts} setPosts={setPosts} />    
  </Route>
  <Route exact path ="/posts/createpost">
  </Route>
  <Route exact path="/edit">
    <Update fetchPosts={fetchPosts} token={token} posts={posts} setPosts={setPosts}/>
  </Route>

  <Route path ="/message">
    <Message />
  </Route>

  <Route exact path = "/profile/:actionType">
    <Login setToken={setToken} setGuest={setGuest} />
  </Route>

</>
 )

}

export default App;