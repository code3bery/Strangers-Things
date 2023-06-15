import React from 'react';
import { useState } from 'react';
import { BASE_URL } from '../api';
const Message = ({token,id,}) => {
const [title,setTitle] = useState('');
const [content,setContent] = useState('');




const handleSubmit = async (event) => {
    try{
    event.preventDefault();
    const response = await fetch(`${BASE_URL}/posts/${id}/messages`,({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method:'POST',
        body: JSON.stringify({
         message:{
            title,
            content,
         }
         
        })
    }));
    const result = await response.json();    
    alert("Message Submited Successfully!")
    setContent('');
    setTitle('');
    return result;

    }catch (error){
        console.log(error);
    }
}

return (
    <>

    <form>
        <span>
    <input 
            className="messagebox"
            type="text"
            placeholder="Title Here"
            value={title}
            onChange = {(event) => setTitle(event.target.value)}
    ></input>    

    <input  
            className="messagebox"
            type="text"
            placeholder="Message Here"
            value={content}
            onChange={(event) => setContent(event.target.value)}
     ></input>   
     
    <button className="messagebutton" type="submit"onClick={handleSubmit}>Message</button> 
    </span> 
        
    </form> 
    </>



)


}

export default Message;