const mouseHover = () => {
  const parent = document.querySelector("#parent");
  const div = document.createElement("div");
  parent.appendChild(div);

  parent.addEventListener("mouseenter", () => {
    div.classList.add("cursorClass");
  });

  parent.addEventListener("mousemove", ({ clientX, clientY }) => {
    div.style.top = `${clientY}px`;
    div.style.left = `${clientX}px`;
  });

  parent.addEventListener("mouseleave", () => {
    div.classList.remove("cursorClass");
  });
};

window.onload = mouseHover;