export const BANNED_WORDS = [
  // Profanity
  'fuck', 'shit', 'damn', 'bitch',
  
  // Dating/hookup terms
  'hook up', 'hookup', 'meet up', 'your place', 'my place',
  'date me', 'boyfriend', 'girlfriend', 'single',
  
  // Off-platform contact
  'instagram', 'snapchat', 'discord', 'telegram', 'kik',
  'facebook', 'twitter', 'tiktok', 'whatsapp',
  
  // Contact info patterns (regex)
  /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/, // phone numbers
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // emails
];

export const SEVERE_VIOLATIONS = [
  // These result in immediate permanent ban
  'kill yourself', 'kys', 'suicide',
  // Add more severe terms
];
