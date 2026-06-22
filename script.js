const lines = [
  '$ @claude LP作って！',
  '> 承りました。実装します...',
  '✓ index.html, style.css, script.js を生成',
];

let lineIndex = 0;
let charIndex = 0;

function typeNext() {
  const lineEl = document.getElementById('line' + (lineIndex + 1));
  const cursorEl = document.getElementById('cursor');
  if (!lineEl) return;

  if (charIndex < lines[lineIndex].length) {
    lineEl.textContent += lines[lineIndex][charIndex];
    charIndex++;
    setTimeout(typeNext, 40);
  } else {
    lineIndex++;
    charIndex = 0;
    if (lineIndex < lines.length) {
      setTimeout(typeNext, 400);
    } else {
      cursorEl.style.display = 'none';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeNext, 600);

  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('visible'), Number(delay));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((card) => observer.observe(card));
});
