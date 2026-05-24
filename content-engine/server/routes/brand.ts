import { Router } from 'express'
import { ensureDefaultBrand, upsertBrand } from '../models/brand.js'

const router = Router()

router.get('/', (req, res) => {
  const brand = ensureDefaultBrand()
  res.json(brand)
})

router.put('/', (req, res) => {
  const updated = upsertBrand(req.body)
  res.json(updated)
})

export default router
