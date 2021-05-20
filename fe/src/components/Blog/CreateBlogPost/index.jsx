import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import { Typography, Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Categories from "../Categories";
import { savePost } from "../../../services/dataService";

const { Title } = Typography;

export default function CreateBlogPost() {
  const history = useHistory();
  const notify = (msg) => toast(msg);

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

  const [blogTitle, setBlogTitle] = useState("");
  const [value, setValue] = useState("");
  const [slug, setSlug] = useState("");
  const [categories, setCategories] = useState("");
  const [categoryList, updateCategoryList] = useState([]);

  const submitPost = (event) => {
    event.preventDefault();

    if (!blogTitle.length || !value.length || !slug.length) {
      return alert("Please fill in all the blog details");
    }

    const userData = JSON.parse(localStorage.getItem("user"));

    const postDetails = {
      title: blogTitle,
      content: value,
      slug,
      user: userData.user._id,
      categories: categoryList,
    };

    let saveNewPost = savePost(postDetails);
    saveNewPost
      .then((response) => {
        if (response.data.error) {
          notify(response.data.error);
        } else {
          notify("Post created successfully");
          setTimeout(() => {
            history.push("/");
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
        <button onClick={submitPost} className="btn">
          Submit
        </button>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}
