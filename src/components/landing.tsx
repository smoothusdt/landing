'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Wallet, ShieldCheck, Zap, Globe, Menu, X, ChevronDown, DollarSign } from 'lucide-react'
import Link from "next/link"

export function LandingPageComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.95])

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const floatingAnimation = {
    y: ['-4%', '4%'],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5 bg-cover bg-center mix-blend-overlay pointer-events-none" />
      <header className="px-4 lg:px-6 h-20 flex items-center fixed w-full z-50 transition-all duration-300">
        <div className="container mx-auto flex items-center justify-between relative z-10">
          <Link className="flex items-center justify-center" href="#">
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Wallet className="h-10 w-10 text-[#339192]" />
            </motion.div>
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="ml-2 text-2xl font-bold bg-gradient-to-r from-[#339192] to-[#41b5b6] text-transparent bg-clip-text"
            >
              Smooth USDT
            </motion.span>
          </Link>
          <nav className="hidden md:flex gap-8">
            {['Features', 'No TRX', 'Security', 'Download'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
              >
                <Link className="text-sm font-medium hover:text-[#339192] transition-colors relative group" href={`#${item.toLowerCase().replaceAll(' ', '-')}`}>
                  {item}
                  <motion.span
                    className="absolute left-0 bottom-0 w-full h-0.5 bg-[#339192]"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>
          <Button
            className="md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full space-y-8">
              <Button
                className="absolute top-4 right-4"
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
              {['Features', 'Security', 'Download'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * (index + 1), type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <Link
                    className="text-2xl font-medium hover:text-[#339192] transition-colors"
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 xl:py-56 overflow-hidden">
          <motion.div
            style={{ opacity, scale }}
            className="container mx-auto px-4 md:px-6 relative z-10"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="flex flex-col items-center space-y-8 text-center"
            >
              <motion.div variants={fadeInUpVariants} className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  <span className="bg-gradient-to-r from-[#339192] to-[#41b5b6] text-transparent bg-clip-text">
                    Secure Your Crypto
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
                    with Smooth USDT
                  </span>
                </h1>
                <motion.p
                  variants={fadeInUpVariants}
                  className="mx-auto max-w-[700px] text-gray-400 md:text-xl dark:text-gray-300"
                >
                  The most secure and user-friendly crypto wallet for USDT TRC-20. No need to buy and manage TRX tokens.
                </motion.p>
              </motion.div>
              <motion.div
                variants={fadeInUpVariants}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <Button onClick={() => window.location.href = "https://app.smoothusdt.com"} className="bg-[#339192] hover:bg-[#41b5b6] text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#339192]/50">
                  Get Started
                </Button>
                <Button onClick={() => window.location.href = "https://info.smoothusdt.com"} variant="outline" className="border-[#339192] text-[#339192] hover:bg-[#339192] hover:text-white transition-all duration-300 rounded-full">
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            animate={floatingAnimation}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="h-12 w-12 text-[#339192] animate-bounce" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 pointer-events-none" />
        </section>
        <section id="features" className="w-full py-20 md:py-32 bg-gray-800 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-16 bg-gradient-to-r from-[#339192] to-[#41b5b6] text-transparent bg-clip-text"
            >
              Key Features
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                { icon: ShieldCheck, title: "Bank-Grade Security", description: "Your assets are protected with state-of-the-art encryption and smart contract verification." },
                { icon: Zap, title: "Easy Transactions", description: "Sending money from Smooth USDT is easy. Transfer fee is a constant of 1.5 USDT. No need to buy TRX like in other wallets." },
                { icon: Globe, title: "Global Transfers", description: "Send money to any USDT TRC-20 wallet around the world. Deposit / withdraw funds from any exchange." }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={fadeInUpVariants}
                  custom={index}
                  className="flex flex-col items-center space-y-4 p-6 bg-gray-700 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#339192]/20"
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 * (index + 1), type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <feature.icon className="h-12 w-12 text-[#339192]" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-[#339192]">{feature.title}</h3>
                  <p className="text-sm text-gray-300 text-center">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-900 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
        </section>
        <section id="no-trx" className="w-full py-20 md:py-32 bg-gray-900 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
                className="space-y-4"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-[#339192] to-[#41b5b6] text-transparent bg-clip-text">No need to buy TRX</h2>
                <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed">
                  The main advantage of Smooth USDT over other wallets is that you dont ever need to buy TRX tokens to pay transaction fees to the blockchain. All fees are paid in USDT directly.
                </p>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerChildren}
                className="flex flex-col justify-center space-y-4 bg-gray-800 p-8 rounded-xl shadow-lg"
              >
                <ul className="grid gap-4">
                  {["No need to buy TRX tokens", "All fees are paid directly in USDT", "Fixed cost of 1.5 USDT per transfer", "Receive and send USDT to anyone"].map((item, index) => (
                    <motion.li
                      key={item}
                      variants={fadeInUpVariants}
                      custom={index}
                      className="flex items-center space-x-2"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 * (index + 1), type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <DollarSign className="h-5 w-5 text-[#339192]" />
                      </motion.div>
                      <span className="text-gray-200">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
          <motion.div
            className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5 bg-cover bg-center mix-blend-overlay pointer-events-none"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          />
        </section>
        <section id="security" className="w-full py-20 md:py-32 bg-gray-900 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
                className="space-y-4"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-[#339192] to-[#41b5b6] text-transparent bg-clip-text">Your Security is Our Priority</h2>
                <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed">
                  We employ cutting-edge security measures to ensure your digital assets remain safe and secure at all times.
                  Our wallet uses advanced encryption, secure key management, and regular security audits to protect your investments.
                </p>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerChildren}
                className="flex flex-col justify-center space-y-4 bg-gray-800 p-8 rounded-xl shadow-lg"
              >
                <ul className="grid gap-4">
                  {["256-bit AES encryption", "Multi-factor authentication", "Biometric security options", "Regular third-party security audits"].map((item, index) => (
                    <motion.li
                      key={item}
                      variants={fadeInUpVariants}
                      custom={index}
                      className="flex items-center space-x-2"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 * (index + 1), type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <ShieldCheck className="h-5 w-5 text-[#339192]" />
                      </motion.div>
                      <span className="text-gray-200">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
          <motion.div
            className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5 bg-cover bg-center mix-blend-overlay pointer-events-none"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          />
        </section>
        <section id="download" className="w-full py-20 md:py-32 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="flex flex-col items-center justify-center space-y-8 text-center"
            >
              <motion.div variants={fadeInUpVariants} className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-[#339192] to-[#41b5b6] text-transparent bg-clip-text">
                  Ready to Secure Your Crypto?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl">
                  Download Smooth USDT Wallet now and send / receive USDT TRC-20 easily and securely.
                </p>
              </motion.div>
              <motion.div variants={fadeInUpVariants} className="w-full max-w-md space-y-4">
                <Button onClick={() => window.location.href = "https://app.smoothusdt.com"} type="submit" className="bg-[#339192] hover:bg-[#41b5b6] text-white font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#339192]/50">
                  Download Smooth USDT
                </Button>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5 bg-cover bg-center mix-blend-overlay pointer-events-none"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
          />
        </section>
      </main>
      <footer className="w-full py-8 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <motion.p variants={fadeInUpVariants} className="text-sm text-gray-400">
              © 2024 Smooth USDT Wallet. All rights reserved.
            </motion.p>
            <motion.nav variants={fadeInUpVariants} className="flex gap-4 sm:gap-6">
              {["Terms of Service", "Privacy Policy", "Contact Us"].map((item) => (
                <Link key={item} className="text-sm hover:text-[#339192] transition-colors" href="#">
                  {item}
                </Link>
              ))}
            </motion.nav>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}