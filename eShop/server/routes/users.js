const express = require("express");
const router = express.Router();
const usersController = require("../controller/users");

router.get("/all-user", usersController.getAllUser);
router.get("/single-user", usersController.getSingleUser);

router.post("/add-user", usersController.postAddUser);
router.put("/edit-user", usersController.postEditUser);
router.post("/delete-user", usersController.getDeleteUser);

router.post("/change-password", usersController.changePassword);

module.exports = router;
