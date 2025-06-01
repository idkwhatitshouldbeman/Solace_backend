# Anonymous 1-on-1 Chat Platform - Getting Started Guide

This document provides instructions for setting up and running the Anonymous 1-on-1 Chat Platform.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Supabase account (free tier)
- An OpenAI API key (for content moderation)

## Environment Setup

1. Clone the repository or extract the project files
2. Navigate to the project directory:
   ```
   cd anonymous-chat-platform
   ```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key
NEXTAUTH_SECRET=a_random_string_for_nextauth
```

## Supabase Setup

1. Create a new Supabase project at [https://supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Execute the following SQL to create the required tables:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_banned BOOLEAN DEFAULT FALSE,
  ban_reason TEXT,
  banned_at TIMESTAMP WITH TIME ZONE
);

-- Chat rooms for active conversations
CREATE TABLE chat_rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user1_id UUID REFERENCES users(id),
  user2_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_saved BOOLEAN DEFAULT FALSE,
  both_agreed_to_save BOOLEAN DEFAULT FALSE
);

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chat_room_id UUID REFERENCES chat_rooms(id),
  sender_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_flagged BOOLEAN DEFAULT FALSE,
  moderation_result JSONB
);

-- Saved connections (when both users agree)
CREATE TABLE saved_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user1_id UUID REFERENCES users(id),
  user2_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Banned IPs
CREATE TABLE banned_ips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ip_address TEXT UNIQUE NOT NULL,
  banned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ban_reason TEXT,
  appeal_deadline TIMESTAMP WITH TIME ZONE
);

-- Appeals
CREATE TABLE appeals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  ip_address TEXT,
  appeal_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending',
  reviewed_by TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Chat logs for appeals (temporary storage)
CREATE TABLE appeal_chat_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chat_room_id UUID,
  messages JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '3 days')
);

-- User queue for matching
CREATE TABLE user_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

4. Enable Row Level Security (RLS) for all tables and create appropriate policies
5. Set up authentication providers in the Auth section of your Supabase dashboard

## Installation

Install the dependencies:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

## Running the Development Server

Start the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Building for Production

Build the application for production:

```bash
# Using npm
npm run build
npm start

# Using yarn
yarn build
yarn start

# Using pnpm
pnpm build
pnpm start
```

## Deployment to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Create a new project on [Vercel](https://vercel.com)
3. Import your repository
4. Configure the environment variables in the Vercel dashboard
5. Deploy the project

## Customizing the Theme

The beige and flowy theme can be customized by editing the `config/theme.js` file. The theme includes:

- Color palette with beige tones
- Typography settings
- Border radius and shadow styles
- Transition effects
- Flowy design elements

## Moderation Configuration

Content moderation settings can be adjusted in the `config/banned-words.js` file. This includes:

- Lists of banned words and phrases
- Severe violation terms
- Regular expressions for detecting contact information

## Need Help?

If you encounter any issues or have questions, please refer to the documentation or create an issue in the repository.
