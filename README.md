# Anonymous 1-on-1 Chat Platform - README

## Overview

This is a complete anonymous chat platform that allows users to connect with random strangers while maintaining anonymity. The platform includes features such as random pairing, saved connections, content moderation, and an admin panel.

## Features

- **1-on-1 Random Pairing**: Users get matched with random strangers
- **Save Connections**: Both users can agree to save their connection for future chats
- **Complete Anonymity**: Users cannot see each other's real identities
- **Strict Moderation**: Heavy content filtering with AI moderation
- **Age Restriction**: 13+ only with basic COPPA compliance

## Technical Stack

- **Frontend**: React + Next.js
- **Backend**: Vercel Serverless Functions + Supabase
- **Authentication**: Email/password with Supabase Auth
- **Database**: PostgreSQL via Supabase
- **Real-time Messaging**: Supabase Realtime

## Design

The platform features a beige and flowy design theme with:
- Soft, warm color palette
- Curved elements and soft shadows
- Wavy borders and gradients
- Smooth transitions and animations

## Project Structure

```
/
├── components/
│   ├── Admin/
│   ├── Auth/
│   ├── Chat/
│   ├── Dashboard/
│   ├── Landing/
│   ├── UI/
│   └── GlobalStyles.js
├── config/
│   ├── banned-words.js
│   ├── openai.js
│   ├── supabase.js
│   └── theme.js
├── hooks/
│   ├── useAuth.js
│   ├── useChat.js
│   └── useModeration.js
├── pages/
│   ├── admin/
│   ├── appeal/
│   ├── chat/
│   ├── dashboard/
│   └── index.js
├── utils/
│   ├── matching.js
│   ├── moderation.js
│   └── validation.js
├── public/
├── styles/
├── .env.local (to be created)
├── next.config.js
├── package.json
├── GETTING_STARTED.md
└── README.md
```

## Getting Started

Please refer to the [GETTING_STARTED.md](GETTING_STARTED.md) file for detailed instructions on:
- Setting up environment variables
- Configuring Supabase
- Installing dependencies
- Running the development server
- Building for production
- Deploying to Vercel

## Content Moderation

The platform includes a comprehensive content moderation system:
1. Client-side basic filtering
2. Server-side keyword filtering
3. OpenAI background moderation

Moderation settings can be adjusted in the `config/banned-words.js` file.

## Security & Privacy

- All passwords are hashed with bcrypt
- User input is sanitized to prevent XSS attacks
- CORS protection is implemented
- Rate limiting is applied to all endpoints
- Age verification (13+ requirement) is enforced
- Chat logs are deleted after 3 days unless appealed

## Customization

The beige and flowy theme can be customized by editing the `config/theme.js` file, which includes:
- Color palette
- Typography settings
- Border radius and shadow styles
- Transition effects
- Flowy design elements
