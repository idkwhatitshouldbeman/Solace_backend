import openai from '@/config/openai';

// Function to check content moderation using OpenAI's moderation API
export const checkContentModeration = async (content) => {
  try {
    // If no API key is configured, return a default result
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not configured, skipping moderation API check');
      return { flagged: false };
    }
    
    // Call OpenAI's moderation API
    const response = await openai.createModeration({
      input: content,
    });
    
    // Extract the moderation results
    const result = response.data.results[0];
    
    // If content is flagged, include the reason
    if (result.flagged) {
      // Find which categories triggered the flag
      const flaggedCategories = Object.entries(result.categories)
        .filter(([_, value]) => value)
        .map(([key, _]) => key);
      
      return {
        flagged: true,
        reason: `Content flagged for: ${flaggedCategories.join(', ')}`,
        categories: result.categories
      };
    }
    
    return { flagged: false };
  } catch (error) {
    console.error('Error checking content moderation:', error);
    // Return a non-flagged result if the API call fails
    return { flagged: false };
  }
};

// Function to filter out banned words from content
export const filterBannedWords = (content, bannedWords) => {
  if (!content) return '';
  
  let filteredContent = content;
  
  bannedWords.forEach(word => {
    // Create a regex that matches the word with word boundaries
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    
    // Replace the word with asterisks
    filteredContent = filteredContent.replace(regex, '*'.repeat(word.length));
  });
  
  return filteredContent;
};
