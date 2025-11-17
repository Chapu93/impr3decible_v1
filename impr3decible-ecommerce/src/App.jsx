import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'
import { WishlistProvider } from './context/WishlistContext'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import SkipToContent from './components/SkipToContent'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Quote from './pages/Quote'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function KeyboardShortcutsWrapper() {
  useKeyboardShortcuts()
  return null
}

function App() {
  useEffect(() => {
    // Register PWA service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {})
      })
    }
  }, [])

  return (
    <ThemeProvider>
      <ToastProvider>
        <WishlistProvider>
          <CartProvider>
            <Router>
              <ScrollToTop />
              <KeyboardShortcutsWrapper />
              <ScrollProgress />
              <SkipToContent />
              <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-500">
                <Header />
                <main className="flex-grow" id="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Products />} />
                <Route path="/producto/:id" element={<ProductDetail />} />
                <Route path="/carrito" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/cotizar" element={<Quote />} />
              </Routes>
            </main>
            <Footer />
            <BackToTop />
          </div>
        </Router>
      </CartProvider>
    </WishlistProvider>
    </ToastProvider>
    </ThemeProvider>
  )
}

export default App
