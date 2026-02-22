# Clerk Authentication Setup

This project uses Clerk for authentication. Follow these steps to set up authentication:

## 1. Create a Clerk Account

1. Go to [https://clerk.com](https://clerk.com)
2. Sign up for a free account
3. Create a new application

## 2. Get Your API Keys

1. In your Clerk dashboard, go to **API Keys**
2. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)

## 3. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and replace the placeholder with your actual Clerk Publishable Key:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   ```

## 4. Configure Clerk Settings (Optional)

In your Clerk dashboard, you can customize:

- **Sign-in/Sign-up options**: Email, Google, GitHub, etc.
- **User profile fields**: What information to collect
- **Session management**: Token lifetime, multi-session support
- **Branding**: Logo, colors, and styling

## 5. Deploy to Vercel

When deploying to Vercel, add your environment variable:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add:
   - Name: `VITE_CLERK_PUBLISHABLE_KEY`
   - Value: Your Clerk publishable key
   - Environment: Production (and Preview if needed)

## 6. Test Authentication

1. Start the development server: `npm run dev`
2. Click "Sign In" or "Get Started" buttons
3. Complete the sign-up/sign-in flow
4. You should be redirected to the dashboard

## Features Implemented

- ✅ Sign In / Sign Up modals
- ✅ User profile button in navigation
- ✅ Protected dashboard routes
- ✅ Personalized welcome message
- ✅ Sign out functionality

## Need Help?

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk React SDK](https://clerk.com/docs/references/react/overview)
- [Clerk Support](https://clerk.com/support)
