import fs from "fs";

export default class ProductManager {
    constructor() {
        this.path = "productos.json"
        this.products = []
        this.loadProducts()
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
      const product = this.products.find((product) => product.id === id);
      if (product) {
        return product;
      }
    }

    async addProduct(code, title, description, price, thumbnail, stock) {
        const product = {code:code, title:title, description:description, price:price, thumbnail:thumbnail, stock:stock}

        // Validar el tipo de dato de los campos
    if (typeof product.title !== "string") {
        console.log("El campo 'title' debe ser una cadena de caracteres");
        return;
      }
  
      if (typeof product.description !== "string") {
        console.log("El campo 'description' debe ser una cadena de caracteres");
        return;
      }

      if (typeof product.code !== "string") {
        console.log("El campo 'code' debe ser una cadena de caracteres");
        return;
      }
  
      if (typeof product.price !== "number") {
        console.log("El campo 'price' debe ser un número");
        return;
      }
  
      if (typeof product.thumbnail !== "string") {
        console.log("El campo 'thumbnail' debe ser una cadena de caracteres");
        return;
      }
  
      if (typeof product.stock !== "number") {
        console.log("El campo 'stock' debe ser un número");
        return;
      }
      // Validar que no se repita el código
    const codeExists = this.products.some(
        (prod) => prod.code === product.code
      );
  
      if (codeExists) {
        console.log(`Ya existe un producto con el código ${product.code}`);
      }

      // Agregar el producto al arreglo con un id autoincrementable
    const newProduct = {
        ...product,
        id: this.products.length + 1,
      };
  
      this.products.push(newProduct);
      this.saveProducts()
      console.log(`Producto ${newProduct.id} - ${newProduct.title} agregado`);
    }

    loadProducts() {
      try {
        const data = fs.readFileSync(this.path, "utf-8");
        if (data) {
          this.products = JSON.parse(data);
        }
      } catch (err) {
        console.log(`Error al leer el archivo: ${err.message}`);
      }
    }

    saveProducts() {
      try {
        fs.writeFileSync(this.path, JSON.stringify(this.products), "utf-8");
      } catch (err) {
        console.log(`Error al escribir archivo: ${err.message}`);
      }
    }

    deleteProduct(id) {
      const productIndex = this.products.findIndex(
        (product) => product.id === id
      );
      if (productIndex === -1) {
        console.log(`Id: ${id} no encontrado`);
        return;
      }
  
      this.products.splice(productIndex, 1);
      this.saveProducts();
      console.log(`Id: ${id} eliminado`);
    }

    async updateProduct(id, updatedProduct) {
      const productIndex = this.products.findIndex(
        (product) => product.id === id
      );
      if (productIndex === -1) {
        console.log(`Producto ${id} no encontrado`);
        return;
      }
  
      this.products[productIndex] = {
        ...updatedProduct,
        id,
      };
  
      this.saveProducts();
      console.log(`Producto ${id} actualizado`);
    }
}
