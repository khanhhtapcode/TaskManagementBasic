// cache DOM — chỉ query 1 lần (tối ưu)
const name1Input = document.getElementById("name1");
const name2Input = document.getElementById("name2");
const result = document.getElementById("result");
const calcBtn = document.getElementById("calcBtn");

calcBtn.addEventListener("click", calculateLove);

function calculateLove() {
  const name1 = name1Input.value.trim();
  const name2 = name2Input.value.trim();

  if (!name1 || !name2) {
    result.textContent = "Please enter both names";
    return;
  }

  const score = Math.floor(Math.random() * 100) + 1;
  result.textContent = `${name1} and ${name2} have a love score of ❤️ ${score}%`;
}
