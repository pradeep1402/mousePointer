class CanvasView {
  constructor(target) {
    this.target = target;
  }

  drawShape = ({ clientX, clientY }, classList = ['dot']) => {
    const div = document.createElement("div");
    div.style.top = `${clientY}px`;
    div.style.left = `${clientX}px`;
    div.classList.add(...classList);
    this.target.appendChild(div);
  };

  clearCanvas = () => {
    const shapes = Array.from(this.target.children);
    shapes.forEach(shape => this.target.removeChild(shape));
  };
}

class CanvasController {
  constructor(view) {
    this.view = view;
  }

  isInBoundary = (newX, newY, { left, right, top, bottom }) => {
    return newX >= left && newX <= right && newY >= top && newY <= bottom;
  };

  toggleMouseDraw = (event, shape) => {
    if (!(event.key === 'Control')) return;

    if (event.type === 'keydown') {
      addEventListener("mousemove", (event) => this.view.drawShape(event, shape));
      return;
    }

    removeEventListener('mousemove', this.view.drawShape);
  };

  drawUsingArrowKeys = ({ code }, lastMousePos) => {
    const coordinates = this.target.getBoundingClientRect();
    let newX = lastMousePos.x;
    let newY = lastMousePos.y;
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
}

class CanvasModel {
  drawPosition = [];

  constructor(drawPosition) {
    this.drawPosition = drawPosition;
  }

  drawNextShape(coordinates, shape = 'dot') {
    this.drawPosition.push({ coordinates, shape });
    return this.drawPosition.at(-1);
  }

  undoChange() {
    this.drawPosition.pop();
  }
}

const main = () => {
  const parent = document.querySelector('canvas');
  const canvas = new CanvasModel();
  const canvasView = new CanvasView(parent);
  const controller = new CanvasController(canvasView);
};

window.onload = main;