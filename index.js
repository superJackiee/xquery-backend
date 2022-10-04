const express = require('express')

const axios = require('axios')
const path = require('path')
const app = express()
const cors = require('cors')

const ethers = require('ethers')
const config = require('./config/index')
const dotenv = require('dotenv')

dotenv.config()

app.use(cors())

// Send files from the public directory
app.use(express.static(path.resolve(__dirname, 'public')))

// Handling JSON data 
app.use(express.json())       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })) // to support URL-encoded bodies

app.get("/api", async (req, res) => {
    try {
        res.status(200).json({ success: true, data: null, msg: 'health check 100%!' })
    } catch (error) {
        res.status(502).json({ success: false, data: null, msg: error })
    }
})

// GET - /api
app.get("/api/sign", async (req, res) => {
    try {
        const { signature, wallet } = req.query
        const verified = await ethers.utils.verifyMessage(config.NEW_PROJECT_MSG, signature)
        if (verified.toLowerCase() === wallet.toLowerCase()) {
            res.status(200).json({ success: true, data: signature, msg: "valid" })
        } else {
            res.status(404).json({ success: false, data: null, msg: "invalid signature" })
        }
    } catch (error) {
        res.status(502).json({ success: false, data: null, msg: error })
    }
})

app.post("/api/projects", async (req, res) => {
    try {
        const payload = req.body
        const response = await axios.post(config.SNODE_ENDPOINT, payload)
        res.status(200).json({ success: true, result: response?.data?.result, msg: "create project success" })
    } catch (error) {
        res.status(502).json({ success: false, data: null, msg: error })
    }
})

app.post("/api/projects/:projectId", async (req, res) => {
    try {
        const { projectId } = req.params
        const { ["api-key"]: apiKey } = req.headers
        console.log("apiKey:", apiKey)
        const payload = req.body
        const response = (await axios({
            method: 'post',
            url: config.SNODE_ENDPOINT + '/' + projectId,
            headers: {
                'Api-Key': apiKey
            },
            data: payload
        })).data
        res.status(200).json({ success: true, result: response?.result, msg: "get project_stats success" })
    } catch (error) {
        res.status(404).json({ success: false, data: null, msg: error.response.data.message })
    }
})

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server listening at port: ${process.env.PORT || 8000}`)
})