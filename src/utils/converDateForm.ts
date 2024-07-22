function convertDateForm(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  const date = new Date(dateString);
  const koreanTimeZoneDate = new Date(
    date.getTime() + (date.getTimezoneOffset() + 540) * 60000,
  );

  return new Intl.DateTimeFormat("ko-KR", options).format(koreanTimeZoneDate);
}

export default convertDateForm;
