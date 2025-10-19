import { useState } from 'react'
import Link from 'next/link'

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600">Choose the plan that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {[
              {
                name: 'Starter',
                price: 'Free',
                period: 'Forever',
                features: ['1 year tax analysis', 'Mock AI assistant', 'Basic deduction tips', 'Community support', 'CSV import'],
                cta: 'Get Started',
                highlight: false
              },
              {
                name: 'Professional',
                price: '₹499',
                period: 'Per Month',
                features: ['Unlimited analysis', 'AI tax assistant (RAG)', 'Section 80C optimizer', 'Email support', 'ITR filing guide', 'Tax saving reports', 'PDF export'],
                cta: 'Start Free Trial',
                highlight: true
              },
              {
                name: 'Business',
                price: '₹999',
                period: 'Per Month',
                features: ['Everything in Pro', 'GST compliance tracking', 'Team access (5 users)', 'Priority support', 'Custom reports', 'CA integration', 'API access'],
                cta: 'Contact Sales',
                highlight: false
              },
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl p-8 transition ${plan.highlight ? 'bg-gradient-to-br from-orange-500 to-green-500 text-white shadow-2xl transform scale-105' : 'bg-white border border-gray-200 hover:shadow-lg'}`}>
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? '' : 'text-gray-900'}`}>{plan.name}</h3>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.highlight ? '' : 'text-gray-900'}`}>{plan.price}</span>
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
                <Link href="/app" className={`block w-full py-3 rounded-lg font-semibold transition text-center ${plan.highlight ? 'bg-white text-orange-600 hover:bg-gray-100' : 'bg-gradient-to-r from-orange-500 to-green-500 text-white hover:shadow-lg'}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-green-50 rounded-2xl p-12 border border-orange-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">All Plans Include</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Unlimited CSV uploads</li>
                  <li>✓ Transaction classification (Income/Expense/Deductible)</li>
                  <li>✓ Indian tax section guidance</li>
                  <li>✓ GST rate information</li>
                  <li>✓ ITR form selection guidance</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Pro Plan Only</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ RAG-powered AI assistant</li>
                  <li>✓ Real-time tax optimization</li>
                  <li>✓ Detailed deduction analysis</li>
                  <li>✓ Priority support</li>
                  <li>✓ Advanced export options</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
