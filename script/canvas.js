class CanvasView {
  constructor(parent) {
    this.target = parent;
  }

  drawShape = ({ x, y, shape = ['dot'] }) => {
    const div = document.createElement("div");
    div.style.top = `${y}px`;
    div.style.left = `${x}px`;
    div.classList.add(...shape);
    this.target.appendChild(div);
  };

  isInBoundary = (x, y) => {
    const { left, right, top, bottom } = this.target.getBoundingClientRect();
    return x >= left && x <= right && y >= top && y <= bottom;
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

  #mousemoveHandler({ clientX, clientY }) {
    const coordinates = this.model.setNextPosition({ x: clientX, y: clientY });
    this.view.drawShape(coordinates);
  }

  keyPressHandler(event) {
    const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    if (arrowKeys.includes(event.key) && event.type === 'keydown') {
      this.drawUsingArrowKeys(event.code);
      return;
    }

    if (!(event.key === 'Control')) return;

    this.#toggleMouseDraw(event.type);
  }


  #toggleMouseDraw(type) {
    if (type === 'keydown') {
      this.view.target.addEventListener("mousemove", this.handler);
      return;
    }

    this.view.target.removeEventListener("mousemove", this.handler);
  };

  drawUsingArrowKeys = (code) => {
    if (!(this.model.positions.length)) return;

    let newX = this.model.positions.at(-1).x;
    let newY = this.model.positions.at(-1).y;
    const arrowKeys = {
      'ArrowUp': () => newY -= 6,
      'ArrowDown': () => newY += 6,
      'ArrowLeft': () => newX -= 6,
      'ArrowRight': () => newX += 6
    };

    code in arrowKeys && arrowKeys[code]();

    if (this.view.isInBoundary(newX, newY)) {
      this.handler({ clientX: newX, clientY: newY });
    }
  };

  reset() {
    this.model.removeAllPosition();
    this.view.clearCanvas();
    this.view.target.removeEventListener("mousemove", this.handler);
  }
}

class CanvasModel {
  positions = [];
  deletedPos = [];

  setNextPosition(coordinates) {
    this.positions.push(coordinates);
    return this.positions.at(-1);
  }

  removeAllPosition() {
    this.deletedPos = [...this.positions];
    this.positions = [];
    return this.positions;
  }

  undoChange() {
    this.deletedPos = [...this.deletedPos, this.positions.pop()];
    return this.positions;
  }
}

const main = () => {
  const parent = document.querySelector('.canvas');
  const canvas = new CanvasModel();
  const canvasView = new CanvasView(parent);
  const controller = new CanvasController(canvasView, canvas);
  document.addEventListener('keydown', event => controller.keyPressHandler(event));
  document.addEventListener('keyup', event => controller.keyPressHandler(event));
  document.querySelector('#reset').addEventListener('click', event => controller.reset(event));
};

window.onload = main;