import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getMyPost, deleteMyPost } from "../../services/dataService";
import UserContext from "../../context/UserContext";
import Posts from "./Posts/index";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [posts, setPosts] = useState([]);

  const notify = (msg) => toast(msg);

  useEffect(() => {
    if (user) {
      let userid = user.user._id;
      let myPosts = getMyPost(userid);
      myPosts
        .then((response) => {
          setPosts(response.data);
        })
        .catch((err) => {
          const errorObject = JSON.parse(JSON.stringify(err));
          if (errorObject.message === "Request failed with status code 403") {
            localStorage.clear();
            history.push("/login");
          }
        });
    }
  }, [user, history]);

  const deletePost = (postId) => {
    let postDeletion = deleteMyPost(postId);
    postDeletion
      .then((response) => {
        if (response.data.error) {
          notify(response.data.error);
        } else {
          let newPostsArr = posts.filter(
            (post) => post._id !== response.data._id
          );
          setPosts(newPostsArr);
        }
      })
      .catch((err) => {
        const errorObject = JSON.parse(JSON.stringify(err));
        if (errorObject.message === "Request failed with status code 403") {
          localStorage.clear();
          history.push("/login");
        }
      });
  };

  return (
    <div className="dashboard">
      {posts.length
        ? posts.map((post) => (
            <Posts
              key={post._id}
              post={post}
              deletePost={() => deletePost(post._id)}
            />
          ))
        : "You have not created any blog posts yet."}
      <ToastContainer />
    </div>
  );
}
