'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Zap, ArrowRight, Home, BookOpen } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-200/40 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-green-200/40 blur-[80px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center">
              <Zap size={20} className="text-green-400 fill-green-400" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="font-heading font-bold text-xl text-[#1A0533]">
            The Plug <span className="text-green-500">AI</span>
          </span>
        </motion.div>

        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <span className="font-heading font-bold text-[120px] md:text-[160px] leading-none bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent select-none">
            404
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-[#1A0533] mb-3">
            This page got left out
          </h1>
          <p className="text-[#6B5A8E] text-base mb-8 leading-relaxed">
            But you don&apos;t have to be. The page you&apos;re looking for doesn&apos;t exist —
            let&apos;s get you back to learning.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-xl text-sm transition-colors duration-200"
          >
            <Home size={16} />
            Back Home
          </Link>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 border border-[#D8D0F7] hover:border-purple-600 text-[#1A0533] hover:text-purple-700 font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:bg-purple-50"
          >
            <BookOpen size={16} />
            Start Learning
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
