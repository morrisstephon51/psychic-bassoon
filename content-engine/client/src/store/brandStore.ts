import { create } from 'zustand'
import type { Brand } from '../types'

interface BrandStore {
  brand: Brand | null
  setBrand: (brand: Brand) => void
}

export const useBrandStore = create<BrandStore>((set) => ({
  brand: null,
  setBrand: (brand) => set({ brand }),
}))
