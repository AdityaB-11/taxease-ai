# 🌐 TaxEase AI Website - Complete Pages Reference

## Page Routing Map

```
localhost:3000/
├── / (index.js)           → Landing Page [PRIMARY]
├── /landing (landing.js)  → Alternative Landing [BACKUP]
├── /app (app.js)          → Chat Dashboard Redirect
├── /features              → Feature Showcase
├── /pricing               → Pricing Tiers
└── Header/Footer          → Navigation on all pages except /app
```

---

## 📄 Page 1: Landing Page (/)

### File: `pages/index.js`
**Purpose**: Convert visitors to users, showcase product value

### Sections
#### Hero Section
- **Headline**: "Tax Filing Made Simple & Smart"
- **Subheading**: Indian AI tax assistant
- **CTA Buttons**: "Start Free" (→ /app), "Watch Demo"
- **Stats**: 10K+ taxpayers, ₹50Cr+ saved, 4.9★ rating
- **Visuals**: Animated blobs (orange/green), demo box with icon
- **Design**: Gradient text, responsive grid (2 cols desktop, 1 mobile)

#### Features Section
- **6 Feature Cards** in 3-column grid:
  1. 🧠 Smart Classification - AI categorizes transactions
  2. 💰 Section 80C Optimizer - ₹1.5L deductions
  3. 🏥 Health Insurance (80D) - ₹1L deductions
  4. 🏠 Home Loan Interest - ₹2L deductions
  5. 📋 GST Compliance - Rate lookups
  6. 📝 ITR Filing Guide - Form selection

- **Design**: White cards, hover shadow effect, icon + text

#### Pricing Section
- **3 Pricing Tiers**:
  1. **Starter** (Free)
     - 1 year analysis
     - Mock AI
     - Basic tips
     - CSV import
  
  2. **Professional** (₹499/mo) ⭐ HIGHLIGHTED
     - Unlimited analysis
     - AI assistant (RAG)
     - Section 80C optimizer
     - Email support
     - ITR guide
     - PDF export
  
  3. **Business** (₹999/mo)
     - Everything in Pro
     - GST tracking
     - Team access (5 users)
     - Priority support
     - Reports
     - API access

- **Design**: Professional card highlighted with gradient, scale transform (105%)

#### FAQ Section
- **6 Questions & Answers**:
  1. "Is my financial data secure?" → Bank-level encryption
  2. "Can I trust AI recommendations?" → RAG + consult CA
  3. "Which banks supported?" → All (CSV import)
  4. "Do you provide CA services?" → No, partner CAs
  5. "What is Section 80C?" → ₹1.5L deduction explanation
  6. (Dynamic based on user interests)

- **Design**: `<details>` elements with smooth expand/collapse, chevron animation

#### CTA Section
- **Text**: "Ready to Save on Taxes?"
- **Subtext**: "Start using TaxEase AI today. It takes 2 minutes"
- **Button**: "Launch App Now" (white on gradient)
- **Design**: Full-width gradient background (orange → green)

---

## 📋 Page 2: Features Page (/features)

### File: `pages/features.js`
**Purpose**: Detailed feature showcase for interested users

### Layout
- **Header**: Stays visible (component injected via _app.js)
- **Main Content**: 6 detailed feature sections
- **Footer**: Company info and links

### Feature Sections
Each feature has:
- **Icon** (emoji)
- **Title** (2-3 words)
- **Description** (1-2 sentences)
- **Sub-features** (4 bullet points)
- **Visual**: Placeholder box with emoji (light gradient bg)

#### Featured Details
1. **Smart Transaction Classification**
   - Recognizes Indian companies
   - Learns from patterns
   - Supports all major banks
   - Real-time classification

2. **Section 80C Optimizer**
   - LIC premium tracking
   - PPF investments
   - ELSS mutual funds
   - NSC detection

3. **Health Insurance Deductions (80D)**
   - Premium amount tracking
   - Family member deductions
   - Age-based optimization
   - Compliance check

4. **Home Loan Interest Tracking (24)**
   - EMI analysis
   - Principal vs Interest split
   - Self-occupied benefits
   - Let-out property support

