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

const arrowKeys = {
  'ArrowUp': (target) => {
    return drawCircle({ clientX: lastMousePos.x, clientY: lastMousePos.y - 6, target });
  },
  'ArrowDown': (target) => {
    return drawCircle({ clientX: lastMousePos.x, clientY: lastMousePos.y + 6, target });
  },
  'ArrowRight': (target) => {
    return drawCircle({ clientX: lastMousePos.x + 6, clientY: lastMousePos.y, target });
  },
  'ArrowLeft': (target) => {
    return drawCircle({ clientX: lastMousePos.x - 6, clientY: lastMousePos.y, target });
  },
};

const isInBoundary = ({ x, right, top, bottom }) => {
  if (lastMousePos.x - 4 >= x &&
    right > lastMousePos.x + 4 &&
    lastMousePos.y - 4 >= top &&
    bottom > lastMousePos.y + 4) {
    return true;
  }

  return false;
};

const moveCursorUsingKeys = ({ code }) => {
  const parent = document.querySelector('.canvas');
  const coordinates = parent.getBoundingClientRect();

  return isInBoundary(coordinates) && arrowKeys[code](parent);
};

const toggleMouseDraw = (event) => {
  console.log(event);
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
  const reset = document.querySelector('#reset-btn');
  reset.addEventListener('click', clearCanvas);
};

window.onload = main;