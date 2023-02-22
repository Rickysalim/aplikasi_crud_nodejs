const { products } = require("../models");

class productController {
  findAllProduct = async (req, res) => {
    try {
      const data = await products.findAll();
      return res.status(200).render("index", { data });
    } catch (error) {
      console.log(error);
    }
  };

  createProduct = async (req, res) => {
    try {
      await products.create(req.body).then(() => {
        res.status(200).redirect("/product");
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      await products
        .update(req.body, {
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
