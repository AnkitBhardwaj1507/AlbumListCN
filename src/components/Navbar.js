import React from "react";
import { Link } from "react-router-dom";

//Navbar component
const Navbar = (props) => {

    let page=1;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container w-75">
                
                <Link className="navbar-brand px-5" onClick = {()=> props.paginate(page)} to={`/${page}`}>
                    Album List
                </Link>
            </div>

            <div className="w-25">
                <Link className="btn btn-outline-light" to="/addList">Create List</Link>
            </div>
        </nav>
    )
}

export default Navbar;