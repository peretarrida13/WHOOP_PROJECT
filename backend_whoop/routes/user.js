const express = require('express')
const fetch = require('node-fetch');
const app = express.Router()
const passport = require('passport')
const OAuth2Strategy = require('passport-oauth2')
const User = require('../Models/User')
require('dotenv').config()

const whoopOAuthConfig = {
    authorizationURL: `${process.env.WHOOP_API_HOSTNAME}/oauth/oauth2/auth`,
    tokenURL: `${process.env.WHOOP_API_HOSTNAME}/oauth/oauth2/token`,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    state: true,
    scope: [
        'offline',
        'read:profile',
        'read:recovery',
        'read:cycles',
        'read:sleep',
        'read:workout',
        'read:body_measurement'
    ],
}

async function  getUser(
    accessToken,
    refreshToken,
    {expires_in},
    profile,
    done,
){
    const {first_name, last_name, user_id} = profile
    const user = await User.findOne({userId: user_id})

    if (user) {
        user.acessToken = accessToken
        user.refreshToken = refreshToken
        user.expiresIn = Date.now() + expires_in * 1000
        user.firstName = first_name
        user.lastName = last_name
        user.userId = user_id

        await user.save()

        done(null, user)
    } else{
        const newUser = new User({
            acessToken: accessToken,
            refreshToken: refreshToken,
            expiresIn: Date.now() + expires_in * 1000,
            firstName: first_name,
            lastName: last_name,
            userId: user_id,
        })
        
        await newUser.save()

        done(null, newUser)
    }
}

async function fetchProfile(
    accessToken,
    done,
){
    const profileResponse = await fetch(
        `${process.env.WHOOP_API_HOSTNAME}/developer/v1/user/profile/basic`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    )

    const profile = await profileResponse.json()

    done(null, profile)
}

const whoopAuthorizationStrategy = new OAuth2Strategy(whoopOAuthConfig, getUser)
whoopAuthorizationStrategy.userProfile = fetchProfile



passport.use('oauth2', whoopAuthorizationStrategy)

app.get('/auth/performance',
    passport.authenticate('oauth2'));


app.get('/auth/performance/callback',
    passport.authenticate('oauth2', {failureRedirect: 'http://localhost:3000/login', failureMessage: true }),
async function (req, res) {
    console.log(req.user.acessToken)
    res.redirect('http://localhost:3000/' + req.user.acessToken );
});



module.exports = app;