import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

import  'react-router-dom';

function Store() {

    //const history = useHistory();

    const notify = () => toast('test');
    const [registerInput, setRegister] = useState({
        email: '',
        body: '',

        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name]: e.target.value });
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {

            body: registerInput.body,

        }
        let value = false;
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/store', data).then(res => {
                if(res.status === 201){

                    console.log(res);
                    alert('投稿完了！！');

                } else {
                    setRegister({...registerInput, error_list: res.data.validation_errors});

                    console.log(res);
                }

            }

            );
        });

    }
    if(sessionStorage.getItem('key')==="true")
    {
    return (<div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-6 mx-auto">
                <div className="card">
                    <div className="card-header">
                        <h4>Store</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={registerSubmit}>

                            <div className="form-group mb-3">
                                <label>Text</label>
                                <input type="text" name="body" onChange={handleInput} value={registerInput.body} className="form-control" />

                            </div>

                            <div className="form-group mb-3">
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );}
    else{
        return (
            <>
            <div> nothing</div>
            </>
        );
    }
}

export default Store;
