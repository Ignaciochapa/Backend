import ProductManager from './index.js';

import express from 'express';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const puerto = 8080;

const PM = new ProductManager();

app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`);
  });

// GET con limit

app.get("/products", async (req, res) => {
    try {
      const limit = req.query.limit;
      const products = PM.getProducts();
  
      if (limit) {
        const limitedProducts = products.slice(0, Number(limit));
        res.json(limitedProducts);
      } else {
        res.send(products);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET por ID

app.get("/products/:pid", async (req, res) => {
    try {
      const id = parseInt(req.params.pid);
      const product = PM.getProductById(parseInt(id));
  
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Producto no encontrado" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //OTROS ENDPOINTS
app.get("*", (req, res) => {
    return res
      .status(404)
      .json({ status: "error", msg: "No se encuentra esa ruta", data: {} });
  });