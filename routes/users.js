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
  folderCreate,
} = require("../controllers/UserController");

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

// clarify here that this is used for testing only
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

// I'd clarify that it's used for testing purposes only.
// Delete user used only in BE
router.delete(
  "/",
  passport.authenticate("local", { session: false }),
  deleteUser
);

// Update user profile
router.put("/", passport.authenticate("jwt", { session: false }), userUpdate);

// create Folder
router.post(
  "/folder", // again, make plural not singular
  passport.authenticate("jwt", { session: false }),
  folderCreate
);
module.exports = router;
