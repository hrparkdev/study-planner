const date = document.querySelector(".date");
const dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = String(today.getMonth() + 1).padStart(2, "0");
const todayDate = String(today.getDate()).padStart(2, "0");
const todayDay = dayArray[today.getDay()];

date.innerText = `${todayYear}. ${todayMonth}. ${todayDate}. ${todayDay}`;