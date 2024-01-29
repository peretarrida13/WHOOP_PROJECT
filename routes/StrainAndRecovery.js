const express = require('express')
const fetch = require('node-fetch');
const app = express.Router()


app.get('/strain/:token', async (req, res) => {
    const query = new URLSearchParams({
        limit: "1",
    });
    
    const uri = `https://api.prod.whoop.com/developer/v1/cycle?${query}`;

    const cycleResponse = await fetch(uri, {
      method:'GET',
      headers: {
        Authorization: `Bearer ${req.params.token}`,
      },
    });
  
    if (cycleResponse.status === 200) {
      const data = cycleResponse.json();
      console.log(data)
      res.status(200).json(data);
    } else {
      throw new Error(`Received ${cycleResponse.status} status from Whoop`);
    }
})

app.get('/recovery/:token/:cycle', async (req, res) => {
    const uri = `https://api.prod.whoop.com/developer/v1/cycle/${req.params.cycle}/recovery`;
    
    const recoveryResponse = await fetch(uri, {
        method:'GET',
        headers: {
          Authorization: `Bearer ${req.params.token}`,
        },
    });

    if (recoveryResponse.status === 200) {
        return recoveryResponse.json();
    } else {
        throw new Error(`Received ${recoveryResponse.status} status from Whoop`);
    }
})  

module.exports = app