import express from "express";
import * as dotenv from "dotenv";
import jwt from 'jsonwebtoken'

dotenv.config();

const router = express.Router()

router.route('/').post(async(req, res) => {
    const { name } = req.body

    const accessToken = generateAccessToken({name})
     jwt.sign(name, process.env.REFRESH_TOKEN)
    res.status(200).json({accessToken: accessToken})
})

function generateAccessToken(payload){
    return jwt.sign(payload,process.env.SECRET_KEY)
}

export default router;