const express = require("express");
const userHandler = require('../handlers/user_handler');
const roleHandler = require('../handlers/role_handler');
const orderHandler = require('../handlers/order_handler');
const jwtAuth = require("../middlewares/jwt");
// const { authenticatePassportJwt } = require('../middlewares/passport-jwt');

// Create a router
const router = express.Router();

// User routes
router.post("/user/login", userHandler.login);
router.post("/user/register", userHandler.register);
router.get("/user", userHandler.getList);
router.get("/user/:id", userHandler.getOneByUserId);
router.put("/user/:id", userHandler.updateOne);

// Role routes
router.post("/role", roleHandler.create);
router.get("/role", roleHandler.getList);

// Order routes
router.post("/order", jwtAuth, orderHandler.create);
router.get("/order", jwtAuth, orderHandler.getList);
router.get("/order/:id", jwtAuth, orderHandler.getOneByOrderId);
router.delete("/order", jwtAuth, orderHandler.deleteOrder);

module.exports = router;