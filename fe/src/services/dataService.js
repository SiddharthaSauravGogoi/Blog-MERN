import axios from 'axios';

const url = "http://localhost:8000"

const userData = JSON.parse(localStorage.getItem('user'))

let config;
if (userData) {
  config = {
    headers: { access_token: userData.token },
  }
};

export const getAllPosts = () => {
  return axios.get(`${url}/all_posts`, config)
    .then((response) => response);
}

export const getPostDetails = (postId) => {
  return axios.post("http://localhost:8000/post_details", {
    id: postId,
  })
    .then((response) => response);
}

export const savePost = (postDetails) => {
  return axios.post(`${url}/save_post`, { postDetails }, config)
    .then((response) => response)
}

export const getMyPost = (userid) => {
  return axios.post(`${url}/my_posts`, { userid: userid }, config)
    .then((response) => response);
}

export const deleteMyPost = (postid) => {
  return axios.delete(`${url}/delete_my_post/${postid}`, { postid: postid }, config)
    .then((response) => response);
}

export const editMyPost = (postDetails) => {
  return axios.put(`${url}/edit_my_post`, { postDetails }, config)
}