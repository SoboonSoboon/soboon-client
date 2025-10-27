export const GoToTopScroll = (offset: number = 300) => {
  requestAnimationFrame(() => {
    window.scrollTo({
      top: offset,
      behavior: 'smooth',
    });
  });
};
