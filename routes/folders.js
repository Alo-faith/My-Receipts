const express = require("express");
const upload = require("../middleware/multer");
const passport = require("passport");

const {
  folderList,
  folderUpdate,
  folderDelete,
  fetchFolder,
  receiptCreate,
  folderCreate,
} = require("../controllers/FolderController");

const router = express.Router();

router.param("folderId", async (req, res, next, folderId) => {
  const folder = await fetchFolder(folderId, next);
  if (folder) {
    req.folder = folder;
    next();
  } else {
    const error = new Error("Folder Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("/", folderList);
// create Folder
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  folderCreate
);
router.put(
  "/:folderId",
  passport.authenticate("jwt", { session: false }),
  folderUpdate
);
router.delete(
  "/:folderId",
  passport.authenticate("jwt", { session: false }),
  folderDelete
);

router.post(
  "/:folderId/receipts",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  receiptCreate
);

module.exports = router;
