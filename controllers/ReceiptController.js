const { Folder, Receipt } = require("../db/models");

exports.fetchReceipt = async (receiptId, next) => {
  try {
    const receipt = await Receipt.findByPk(receiptId, {
      include: { model: Folder, as: "folder", attributes: ["userId"] },
    });
    return receipt;
  } catch (error) {
    next(error);
  }
};

exports.receiptList = async (req, res, next) => {
  try {
    const receipt = await Receipt.findAll({
      // attributes: { exclude: ["folderId", "createdAt", "updatedAt"] }, if not being used remove it
      include: {
        model: Folder,
        as: "folder",
      },
    });
    res.json(receipt);
  } catch (error) {
    next(error);
  }
};

exports.receiptUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${process.env.PORT}:${req.get("host")}/media/${req.file.filename}`;
    }

    //   if (req.file) {
    //     req.body.image = ${req.protocol}}://${req.get("host")}/media/${
    //       req.file.filename
    //     };

    // ${req.protocol}
    await req.receipt.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.receiptDelete = async (req, res, next) => {
  try {
    await req.receipt.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
