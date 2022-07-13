import React from "react";
import { Link } from "react-router-dom";

//function to get the pagination button
const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];

    for(let i=1; i<=Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        //render the pagination with link button
        <nav>
            <ul className="pagination d-flex align-items-center justify-content-lg-center">
                {pageNumbers.map(number=> (
                    <li key={number} className="page-item">
                    
                        <Link onClick = {()=> paginate(number)} to={`/${number}`} className="page-link">
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )

}

export default Pagination;