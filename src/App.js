import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import components
import Lists from "./components/Lists";
import CreateList from './components/CreateList';
import EditList from './components/EditList';
import Navbar from "./components/Navbar"
import './App.css';

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state={
            lists: [],
            currentPage: 1,
            postsPerPage: 10
        };
    }
    
    //fetch data from api and store in variable
    async componentDidMount() {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        const list = await response.json()
        this.setState({lists: list})
        
    }

    //function to fetch the post which display in single page
    currentPost() {
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.lists.slice(indexOfFirstPost, indexOfLastPost);
        return currentPosts;
    }

    //function to set the current page for pagination
    paginate = (pageNumber) => {
        this.setState({currentPage: pageNumber});
    }

    //render the component using routes and pass the data in props
    render() {
        const currentPost = this.currentPost();
        return(
            <Router>
                <div className='App'>
                    <Navbar currentPost ={currentPost} postsPerPage={this.state.postsPerPage} totalPosts = {this.state.lists.length} paginate={this.paginate}/>

                    <Routes>
                        
                        <Route exact path='/:page' element = {<Lists currentPost ={currentPost} postsPerPage={this.state.postsPerPage} totalPosts = {this.state.lists.length} paginate={this.paginate} />} />
                        
                        <Route exact path="/addList" element={<CreateList/>} />
                        <Route exact path="/edit/:id" element={<EditList />} />
                        <Route exact path="/" element={<Lists currentPost ={currentPost} postsPerPage={this.state.postsPerPage} totalPosts = {this.state.lists.length} paginate={this.paginate} />}/>
                            
                    </Routes>
                </div>
            </Router>
        )
    }
}

export default App;
