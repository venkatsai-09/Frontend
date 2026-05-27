import { generateEventDescription, recommendEvents } from '../../../../../backend/src/services/ai/aiService';

export interface GenerateDescriptionPayload {
  title: string;
  category: string;
  targetAudience: string;
  location: string;
  theme: string;
}

export async function generateAIDescription(payload: GenerateDescriptionPayload): Promise<string> {
  const safePayload = {
    title: payload.title || '',
    category: payload.category || '',
    targetAudience: payload.targetAudience || '',
    location: payload.location || '',
    theme: payload.theme || '',
  };

  return generateEventDescription(safePayload);
}

export async function getRecommendedEvents(userId: string) {
  if (!userId) {
    return [];
  }

  const recommendations = await recommendEvents(userId, false);
  return Array.isArray(recommendations) ? recommendations : [];
}
