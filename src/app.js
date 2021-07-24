const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast =require('./utils/forecast')

const app=express()
const publicdirectpath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

app.use(express.static(publicdirectpath))


app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name:'Gaurav Kumar'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Gaurav Kumar'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help',
        name:'Gaurav Kumar'
    })
})

app.get('/weather',(req,res) => {

    if(!req.query.address)
    {
       return res.send({
            error: 'NO ADDRESS PROVIDEd'
        })
        
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('*',(req, res)=>{
    res.render('404', {
        title:'404',
        name:'gaurav',
        errormessage:'message not found'
    })
    })

app.listen(3000,()=> {
    console.log('server is on port 3000')
})