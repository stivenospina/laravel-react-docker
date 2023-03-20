import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import TEST from './Test';
import axios from 'axios';
import { useEffect } from 'react';

function Example() {
    const url = "http://localhost/test";
    useEffect(()=>{
        (async ()=>{
          try{
            const res = await axios.get(url);
        console.log(res);
            return;
          }catch (e){
            return e;
          }
        })();
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
