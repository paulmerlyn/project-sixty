# Project-60

Welcome to Project 60! This is a Next.js-based site that white-labels a variant of the BBC's popular Just-a-Minute game format.

## 🎯 Project Overview

This site is built with:
- **Next.js 14+** with the App Router
- **TypeScript** for type safety
- **Vercel** for hosting and deployment

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Guide](#development-guide)
- [Environment Variables](#environment-variables)
- [Stripe Integration](#stripe-integration)
- [Deployment](#deployment)
- [Key Concepts](#key-concepts-for-next-js-beginners)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager
- A Stripe account (for payment processing)
- A Vercel account (for deployment)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then edit `.env.local` and add your Stripe API keys.

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
project-60/
├── src/
│   ├── app/                    # App Router directory (Next.js 14+)
│   │   ├── layout.tsx          # Root layout (wraps all pages)
│   │   ├── page.tsx            # Home page (/)
│   │   ├── globals.css         # Global styles
│   │   └── api/                # API routes (for Stripe webhooks, etc.)
│   ├── components/             # Reusable React components
│   ├── lib/                    # Utility functions and helpers
│   └── styles/                 # Additional stylesheets
├── public/                     # Static files (images, game HTML, etc.)
├── .github/
│   └── copilot.yml            # GitHub Copilot configuration
├── project-60-game.html    # The game file
├── package.json               # Project dependencies
├── next.config.js             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── .env.local.example         # Example environment variables
└── README.md                  # This file
```

### Understanding the App Router

Next.js 14+ uses the **App Router**, which is different from the older Pages Router:

- **`src/app/layout.tsx`**: Defines the HTML structure and common elements (header, footer) for all pages
- **`src/app/page.tsx`**: The home page component (renders at `/`)
- **`src/app/about/page.tsx`**: Would create an `/about` route
- **`src/app/api/`**: Contains API route handlers (server-side code)

## 💻 Development Guide

### Adding a New Page

To add a new page (e.g., an About page):

1. Create a new folder in `src/app/` with the route name:
   ```
   src/app/about/
   ```

2. Create a `page.tsx` file inside:
   ```typescript
   export default function About() {
     return (
       <div className="container">
         <h1>About Project 60</h1>
         <p>Your content here...</p>
       </div>
     )
   }
   ```

3. The page will automatically be available at `/about`

### Creating Components

Store reusable components in `src/components/`:

```typescript
// src/components/PriceCard.tsx
export default function PriceCard({ price, currency }: { 
  price: number; 
  currency: string 
}) {
  return (
    <div className="card">
      <h3>{currency} {price}</h3>
    </div>
  )
}
```

Then import and use:
```typescript
import PriceCard from '@/components/PriceCard'
```

### Styling

- **Global styles**: Edit `src/app/globals.css`
- **Component-specific styles**: Use CSS modules or inline styles
- **Tailwind CSS**: Can be added later if needed

## 🔐 Environment Variables

Create a `.env.local` file (never commit this!) with:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Important Notes:**
- Variables prefixed with `NEXT_PUBLIC_` are available in the browser
- Other variables are only available on the server
- Use test keys during development, switch to live keys in production

## 💳 Stripe Integration

### Setting Up Stripe

1. **Create a Stripe account** at [stripe.com](https://stripe.com)

2. **Get your API keys** from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)

3. **Create products and prices** in Stripe for different currencies:
   - USD pricing
   - GBP pricing
   - INR pricing

4. **Set up webhooks** to handle payment confirmations:
   - Endpoint: `https://your-domain.com/api/webhooks/stripe`
   - Events to listen for: `checkout.session.completed`, `payment_intent.succeeded`

### Next Steps for Stripe Integration

You'll need to create:
1. **Checkout API route** (`src/app/api/checkout/route.ts`) - Creates Stripe checkout sessions
2. **Webhook handler** (`src/app/api/webhooks/stripe/route.ts`) - Processes payment events
3. **Download page** (`src/app/download/page.tsx`) - Allows users to download after purchase
4. **Success page** (`src/app/success/page.tsx`) - Confirmation after payment

### Example: Creating a Checkout Session

```typescript
// src/app/api/checkout/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: Request) {
  try {
    const { currency } = await req.json()
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: getPriceId(currency), // Your price ID from Stripe
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
    })
    
    return NextResponse.json({ sessionId: session.id })
  } catch (err) {
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 })
  }
}
```

## 🚀 Deployment

### Deploying to Vercel

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Connect your repository:**
   - Push your code to GitHub
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository

3. **Configure environment variables in Vercel:**
   - Go to your project settings
   - Add all variables from `.env.local`
   - Use LIVE Stripe keys for production!

4. **Deploy:**
   - Vercel automatically deploys when you push to main branch
   - Or run `vercel --prod` from command line

### Custom Domain

After deployment, you can add a custom domain in Vercel project settings.

## 📚 Key Concepts for Next.js Beginners

### Server vs Client Components

In Next.js 14+ with App Router:

- **Server Components** (default): Render on the server, don't include JavaScript in the browser bundle
- **Client Components**: Need the `'use client'` directive at the top, used for interactivity

Example:
```typescript
'use client' // This makes it a Client Component

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

### API Routes

API routes are serverless functions:

```typescript
// src/app/api/hello/route.ts
export async function GET(request: Request) {
  return Response.json({ message: 'Hello!' })
}
```

Access at: `http://localhost:3000/api/hello`

### Data Fetching

Server Components can fetch data directly:

```typescript
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data.title}</div>
}
```

### Loading States

Create a `loading.tsx` file alongside `page.tsx`:

```typescript
// src/app/loading.tsx
export default function Loading() {
  return <div>Loading...</div>
}
```

## 🔒 Privacy & Cookies

This site currently doesn't use cookies for tracking. However, Stripe may set cookies during checkout. Be sure to:

1. Add a privacy policy page
2. Include cookie consent if required by your jurisdiction (GDPR, CCPA, etc.)
3. Only use necessary cookies for payment processing

## 📝 Development Workflow

1. **Make changes** to your code
2. **Test locally** with `npm run dev`
3. **Build** to check for errors: `npm run build`
4. **Commit** your changes to Git
5. **Push** to GitHub
6. **Vercel** automatically deploys

## 🆘 Common Issues

### Port 3000 already in use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
# Or use a different port
npm run dev -- -p 3001
```

### TypeScript errors
```bash
# Delete .next and node_modules, then reinstall
rm -rf .next node_modules
npm install
```

### Environment variables not working
- Make sure you've created `.env.local` (not just `.env`)
- Restart the dev server after changing environment variables
- Check variable names are correct (including `NEXT_PUBLIC_` prefix where needed)

## 📖 Further Reading

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Stripe Documentation](https://stripe.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

This is a personal project, but suggestions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

[Add your license here]

---

**Need Help?** Check the [Next.js Discord](https://discord.gg/nextjs) or [Stripe Support](https://support.stripe.com/)
