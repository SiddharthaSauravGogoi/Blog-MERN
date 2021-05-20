import {
    savePost,
    getPostDetails,
    getMyPosts,
    getAllPosts,
    editMyPost,
    deleteMyPost
} from '../controllers/post.controller';

const postRoutes = (app) => {
    app.route('/save_post')
        .post(savePost)
    app.route('/all_posts')
        .get(getAllPosts)
    app.route('/post_details')
        .post(getPostDetails)
    app.route('/my_posts')
        .post(getMyPosts)
    app.route('/edit_my_post')
        .put(editMyPost)
    app.route('/delete_my_post/:postid')
        .delete(deleteMyPost)

}

export default postRoutes;