class CanvasView {
  constructor(parent) {
    this.target = parent;
  }

  draw = ({ x, y, shape = ['dot'] }) => {
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
    this.target.innerHTML = "";
  };
}

class CanvasController {
  constructor(view, canvas) {
    this.view = view;
    this.model = canvas;
    this.mouseMoveHandler = this.#mouseHandler.bind(this);
  }

  #mouseHandler({ clientX, clientY }) {
    const coordinates = this.model.setNextPosition({ x: clientX, y: clientY });
    this.view.draw(coordinates);
  }

  keyPressHandler(event) {
    if (event.key === 'Control') {
      this.#toggleMouseDraw(event.type);
    }

    this.handleArrowKeyPress(event);
  }

  handleArrowKeyPress(event) {
    const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    if (event.type === 'keydown' && arrowKeys.includes(event.key)) {
      this.drawUsingArrowKeys(event.code);
    }
  }

  #toggleMouseDraw(type) {
    if (type === 'keydown') {
      this.view.target.addEventListener("mousemove", this.mouseMoveHandler);
      return;
    }

    this.view.target.removeEventListener("mousemove", this.mouseMoveHandler);
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
      this.mouseMoveHandler({ clientX: newX, clientY: newY });
    }
  };

  reset() {
    this.model.clearPosition();
    this.view.clearCanvas();
    this.view.target.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  undoChange() {
    this.view.clearCanvas();
    this.model.undo().forEach(position => {
      this.view.draw(position);
    });
  }
}

class CanvasModel {
  positions = [];
  deletedPos = [];

  setNextPosition(coordinates) {
    this.positions.push(coordinates);
    return this.positions.at(-1);
  }

  clearPosition() {
    this.deletedPos = [...this.positions];
    this.positions = [];
    return this.positions;
  }

  undo() {
    this.deletedPos.push(this.positions.pop());
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
  document.querySelector('#undo').addEventListener('click', event => controller.undoChange(event));
};

window.onload = main;