import { Router } from 'express'
import product from '../controllers/product.js'

// auth
import auth from './auth/auth.js'

export const router = Router()

router.get('/', auth, product.get)