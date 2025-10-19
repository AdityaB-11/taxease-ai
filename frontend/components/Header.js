import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-green-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-bold text-xl text-gray-900">TaxEase AI</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={`font-medium transition ${router.pathname === '/' ? 'text-orange-600' : 'text-gray-600 hover:text-gray-900'}`}>
              Home
            </Link>
            <Link href="/features" className={`font-medium transition ${router.pathname === '/features' ? 'text-orange-600' : 'text-gray-600 hover:text-gray-900'}`}>
              Features
            </Link>
            <Link href="/pricing" className={`font-medium transition ${router.pathname === '/pricing' ? 'text-orange-600' : 'text-gray-600 hover:text-gray-900'}`}>
              Pricing
            </Link>
            <a href="#faq" className="font-medium text-gray-600 hover:text-gray-900 transition">
              FAQ
            </a>
          </div>

          {/* CTA Button */}
          <Link href="/app-dashboard" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer">
            Launch App
          </Link>
        </div>
      </div>
    </nav>
  )
}
