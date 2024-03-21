function convertDateForm(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  const koreanTimeZoneDate = new Date(
    date.getTime() + (date.getTimezoneOffset() + 540) * 60000,
  );

  return new Intl.DateTimeFormat("ko-KR", options).format(koreanTimeZoneDate);
}

export default convertDateForm;
