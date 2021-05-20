import jwt from 'jsonwebtoken';
import Post from '../models/Post.model';
import { secretKey } from '../../config/config';

export const savePost = (req, res) => {
  jwt.verify(req.userToken, secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      const { title, content, slug, categories, user } = req.body.postDetails
      const newPost = new Post({
        title,
        content,
        slug,
        categories,
        author: user
      })
      newPost.save()
        .then((data) => {
          res.status(200).send(data)
        })
        .catch((err) => res.send(err))
    }
  })


}

export const getAllPosts = (req, res) => {
  Post.find({})
    .populate("author", "name")
    .then((data) => {
      res.send(data)
    })
    .catch((err) => res.send(err))
}

export const getPostDetails = (req, res) => {
  Post.findById(req.body.id)
    .populate("author", "name joined")
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => res.send(err))
}

export const getMyPosts = (req, res) => {
  jwt.verify(req.userToken, secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Post.find({ author: req.body.userid })
        .populate("author", "name")
        .then((data) => {
          res.status(200).send(data)
        })
        .catch((err) => res.send(err))
    }
  })

}

export const deleteMyPost = (req, res) => {
  jwt.verify(req.userToken, secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Post.findByIdAndDelete(req.params.postid)
        .then((data) => {
          res.status(200).send(data)
        })
        .catch((err) => res.send(err))
    }
  })
}

export const editMyPost = (req, res) => {

  jwt.verify(req.userToken, secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      const { postId, slug, title, content, categories } = req.body.postDetails;
      Post.findById(postId)
        .then((doc) => {
          doc.slug = slug;
          doc.content = content;
          doc.title = title;
          doc.categories = categories
          doc.save()
            .then((data) => {
              res.status(200).send(data)
            })
            .catch((err) => res.send(err))
        })
        .catch((err) => res.send(err))
    }
  })

}
