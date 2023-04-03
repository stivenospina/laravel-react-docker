import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Form, Route, Routes} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Show from './Show';
import axios from 'axios';
import '../../css/app.css';
import { useEffect, useState } from 'react';
import ReactPaginate from'react-paginate';
type Task = {
    id : number
    body : string
    user_id : number
    created_at : Date
    updated_at : Date
}
type Page = {
    page : number
}

const Index  = () => {

    const url = "http://localhost/api/test";
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
        window.location.reload();
    }
    var Value;
    const getPage = async (val) => {
          await axios
          .get(url, { params: {page : val} })
          .then((res) => {
             setPost(res.data.data);

          })
          .catch((error)=> {
            console.log(error);
          })
    }
    const getDataTest = (value)=>{
        axios.get('api/test?page=' + value).then(response => {
            setPost(response.data.data);
        });
    }

    const getData = async() => {
        await axios
        .get(url)

        .then((response) => {

            setPost(response.data.data);

            console.log(response.data.data);

            console.log(response.data.last_page);
            setPages(response.data.last_page);

        })
        .catch((error) =>{
            console.log(error);
        });
    };

    useEffect (() => {
        getData();

    },[]);

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
        </div>
        <div>
            {
            (function () {
                const list = [];
                for (let i = 1; i <= pages; i++) {
                  list.push(<span onClick={() => getDataTest(i)}><strong>   {i}   </strong></span>);
                }
                return <div>{list} </div>;
              }())
            }
        </div>
        <table className="table_css" border="1" width="80%">
                <thead>
                <th >id </th>
                <th >User id</th>
                <th >Text</th>
                <th >create_at</th>
                </thead>
                <tbody>

                { posts.map(task => (

                <tr>
                <td>{task.id}</td>
                <td>{task.user_id}</td>
                <td>{task.body}</td>
                <td>{task.created_at}</td>
                </tr>

                ))}
        </tbody>
        </table>






           </>
    );}
    else{
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








        </>

    );}
}

export default Index;

