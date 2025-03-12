class CanvasView {
  constructor(target) {
    this.target = target;
  }

  toggleMouseDraw = (event, dot) => {
    if (!(event.key === 'Control')) return;

    if (event.type === 'keydown') {
      addEventListener("mousemove", this.drawShape(event, dot));
      return;
    }

    removeEventListener('mousemove', this.drawShape);
  };

  drawShape = ({ clientX, clientY }, classList = ['dot']) => {
    const div = document.createElement("div");
    div.style.top = `${clientY}px`;
    div.style.left = `${clientX}px`;
    div.classList.add(...classList);
    this.target.appendChild(div);
  };

  moveCursorUsingKeys = ({ code }) => {
    drawUsingArrowKeys(code, this.target);
  };

  clearCanvas = () => {
    const dots = document.querySelectorAll('dot');
    dots.forEach(dot => dot.removeChild());
  };
}

const main = () => {
  const parent = document.querySelector('canvas');
  const canvas = new CanvasView(parent);

};

window.onload = main;