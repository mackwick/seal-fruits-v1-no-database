// import express
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")

// import our fruits
// require will return the value of module.exports
const fruits = require("./models/fruits.js")

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

//ROUTES

// fruits index route
// get request to /fruits
// return all fruits
app.get("/fruits", (req, res) => {
    // res.send(fruits)
    // "index.ejs" => "./views/index.ejs"
    // {fruits} => {fruits:fruits}
    res.render("index.ejs", {fruits})
})


// New Route - Render a page with a form to create a new fruit
// get request to /fruits/new
// allow us to have a form to create a new fruit
app.get("/fruits/new", (req, res) => {
    // render a template with our form
    // new.ejs = ./views/new.ejs
    res.render("new.ejs")
})

// Create Route - Receives Form Data, Creates New Fruit
// post request to /fruits
// create a fruit from the form data and redirect back to index
app.post("/fruits", (req, res) => {
    //get the form data from the request
    const body = req.body
    // send back the form data as JSON
    // res.send(body)
    // convert readToEat to true/false
    if (body.readyToEat === "on") {
        body.readyToEat = true
    } else {body.readyToEat = false}
    //add fruit to the array
    fruits.push(body)
    //redirect them to the index page
    res.redirect("/fruits")
})

// DESTROY ROUTE - deletes a fruite
// DELETE request -> /fruits/:id
// Deletes the specified fruit and redirects to index
app.delete("/fruits/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // then splice it from the array
    // arr.splice(index, num of items to cut)
    fruits.splice(id, 1)
    //redirect to index
    res.redirect("/fruits")
})

// edit route - render a form to edit a specific fruit
// GET request to /fruits/:id/edit
// render a form with the existing values filled in
app.get("/fruits/:id/edit", (req, res) => {
    // grab id
    const id = req.params.id
    // get fruit
    const fruit = fruits[id]
    // send id and fruit to the template
    // edit.ejs -> ./views/edit.ejs
    res.render("edit.ejs", {fruit, id})
})

// update route - receives form data and updates the fruit
// PUT request to /fruit/:id
// Update the specified fruit and redirect to index
app.put("/fruits/:id", (req, res) => {
    // get the id
    const id = req.params.id
    const body = req.body
    // conver readyToEat to true or false
    if (body.readyToEat === "on") {
        body.readyToEat = true
    } else {body.readyToEat = false}
    // update the fruit
    fruits[id] = body
    //redirect to index 
    res.redirect("/fruits")
})

// fruits show route
// get request to /fruits/:id
// return a single fruit
app.get("/fruits/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // get the fruit from the array
    const fruit = fruits[id]
    // send the fruit as the response
    // res.send(fruit)

    // render the show.ejs template
    // res.render(template, data)
    // for the template assume "/views/"
    // "show.ejs" =>  ./views/show.ejs
    res.render("show.ejs", {fruit, id})
    // {fruit} is the same as {fruit:fruit}
})

// server listener to turn our server
app.listen(3000, () => {
    console.log('listening on port 3000')
})