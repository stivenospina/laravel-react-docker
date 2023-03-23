import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import TEST from './Test';
import axios from 'axios';
import { useEffect, useState } from 'react';
type Task = {
    id : number
    body : string
    user_id : number
    created_at : Date
    updated_at : Date
}
const Example : React.VFC = () => {

    const url = "http://localhost/api/test";
    const [posts, setPost] = useState<Task[]>([]);

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
        getData();
    },[]);

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
        <div>
       <a href="/test">TEST</a>
       </div>
       <div>
       <a href="/">INDEX</a>
        </div>

            <table border="1" width="80%">
                <thead>
                <th scope='row'>User id</th>
                <th scope='row'>Text</th>
                <th scope='row'>create_at</th>
                </thead>
                <tbody>
         { posts.map(task => (

                <tr>
                <td>{task.user_id}</td>
                <td>{task.body}</td>
                <td>{task.created_at}</td>
                </tr>


         ))}
          </tbody>
          </table>




        <BrowserRouter>
        <Routes>
            <Route path={'/test'} element={<TEST/> } />
        </Routes>
        </BrowserRouter>


        </>

    );
}

export default Example;

if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));

    Index.render(
           <React.StrictMode>
            <Example />
           </React.StrictMode>

    )
}
