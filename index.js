const express = require('express')

const path = require('path')
const app = express()
const cors = require('cors')

const ethers = require('ethers')
const config = require('./config/index')

app.use(cors())

// Send files from the public directory
app.use(express.static(path.resolve(__dirname, 'public')))

// Handling JSON data 
app.use(express.json())       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })) // to support URL-encoded bodies

// GET - /api
app.get("/api/sign", async (req, res, next) => {
    try {
        const { signature, wallet } = req.query
        const verified = await ethers.utils.verifyMessage(config.NEW_PROJECT_MSG, signature)
        if (verified.toLowerCase() === wallet.toLowerCase()) {
            res.status(200).json({ success: true, data: signature, msg: "valid" })
        } else {
            res.status(404).json({ success: false, data: null, msg: "invalid signature" })
        }
    } catch (error) {
        res.status(404).json({ success: false, data: null, msg: error })
    }
})

app.listen(config.PORT, () => {
    console.log(`Server listening at port: ${config.PORT}`)
})