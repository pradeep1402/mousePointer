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

  code in arrowKeys && arrowKeys[code]();

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
  const canvas = document.querySelector('.canvas');
  const dots = document.querySelectorAll('.dot');
  dots.forEach(child => canvas.removeChild(child));
};

const main = () => {
  document.addEventListener("keydown", toggleMouseDraw);
  document.addEventListener("keyup", toggleMouseDraw);
  document.addEventListener("keydown", moveCursorUsingKeys);
  document.querySelector('#reset-btn').addEventListener('click', clearCanvas);
};

window.onload = main;