5. **GST Compliance**
   - GST rate lookup
   - ITC tracking
   - Filing deadlines
   - Compliance calendar

6. **ITR Filing Guide**
   - Form selection
   - Document checklist
   - Filing deadline tracking
   - Amendment guidance

### CTA
- "Ready to Optimize Your Taxes?"
- "Launch App Now" button

---

## 💰 Page 3: Pricing Page (/pricing)

### File: `pages/pricing.js`
**Purpose**: Allow users to compare plans and choose subscription

### Layout
- **Header**: Navigation visible
- **Hero**: "Simple, Transparent Pricing" + tagline
- **Main**: 3 pricing cards in responsive grid
- **Info Box**: "What's Included?" comparison
- **Footer**: Links

### Pricing Tiers

#### Starter (Free)
- **Price**: FREE FOREVER
- **Features**:
  - 1 year tax analysis
  - Mock AI assistant
  - Basic deduction tips
  - Community support
  - CSV import

#### Professional (₹499/month) ⭐
- **Price**: ₹499/month
- **Features**:
  - Unlimited analysis
  - AI tax assistant (RAG)
  - Section 80C optimizer
  - Email support
  - ITR filing guide
  - Tax saving reports
  - PDF export

#### Business (₹999/month)
- **Price**: ₹999/month
- **Features**:
  - Everything in Pro
  - GST compliance tracking
  - Team access (5 users)
  - Priority support
  - Custom reports
  - CA integration
  - API access

### What's Included Box
- **All Plans**: Unlimited uploads, classification, section guidance, GST rates, ITR selection
- **Pro Plans**: RAG AI, real-time optimization, detailed analysis, priority support, advanced export

### Design
- Professional layout with gradient emphasis on recommended tier
- "Get Started" buttons on each card
- Links to /app for signup

---

## 🚀 Page 4: App Dashboard (/app)

### File: `pages/app.js` → redirects to `pages/index.js` Dashboard
**Purpose**: Main chat interface for tax queries

### Header
- **Hidden**: Header/Footer removed on this page (full-screen chat)
- **Access**: Only accessible after clicking "Launch App" CTA

### Sidebar (Left)
- **Title**: "TaxEase AI"
- **Upload Section**:
  - "Upload Bank Statement" button
  - File input (accepts .csv)
  - Status indicator

- **Session Info**:
  - Session ID display
  - Timestamp
  - Clear button

- **Summary Cards**:
  - Green: Total Income
  - Red: Total Expenses
  - Blue: Potential Deductions
  - Each shows amount and count

- **Stats**:
  - Transaction count
  - Date range
  - Last updated

### Main Chat Area (Center/Right)
- **Message History**: Scrollable list
  - User messages: Blue background, right-aligned
  - Assistant messages: White bg, left-aligned
  - Timestamps optional

- **Chat Input**:
  - Text input field
  - Send button
  - Typing indicator while loading

- **Suggested Prompts** (Component):
  - "What are the income tax slabs for 2024-25?"
  - "Which expenses can I claim as deductions?"
  - "How do I file my ITR form?"
  - "What is the GST rate on services?"
  - "How can I save tax under Section 80C?"
  - "What is the deadline for filing ITR?"
  - Clickable cards, pre-fill input

### Functionality
- Session management (localStorage)
- Real-time CSV upload & parsing
- Message persistence
- Auto-scroll to latest message
- Loading states

---

## 🧭 Page 5: Alternative Landing Page (/landing)

### File: `pages/landing.js`
**Purpose**: Backup landing page with same content as index.js

### Status
- ✅ Identical structure to index.js
- ✅ Can be used as fallback
- ✅ Useful for A/B testing in future

### Differences (None by design)
- Same hero, features, pricing, FAQ sections
- Same animations and styling
- Same CTAs

---

## 📦 Shared Components

### Header.js
**Used On**: All pages except `/app`
**Features**:
- Logo with gradient background
- Navigation links (Home, Features, Pricing, FAQ)
- "Launch App" CTA button
- Active route highlighting
- Mobile responsive (hidden on small screens)

