const lastMousePos = { x: 0, y: 0 };

const drawCircle = ({ clientX, clientY, target }) => {
  if (!(target.classList.contains('canvas'))) return;

  const div = document.createElement("div");
  div.style.top = `${clientY}px`;
  div.style.left = `${clientX}px`;
  div.classList.add("dot");
  target.appendChild(div);

  lastMousePos.x = clientX;
  lastMousePos.y = clientY;
};

const drawUsingArrowKeys = (code, canvas) => {
  const coordinates = canvas.getBoundingClientRect();
  let newX = lastMousePos.x;
  let newY = lastMousePos.y;
  const arrowKeys = {
    'ArrowUp': () => newY -= 6,
    'ArrowDown': () => newY += 6,
    'ArrowLeft': () => newX -= 6,
    'ArrowRight': () => newX += 6
  };

  arrowKeys[code]?.();

  if (isInBoundary(newX, newY, coordinates)) {
    drawCircle({ clientX: newX, clientY: newY, target: canvas });
  }
};

const isInBoundary = (newX, newY, { left, right, top, bottom }) => {
  return newX >= left && newX <= right && newY >= top && newY <= bottom;
};

const moveCursorUsingKeys = ({ code }) => {
  const parent = document.querySelector('.canvas');
  drawUsingArrowKeys(code, parent);
};

const toggleMouseDraw = (event) => {
  if (!(event.key === 'Control')) return;

  if (event.type === 'keydown') {
    addEventListener("mousemove", drawCircle);
    return;
  }

  removeEventListener('mousemove', drawCircle);
};

const clearCanvas = () => {
  const parent = document.querySelector('.canvas');
  const children = document.querySelectorAll('.dot');
  children.forEach(child => parent.removeChild(child));
};

const main = () => {
  addEventListener("keydown", toggleMouseDraw);
  addEventListener("keyup", toggleMouseDraw);
  addEventListener("keydown", moveCursorUsingKeys);
  document.querySelector('#reset-btn').reset.addEventListener('click', clearCanvas);
};

window.onload = main;