const mongoose = require("mongoose")
const blogModel = require('../models/blogModel');
const userModel = require("../models/userModel");

// get all user
exports.getAllBlogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('user')
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: "No Blog found"
            });
        }
        return res.status(200).send({
            success: true,
            blogCount: blogs.length,
            message: "all blog list",
            blogs,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: "Error while getting blog",
            err
        });
    }
};



// create blog
exports.createBlogController = async (req, res) => {
    try {
        const { title, discription, image, user } = req.body;
        // validation
        if (!title || !discription || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "please provide all filleds"
            })
        }
        const existingUser = await userModel.findById(user);
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "unable to find user"
            })
        }

        const newBlog = new blogModel({ title, discription, image, user });


        const session = await mongoose.startSession();
        session.startTransaction()
        await newBlog.save({ session })
        existingUser.blogs.push(newBlog)
        await existingUser.save({ session })
        await session.commitTransaction();

        await newBlog.save();

        return res.status(201).send({
            success: true,
            message: "Blog Created!",
            newBlog,
        })
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            success: false,
            message: "Error while creating blog",
            err,
        })
    }
};

// update blog
exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params
        const { title, discription, image } = req.body;
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true, updateAndmodify: false });
        return res.status(200).send({
            success: true,
            message: 'Blog Updated!',
            blog,
        })
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            success: false,
            message: 'Error while updating blog',
            err,
        })
    }
};

// get single blog 
exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(200).send({
                success: false,
                message: "blog not found with this id"
            })
        }
        return res.status(200).send({
            success: true,
            message: "fetch single blog",
            blog,
        })
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            success: false,
            message: "Error whilr getting single blog",
            err,
        })
    }
};

// delete blog
exports.deleteBlogController = async (req, res) => {
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");

        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: "Blog deleted"
        })
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            success: false,
            message: "Error while deleting Blog",
            err,
        })
    }
};

// get user blog
exports.userBlogController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");
        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found with this id"
            })
        }
        return res.status(200).send({
            success: true,
            message: "user blogs",
            userBlog,
        })
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            success: false,
            message: "Error in user blog",
            err,
        })
    }
};