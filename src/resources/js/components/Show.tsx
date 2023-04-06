
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Form, Route, Routes} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../../css/app.css';
import { Button } from 'bootstrap';
type Task = {
    id : number
    body : string
    user_id : number
    created_at : Date
    updated_at : Date
}
const Show = () => {

    const url = "http://localhost/api/show";
    const [posts, setPost] = useState<Task[]>([]);
    const [state, setState] = useState(null);
    const [pages, setPages] = useState();

    const isEnabled = (isState) =>
    {
        const value = isState;
        setState(value);
        if(!value)
        {
            const value2 = "false";
        sessionStorage.setItem('key',value);
        }
        else{
            const value2 = "true";
            sessionStorage.setItem('key',value);
        }

    }

    const getDataTest = (value)=>{
        axios.get('api/show?page=' + value).then(response => {
            console.log(response.data.data);
            setPost(response.data.data);
        });
    }

    useEffect ( () => {
        getData();

    },[pages]

    )

    const getData = async() => {
        await axios
        .get(url)

        .then((response) => {

            setPost(response.data.data);

            console.log(response.data.data);
            console.log(response.data);
            setPages(response.data.last_page);
            console.log(pages);

        })
        .catch((error) =>{
            console.log(error);
        });
    };

    const deletePost = async (post) => {
        await axios
            .post('/api/delete', {
            id: post.id
        })
        .then((res) => {
            setState({
                posts: res.posts
            });
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });
    }


    if(sessionStorage.getItem('key')==="true")
    {

    return (
         <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header"><h1>掲示板風メモアプリ</h1></div>

                        <div className="card-body">メモをとろうぜ！！</div>
                    </div>
                </div>
            </div>
        </div>
        <div>
        {
            (function () {
                const list = [];
                for (let i = 1; i <= pages; i++) {
                  list.push(<span onClick={() => getDataTest(i)}><strong>   {i}   </strong></span>);
                }
                return <div> {list} </div>;
              }())
            }
        </div>


            <table className="table_css" border="1" width="80%">
                <thead>
                <th >id </th>
                <th >User id</th>
                <th >Text</th>
                <th >create_at</th>
                <th > delete</th>
                </thead>
                <tbody>
                { posts.map(task => (

                <tr>
                <td>{task.id}</td>
                <td>{task.user_id}</td>
                <td>{task.body}</td>
                <td>{task.created_at}</td>
                <td><button onClick={()=>deletePost(task)}>delete</button></td>
                </tr>



    ))}


          </tbody>
          </table>




          </>
                    );
    }
    else{
    return (
       <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>









       </>

    );}
}

export default Show;
