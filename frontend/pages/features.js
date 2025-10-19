import Link from 'next/link'

export default function Features() {
  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Powerful Features</h1>
            <p className="text-xl text-gray-600">Everything you need for smart tax filing</p>
          </div>

          <div className="space-y-12">
            {[
              {
                title: 'Smart Transaction Classification',
                desc: 'AI automatically categorizes your transactions as income, business expenses, or tax-deductible items.',
                features: ['Recognizes Indian companies', 'Learns from your patterns', 'Supports all major banks', 'Real-time classification']
              },
              {
                title: 'Section 80C Optimizer',
                desc: 'Identify opportunities to save taxes under Section 80C (up to ₹1.5 lakh deduction).',
                features: ['LIC premium tracking', 'PPF investments', 'ELSS mutual funds', 'NSC detection']
              },
              {
                title: 'Health Insurance Deductions (80D)',
                desc: 'Track health insurance premiums and optimize Section 80D deductions (up to ₹1 lakh).',
                features: ['Premium amount tracking', 'Family member deductions', 'Age-based optimization', 'Compliance check']
              },
              {
                title: 'Home Loan Interest Tracking (Section 24)',
                desc: 'Monitor your home loan interest and claim up to ₹2 lakh deduction.',
                features: ['EMI analysis', 'Principal vs Interest split', 'Self-occupied benefits', 'Let-out property support']
              },
              {
                title: 'GST Compliance',
                desc: 'Understand GST rates, registration requirements, and compliance obligations.',
                features: ['GST rate lookup', 'ITC tracking', 'Filing deadlines', 'Compliance calendar']
              },
              {
                title: 'ITR Filing Guide',
                desc: 'Get personalized guidance on which ITR form to use and what documents you need.',
                features: ['Form selection', 'Document checklist', 'Filing deadline tracking', 'Amendment guidance']
              },
            ].map((feature, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-8 items-start pb-12 border-b border-gray-200">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{feature.title}</h2>
                  <p className="text-lg text-gray-600 mb-6">{feature.desc}</p>
                  <ul className="space-y-2">
                    {feature.features.map((f, j) => (
                      <li key={j} className="flex gap-3 text-gray-700">
                        <span className="flex-shrink-0 text-orange-500 font-bold">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-orange-100 to-green-100 rounded-xl p-8 h-64 flex items-center justify-center">
                  <div className="text-6xl opacity-30">{i % 3 === 0 ? '📊' : i % 3 === 1 ? '💰' : '🎯'}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-orange-500 to-green-500 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Taxes?</h2>
            <p className="text-lg mb-8 opacity-90">Start using TaxEase AI today and save on taxes</p>
            <Link href="/app" className="inline-block px-8 py-4 bg-white text-orange-600 rounded-lg font-bold hover:shadow-xl transition">
              Launch App Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
