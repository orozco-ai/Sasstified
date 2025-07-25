//#1 IMPORTS
import React, { useState, useEffect } from 'react';
import { loadPersona } from '../utils/memoryQuizEngine';
import { getUnlockedLevel, unlockNextLevel } from '../utils/localStorageUtils';

//#2 COMPONENT START
const MemoryQuizRunner = ({ selectedPersona }) => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [unlocked, setUnlocked] = useState(false);

  //#3 LOAD QUIZ
  useEffect(() => {
    const fetchPersona = async () => {
      const data = await loadPersona(selectedPersona);
      if (data && data.memoryQuiz) {
        setQuizData(data.memoryQuiz);
      }
    };
    fetchPersona();
  }, [selectedPersona]);

  //#4 CHECK ANSWER
  const handleSubmit = () => {
    const correctAnswer = quizData[currentQuestionIndex]?.answer?.toLowerCase().trim();
    const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer;

    if (isCorrect) {
      setFeedback("✨ Correct! You're really paying attention.");
      const newScore = score + 1;
      setScore(newScore);

      // Unlock next level if enough points
      if (newScore >= 3 && !unlocked) {
        unlockNextLevel(selectedPersona);
        setUnlocked(true);
      }
    } else {
      setFeedback(`✖️ Nope... Try again or ask me about it in chat.`);
    }

    setUserAnswer('');
    setTimeout(() => {
      setFeedback('');
      setCurrentQuestionIndex((prev) => (prev + 1) % quizData.length);
    }, 2000);
  };

  //#5 RENDER UI
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-pink-700 mb-4">
        {selectedPersona}'s Memory Quiz
      </h2>

      {quizData.length > 0 ? (
        <>
          <p className="mb-3 text-gray-700">
            {quizData[currentQuestionIndex].question}
          </p>

          <input
            type="text"
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded"
            placeholder="Type your answer here..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
          >
            Submit
          </button>

          {feedback && (
            <p className="mt-3 text-sm text-gray-800 italic">{feedback}</p>
          )}

          {unlocked && (
            <p className="mt-4 text-green-600 font-semibold">
              🎉 You've unlocked a deeper layer of {selectedPersona}!
            </p>
          )}
        </>
      ) : (
        <p className="text-gray-500">Loading quiz questions...</p>
      )}
    </div>
  );
};

export default MemoryQuizRunner;
