const lastMousePos = { x: 0, y: 0 };

const drawCircle = ({ clientX, clientY, target }) => {
  if (!(target.classList.contains('parent'))) return;

  const div = document.createElement("div");
  div.style.top = `${clientY}px`;
  div.style.left = `${clientX}px`;
  div.classList.add("cursorClass");
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
  const parent = document.querySelector('.parent');
  const coordinates = parent.getBoundingClientRect();

  return isInBoundary(coordinates) && arrowKeys[code](parent);
};

const toggleMouseDraw = (event) => {
  if (event.key === 'Control' && event.type === 'keydown') {
    addEventListener("mousemove", drawCircle);
  }
  if (event.key === 'Control' && event.type === 'keyup') {
    removeEventListener('mousemove', drawCircle);
  }
};

const main = () => {
  addEventListener("keydown", toggleMouseDraw);
  addEventListener("keyup", toggleMouseDraw);
  addEventListener("keydown", moveCursorUsingKeys);
};

window.onload = main;