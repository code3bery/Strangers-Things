import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Create = ({ fetchPosts, token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();


    
    await fetchPosts();
    
    history.push('/posts');
  };

  return (
    <>
      <h3>Create a post below!</h3>
      <div className="postin">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input 
            type="text"
            className="loginuser"
            placeholder="Title Here"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <label htmlFor="description">Description</label>
          <input 
            type="text"
            className="loginuser"
            placeholder="Description here"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <label htmlFor="price">Price</label>
          <input 
            type="text"
            className="loginuser"
            placeholder="Price Here"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Create;
