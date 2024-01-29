const express = require('express')
const fetch = require('node-fetch');
const app = express.Router()


app.get('/workout/getLast10Workouts/:token', async (req, res) => {
    const token = req.params.token

    try{
        const query = new URLSearchParams({
            limit: "10",
        });

        const uri = `https://api.prod.whoop.com/developer/v1/activity/workout?${query}`
        const response = await fetch(uri, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        

        if(response.status === 200){
            const data = await response.json();
            res.status(200).json(data);
        }
    } catch(err){
        throw err;  
    }
})

// Function to format date and time as a string
function formatDateToISO(date) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

app.get('/workout/getWorkoutByDates/:token', async (req, res) => {
    // Current date and time
    let currentDate = new Date();
    // Calculating the date and time for two days ago
    let twoDaysAgo = new Date();
    twoDaysAgo.setDate(currentDate.getDate() - 3);


    const query = new URLSearchParams({
        start: formatDateToISO(twoDaysAgo),
        end: formatDateToISO(currentDate),
    });

    const uri = `https://api.prod.whoop.com/developer/v1/activity/workout?${query}`

    const response = await fetch(uri, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${req.params.token}`,
        }
    });

    if(response.status === 200){
        const data = await response.json();
        res.status(200).json(data);
    }
    else res.status(500).json({message: "Error getting workout by dates"});

})

app.get('/workout/getWorkoutById/:token/:workoutId', async (req, res) => {
    const uri = `https://api.prod.whoop.com/developer/v1/activity/workout/${req.params.workoutId}`

    const response = await fetch(uri, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${req.params.token}`,
        }
    });

    if(response.status === 200){
        const data = await response.json();
        res.status(200).json(data);
    }
    else res.status(500).json({message: "Error getting workout by id"});

})

module.exports = app