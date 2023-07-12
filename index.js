class ProductManager {
    constructor() {
        this.products = []
    }

    getProducts() {
        return this.products
    }

    // isInArray(array, producto) {
    //     return array.some(prod => producto === prod)
    // }

    addProduct(title, description, price, thumbnail, stock) {
        const product = {code:this.getId(), title:title, description:description, price:price, thumbnail:thumbnail, stock:stock}
        
        // Validar que todos los campos sean obligatorios
    if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.stock
      ) {
        console.log("Todos los campos son obligatorios");
        return;
      }

      // Validar que no se repita el código
    const codeAlreadyExists = this.products.some(
        (prod) => prod.code === product.code
      );
  
      if (codeAlreadyExists) {
        console.log(`Ya existe un producto con el código ${product.code}`);
        return;
      }
        //const isInArray = this.products.find((prod) => prod.code === product.code)
        // if (this.products.includes(product)) {
        //     console.log('el producto ya se encuentra en el array')
        // } else {
        //     this.products.push(product)
        // }
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
PM.addProduct('titulo prueba','descripción prueba', 200, 'imagen prueba', 25);
//console.log(PM.getProducts());
PM.addProduct('titulo prueba','descripción prueba', 200, 'imagen prueba', 25);
PM.addProduct('titulo prueba','descripción prueba', 200, 'imagen prueba', 25);
console.log(PM.getProducts());
console.log(PM.getProductById(3))
