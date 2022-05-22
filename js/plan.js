const planForm = document.getElementById("plan-form");
const planInput = document.querySelector(".plan-input");
const planList = document.getElementById("plan-list");

const PLANS_KEY = "plans";

let plans = [];

function savePlans() {
  localStorage.setItem(PLANS_KEY, JSON.stringify(plans));
}

function updatePlan(event) {
  const li = event.target.parentElement;
  const plan = plans.filter((plan) => plan.id === parseInt(li.id));
  const text = plan[0].text;
  planInput.value = `${text}`;
  planInput.focus();
  deletePlan(event);
}

function deletePlan(event) {
  const li = event.target.parentElement;
  li.remove();
  plans = plans.filter((plan) => plan.id !== parseInt(li.id));
  savePlans();
}

function createPlanBtn(iconName) {
  const button = document.createElement("button");
  const image = document.createElement("img");
  image.src = `../images/icons/${iconName}.png`;
  image.alt = `${iconName}`;
  image.classList.add("plan-icon-btn");
  button.appendChild(image);
  if (iconName === "update") {
    button.addEventListener("click", updatePlan);
  } else {
    button.addEventListener("click", deletePlan);
  }
  return button;
}

function paintPlan(newPlan) {
  const li = document.createElement("li");
  li.id = newPlan.id;
  const span = document.createElement("span");
  span.innerText = newPlan.text;
  const updateBtn = createPlanBtn("update");
  const deleteBtn = createPlanBtn("delete");
  li.appendChild(span);
  li.appendChild(updateBtn);
  li.appendChild(deleteBtn);
  planList.appendChild(li);
}

function SubmitPlan() {
  event.preventDefault();
  const newPlan = planInput.value;
  planInput.value = "";
  const newPlanObj = {
    text: newPlan,
    id: Date.now(),
  };
  plans.push(newPlanObj);
  paintPlan(newPlanObj);
  savePlans();
}

planForm.addEventListener("submit", SubmitPlan);

const savedPlans = localStorage.getItem(PLANS_KEY);

if (savedPlans !== null) {
  const parsedPlans = JSON.parse(savedPlans);
  plans = parsedPlans;
  parsedPlans.forEach(paintPlan);
}