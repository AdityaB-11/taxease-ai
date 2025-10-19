import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                🇮🇳 Made for Indian Taxpayers
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Tax Filing Made <span className="bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent">Simple &amp; Smart</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                AI-powered tax assistant that helps Indian professionals save on taxes, understand deductions (Section 80C, 80D), and file ITR with confidence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/app" className="px-8 py-3 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-lg font-semibold hover:shadow-xl transition transform hover:scale-105 inline-block text-center">
                  Start Free
                </Link>
                <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition">
                  Watch Demo
                </button>
              </div>

              <div className="flex gap-8 text-sm">
                <div>
                  <div className="font-bold text-gray-900">10K+</div>
                  <div className="text-gray-600">Taxpayers</div>
                </div>
                <div>
                  <div className="font-bold text-gray-900">₹50Cr+</div>
                  <div className="text-gray-600">Tax Saved</div>
                </div>
                <div>
                  <div className="font-bold text-gray-900">4.9★</div>
                  <div className="text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            <div className="relative h-96 bg-gradient-to-br from-orange-100 to-green-100 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent"></div>
              <div className="absolute inset-4 bg-white rounded-xl shadow-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-gray-600">Upload your bank statements</p>
                  <p className="text-gray-600">Get tax insights instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need for smart tax planning</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🧠',
                title: 'Smart Classification',
                desc: 'AI automatically categorizes your transactions as income, expenses, or deductible items'
              },
              {
                icon: '💰',
                title: 'Section 80C Optimizer',
                desc: 'Identify opportunities to save taxes under Section 80C (up to ₹1.5L deduction)'
              },
              {
                icon: '🏥',
                title: 'Health Insurance Deductions',
                desc: 'Track premiums and optimize Section 80D deductions (up to ₹1L)'
              },
              {
                icon: '🏠',
                title: 'Home Loan Interest',
                desc: 'Monitor home loan interest and claim up to ₹2L deduction under Section 24'
              },
              {
                icon: '📋',
                title: 'GST Compliance',
                desc: 'Understand GST rates, registration requirements, and filing obligations'
              },
              {
                icon: '📝',
                title: 'ITR Filing Guide',
                desc: 'Get personalized guidance on ITR forms and required documents'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: 'Free',
                features: ['1 year analysis', 'Mock AI', 'Basic tips', 'CSV import']
              },
              {
                name: 'Professional',
                price: '₹499/mo',
                features: ['Unlimited analysis', 'AI assistant', 'Section 80C optimizer', 'Email support', 'ITR guide', 'PDF export'],
                highlight: true
              },
              {
                name: 'Business',
                price: '₹999/mo',
                features: ['Everything in Pro', 'GST tracking', 'Team access', 'Priority support', 'Reports', 'API access']
              }
            ].map((plan, i) => (
              <div key={i} className={`rounded-xl p-8 ${plan.highlight ? 'bg-gradient-to-br from-orange-500 to-green-500 text-white shadow-xl transform scale-105' : 'bg-white border border-gray-200'}`}>
                <h3 className={`text-2xl font-bold mb-2 ${!plan.highlight && 'text-gray-900'}`}>{plan.name}</h3>
                <div className={`text-4xl font-bold mb-6 ${!plan.highlight && 'text-gray-900'}`}>{plan.price}</div>
                <ul className="space-y-2 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j}>✓ {f}</li>
                  ))}
                </ul>
                <Link href="/app" className={`block w-full py-2 rounded-lg font-semibold text-center ${plan.highlight ? 'bg-white text-orange-600 hover:bg-gray-100' : 'bg-gradient-to-r from-orange-500 to-green-500 text-white hover:shadow-lg'}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Is my financial data secure?',
                a: 'Yes. We use bank-level encryption, don\'t store sensitive data, and comply with all Indian data protection laws.'
              },
              {
                q: 'Can I trust the AI recommendations?',
                a: 'Our AI is trained on Indian tax law and uses RAG (Retrieval-Augmented Generation) for accuracy. Always consult a CA for complex cases.'
              },
              {
                q: 'Which banks are supported?',
                a: 'We support CSV imports from all Indian banks. Just download your statement and upload it.'
              },
              {
                q: 'Do you provide CA services?',
                a: 'No, we provide guidance and analysis. For filing ITR, you can consult our partner CAs.'
              },
              {
                q: 'What is Section 80C?',
                a: 'Section 80C allows deductions up to ₹1.5L for investments in LIC, PPF, ELSS, NSC, and more.'
              }
            ].map((item, i) => (
              <details key={i} className="group border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                <summary className="font-semibold text-gray-900 flex justify-between items-center">
                  {item.q}
                  <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <p className="text-gray-600 mt-4">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-green-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Save on Taxes?</h2>
          <p className="text-lg mb-8 opacity-90">Start using TaxEase AI today. It takes 2 minutes to get started.</p>
          <Link href="/app" className="inline-block px-8 py-4 bg-white text-orange-600 rounded-lg font-bold hover:shadow-xl transition transform hover:scale-105">
            Launch App Now
          </Link>
        </div>
      </section>
    </div>
  )
}
