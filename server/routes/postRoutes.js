import express from "express";
import * as dotenv from "dotenv";
import post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router()

router.route('/').post(async (req, res) => {
    try {
        const { name, uid, score, session } = req.body

    const newPost = await post.create({
        name,
        uid,
        score,
        session
    })

    res.status(201).json({sucess: true, data: newPost})
    } catch (error) {
       res.status(500).json({sucess: false, message: error.message}) 
    }
})


export default router;