import React from "react";
import swal from 'sweetalert';

//Class Component to create a new list item
class CreateList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            title: ''
        }
    }

    //Api call to create new item of the list and show message
    onHandleSubmit = (e) => {
        e.preventDefault();
        console.log("title " + this.state.title);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: this.state.title,
                userId: this.state.userId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => {
            swal({
                title: "Success!",
                text: "Data Added Successfully",
                icon: "success",
                button: "OK!"
            })
        });
    }

    render() {

        const {userId, title} = this.state;

        return (

        //Form to get the value of the item list
        <div className="container w-50 mt-5">
            <div className="w-75 mx-auto shadow p-5">
                
                <h2 className="text-center mb-4">Add List</h2>
                    <form onSubmit={this.onHandleSubmit} className="">
                        
                        <div className='form-group d-flex flex-column justify-content-start align-items-start'>
                            <label className="mb-2 ml-2 px-2">UserID:</label>
                            <input 
                                type='number'
                                value={userId}
                                name="userId"
                                className='form-control form-control-lg'
                                placeholder="Enter UserId"
                                onChange={(e) => {this.setState({userId: e.target.value})}}
                            /> 
                        </div>
                            
                        <div className="form-group d-flex flex-column justify-content-start align-items-start">
                            <label className="mt-2 mb-2 px-2">Title:</label>
                            <input 
                                type='text'
                                value={title}
                                name="title"
                                className='form-control form-control-lg '
                                placeholder="Enter List Title"
                                onChange = {(e) => {this.setState({title: e.target.value})}}
                            />
                        </div>
                        <button 
                        type="submit"
                        className='btn btn-primary btn-block mt-5 w-50 mr-10'
                        >
                            Create List
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateList;