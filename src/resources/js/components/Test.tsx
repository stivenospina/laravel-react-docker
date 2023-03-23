import {useState,useEffect} from 'react';
import React from 'react';
import axios from 'axios';
function Test() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
         axios.get('http://localhost/api/test')
         .then(res => {
             setPosts(res.data.data);
             console.log(posts);

         })
    },[])


    return (
        <div>
            TEST {posts.map(task => (
                <div>
                {task.id}
                {task.body}
                </div>
            ))}
        </div>
    )
  }

  export default Test;
