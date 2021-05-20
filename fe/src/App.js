import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import CreateBlogPost from './components/Blog/CreateBlogPost';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import NoMatch from './components/NoMatch';
import './App.css';
import BlogPost from './components/Blog/BlogPost';
import Dashboard from './components/Dashboard';
import UserContext from "./context/UserContext";
import EditPost from './components/Dashboard/Posts/EditPosts';


function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/create_blog" component={CreateBlogPost} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/post/:postId" component={BlogPost} />
          <Route path="/edit/:postId" component={EditPost} />
          <Route path="/*" component={NoMatch} />
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
