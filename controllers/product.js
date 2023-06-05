const { products, users } = require("../models");
const { Op } = require("sequelize");

class productController {
  findAllProduct = async (req, res) => {
    try {
      const role = req.session.passport.user.role;
      if (role === "2") {
        const users_id = req.session.passport.user.id;
        const data = await products.findAll({
          where: {
            users_id,
          },
          include: [
            {
              model: users,
              attributes: ["email","role"],
            },
          ],
        });
        return res.status(200).render("index", { data, role });
      }
      const data = await products.findAll({
        include: [
          {
            model: users,
            attributes: ["email"],
          },
        ],
      });
      return res.status(200).render("index", { data, role });
    } catch (error) {
      console.log(error);
    }
  };

  createProduct = async (req, res) => {
    try {
      const users_id = req.session.passport.user.id;
      const { nama_produk, keterangan, jumlah } = req.body;
      const gambar = req.file ? req.file.filename : null;
      await products
        .create({ gambar, nama_produk, keterangan, jumlah, users_id })
        .then(() => {
          res.status(200).redirect("/product");
        });
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (req, res) => {
    try {
      const users_id = req.session.passport.user.id;
      const { id } = req.params;
      await products
        .update(req.body, {
          where: {
            [Op.and]: [{ id: id }, { users_id: users_id }],
          },
        })
        .then(() => {
          res.status(200).redirect("/product");
        });
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      await products
        .destroy({
          where: {
            id: id,
          },
        })
        .then(() => {
          res.status(200).redirect("/product");
        });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = productController;
