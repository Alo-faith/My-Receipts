const express = require("express");
const passport = require("passport");
const {
  receiptList,
  receiptUpdate,
  receiptDelete,
  fetchReceipt,
} = require("../controllers/ReceiptController");
const upload = require("../middleware/multer");
const router = express.Router();

router.param("receiptId", async (req, res, next, receiptId) => {
  const receipt = await fetchReceipt(receiptId, next);

  if (receipt) {
    req.receipt = receipt;
    next();
  } else {
    const error = new Error("Receipt Not Found");
    error.status = 404;
    next(error);
  }
});
// REVIEW: put spaces between routes
// REVIEW: why doesn't the `put` have a jwt strategy
router.get("/", receiptList);
router.put("/:receiptId", upload.single("image"), receiptUpdate);
router.delete(
  "/:receiptId",
  passport.authenticate("jwt", { session: false }),
  receiptDelete
);

module.exports = router;
