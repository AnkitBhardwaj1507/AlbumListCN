import React from "react";
import Pagination from "./Pagination";
import swal from 'sweetalert';
import { Link } from "react-router-dom";


class Lists extends React.Component {

    //api call for delete the list item
    deleteList = async (id) =>{
        await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
        method: 'DELETE',
    })
    .then((response) => response.json())
    .then((json) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to Delete this file?",
            icon: "warning",
            dangerMode: true,
          })
          .then(willDelete => {
            if (willDelete) {
              swal("Deleted!", "Your file has been deleted!", "success");
            }
          });
    });

    }

    
    render () {
        //fetch data and show in a tale
        let tb_data = this.props.currentPost.map((list) => {
            return (
                <tr key={list.id}>
                    <td>{list.userId}</td>
                    <td>{list.id}</td>
                    <td>{list.title}</td>
                    <td>
                        <Link class="btn btn-outline-primary" 
                            to={`/edit/${list.id}`}
                        >
                            Edit
                        </Link>
                        
                        <button className='btn btn-danger mx-2' onClick={()=> this.deleteList(list.id)}>Remove</button>
                    </td>
                </tr>
            )
        })

    
        return (
            //render data into table and reder pagination component
            <div>
                <h1 className="text-primary mt-3 text-center">Album List</h1>
                <div className='container mt-4'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>USERID</th>
                                <th>ID</th>
                                <th>TITLE</th>
                                <th>REMOVE</th>
                            </tr>
                        </thead>
    
                        <tbody>
                            {tb_data}
                        </tbody>
                    </table>
                </div>

                <Pagination postsPerPage={this.props.postsPerPage} totalPosts = {this.props.totalPosts} paginate={this.props.paginate}/>
            </div>
        )
    }
    
}

export default Lists;