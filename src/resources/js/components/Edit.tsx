import React, { useState, useEffect } from 'react';
import axios from 'axios';




function PostEdit(props) {


    const params = props.match.params;

    const [editData, setEditData] = useState({id:'', body:''});


    useEffect(() => {
        //getEditData();
      }, [])

    function getEditData(){
        axios
            .post('/api/edit', {
                id: params.id
            })
            .then(res => {
                setEditData(res.data);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    function updatePost(){
        if(editData == ''){
            return;
        }
        //入力値を投げる
        axios
            .post('/api/update', {
                id: params.id,
                body: editData.body

            })
            .then((res) => {
                setEditData(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function inputChange(e){
        const key = e.target.name;
        const value = e.target.value;
        editData[key] = value;
        let data = Object.assign({}, editData);
        setEditData(data);
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <h1>タスク編集</h1>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostEdit;
