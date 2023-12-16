// import express
const express = require("express")

const router = express.Router()

const fruits = require("../models/fruits.js")

//ROUTES GO HERE

// fruits index route
// get request to /fruits
// return all fruits
// "/fruits" is implied from the router
router.get("/", (req, res) => {
    // res.send(fruits)
    // "index.ejs" => "./views/index.ejs"
    // {fruits} => {fruits:fruits}
    res.render("fruits/index.ejs", {fruits})
})


// New Route - Render a page with a form to create a new fruit
// get request to /fruits/new
// allow us to have a form to create a new fruit
router.get("/new", (req, res) => {
    // render a template with our form
    // new.ejs = ./views/new.ejs
    res.render("fruits/new.ejs")
})

// Create Route - Receives Form Data, Creates New Fruit
// post request to /fruits
// create a fruit from the form data and redirect back to index
router.post("/", (req, res) => {
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
router.delete("/:id", (req, res) => {
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
router.get("/:id/edit", (req, res) => {
    // grab id
    const id = req.params.id
    // get fruit
    const fruit = fruits[id]
    // send id and fruit to the template
    // edit.ejs -> ./views/edit.ejs
    res.render("fruits/edit.ejs", {fruit, id})
})

// update route - receives form data and updates the fruit
// PUT request to /fruit/:id
// Update the specified fruit and redirect to index
router.put("/:id", (req, res) => {
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
router.get("/:id", (req, res) => {
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
    res.render("fruits/show.ejs", {fruit, id})
    // {fruit} is the same as {fruit:fruit}
})






//EXPORT THE ROUTER
module.exports = router