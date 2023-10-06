import { useEffect } from 'react';
import './animation.css';

const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'];

const generateRandomColor = () =>
  colors[Math.floor(Math.random() * colors.length)];

const ConfettiAnimation = () => {
  useEffect(() => {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';

    const numConfetti = 100; // Number of confetti particles
    for (let i = 0; i < numConfetti; i += 1) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.backgroundColor = generateRandomColor(); // Randomize particle color

      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.top = `-${Math.random() * 100}vh`;
      confetti.style.animationDuration = `${Math.random() * 5 + 2}s`; // Random animation duration
      confetti.style.setProperty('--tx', `${Math.random() * 200 - 100} + 'vw'`); // Random horizontal spread
      confetti.style.setProperty('--ty', `${Math.random() * 200 - 100} + 'vh'`);
      confettiContainer.appendChild(confetti);
    }

    document.body.appendChild(confettiContainer);

    setTimeout(() => {
      document.body.removeChild(confettiContainer);
    }, 5000); // Adjust the time based on your preference
  }, []);

  return null;
};

export default ConfettiAnimation;
