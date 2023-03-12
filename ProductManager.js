const fs = require('fs')

class ProductManager {
    constructor(){
        this.patch = "./productos.txt"
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, imagen, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            imagen,
            code,
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products))
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch,"utf-8")
        return JSON.parse(respuesta);
    }
    
    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2); 
    }




    getProductById = async (id) => {
        let respuesta3 = await this.readProducts()

        if(!respuesta3.find(product => product.id === id)){
            console.log("Producto no encontrado");
        } else {
            console.log(respuesta3.find(product => product.id === id))
        }
    }

    deleteProductById = async (id) => {
        let respuesta3 = await this.readProducts()
        let productFilter = respuesta3.filter(products => products.id != id)

        await fs.writeFile(this.patch, JSON.stringify(productFilter))
        console.log("Producto eliminado");
    }

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductById(id)
        let ProducOld = await this.readProducts()

        let productsModif = [
            {...producto, id},
            ...ProducOld
        ]
        await fs.writeFile(this.patch, JSON.stringify(productsModif))
    }
}
const products = new ProductManager

/* try {
    products.addProduct("Teclado", "Teclado", 20, 'abc', 1, 10);
    products.addProduct("Mouse", "Mouse", 12, 'abc', 2, 15);
    products.addProduct("monitor", "monitor", 16, 'abc', 3, 20);
    products.addProduct("auricular", "auricular", 14, 'abc', 4, 25);
} catch (error) {
  console.error(error.message);
}*/


//products.getProducts();

//products.getProductById()

//products.deleteProductById(4)

/*products.updateProducts ({
    title: 'Mouse gamer',
    description: 'Mouse gamer',
    price: 19,
    imagen: 'abc',
    code: 2,
    stock: 15,
    id: 2
})*/