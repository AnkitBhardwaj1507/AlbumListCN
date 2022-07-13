import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import swal from 'sweetalert';

//functional component to edit the list item
const EditList = () => {
    //use params to fetch the existing item
    const { id } = useParams();
    
    const [ list, setList ] = useState({
        title: "",
        userId: ""
        
    });

    const { userId, title } = list;
    //function to target the change in input tag
    const onInputChange = (e) => {
        setList({...list, [e.target.name] : e.target.value})
    }

    //effect hook to fetch previous data into the edit component
    useEffect(() => {
        
        const loadList = async () =>{
            const result = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`);
            const jsonResult = await result.json(result);
            setList(jsonResult);
        }
        loadList();
    },[]);

    //Api call to update the data
    const onUpdateList = (e) => {
        e.preventDefault();
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: list.title,
                userId: list.userId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
        .then((response) => response.json())
        .then((json) => {
            swal({
                title: "Updated!",
                text: "Successfully Updated ",
                icon: "success",
                button: "OK!"
            })
        });
        
    }

    return(
        //Form to update the data
        <div className='container w-50 mt-5'>
            <div className='w-75 mx-auto shadow p-5'>
                <h2 className='text-cnter mb-4'>Edit A List</h2>
                <form onSubmit={e => onUpdateList(e)}>
                    
                    <div className='form-group d-flex flex-column justify-content-start align-items-start'>
                        <label className="mb-2 ml-2 px-2">UserID:</label>
                        <input 
                            type="number"
                            className='form-control form-control-lg'
                            placeholder='Enter new User Id'
                            name="userId"
                            value={userId}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className='form-group d-flex flex-column justify-content-start align-items-start'>
                        <label className="mt-2 mb-2 px-2">Title:</label>
                        <input 
                            type="text"
                            className='form-control form-control-lg'
                            placeholder='Enter Title'
                            name="title"
                            value={title}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <button className='btn btn-warning btn-block mt-5 w-50'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default EditList;