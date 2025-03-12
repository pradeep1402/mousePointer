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

const main = () => {
  const parent = document.querySelector('canvas');
  const canvas = new CanvasView(parent);

};

window.onload = main;