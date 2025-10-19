export default function SuggestedPrompts({ onSelect }) {
  const prompts = [
    { icon: '💰', title: 'Income Tax Slabs', prompt: 'What are the current income tax slabs in India?' },
    { icon: '🎯', title: 'Section 80C', prompt: 'How can I save tax under Section 80C?' },
    { icon: '�', title: 'Health Insurance', prompt: 'What deductions can I claim for health insurance?' },
    { icon: '�', title: 'My Deductions', prompt: 'What are my potential tax deductions?' },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 text-left">
      {prompts.map((p, i) => (
        <button
          key={i}
          onClick={() => onSelect(p.prompt)}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-md transition-all text-left"
        >
          <div className="text-2xl mb-2">{p.icon}</div>
          <div className="text-sm font-semibold text-gray-900 mb-1">{p.title}</div>
          <div className="text-xs text-gray-600">{p.prompt}</div>
        </button>
      ))}
    </div>
  )
}
