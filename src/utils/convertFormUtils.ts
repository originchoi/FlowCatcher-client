function convertDateForm(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(dateString);
  const koreanTimeZoneDate = new Date(
    date.getTime() + (date.getTimezoneOffset() + 540) * 60000,
  );

  return new Intl.DateTimeFormat("ko-KR", options).format(koreanTimeZoneDate);
}

function convertFormatApiKey(apiKey: string): string {
  const start = apiKey.slice(0, 6);
  const end = apiKey.slice(-6);

  return `${start} ... ${end}`;
}

export { convertDateForm, convertFormatApiKey };
