const express = require("express");
const userHandler = require('../handlers/user_handler');
const roleHandler = require('../handlers/role_handler');
const orderHandler = require('../handlers/order_handler');
const jwtAuth = require('../middlewares/jwt');
const { authenticatePassportJwt } = require('../middlewares/passport-jwt');

// Create a router
const router = express.Router();

// User routes
router.post("/user/login", userHandler.login);
router.post("/user/register", userHandler.register);
router.get("/user", userHandler.getList);
router.get("/user/:id", userHandler.getOneByUserId);
router.put("/user/:id", userHandler.updateOne);
router.delete("/user/:id", userHandler.remove);

// Role routes
router.post("/role", roleHandler.create);
router.get("/role", roleHandler.getList);
router.put("/role/:id", roleHandler.update); // Ensure roleHandler.update is defined
router.delete("/role/:id", roleHandler.remove); // Ensure roleHandler.remove is defined

// Order routes
router.post("/order", jwtAuth, orderHandler.create);
router.get("/order", authenticatePassportJwt(), orderHandler.getList);
router.get("/order/:id", authenticatePassportJwt(), orderHandler.getOneByOrderId);
router.put("/order/:id", authenticatePassportJwt(), orderHandler.update); // Ensure orderHandler.update is defined
router.delete("/order/:id", authenticatePassportJwt(), orderHandler.remove); // Ensure orderHandler.remove is defined

module.exports = router;