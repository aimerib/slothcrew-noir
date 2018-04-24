const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const dotenv = require('dotenv').config()
const cloudinaryURI = process.env.CLOUDINARY_URL
const path = require('path')
const cloudinary = require ('cloudinary')

cloudinary.config({ 
    cloudinaryURI
  });
async function getPictures() {
    let pictures = await cloudinary.v2.api.resources({type: 'upload', prefix: 'Slothcrew/', context: true},function(error, result){
    return result
    })
    handlePictures(pictures.resources)
}
function handlePictures(pictures) {
    for (let picture of pictures) {
        if (picture.hasOwnProperty('context')) {
            for (let properties in picture.context.custom) {
                console.log(`${properties}: ${picture.context.custom[properties]}`)
            }
        }
    }
}

getPictures()


server.use('/', express.static(__dirname));
server.listen(3000, function() { console.log('listening')});
