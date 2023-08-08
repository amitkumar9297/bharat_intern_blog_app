import React, { useState } from 'react';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";


const CreateBlog = () => {
    const id = localStorage.getItem('userId')
    const navigate = useNavigate()

    const [inputs, setInputs] = useState({
        title: '',
        discription: '',
        image: ''
    });

    // input change
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    // form 
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/v1/blog/create-blog', {
                title: inputs.title,
                discription: inputs.discription,
                image: inputs.image,
                user: id,
            })
            if (data?.success) {
                toast.success('Blog Created');
                navigate('/my-blogs')
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box
                    width={'50%'}
                    border={3}
                    borderRadius={10}
                    padding={3}
                    margin={'auto'}
                    boxShadow={'10px 10px 20px #ccc'}
                    display='flex'
                    flexDirection={"column"}
                    marginTop={3}
                >
                    <Typography
                        variant='h2'
                        textAlign={'center'}
                        fontWeight={"bold"}
                        padding={3}
                        color={"gray"}
                    >
                        Creat A Post
                    </Typography>
                    <InputLabel
                        sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
                        Title
                    </InputLabel>
                    <TextField
                        name='title'
                        value={inputs.title}
                        onChange={handleChange}
                        margin='normal'
                        variant='outlined'
                        required
                    />

                    <InputLabel
                        sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
                        Description
                    </InputLabel>
                    <TextField
                        name='discription'
                        value={inputs.discription}
                        onChange={handleChange}
                        margin='normal'
                        variant='outlined'
                        required

                    />

                    <InputLabel
                        sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
                        Image Url
                    </InputLabel>
                    <TextField
                        name='image'
                        value={inputs.image}
                        onChange={handleChange}
                        margin='normal'
                        variant='outlined'
                        required

                    />

                    <Button type='submit' color='primary' variant='contained'>Submit</Button>


                </Box>
            </form>
        </>
    )
}

export default CreateBlog