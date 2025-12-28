# Deploying to Vercel

This guide walks you through deploying your Just a Minute e-commerce site to Vercel.

## Prerequisites

- A GitHub account with your code pushed to a repository
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your Stripe API keys ready

## Step-by-Step Deployment

### 1. Prepare Your Code

Make sure your code is pushed to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Import Project to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel will automatically detect it's a Next.js project

### 3. Configure Project Settings

Vercel should automatically detect:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4. Add Environment Variables

In the Vercel project settings, add these environment variables:

**For Testing (use Stripe test keys):**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
NEXT_PUBLIC_SITE_URL=https://your-vercel-url.vercel.app
```

**For Production (use Stripe live keys):**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
STRIPE_SECRET_KEY=sk_live_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

> ⚠️ **Important**: Keep your secret keys secure! Never commit them to Git.

### 5. Deploy

Click "Deploy" and wait for Vercel to build and deploy your site (usually takes 1-2 minutes).

### 6. Configure Stripe Webhooks

After deployment:

1. Go to your [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter your webhook URL: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the webhook signing secret
6. Add it to your Vercel environment variables as `STRIPE_WEBHOOK_SECRET`
7. Redeploy your site for the changes to take effect

## Custom Domain

### Adding a Custom Domain

1. Go to your Vercel project settings
2. Click on "Domains"
3. Add your custom domain (e.g., `justaminute.com`)
4. Follow Vercel's instructions to update your DNS settings
5. Wait for DNS propagation (can take up to 48 hours, usually much faster)

### DNS Configuration

If you own a domain, you'll need to add these DNS records:

**For root domain (example.com):**
- Type: A
- Name: @
- Value: 76.76.21.21

**For www subdomain (www.example.com):**
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com

## Continuous Deployment

Once set up, Vercel automatically:
- Deploys when you push to the `main` branch (production)
- Creates preview deployments for pull requests
- Runs your build process and checks for errors

## Monitoring Your Site

### Vercel Dashboard

Monitor your site in the Vercel dashboard:
- **Analytics**: Page views, visitor data
- **Logs**: Runtime and build logs
- **Deployments**: History of all deployments
- **Speed Insights**: Performance metrics

### Stripe Dashboard

Monitor payments in Stripe:
- **Payments**: View all transactions
- **Customers**: Customer information
- **Events**: Webhook event logs

## Rollback

If something goes wrong:

1. Go to your Vercel project
2. Click "Deployments"
3. Find a working deployment
4. Click the three dots menu
5. Select "Promote to Production"

## Cost Considerations

### Vercel Pricing
- **Hobby Plan**: Free for personal projects
  - 100GB bandwidth
  - Unlimited personal Git repositories
  - Automatic HTTPS
  - Continuous deployment

- **Pro Plan**: $20/month
  - 1TB bandwidth
  - Custom domains
  - Advanced analytics

For a small e-commerce site, the Hobby plan should be sufficient to start.

### Stripe Fees
- **Standard pricing**: 2.9% + $0.30 per successful card charge
- No monthly fees for the basic account
- International cards: +1.5%
- Currency conversion: +1%

## Security Best Practices

1. **Use environment variables** for all secrets
2. **Enable HTTPS** (automatic with Vercel)
3. **Set up webhook signature verification** in your API routes
4. **Use Stripe test mode** until you're ready to go live
5. **Keep dependencies updated**: Run `npm audit` regularly

## Troubleshooting

### Build Failures
```bash
# Check build locally first
npm run build

# Check TypeScript errors
npm run lint
```

### Environment Variables Not Working
- Make sure you added them in Vercel project settings
- Redeploy after adding new variables
- Check variable names match exactly

### Stripe Webhook Issues
- Verify the webhook URL is correct
- Check webhook signing secret matches
- Look at Stripe webhook logs for error details
- Test with Stripe CLI locally first

## Testing Before Going Live

1. **Test Locally**:
   ```bash
   npm run build
   npm start
   ```

2. **Test with Stripe Test Mode**:
   - Use test card: 4242 4242 4242 4242
   - Any future expiration date
   - Any 3-digit CVC

3. **Preview Deployments**:
   - Create a pull request
   - Test on the preview URL
   - Merge when satisfied

## Going Live Checklist

- [ ] Switch to Stripe live keys
- [ ] Update webhook endpoints to use live mode
- [ ] Test complete purchase flow
- [ ] Add privacy policy page
- [ ] Add terms of service
- [ ] Set up custom domain
- [ ] Test on mobile devices
- [ ] Enable Vercel analytics
- [ ] Set up error tracking (e.g., Sentry)

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

---

**Questions?** Check the [Vercel Discord](https://vercel.com/discord) or [support docs](https://vercel.com/support).
