import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllPosts } from "../../services/dataService";
import MainContent from "./MainContent/index";
import SidebarComponent from "./SidebarContent";

export default function Home() {
  const [posts, setPosts] = useState("");
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    let allPosts = getAllPosts();
    allPosts
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
  }, [history]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <MainContent
        posts={currentPosts}
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
      <SidebarComponent />
    </>
  );
}
