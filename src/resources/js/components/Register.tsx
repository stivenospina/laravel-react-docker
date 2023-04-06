import React, { useState } from "react";
import axios from 'axios';

import  'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

function Register() {

    //const history = useHistory();
    const notify = () => toast('test');

    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name]: e.target.value });
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        }
        let value = false;
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', data).then(res => {
                if(res.data.status === 200){
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    console.log(res.data.status);
                    alert('登録完了');

                } else {
                    setRegister({...registerInput, error_list: res.data.validation_errors});

                    alert('重複のため登録不可');
                }

            }
            );

        }
        );
    }

    return (<div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-6 mx-auto">
                <div className="card">
                    <div className="card-header">
                        <h4>Register</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={registerSubmit}>
                            <div className="form-group mb-3">
                                <label>User Name</label>
                                <input type="" name="name" onChange={handleInput} value={registerInput.name} className="form-control" />
                                <span>{registerInput.error_list.name}</span>
                            </div>
                            <div className="form-group mb-3">
                                <label>Mail Address</label>
                                <input type="" name="email" onChange={handleInput} value={registerInput.email} className="form-control" />
                                <span>{registerInput.error_list.email}</span>
                            </div>
                            <div className="form-group mb-3">
                                <label>Password</label>
                                <input type="" name="password" onChange={handleInput} value={registerInput.password} className="form-control" />
                                <span>{registerInput.error_list.password}</span>
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
    );
}

export default Register
