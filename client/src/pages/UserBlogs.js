import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

export const UserBlogs = () => {
    const [blogs, setBlogs] = useState([])

    // get user blogs

    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem('userId')
            const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`)
            if (data?.success) {
                setBlogs(data?.userBlog.blogs)
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUserBlogs();
    }, [])

    return (
        <div>
            {blogs && blogs.length > 0 ? (blogs.map((blog) => (<BlogCard
                id={blog._id}
                isUser={true}
                title={blog.title}
                discription={blog.discription}
                image={blog.image}
                username={blog.user.username}
                time={blog.createdAt}
            />))
            ) : (
                <h1>You Haven't Created a Blog</h1>
            )}
        </div>
    )
}
