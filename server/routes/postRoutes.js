import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

//Get all posts
router.route('/').get(async(req,res)=>{
    try {
        const posts = await Post.find({});
        res.status(200).json({success: true,data:posts})
    } catch (error) {
        res.status(500).json({success: false, message: error})
    }
});

//Create a Post
router.route('/').post(async(req,res)=>{
    try{
        const { name,prompt,photo} = req.body;
        const photourl = await cloudinary.uploader.upload(photo);
    
        const newpost = await Post.create({
            name,
            prompt,
            photo:photourl.url,
        })
    
        res.statusCode(201).json({success:true, data:newpost});
    }
    catch(error){
        res.status(500).json({success:false, message:error})
    }
});

export default router;