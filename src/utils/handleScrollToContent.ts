function handleScrollToContent(ref: React.RefObject<HTMLElement>) {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
}

export default handleScrollToContent;
