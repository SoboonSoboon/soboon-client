export const GoToTopScroll = () => {
  requestAnimationFrame(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
};
