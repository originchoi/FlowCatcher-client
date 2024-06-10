function handleScrollToContent(ref) {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
}

export default handleScrollToContent;
