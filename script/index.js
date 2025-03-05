const removeAfterOneSec = (target, div) => {
  setTimeout(() => {
    target.removeChild(div);
  }, 1000);
};

const createDiv = ({ clientX, clientY, target }) => {
  if (!(target.classList.contains('parent'))) return;

  const div = document.createElement("div");
  div.style.top = `${clientY}px`;
  div.style.left = `${clientX}px`;
  div.classList.add("cursorClass");
  target.appendChild(div);

  removeAfterOneSec(target, div);
};

const main = () => {
  addEventListener("mousemove", createDiv);
};

window.onload = main;