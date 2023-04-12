let canvas = document.getElementById("myCanvas");
let width = 10;
let height = 15;
let ctx = canvas.getContext("2d");
canvas.height = 800;
canvas.width = 800;

let distance = canvas.width/width;
let hexRadius = distance / (2 * Math.cos(Math.PI / 6));

ctx.rotate(90 * Math.PI / 180);
ctx.translate(0,-800);

function getHexagonPosition(row, col) {
    let y = distance * row + distance / 2;
    if (col % 2 === 0) {
        y = distance * row;
    }
    let x = hexRadius + 1.5 * hexRadius * col;
    return [x, y];
}

for (let row = 0; row < width; ++row) {
    for (let col = 0; col < height; ++col) {
        let [x, y] = getHexagonPosition(row, col);
        drawHexagon(ctx, x, y, hexRadius);
    }
}

function drawHexagon(ctx, x, y, radius) {
    let sides = 6;
    let angle = 2 * Math.PI / sides;
    ctx.beginPath();
    ctx.moveTo(x + radius * Math.cos(0), y + radius * Math.sin(0));
    for (let i = 1; i <= sides; ++i) {
        ctx.lineTo(x + radius * Math.cos(i * angle), y + radius * Math.sin(i * angle));
    }
    ctx.closePath();
    ctx.stroke();
}
