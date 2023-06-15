import { BASE_URL } from "../api";
import { useState, useEffect } from "react";

const Profile = ({ token, setPosts }) => {
  const [user, setUser] = useState('');
  const [error, setError] = useState(null);

  const myData = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();

      if (response.ok) {
        return result;
      } else {
        throw new Error(result.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await myData(token);

        setUser(response.data);
        setPosts(response.posts);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [setPosts, token]);

  return (
    <>
      {error && <p>{error}</p>}

      {user.username && (
        <div>
          <h2> Welcome {user.username}!</h2>
          <h1>Inbox</h1>
          <h1>Your Messages</h1>
          {user.messages && user.messages.map((message) => (
            <div className="messagebox" key={message._id}>
              <h4>Subject: {message.post.title}</h4>
              <h4>Message: {message.content}</h4>
              <h4>From: {message.fromUser.username}</h4>
              {user._id === message.fromUser._id && (
                <h4>Sent to: {message.post.author.username}</h4>
              )}
              {user._id !== message.fromUser._id && (
                <h5>Sent by: {message.fromUser.username}</h5>
              )}
              <br />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default Profile;