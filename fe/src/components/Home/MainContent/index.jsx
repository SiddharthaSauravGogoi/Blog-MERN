import React from "react";
import { Link } from "react-router-dom";
import randomColor from "randomcolor";
import CategoriesFlair from "../../Blog/BlogPost/CategoriesFlair";
import Pagination from "../Pagination";

export default function MainContent({
  posts,
  postsPerPage,
  totalPosts,
  paginate,
}) {
  const getRandomColor = () => {
    let color = randomColor({
      luminosity: "light",
      hue: "green",
    });
    return color;
  };
  return (
    <main className="main-content">
      {posts.length
        ? posts.map((post) => (
            <div className="main-content__cards" key={post._id}>
              <div className="main-content__cards__title">
                <Link to={`/post/${post._id}`}>
                  {" "}
                  <h1>{post.title ? post.title : null}</h1>
                </Link>
                <div className="main-content__cards_title-details">
                  <span>{post ? post.author.name : null} </span>
                  <div className="date">
                    {post ? post.created.substring(0, 10) : null}{" "}
                  </div>
                </div>
              </div>
              <div className="main-content__cards__slug">
                {post.slug ? post.slug : null}{" "}
                <Link to={`/post/${post._id}`}> Read more</Link>
              </div>
              {post.categories
                ? post.categories.map((category) => (
                    <CategoriesFlair
                      category={category}
                      color={getRandomColor()}
                    />
                  ))
                : null}
            </div>
          ))
        : "No posts to show"}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        paginate={paginate}
      />
    </main>
  );
}
