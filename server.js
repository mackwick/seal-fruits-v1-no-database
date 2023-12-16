// import express
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")

//import fruits router
const fruitRouter = require("./controllers/fruits.js")

// create our app object
const app = express()

// middleware
app.use(express.static("public")) // use a "public" folder for files
// public/style.css -> /style.css
// public/app.js -> /app.js

//express.urlencoded (parse url encoded bodies)
//adds the data to req.body
app.use(express.urlencoded({extended: true}))

//morgan - log data about each request for debugging
app.use(morgan("dev"))
//methodOverride - allows us to override form post requests as a different method (like put or delete)
//it will look for a _method url query
app.use(methodOverride("_method"))

//register fruits router
app.use("/fruits", fruitRouter)


// server listener to turn our server
app.listen(3000, () => {
    console.log('listening on port 3000')
})