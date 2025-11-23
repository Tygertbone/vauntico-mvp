# Vauntico Prompt Vault

A premium AI prompt library for founders, built with React and Vite. This application provides a curated collection of high-converting prompts designed to help entrepreneurs launch faster, scale smarter, and monetize with precision.

## Features

- 🚀 **Modern React App** - Built with React 19, Vite, and Tailwind CSS
- 💳 **Paystack Integration** - Secure payment processing for Nigerian and international customers
- 📱 **Responsive Design** - Mobile-first approach with beautiful UI components
- 🔒 **Secure Payments** - Environment-based configuration and payment verification
- 📚 **Notion Integration** - Embedded content delivery through Notion

## Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Paystack account for payments

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vauntico-mvp
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your actual values:
   ```env
   VITE_PAYSTACK_PUBLIC_KEY=pk_live_your_live_key_here
   VITE_PAYSTACK_SECRET_KEY=sk_live_your_secret_key_here
   VITE_CURRENCY=NGN
   VITE_PRODUCT_PRICE=97
   VITE_NOTION_EMBED_URL=your_notion_embed_url
   ```

4. **Start development server**
   ```bash
   pnpm run dev
   ```

5. **Build for production**
   ```bash
   pnpm run build
   ```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_PAYSTACK_PUBLIC_KEY` | Paystack public key | `pk_test_your_test_key_here` |
| `VITE_PAYSTACK_SECRET_KEY` | Paystack secret key (for backend) | `sk_test_your_secret_key_here` |
| `VITE_CURRENCY` | Payment currency | `NGN` |
| `VITE_PRODUCT_PRICE` | Product price | `97` |
| `VITE_NOTION_EMBED_URL` | Notion embed URL for content | Notion URL |
| `VITE_APP_NAME` | Application name | `Vauntico Prompt Vault` |
| `VITE_APP_URL` | Application URL | `https://vauntico.com` |

### Paystack Setup

1. **Create Paystack Account**
   - Sign up at [paystack.com](https://paystack.com)
   - Complete business verification

2. **Get API Keys**
   - Go to Settings > API Keys & Webhooks
   - Copy your public and secret keys
   - Use test keys for development, live keys for production

3. **Configure Webhooks** (Recommended)
   - Set up webhook URL for payment verification
   - Implement backend verification endpoint

## Deployment

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   vercel --prod
   ```

2. **Set Environment Variables**
   - Go to Vercel Dashboard > Project Settings > Environment Variables
   - Add all variables from `env.example`

3. **Deploy**
   ```bash
   git push origin main
   ```

### Other Platforms

The app can be deployed to any static hosting platform:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## Payment Flow

1. **User clicks "Buy" button**
2. **Email collection** (if not provided)
3. **Paystack payment popup**
4. **Payment processing**
5. **Payment verification** (client-side)
6. **Redirect to success page**
7. **Content delivery via Notion embed**

## Security Considerations

- ✅ **Environment Variables** - Sensitive keys stored in environment
- ✅ **Payment Verification** - Client-side verification implemented
- ⚠️ **Backend Verification** - Recommended for production
- ✅ **HTTPS Only** - Required for Paystack integration
- ✅ **Input Validation** - Email and amount validation

## Development

### Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── PaystackButton.jsx
│   ├── PromptVaultPage.jsx
│   ├── VaultSuccessPage.jsx
│   └── VaultsPage.jsx
├── utils/              # Utility functions
│   └── paystack.js     # Payment integration
├── assets/             # Static assets
├── App.jsx             # Main app component
└── main.jsx            # Entry point
```

## Troubleshooting

### Common Issues

1. **Payment not working**
   - Check Paystack keys are correct
   - Verify currency settings
   - Ensure HTTPS in production

2. **Notion embed not loading**
   - Check Notion URL is public
   - Verify iframe permissions
   - Test in different browsers

3. **Build errors**
   - Clear node_modules and reinstall
   - Check environment variables
   - Verify all dependencies installed

## Support

For support and questions:
- Create an issue in the repository
- Contact: [your-email@domain.com]
- Documentation: [your-docs-url]

## License

This project is proprietary software. All rights reserved.

---

**Built with ❤️ by Vauntico**
