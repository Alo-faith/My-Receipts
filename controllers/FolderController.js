const { Folder, User, Receipt } = require("../db/models");

exports.fetchFolder = async (folderId, next) => {
  try {
    const folder = await Folder.findByPk(folderId, {
      include: { model: User, as: "user", attributes: ["id"] },
    });

    return folder;
  } catch (error) {
    next(error);
  }
};

exports.folderList = async (req, res, next) => {
  try {
    folders = await Folder.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: User,
        as: "user",
        // attributes: ["username"],
      },
      // where: { userId: req.user.id },
    });

    res.json(folders);
  } catch (error) {
    next(error);
  }
};

exports.folderUpdate = async (req, res, next) => {
  try {
    console.log(".......req.body", req.body);

    if (req.user.id === req.folder.userId) {
      await req.folder.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.folderDelete = async (req, res, next) => {
  try {
    if (req.user.id === req.folder.userId) {
      await req.folder.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

// create receipt
exports.receiptCreate = async (req, res, next) => {
  try {
    const { folderId } = req.params;
    if (req.file) {
      // req.body.image = `${req.protocol}:${req.get("host")}/media/${req.file.filename}`;
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      // }
    }

    req.body.folderId = folderId;
    console.log(",,,,,,req.body", req.body);

    const newReceipt = await Receipt.create(req.body);
    res.status(201).json(newReceipt);
  } catch (error) {
    next(error);
  }
};

// Create  folder
exports.folderCreate = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    const newFolder = await Folder.create(req.body);
    res.status(201).json(newFolder);
  } catch (error) {
    next(error);
  }
};
