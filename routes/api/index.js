//18.1.7
const router = require("express").Router();
const pizzaRoutes = require("./pizza-routes");
//18.2.6
const commentRoutes = require("./comment-routes");

//add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use("/pizzas", pizzaRoutes);
//18.2.6
router.use("/comments", commentRoutes);

module.exports = router;