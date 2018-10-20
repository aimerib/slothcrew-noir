const express = require('express')
const app = express()
require('dotenv').config()
const cloudinaryURI = process.env.CLOUDINARY_URL
const cloudinary = require('cloudinary')
cloudinary.config({
    cloudinaryURI
})



//request();

app.set('view engine', 'ejs')

const request = async () => {

    const pictures = await cloudinary.v2.api.resources({
        type: 'upload',
        prefix: 'slothcrewnoir/',
        context: true,
        max_results: 100
    })

    const picture = await pictures.resources
    return picture
}

app.get('/', function(req, res) {
  
  
  
    request().then((data) => {res.render('pages/index',{
        pictures: data})
    })
    //res.render('pages/index',);
})

app.get('/about', function(req, res) {
    res.render('pages/about')
})


app.listen(8900, function() {
    console.warn('listening')
})

