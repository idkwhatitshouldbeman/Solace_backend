# Solace - Anonymous 1-on-1 Chat Platform

## Getting Started Guide

This guide will help you set up and run the Solace anonymous chat platform with all the requested changes implemented.

### Prerequisites

- Node.js 14.x or higher
- npm, yarn, or pnpm
- A Supabase account for authentication and real-time chat

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key (optional, for content moderation)
NEXTAUTH_SECRET=random_string_for_session_encryption
```

### Supabase Setup

1. Create a new Supabase project
2. Set up the following tables in your Supabase database:

#### Users Table
This is automatically created by Supabase Auth.

#### Chats Table
```sql
CREATE TABLE chats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'ended')),
  ended_at TIMESTAMP WITH TIME ZONE
);
```

#### Chat Participants Table
```sql
CREATE TABLE chat_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(chat_id, user_id)
);
```

#### Messages Table
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  flagged BOOLEAN DEFAULT FALSE,
  flagged_reason TEXT
);
```

#### Waiting Pool Table
```sql
CREATE TABLE waiting_pool (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  matched BOOLEAN DEFAULT FALSE,
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  UNIQUE(user_id)
);
```

#### Saved Connections Table
```sql
CREATE TABLE saved_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  partner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, partner_id)
);
```

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Deployment on Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Create a new project on Vercel and import your repository
3. Configure the environment variables in the Vercel dashboard
4. Deploy the project

### Features Implemented

- **Branding**: Changed from "AnonyChat" to "Solace" throughout the site
- **Dark Mode**: Implemented with default dark mode and beige theme elements with white text
- **Concise Landing Page**: Redesigned for quick access with sign-up/sign-in options beside "connect anonymously"
- **Functional Buttons**: All buttons and navigation links now work properly
- **Authentication**: Full Supabase authentication with login, signup, and session management
- **Real-time Chat**: Implemented with Supabase Realtime for instant messaging
- **Content Moderation**: Added banned words filtering and optional OpenAI moderation
- **User Matching**: Random pairing system for anonymous chats
- **Saved Connections**: Ability to save connections with chat partners

### Project Structure

- `/components`: UI components and layout elements
- `/config`: Configuration files for theme, Supabase, and OpenAI
- `/hooks`: Custom React hooks for auth, chat, and moderation
- `/pages`: Next.js pages and API routes
- `/utils`: Utility functions for validation, moderation, and matching
- `/public`: Static assets
- `/styles`: Global styles and theme definitions

### Customization

- Theme colors and styling can be modified in `/config/theme.js`
- Banned words list can be updated in `/config/banned-words.js`
- UI components can be customized in the `/components` directory

For any questions or issues, please refer to the documentation or contact support.
