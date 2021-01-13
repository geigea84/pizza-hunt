//18.1.6
//18.5.3 updatePizza - adjusted to accomodate validation
const {Pizza} = require("../models");

const pizzaController = {

    //get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
        //18.2.6 populate select sort
        .populate({
            path: "comments",
            select: "-__v"
        })
        .select("-__v")
        .sort({_id: -1})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //get one pizza by id
    /* Instead of accessing the entire req, we've destructured params out of it, 
    because that's the only data we need for this request to be fulfilled. */
    getPizzaById({params}, res) {
        Pizza.findOne({_id: params.id})
        .populate({
            path: "comments",
            select: "-__v"
        })
        .select("-__v")
        .then(dbPizzaData => {
            //if no pizza is found, send 404
            if (!dbPizzaData) {
                res.status(404).json({message: "No pizza found with this id!"});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //create pizza
    createPizza({body}, res) {
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },

    //update pizza by id
    /* With this .findOneAndUpdate() method, Mongoose finds a single document we 
    want to update, then updates it and returns the updated document. If we don't 
    set that third parameter, { new: true }, it will return the original document. 
    By setting the parameter to true, we're instructing Mongoose to return the 
    new version of the document. */
    updatePizza({params, body}, res) {
        Pizza.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({message: "No pizza found with this id!"});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },

    //delete pizza
    deletePizza({params}, res) {
        Pizza.findOneAndDelete({_id: params.id})
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({message: "No pizza found with this id!"});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = pizzaController;