const pageAnimation = () => {
  document.documentElement.animate(
    [
      {
        opacity: 1,
      },
      {
        opacity: 0,
      },
    ],
    {
      duration: 500,
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );
  document.documentElement.animate(
    [
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
    ],
    {
      duration: 500,
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
};

export default pageAnimation;
