const express = require("express");
const router = express.Router();

// Middleware
const passport = require("passport");

const {
  signup,
  signin,
  userList,
  userUpdate,
  deleteUser,
  fetchUser,

} = require("../controllers/userController");


router.param("userId", async (req, res, next, userId) => {
  const user = await fetchUser(userId, next);

  if (user) {
    req_user = user;
    next();
  } else {
    const err = new Error("User not found");
    err.status = 404;
    next(err);
  }
});

// User list
router.get("/", userList);

// Signup
router.post("/signup", signup);

// signin
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
// Delete user used only in BE
router.delete(
  "/",
  passport.authenticate("local", { session: false }),
  deleteUser
);

// Update user profile
router.put("/", passport.authenticate("jwt", { session: false }), userUpdate);

module.exports = router;
