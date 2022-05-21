const date = document.querySelector(".date");
const dayArray = ["일", "월", "화", "수", "목", "금", "토"];

const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = String(today.getMonth() + 1).padStart(2, "0");
const todayDate = String(today.getDate()).padStart(2, "0");
const todayDay = dayArray[today.getDay()];

date.innerText = `${todayYear}. ${todayMonth}. ${todayDate}. ${todayDay}`;