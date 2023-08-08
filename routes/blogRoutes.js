const express = require('express');
const { getAllBlogsController, createBlogController, updateBlogController, getBlogByIdController, deleteBlogController, userBlogController } = require('../controllers/blogController');

// router object
const router = express.Router();

// routes
// get || all blogs
router.get('/all-blog', getAllBlogsController);

// create || all blogs
router.post('/create-blog', createBlogController);

// put || update blog 
router.put('/update-blog/:id', updateBlogController);

// get || single blog detail
router.get('/get-blog/:id', getBlogByIdController);

// delete || delete blog
router.delete('/delete-blog/:id', deleteBlogController);

// get || user blog
router.get("/user-blog/:id", userBlogController);

module.exports = router;