### Footer.js
**Used On**: All pages except `/app`
**Features**:
- Brand section with description
- 4 columns: Product, Resources, Legal, Social
- Social media icons (Facebook, Twitter, LinkedIn)
- Copyright notice
- Disclaimer about tax advisory
- Links for Privacy, Terms, Contact

### SuggestedPrompts.js
**Used On**: `/app` (chat dashboard)
**Features**:
- 6 suggested tax questions
- Clickable cards
- On-click: pre-fills input, triggers send
- Responsive grid layout

---

## 🎨 Design System

### Colors
| Use | Color | Hex |
|-----|-------|-----|
| Primary Accent | Orange | #FF8C00 |
| Secondary Accent | Green | #10B981 |
| Text Headings | Gray-900 | #111827 |
| Text Body | Gray-600 | #4B5563 |
| Backgrounds | White/Gray-50 | #FFFFFF/#F9FAFB |
| Borders | Gray-200 | #E5E7EB |

### Typography
- **Font**: Inter (system font stack fallback)
- **H1**: 5xl/6xl, bold, gradient text
- **H2**: 4xl, bold
- **H3**: 2xl, bold
- **Body**: Regular, gray-600
- **Small**: xs/sm, gray-500

### Spacing
- **Container**: max-w-7xl (1280px)
- **Sections**: py-20 (80px vertical)
- **Gap**: gap-8 (32px)
- **Padding**: px-4 (16px, responsive)

### Border & Shadow
- **Cards**: rounded-xl, shadow-sm/hover:shadow-lg
- **Buttons**: rounded-lg
- **Smooth transitions**: 150ms cubic-bezier(0.4, 0, 0.2, 1)

### Animations
- **Blob**: 7s infinite, floating effect
- **Hover**: scale(1.05), shadow lift
- **Fade-in**: 0.5s ease-out
- **Slide-up**: 0.3s ease-out

---

## 📱 Responsive Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Mobile | <768px | Single column, full-width |
| Tablet | 768-1024px | 2 columns, adjusted spacing |
| Desktop | >1024px | Multi-column grids, full layout |

---

## 🔄 Navigation Flow

```
User Visit → Landing (/) 
  ↓ click "Start Free"
→ /app (Chat Dashboard)
  ↓ uploads CSV
→ View Summary + Chat
  ↓ click Header Home
→ / (Landing)
  ↓ click Features
→ /features (Details)
  ↓ click Pricing in nav
→ /pricing (Tiers)
```

---

## ✨ Special Features

### Interactive Elements
- ✅ FAQ accordion with smooth expand/collapse
- ✅ Pricing cards scale on highlighted tier
- ✅ Hover effects on all CTA buttons
- ✅ Active route highlighting in header
- ✅ File upload with drag-drop potential
- ✅ Real-time message display
- ✅ Loading spinners during API calls

### Accessibility
- ✅ Semantic HTML (<section>, <header>, <footer>)
- ✅ High contrast text (gray-900 on white)
- ✅ Clear call-to-action buttons
- ✅ Descriptive link text
- ✅ Mobile touch-friendly sizes (48px min)

### Performance
- ✅ Next.js static generation
- ✅ CSS-in-JS (TailwindCSS utility classes)
- ✅ No external image assets (emojis used)
- ✅ Minimal JavaScript per page
- ✅ Client-side navigation (no full page reloads)

---

## 📊 Pages Summary

| Page | Route | Purpose | Key Sections |
|------|-------|---------|--------------|
| Landing | `/` | Convert visitors | Hero, Features, Pricing, FAQ |
| Features | `/features` | Showcase details | 6 detailed features + CTA |
| Pricing | `/pricing` | Enable purchase | 3 tiers + comparison |
| App | `/app` | Main product | Upload, Summary, Chat |
| Landing Alt | `/landing` | Backup | Same as Landing |

---

**Total Pages**: 5
**Total Components**: 3 (Header, Footer, SuggestedPrompts)
**Total Reusable Sections**: 10+ (hero, features, pricing, FAQ, etc)

🎉 **Website is production-ready and fully functional!**
