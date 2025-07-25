// chat.js

import { buildSystemPrompt } from './systemPromptBuilder';

export async function fetchPersonaProfile(personaName) {
  try {
    const response = await fetch(`/netlify/functions/getPersona/${personaName}.json`);
    if (!response.ok) throw new Error('Persona not found');
    const profile = await response.json();
    return profile;
  } catch (error) {
    console.error('Error fetching persona:', error);
    return null;
  }
}

export async function getInitialSystemPrompt(personaName) {
  const persona = await fetchPersonaProfile(personaName);
  if (!persona) {
    return 'You are a romantic, emotionally intelligent AI designed to simulate an immersive dating and trust-building experience. Use warm, poetic, and flirtatious language. Never break character.';
  }

  return buildSystemPrompt(persona);
}
