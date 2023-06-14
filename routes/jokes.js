const express = require("express")
const router = express.Router()
const Joke = require("../models/jokes")

//getting all
router.get("/", async (req, res) => {
    try {   
        const joke = await Joke.find()
        res.json(joke)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//getting one
router.get("/:id", getJokes, (req, res) => {
    res.json(res.joke)
})

//Creating One
router.post("/", async (req, res) => {
    const joke = new Joke({
        overskrift: req.body.overskrift,
        jokeTekst: req.body.jokeTekst
    })

    try {
        const newJoke = await joke.save()
        res.status(201).json(newJoke)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//Updating one
router.patch("/:id", getJokes, async (req, res) => {
    if(req.body.overskrift != null){
        res.joke.overskrift = req.body.overskrift
    }
    if (req.body.jokeTekst != null) {
        res.joke.jokeTekst = req.body.jokeTekst
    }

    try {
        const updatedJoke = await res.joke.save()
        res.json(updatedJoke)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Deleting One
router.delete("/:id", getJokes, async (req, res) => {
    try {
        await res.joke.deleteOne()
        res.json({message: "Deleted Joke"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})


async function getJokes(req, res, next){
    let joke
    try {
        joke = await Joke.findById(req.params.id)
        if (joke == null) {
            return res.status(404).json("Joke not found")
        }
    } catch (err) {
        return res.status(500).json({message: err.message})        
    }

    res.joke = joke
    next()
}



module.exports = router