export const smoothScrollTo = (targetId, duration = 800) => {
  const el = document.getElementById(targetId);
  if (!el) return;
  
  const startPosition = window.pageYOffset;
  const targetPosition = startPosition + el.getBoundingClientRect().top - 76;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

export const scrollToTargetWhenReady = (targetId, duration = 800) => {
  const checkInterval = setInterval(() => {
    if (document.getElementById(targetId)) {
      smoothScrollTo(targetId, duration);
      clearInterval(checkInterval);
    }
  }, 50);

  setTimeout(() => {
    clearInterval(checkInterval);
  }, 2000); // 2 second timeout for safety
};
