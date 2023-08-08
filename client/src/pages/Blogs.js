import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    // get blogs
    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get('/api/v1/blog/all-blog');
            // data?.success means --->> data && data.success
            if (data?.success) {
                setBlogs(data?.blogs)
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getAllBlogs();
    })
    return (
        <div>
            {blogs && blogs.map(blog => <BlogCard
                id={blog?._id}
                isUser={localStorage.getItem('userId') === blog?.user?._id}
                title={blog?.title}
                discription={blog?.discription}
                image={blog?.image}
                username={blog?.user?.username}
                time={blog.createdAt}
            />)}
        </div>
    )
}

export default Blogs