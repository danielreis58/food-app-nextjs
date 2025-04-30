# Food App Next.js

This is a simple food app built with Next.js, TypeScript, Tailwind CSS, It allows users to sign in and view a list of restaurants. The app is designed to be responsive and works well on both desktop and mobile devices.

## Features

- User authentication (simulated)
- Restaurant browsing and filtering
- Product listings by category
- Add products to cart
- Responsive design optimized for mobile experience
- Multilingual support with next-intl

## Technology Stack

- Next.js 15.3 with Server Components
- React 19
- TypeScript
- Tailwind CSS for styling
- React Hook Form for form management
- Zod for schema validation

## Running locally

First install the dependencies:

```bash
pnpm i
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Sign in using the provided credentials (john.doe@example.com / password123)
2. Browse restaurants on the home page
3. Click on a restaurant to view its menu
4. Add products to your cart
5. Mark products as favorites for quick access
6. View your cart and complete the checkout process

## Project Structure

- `src/app/(public)` - Public routes (sign-in)
- `src/app/(private)` - Protected routes requiring authentication
- `src/components` - Reusable UI component and specific components
- `src/constants` - Mock data and configuration
- `src/lib` - Utility functions
- `src/validators` - Schema validation

## Accessing deployed app

You can access the deployed app at [here](https://food-app-nextjs-git-main-daniel-reis-projects-6e769863.vercel.app).
