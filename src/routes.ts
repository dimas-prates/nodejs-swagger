import { Router } from "express"
import { randomUUID } from "crypto"
import { ensuredAuthenticated } from './middleware'

const router = Router()

interface ProductsDTO {
    name: string;
    description: string;
    price: number;
    id: string;
}

const products: ProductsDTO[] = []

router.get("/products/findByName", (req, res) => {
    const { name } = req.query
    const product = products.filter(p => p.name.toLowerCase().includes(String(name).toLowerCase()))
    if (!product) {
        res.status(400).json({ message: "product not found" })
    }
    return res.json(product)
})
router.get("/products/:id", (req, res) => {
    const { id } = req.params
    const product = products.find(product => product.id === id)
    return res.json(product)
})

router.post("/products", ensuredAuthenticated, (req, res) => {
    const { name, description, price } = req.body
    const productAlreadyExists = products.find((product) => { product.name === name })
    if (productAlreadyExists) {
        return res.status(400).json({ message: "Product exists already" })
    }

    const product: ProductsDTO = {
        description,
        name,
        price,
        id: randomUUID()
    }
    products.push(product)
    return res.json(product)
})

router.put("/products/:id", ensuredAuthenticated, (req, res) => {
    const { id } = req.params
    const { name, description, price } = req.body
    const productIndex = products.findIndex(product => product.id === id)
    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" })
    }
    const product: ProductsDTO = Object.assign({
        id,
        name,
        description,
        price
    })

    products[productIndex] = product
    console.log(req.params, req.body)
    return res.json(product)
})

export { router }