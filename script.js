// 時計を動かす
const clock = document.querySelector("#clock");
const today = document.querySelector("#today");
const theme = document.querySelector("#theme");

const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function updateClock() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const day = dayOfWeek[now.getDay()];

  clock.textContent = `${hours}:${minutes}:${seconds}`;
  today.textContent = `${year} / ${month} / ${date} (${day})`;

  document.title = clock.textContent + " | デジタル時計";

  const delay = 1000 - now.getMilliseconds();
  setTimeout(updateClock, delay);
}

updateClock();

// テーマカラーの設定、保存・ロード
const saveData = localStorage.getItem("theme");
theme.value = saveData || "system";

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function applySystemTheme() {
  if (systemTheme.matches) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}
function applyTheme() {
  if (theme.value === "dark") {
    document.body.classList.add("dark");
  } else if (theme.value === "light") {
    document.body.classList.remove("dark");
  } else {
    applySystemTheme();
  }
}

theme.addEventListener("change", function () {
  localStorage.setItem("theme", theme.value);
  applyTheme();
});

systemTheme.addEventListener("change", function () {
  if (theme.value === "system") {
    applySystemTheme();
  }
});

applyTheme();
