import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { Typography, Input } from "antd";
import UserContext from "../../../../context/UserContext";
import Categories from "../Categories";
import { editMyPost, getPostDetails } from "../../../../services/dataService";

const { Title } = Typography;

export default function EditPost() {
  const notify = (msg) => toast(msg);

  const { user } = useContext(UserContext);
  const { postId } = useParams();
  const history = useHistory();

  const [blogTitle, setBlogTitle] = useState("");
  const [value, setValue] = useState("");
  const [slug, setSlug] = useState("");
  const [categories, setCategories] = useState("");
  const [categoryList, updateCategoryList] = useState([]);

  useEffect(() => {
    let postDetails = getPostDetails(postId);
    postDetails
      .then((response) => {
        setValue(response.data.content);
        setSlug(response.data.slug);
        setBlogTitle(response.data.title);
        updateCategoryList(response.data.categories);
      })
      .catch((err) => {
        const errorObject = JSON.parse(JSON.stringify(err));
        if (errorObject.message === "Request failed with status code 403") {
          localStorage.clear();
          history.push("/login");
        }
      });
  }, [postId, history]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const submitPost = (event) => {
    event.preventDefault();

    if (!user) {
      alert("You need to be logged in to edit a post");
      return;
    }

    if (!blogTitle.length || !value.length || !slug.length) {
      return alert("Please fill in all the blog details");
    }

    const postDetails = {
      title: blogTitle,
      content: value,
      slug,
      user: user.user._id,
      categories: categoryList,
      postId,
    };

    let editPost = editMyPost(postDetails);
    editPost
      .then((response) => {
        if (response.data.error) {
          notify(response.data.error);
        } else {
          notify("Post updated");
          setTimeout(() => {
            history.push("/dashboard");
          }, 2000);
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

  const pushToCategoryList = (category) => {
    setCategories("");
    updateCategoryList([...categoryList, category]);
  };

  const removeFromCategoryList = (category) => {
    let newArr = categoryList.filter((item) => item !== category);
    updateCategoryList(newArr);
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      alert("You need to be logged in to create a new blog post.");
      history.push("/login");
    }
  }, [history]);

  return (
    <>
      {" "}
      {value ? (
        <div style={{ maxWidth: "780px", margin: "2rem auto" }}>
          <Title level={2}> New Blog Post </Title>
          <Input
            size="large"
            placeholder="Blog Heading"
            value={blogTitle}
            onChange={(event) => setBlogTitle(event.target.value)}
            style={{ width: "95%", padding: "1em", marginBottom: "1em" }}
            minLength="3"
            required
          />
          <Input
            size="large"
            placeholder="Slug"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            style={{ width: "95%", padding: "1em", marginBottom: "1em" }}
            minLength="20"
            maxLength="100"
            required
          />

          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
          />

          <Categories
            pushToCategoryList={pushToCategoryList}
            removeFromCategoryList={removeFromCategoryList}
            categories={categories}
            setCategories={setCategories}
            categoryList={categoryList}
            updateCategoryList={updateCategoryList}
          />
          <div style={{ textAlign: "center", margin: "2rem" }}>
            <button onClick={submitPost}>Submit</button>
          </div>
          <ToastContainer autoClose={2000} />
        </div>
      ) : null}{" "}
    </>
  );
}
