//#1 localStorageUtils.js

export const trustKey = (persona) => `${persona}-trustScore`;
export const unlockKey = (persona, level) => `${persona}-unlockedLevel-${level}`;
export const quizKey = (persona) => `${persona}-quizScore`;

export function getTrust(persona) {
  return parseInt(localStorage.getItem(trustKey(persona))) || 0;
}

export function increaseTrust(persona, amount = 5) {
  const current = getTrust(persona);
  localStorage.setItem(trustKey(persona), current + amount);
}

export function resetTrust(persona) {
  localStorage.setItem(trustKey(persona), 0);
}

export function unlockLevel(persona, level) {
  localStorage.setItem(unlockKey(persona, level), true);
}

export function isLevelUnlocked(persona, level) {
  return localStorage.getItem(unlockKey(persona, level)) === "true";
}

export function getQuizScore(persona) {
  return parseInt(localStorage.getItem(quizKey(persona))) || 0;
}

export function increaseQuizScore(persona) {
  const current = getQuizScore(persona);
  localStorage.setItem(quizKey(persona), current + 1);
}

