# Just a Minute - Game Site

Welcome to the Just a Minute game! This is a Next.js-based website that serves the Just a Minute web game with access code protection and code obfuscation for IP protection.

## 🎯 Project Overview

This site is built with:
- **Next.js 14+** with the App Router
- **TypeScript** for type safety
- **JavaScript Obfuscation** for IP protection
- **Vercel** for hosting and deployment

The site serves a web-based game as a protected HTML file, accessible only with the correct access code.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Guide](#development-guide)
- [Code Obfuscation](#code-obfuscation)
- [Deployment](#deployment)
- [Common Issues](#common-issues)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager
- A Vercel account (for deployment)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
just-a-minute-game/
├── src/
│   ├── app/                    # App Router directory (Next.js 14+)
│   │   ├── layout.tsx          # Root layout (wraps all pages)
│   │   ├── page.tsx            # Home page (/)
│   │   ├── globals.css         # Global styles
│   │   └── api/                # API routes (game endpoint, etc.)
│   ├── components/             # Reusable React components
│   └── lib/                    # Utility functions and helpers
├── game.html                   # Original game source (for development)
├── game.obfuscated.html        # Obfuscated game (served to users)
├── obfuscate.js                # Obfuscation script
├── package.json                # Project dependencies
├── next.config.js              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
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
         <h1>About Just a Minute</h1>
         <p>Your content here...</p>
       </div>
     )
   }
   ```

3. The page will automatically be available at `/about`

### Creating Components

Store reusable components in `src/components/`:

```typescript
// src/components/GameCard.tsx
export default function GameCard({ title }: { title: string }) {
  return (
    <div className="card">
      <h3>{title}</h3>
    </div>
  )
}
```

Then import and use:
```typescript
import GameCard from '@/components/GameCard'
```

### Styling

- **Global styles**: Edit `src/app/globals.css`
- **Component-specific styles**: Use CSS modules or inline styles
- **Tailwind CSS**: Can be added later if needed

## 🔒 Code Obfuscation

This project protects the game's source code using JavaScript obfuscation to prevent theft and unauthorized copying.

### Files

- **game.html** - Original, readable source code (for development)
- **game.obfuscated.html** - Obfuscated version (served by API route)
- **obfuscate.js** - Obfuscation script

### Development Workflow

#### Starting Development Server

When you run `npm run dev`, obfuscation happens automatically once at startup:

```bash
npm run dev
```

This will:
1. Run `node obfuscate.js` to generate `game.obfuscated.html`
2. Start the Next.js development server

#### Making Changes to game.html

**Important**: Obfuscation does NOT happen automatically when you edit `game.html` during development.

**After editing game.html, you must manually re-obfuscate:**

```bash
npm run obfuscate
```

Or directly:

```bash
node obfuscate.js
```

Then refresh your browser (Cmd+Shift+R or Ctrl+Shift+R) to see the changes.

#### Why Manual Re-obfuscation?

Next.js's hot reload only watches files in its project structure. Since `game.html` is outside this flow, changes don't trigger automatic re-obfuscation. This is acceptable during development since you control when to regenerate the obfuscated version.

### Obfuscation Features Applied

The obfuscation uses a **minimal, functional approach** that balances IP protection with code reliability:

#### ✅ Active Features:

1. **String Array Encoding (Base64)**
   - All string literals encoded in Base64
   - Strings stored in shuffled, rotated arrays
   - Makes string content harder to read

2. **Identifier Renaming (Hexadecimal)**
   - Variable and function names converted to hex
   - Example: `myVariable` → `_0x3a2b4c`
   - Critical function names preserved for HTML event handlers

3. **Split Strings**
   - Long strings split into chunks
   - Makes string analysis more difficult

4. **Code Compaction**
   - Removes whitespace and comments
   - Reduces file size and readability

#### ❌ Disabled Features (Broke Functionality):

These aggressive features were disabled because they broke the game's timer, topics manager, scoreboard, and player management:

- ❌ **Control Flow Flattening** - Broke execution context for HTML inline event handlers
- ❌ **Dead Code Injection** - Interfered with critical code paths
- ❌ **Self-Defending Code** - Prevented normal execution
- ❌ **Transform Object Keys** - Broke object property access
- ❌ **Numbers to Expressions** - Created parsing issues

#### Reserved Names

These function and variable names are preserved to maintain compatibility with HTML inline event handlers:

```javascript
startTimer, stopTimer, resetTimer, add5, sub5, resumeTimer,
updateDisplay, playCelebratorySound, renderContestants,
renderScoreboard, renderTopics, addNewTopic, ALL_TOPICS,
topics, players, deletedTopics, timeLeft, timerId, isRunning
```

### Production Build

When you build for production, obfuscation runs automatically:

```bash
npm run build
```

This ensures the latest obfuscated version is included in your deployment.

### File Size Impact

- **Original**: 44KB
- **Obfuscated**: 53KB (20% increase)
- **Performance**: Minimal impact (~2-3% slower execution)

### Customizing Obfuscation

⚠️ **Warning**: The current settings are optimized for functionality. Aggressive obfuscation features (control flow flattening, dead code injection) will break the game.

If you want to experiment with settings, edit `obfuscate.js`, but always test thoroughly after changes:

```javascript
// Current minimal settings (WORKING)
const obfuscator = require('javascript-obfuscator');

module.exports = {
  compact: true,
  controlFlowFlattening: false,     // ❌ Disabled
  deadCodeInjection: false,         // ❌ Disabled  
  selfDefending: false,             // ❌ Disabled
  transformObjectKeys: false,       // ❌ Disabled
  identifierNamesGenerator: 'hexadecimal',
  stringArray: true,
  stringArrayEncoding: ['base64'],
  splitStrings: true
};
```

### Testing Obfuscated Code

Always test the obfuscated version before deployment:

1. Access the game at [http://localhost:3000/api/game](http://localhost:3000/api/game)
2. Enter access code: `c15fabcf-1cca-4cc6-ade2-ce4e330340a9`
3. Test all functionality thoroughly
4. Check browser console for errors
5. Verify game state persistence (localStorage)
6. Test on multiple browsers (Chrome, Firefox, Safari)

### Troubleshooting Obfuscation

#### If obfuscated code doesn't work:

1. Check browser console for errors
2. Verify original `game.html` works correctly first
3. Check that obfuscation script completed successfully
4. Hard refresh browser (Cmd+Shift+R) to clear cache

#### If obfuscation script fails:

```bash
# Reinstall dependencies
npm install

# Check the obfuscate.js file for syntax errors
node obfuscate.js
```

### Security Considerations

#### What Obfuscation Provides:
✅ Makes code extremely difficult to read and understand  
✅ Prevents casual copying and modification  
✅ Protects against automated code analysis  
✅ Significantly increases reverse-engineering effort and time

#### What Obfuscation DOES NOT Provide:
❌ **Complete protection** - Determined attackers with sufficient time and skill can still reverse-engineer  
❌ **Encryption** - Code must be readable by the browser's JavaScript engine  
❌ **Security for sensitive data** - Never store API keys, passwords, or secrets in client-side code

#### Best Practices:

1. **Keep source code private**: Never commit unobfuscated source to public repositories
2. **Version control**: Keep `game.html` in version control, exclude `game.obfuscated.html` (add to `.gitignore`)
3. **Regular updates**: Re-obfuscate after every code change
4. **Server-side security**: Use server-side validation for critical operations (like access codes)
5. **Terms of Service**: Include clear terms prohibiting unauthorized copying or reverse-engineering

### Additional Protection Options

For even stronger protection, consider:

1. **License Headers**: Add copyright and license information to both files
2. **Runtime Checks**: Implement periodic integrity checks within the game
3. **Server-Side Logic**: Move critical game logic to server APIs
4. **Legal Protection**: Use copyright notices and enforce DMCA takedowns if needed

### Copyright Notice

Consider adding this to your deployment:

```
© 2025 [Your Name/Company]. All Rights Reserved.
Unauthorized copying, modification, or distribution is strictly prohibited.
This code is protected by copyright law and international treaties.
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

3. **Deploy:**
   - Vercel automatically deploys when you push to main branch
   - Or run `vercel --prod` from command line

### Custom Domain

After deployment, you can add a custom domain in Vercel project settings.

## 📚 Key Next.js Concepts

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

## 📝 Development Workflow

1. **Make changes** to your code
2. **Re-obfuscate** if you edited `game.html`: `npm run obfuscate`
3. **Test locally** with `npm run dev`
4. **Build** to check for errors: `npm run build`
5. **Commit** your changes to Git
6. **Push** to GitHub
7. **Vercel** automatically deploys

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

### Obfuscated game not working
- Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
- Check browser console for JavaScript errors
- Verify `game.obfuscated.html` exists and was recently regenerated
- Test original `game.html` in browser to ensure source code works

## 📖 Further Reading

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Vercel Documentation](https://vercel.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator)

## 🤝 Contributing

This is a personal project, but suggestions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

[Add your license here]

---

**Need Help?** Check the [Next.js Discord](https://discord.gg/nextjs)
