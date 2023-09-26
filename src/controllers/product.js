import products from '../models/product.js'

const product = {
    get: (req, res) => {
        res.json(products)
    }
}

export default product