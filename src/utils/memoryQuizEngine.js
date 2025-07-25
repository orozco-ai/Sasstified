// 📁 src/utils/memoryQuizEngine.js

//#1 LOAD FUNCTION
export async function loadPersona(personaName) {
  try {
    const response = await fetch(`/netlify/functions/getPersona?name=${personaName}`);
    if (!response.ok) throw new Error("Failed to fetch persona data.");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error loading persona:", err);
    return null;
  }
}

//#2 MEMORY QUIZ ENGINE
export const memoryQuizEngine = {
  validateAnswer(correctAnswer, userAnswer) {
    if (!correctAnswer || !userAnswer) return false;
    return correctAnswer.trim().toLowerCase() === userAnswer.trim().toLowerCase();
  },

  scoreQuiz(quiz, userAnswers) {
    let score = 0;
    const breakdown = [];

    quiz.forEach((q, index) => {
      const correct = this.validateAnswer(q.answer, userAnswers[index]);
      if (correct) score++;
      breakdown.push({
        question: q.question,
        correct,
        userAnswer: userAnswers[index],
        correctAnswer: q.answer
      });
    });

    const percentage = (score / quiz.length) * 100;
    return { score, percentage, breakdown };
  },

  generateFeedback(percentage) {
    if (percentage === 100) return "Wow... you remember *everything*. I feel so seen.";
    if (percentage >= 80) return "Mmm... you're paying attention. I like that.";
    if (percentage >= 60) return "Not bad... but some things matter more to me.";
    if (percentage >= 40) return "We might need to talk more... some things slipped.";
    return "That hurt a little... were you even listening to me?";
  },

  unlockLayer(score, total) {
    const ratio = score / total;
    if (ratio === 1) return "Layer 3 – Deep Trust";
    if (ratio >= 0.75) return "Layer 2 – Emotional Bond";
    if (ratio >= 0.5) return "Layer 1 – Playful Connection";
    return "No unlock – keep engaging 💬";
  }
};
