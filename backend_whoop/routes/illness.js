const express = require('express')
const fetch = require('node-fetch');
const app = express.Router()
const formalitzar = require('../Utils/formalitzar')
const detection = require('../Utils/detection')
require('dotenv').config()
  

app.get('/illness/:token', async (req, res) => {
    const token = req.params.token
    const query = new URLSearchParams({
        limit: "14",
    }); 


    const resp1 = await fetch(`https://api.prod.whoop.com/developer/v1/activity/sleep?${query}`, {
        mode:'no-cors',
        method:'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',

        }
    })

    const sleepData = await resp1.json();

    const resp2 = await fetch(`https://api.prod.whoop.com/developer/v1/recovery?${query}`, {
        method:'GET',
        mode:'no-cors',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',

        }
    })  
    
    const recoveryData = await resp2.json();

    const data = formalitzar.formalitzar(sleepData.records, recoveryData.records)

    const result = detection.detection(data)

    res.status(200).json({data: result});
})


module.exports = app