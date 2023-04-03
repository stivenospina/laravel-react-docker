import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Form, Route, Routes} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Show from './Show';
import Index from './Index';
import Store from './Store';
import axios from 'axios';
import '../../css/app.css';
import { useEffect, useState } from 'react';
type Task = {
    id : number
    body : string
    user_id : number
    created_at : Date
    updated_at : Date
}
const Example  = () => {

    const url = "http://localhost/api/test";
    const [posts, setPost] = useState<Task[]>([]);
    const [state, setState] = useState(null);

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
    const getData = async () => {
        await axios
        .get(url)

        .then((response) => {

            setPost(response.data.data);

            console.log(response.data.data);
        })
        .catch((error) =>{
            console.log(error);
        });
    };

    useEffect (() => {


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
       <a href="/login">ログイン</a>
       </div>
       <div>
       <a href="/index">全文表示</a>

        </div>
        <div>
            <a href="/show"> ユーザーによる表示</a>
        </div>
        <div>
            <a href="/store"> 投稿</a>
        </div>


                { posts.map(task => (
               <table className="table_css" border="1" width="80%">
                <thead>
                    <th > id </th>
                    <th > User id</th>
                    <th > Text</th>
                    <th > created_at</th>
                </thead>

                <tdoby>
                <tr>
                <td>{task.id}</td>
                <td>{task.user_id}</td>
                <td>{task.body}</td>
                <td>{task.created_at}</td>
                </tr>
                </tdoby>
                </table>
                ))}









        <Routes>

        <Route path="/login" element={<Login isEnabled={isEnabled}/> } />
        <Route path="/show" element={<Show />} />
        <Route path="/index" element={<Index />} />
        <Route path="/store" element={<Store />} />
         </Routes>



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
        <div>
       <a href="/login">ログイン</a>
       </div>


       <div>
        <a href="/register">ユーザー登録</a>
       </div>





        <Routes>

        <Route path="/login" element={<Login isEnabled={isEnabled}/>} />
        <Route path="/register" element={<Register />} />
        </Routes>



        </>

    );}
}

export default Example;

if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));

    Index.render(

            <BrowserRouter>
            <Example />
            </BrowserRouter>


    )
}
