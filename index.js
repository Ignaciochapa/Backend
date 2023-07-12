class ProductManager {
    constructor() {
        this.products = []
    }

    getProducts() {
        return this.products
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
        console.log("El campo 'description' debe ser una cadena de caracteres");
        return;
      }
  
      if (typeof product.price !== "number") {
        console.log("El campo 'price' debe ser un número");
        return;
      }
  
      if (typeof product.thumbnail !== "string") {
        console.log("El campo 'code' debe ser una cadena de caracteres");
        return;
      }
  
      if (typeof product.stock !== "number") {
        console.log("El campo 'stock' debe ser un número");
        return;
      }
      // Validar que no se repita el código
    const codeAlreadyExists = this.products.some(
        (prod) => prod.code === product.code
      );
  
      if (codeAlreadyExists) {
        console.log(`Ya existe un producto con el código ${product.code}`)
      }

      // Agregar el producto al arreglo con un id autoincrementable
    const newProduct = {
        ...product,
        id: this.products.length + 1,
      };
  
      this.products.push(newProduct);
      console.log(`Producto ${newProduct.id} - ${newProduct.title} agregado`);
    }
    

    getId() {
        let idCero = 0
        this.products.forEach(product => {
            idCero = product.code > idCero && product.code
        })

        return (idCero + 1)
    }

    getProductById(id) {
        return new Promise((resolve, reject) => {
            const item = this.products.find((product) => product.code === id)
            if (item) {
                resolve(item)
            } else {
                reject('No hay productos en el array con ese ID')
            }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
}

const PM = new ProductManager();
console.log(PM.getProducts());
PM.addProduct('abc1234','titulo prueba','descripción prueba', 200, 'imagen prueba', 25);
console.log(PM.getProducts());
PM.addProduct('abc1234','titulo prueba','descripción prueba', 200, 'imagen prueba', 25);
console.log(PM.getProducts());
console.log(PM.getProductById(3))
