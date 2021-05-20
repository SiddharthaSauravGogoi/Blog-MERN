import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { Card } from "antd";
import randomColor from "randomcolor";
import Author from "./AuthorCard";
import CategoriesFlair from "./CategoriesFlair";
import { DiscussionEmbed } from "disqus-react";
import { getPostDetails } from "../../../services/dataService";

export default function BlogPost({ props }) {
  const { postId } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [post, setPost] = useState([]);

  const disqusAlias = process.env.REACT_APP_ALIAS;

  const getRandomColor = () => {
    let color = randomColor({
      luminosity: "light",
      hue: "green",
    });
    return color;
  };

  useEffect(() => {
    let postDetails = getPostDetails(postId);
    postDetails
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => {
        const errorObject = JSON.parse(JSON.stringify(err));
        if (errorObject.message === "Request failed with status code 403") {
          localStorage.clear();
          history.push("/login");
        }
      });
  }, [postId, history]);

  return post ? (
    <div className="blog-post">
      <Card className="blog-post__detailed-post">
        <h1 className="blog-post__detailed-post__title">{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <span className="divider"></span>
        <p>Categories</p>
        {post.categories
          ? post.categories.map((category, index) => (
              <CategoriesFlair
                category={category}
                key={index}
                color={getRandomColor()}
              />
            ))
          : null}
        <Author author={post.author} />
        <DiscussionEmbed
          shortname={disqusAlias}
          config={{
            url: `http://localhost:3000${location.pathname}`,
            identifier: postId,
            title: post.title,
          }}
        />
      </Card>
    </div>
  ) : null;
}
