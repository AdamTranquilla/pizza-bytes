/*
 * All routes for Menu are defined here
 * Since this file is loaded in server.js into api/menu,
 *   these routes are mounted onto /menu
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require("express");
const router = express.Router();
const { helpers } = require("../db/query-scripts/queryMethods.js");
const { menuBuilder } = require("../db/query-scripts/menu-queries.js");
const { generateRandomId } = require("../generateRandomId");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

module.exports = (db) => {
  // main menu, shows pizzas with details
  // router.get("/", (req, res) => {
  //   res.render("menu", menuBuilder());
  //   db.query(helpers.getMenu2pt0())
  //     .then((data) => {
  //       const result = menuBuilder(data.rows);
  //       console.log(result);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // });

  router.get("/", (req, res) => {
    db.query(helpers.getMenu2pt0())
      .then((data) => {
        const templateVars = {
          result: menuBuilder(data.rows),
        };
        res.render("menu", templateVars);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.message });
      });
  });

  // shows the 'selected' menu item and options INSERT into orders
  router.get("/edit", (req, res) => {
    res.render("edit");
    db.query(`SELECT * FROM toppings;`)
      .then((data) => {
        const result = data.rows;
        res.json({ result });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  // see and remove orders item
  // option to edit => get'/edit'
  router.get("/cart", (req, res) => {
    db.query(helpers.getPizzasInOrder(), ["1"])
      .then((data) => {
        const result = data.rows;
        console.log("result: pizza orders", result);
        res.render("cart", { result });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.message });
      });
  });
  // checkout confirmation
  router.get("/checkout", (req, res) => {
    db.query(`SELECT * FROM orders;`)
      .then((data) => {
        const result = data.rows;
        res.render("checkout", { result });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // option to chng_quantity/remove => post'/cart'
  // router.post("/cart", (req, res) => {
  //   db.query(`SELECT * FROM order_items;`)
  //     .then((data) => {
  //       const id = generateRandomId();
  //       const result = data.rows;
  //       const templateVars = { result, id, cart: req.session.cart };
  //       console.log(req.session.cart)
  //       // res.json({ result });
  //       res.json({ result });
  //       res.render('cart', templateVars);
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });

  router.post("/cart", (req, res) => {
<<<<<<< HEAD
    console.log('JKDSJFKLJDSKLFJKL:DSJFJDSK:J')

    pizzaId = generateRandomId()
=======
    pizzaId = generateRandomId();
>>>>>>> 2c87de8982dd56b364feb34f66b797da184d552c

    const pizza = {
      id: pizzaId,
      name: req.body.pizza,
      size: "small",
      toppings: [],
    };

    /*
      IF USER ALREADY HAS A CART IN THEIR COOKIES, USE THE EXISTING CART
      ELSE CREATE A CART AND STORE THE CART ID AND THE
      CART ITSELF AS COOKIES IN THE BROWSER
    */
    if (req.cookies["cartId"]) {
      cart = req.cookies["cart"];
      cart[req.cookies["cartId"]]["pizzas"].push(pizza);
      console.log("This is your cart ---->", JSON.stringify(cart));
    } else {
      cartId = generateRandomId();
      
      cart = {};
      cart[cartId] = {};
      
      const pizzas = [];
      pizzas.push(pizza);
<<<<<<< HEAD

      cart[cartId]["pizzas"] = pizzas;

      res.cookie("cartId", cartId);
      res.cookie("cart", cart);
=======
      
      cart[cartId]['pizzas'] = pizzas;
      
      res.cookie('cartId', cartId);
      res.cookie('cart', cart);

      console.log('The cart has been set ', JSON.stringify(cart));
>>>>>>> a0475980822411d3bf1ef6f311397a208d5e6a3d

      console.log("The cart has been set ---->", JSON.stringify(cart));
    }

    res.render("cart", req.cookies["cart"]);
  });

  return router;
};
