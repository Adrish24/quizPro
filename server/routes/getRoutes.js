import express from "express";
import * as dotenv from "dotenv";
import post from '../mongodb/models/post.js';


dotenv.config();

const router = express.Router()

router.route('/').get(async(req, res) => {
    try {
        const getPost = await post.find()

        res.status(200).json(getPost)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router;