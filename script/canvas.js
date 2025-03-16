class CanvasView {
  constructor(parent) {
    this.target = parent;
  }

  drawShape = ({ x, y, shape }) => {
    const div = document.createElement("div");
    div.style.top = `${y}px`;
    div.style.left = `${x}px`;
    div.classList.add(...shape);
    this.target.appendChild(div);
  };

  isInBoundary = (newX, newY) => {
    const { left, right, top, bottom } = this.target.getBoundingClientRect();
    return newX >= left && newX <= right && newY >= top && newY <= bottom;
  };

  clearCanvas = () => {
    const shapes = Array.from(this.target.children);
    shapes.forEach(shape => this.target.removeChild(shape));
  };
}

class CanvasController {
  constructor(view, canvas) {
    this.view = view;
    this.model = canvas;
    this.handler = this.#mousemoveHandler.bind(this);
  }

  #mousemoveHandler(event) {
    const coordinates = this.model.setNextPosition({ x: event.clientX, y: event.clientY, shape: ['dot'] });
    this.view.drawShape(coordinates);
  }


  toggleMouseDraw(event) {
    console.log(event);
    if (!(event.key === 'Control')) return;

    if (event.type === 'keydown') {
      this.view.target.addEventListener("mousemove", this.handler);
      return;
    }

    this.view.target.removeEventListener("mousemove", this.handler);
  };

  drawUsingArrowKeys = ({ code }) => {
    let newX = this.model.positions.at(-1).coordinates.x;
    let newY = this.model.positions.at(-1).coordinates.y;
    const arrowKeys = {
      'ArrowUp': () => newY -= 6,
      'ArrowDown': () => newY += 6,
      'ArrowLeft': () => newX -= 6,
      'ArrowRight': () => newX += 6
    };

    code in arrowKeys && arrowKeys[code]();

    if (this.isInBoundary(newX, newY, coordinates)) {
      this.view.drawShape({ clientX: newX, clientY: newY });
    }
  };

  reset() {
    console.log('helo');
    this.model.removeAllPosition();
    this.view.clearCanvas();
  }
}

class CanvasModel {
  positions = [];

  setNextPosition(coordinates) {
    console.log(coordinates);
    this.positions.push(coordinates);
    console.log(this.positions);
    return this.positions.at(-1);
  }

  removeAllPosition() {
    this.positions = [];
    return this.positions;
  }

  undoChange() {
    this.positions.pop();
  }
}

const main = () => {
  const parent = document.querySelector('.canvas');
  const canvas = new CanvasModel();
  const canvasView = new CanvasView(parent);
  const controller = new CanvasController(canvasView, canvas);
  document.addEventListener('keydown', event => controller.toggleMouseDraw(event));
  document.addEventListener('keyup', event => controller.toggleMouseDraw(event));
  document.querySelector('#reset').addEventListener('click', event => controller.reset(event));
};

window.onload = main;