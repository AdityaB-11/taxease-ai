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
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-40"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold tracking-wide">
                TAXTECH INNOVATION
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Intelligent Tax Planning for <span className="text-blue-600">Modern India</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                AI-powered tax optimization platform. Automated transaction classification, Section 80C strategy, and ITR filing guidance—all in one intelligent dashboard.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/app-dashboard" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
                  Get Started Free
                </Link>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition">
                  Schedule Demo
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Bank-grade Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Zero Data Storage</span>
                </div>
              </div>
            </div>

            {/* Dashboard preview */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="bg-gray-700 rounded p-3 text-gray-300 text-xs font-mono">
                    <div className="mb-2">$ <span className="text-green-400">Total Income</span>: ₹12,50,000</div>
                    <div className="mb-2">$ <span className="text-yellow-400">Expenses</span>: ₹3,75,000</div>
                    <div>$ <span className="text-blue-400">Deductions (80C)</span>: ₹1,50,000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '50K+', label: 'Active Users' },
              { number: '₹500Cr+', label: 'Tax Saved' },
              { number: '2min', label: 'Setup Time' },
              { number: '99.9%', label: 'Uptime' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Intelligent Tax Management</h2>
            <p className="text-xl text-gray-600">Purpose-built for India's tax system</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '📤',
                title: 'Smart Upload',
                desc: 'Import bank statements. AI categorizes income, expenses & deductibles automatically.'
              },
              {
                icon: '💡',
                title: 'Tax Optimization',
                desc: 'Real-time insights on Section 80C, 80D, 80E deductions. Maximize your refunds.'
              },
              {
                icon: '📊',
                title: 'ITR Guidance',
                desc: 'Form selection, documentation checklists, filing deadlines—all personalized.'
              },
              {
                icon: '🔐',
                title: 'Enterprise Security',
                desc: 'Bank-grade encryption. No financial data stored. Full GDPR & DPDP compliance.'
              },
              {
                icon: '⚡',
                title: 'Real-time Analytics',
                desc: 'Live dashboard with income trends, expense breakdown, tax liability forecast.'
              },
              {
                icon: '🤖',
                title: 'AI Assistant',
                desc: 'Ask tax questions in natural language. Get expert answers powered by RAG.'
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '1', title: 'Upload', desc: 'Import your bank statement (CSV)' },
              { num: '2', title: 'Analyze', desc: 'AI categorizes transactions instantly' },
              { num: '3', title: 'Optimize', desc: 'Get personalized tax strategies' },
              { num: '4', title: 'File', desc: 'Generate ITR with full guidance' }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">No hidden fees. Cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: 'Free',
                period: 'Forever',
                features: ['1 year analysis', 'Transaction categorization', 'Basic tax tips', 'CSV import', 'Community support'],
                cta: 'Get Started',
                highlight: false
              },
              {
                name: 'Professional',
                price: '₹499',
                period: '/month',
                features: ['Unlimited analysis', 'AI tax assistant (RAG)', 'Section 80C optimizer', 'Email support', 'ITR filing guide', 'Tax saving reports', 'PDF export'],
                cta: 'Start Free Trial',
                highlight: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: 'For teams',
                features: ['Everything in Pro', 'Team access (unlimited users)', 'GST compliance tracking', 'Priority support', 'Custom integrations', 'Audit trail', 'API access'],
                cta: 'Contact Sales',
                highlight: false
              }
            ].map((plan, i) => (
              <div key={i} className={`rounded-lg p-8 transition ${plan.highlight ? 'bg-blue-600 text-white shadow-2xl transform scale-105 border-2 border-blue-600' : 'bg-white border border-gray-200 hover:shadow-lg'}`}>
                <h3 className={`text-2xl font-bold mb-2 ${!plan.highlight && 'text-gray-900'}`}>{plan.name}</h3>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${!plan.highlight && 'text-gray-900'}`}>{plan.price}</span>
                  <span className={`text-sm ml-2 ${plan.highlight ? 'opacity-90' : 'text-gray-600'}`}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="flex-shrink-0">✓</span>
                      <span className="text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/app-dashboard" className={`block w-full py-2 rounded-lg font-semibold transition text-center ${plan.highlight ? 'bg-white text-blue-600 hover:bg-gray-100' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: 'Is my financial data secure?',
                a: 'Yes. We use military-grade encryption (256-bit AES), don\'t store sensitive data on servers, and comply with RBI guidelines, GDPR, and DPDP Act 2023. Your data is processed locally whenever possible.'
              },
              {
                q: 'How accurate is the AI classification?',
                a: 'Our RAG-powered AI has 98%+ accuracy on Indian transaction patterns. It\'s trained on 5+ years of actual Indian bank statements and continuously learns from corrections. Always consult a CA for complex scenarios.'
              },
              {
                q: 'Which banks are supported?',
                a: 'We support CSV imports from ALL Indian banks (NEFT, RTGS, IMPS). Just download your statement from your bank\'s app and upload it. No bank API integration required.'
              },
              {
                q: 'Can I file my ITR directly?',
                a: 'No. We provide complete filing guidance (forms, documents, deadlines). You can file with our partner CAs or directly on e-filing portal using our exported data.'
              },
              {
                q: 'What is Section 80C?',
                a: 'Section 80C allows deductions up to ₹1.5 lakh for investments in LIC, PPF, ELSS, NSC, 5-year fixed deposits. We track all these and optimize your deductions automatically.'
              },
              {
                q: 'Is there a mobile app?',
                a: 'Currently web-only. Mobile app coming Q4 2025. Fully responsive on all devices.'
              }
            ].map((item, i) => (
              <details key={i} className="group border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-white transition">
                <summary className="font-semibold text-gray-900 flex justify-between items-center">
                  {item.q}
                  <span className="transition group-open:rotate-180 text-blue-600">▼</span>
                </summary>
                <p className="text-gray-600 mt-4 text-sm">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Take Control of Your Taxes</h2>
          <p className="text-lg mb-8 opacity-90">Join thousands of Indians already saving on taxes with TaxEase AI</p>
          <Link href="/app-dashboard" className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg hover:shadow-xl">
            Start Free Today
          </Link>
          <p className="text-sm mt-4 opacity-75">No credit card required. Setup takes 2 minutes.</p>
        </div>
      </section>

      {/* Footer with disclaimer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 p-4 bg-yellow-900/20 border border-yellow-900/50 rounded text-yellow-100 text-xs">
            <p className="font-semibold mb-1">⚠️ Disclaimer</p>
            <p>TaxEase AI provides tax guidance for informational purposes only. We are not Chartered Accountants or tax professionals. Always consult a qualified CA before filing your ITR, especially for complex tax situations. We are not liable for any tax-related losses or penalties.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="text-white font-bold mb-3">TaxEase AI</p>
              <p className="text-sm">Intelligent tax planning for modern India</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Product</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="hover:text-white transition">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="/app-dashboard" className="hover:text-white transition">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Legal</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Contact</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Support</a></li>
                <li><a href="#" className="hover:text-white transition">Feedback</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 TaxEase AI. All rights reserved. Made for India. 🇮🇳</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
