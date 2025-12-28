/**
 * Home Page Component
 * 
 * This is the main landing page for your e-commerce site.
 * In Next.js 14+ with the App Router, page.tsx files define routes.
 * This file creates the route at "/" (the root of your site).
 */

export default function Home() {
  return (
    <div className="container">
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '3rem 0' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Welcome to Just a Minute!
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '2rem' }}>
          A fun, challenging web-based game that tests your skills and timing.
        </p>

        {/* Placeholder for future "Buy Now" button */}
        <div style={{ marginTop: '2rem' }}>
          <button className="btn btn-primary" style={{ marginRight: '1rem' }}>
            Buy Now - Coming Soon
          </button>
          <button className="btn btn-secondary">
            Learn More
          </button>
        </div>
      </section>

      {/* Product Information Section */}
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          About the Game
        </h2>

        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3>What is Just a Minute?</h3>
          <p>
            Just a Minute is an engaging web-based game delivered as a single HTML file.
            After purchase, you&apos;ll receive instant access to download and play the game
            on any device with a web browser.
          </p>

          <h3 style={{ marginTop: '1.5rem' }}>Features:</h3>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Single HTML file - no installation required</li>
            <li>Works on any device with a web browser</li>
            <li>Instant download after purchase</li>
            <li>Play offline anytime</li>
          </ul>

          <h3 style={{ marginTop: '1.5rem' }}>Pricing:</h3>
          <p>
            Available in multiple currencies for your convenience:
          </p>
          <ul style={{ marginLeft: '1.5rem' }}>
            <li>US Dollars (USD)</li>
            <li>British Pounds (GBP)</li>
            <li>Indian Rupees (INR)</li>
          </ul>
        </div>
      </section>

      {/* Security Notice */}
      <section style={{ marginTop: '3rem', textAlign: 'center' }}>
        <div style={{
          background: '#f0f9ff',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #0070f3'
        }}>
          <h3>Secure Payment Processing</h3>
          <p style={{ marginBottom: 0 }}>
            All payments are securely processed through Stripe.
            We never store your payment information on our servers.
          </p>
        </div>
      </section>
    </div>
  )
}
