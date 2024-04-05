import {reset,pheromones} from './ant_algorithm_pro.js'

const canvas = document.getElementById('field');
let ctx = canvas.getContext('2d');
function startDrawing(e){
    isDrawing = true;
    draw(e);
}

function endDrawing(){
    isDrawing = false;
}

function draw(e){
    if (isDrawing) {
        let x = e.offsetX, y = e.offsetY;
        if (drawingColony && !colonyPos.x) {
            drawColony(x, y);

            colonyPos.x = x;
            colonyPos.y = y;
        }

        if (drawingWalls) {
            drawWall(x, y);
            walls.push({x, y});
        }

        if (drawingFood) {
            drawFood(x, y);
            foods.push({x, y});
        }
    }
}

function drawColony(x,y){
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}
function drawWall(x,y){
    ctx.beginPath();
    ctx.rect(x - 10, y - 10, 20, 20);
    ctx.fillStyle = 'navajowhite';
    ctx.fill();
    ctx.closePath();
}
function drawFood(x,y) {
    ctx.beginPath();
    ctx.rect(x - 10, y - 10, 20, 20);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
}

function switchColony(){
    drawingColony = true;
    drawingWalls = false;
    drawingFood = false;

    document.getElementById('addWall').disabled = false;
    document.getElementById('addColony').disabled = true;
    document.getElementById('addFood').disabled = false;
}

function switchWalls(){
    drawingWalls = true;
    drawingColony = false;
    drawingFood = false;

    document.getElementById('addWall').disabled = true;
    document.getElementById('addColony').disabled = false;
    document.getElementById('addFood').disabled = false;
}

function switchFood(){
    drawingFood = true;
    drawingWalls = false;
    drawingColony = false;

    document.getElementById('addWall').disabled = false;
    document.getElementById('addColony').disabled = false;
    document.getElementById('addFood').disabled = true;
}

function drawAnts(ants){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0;i < pheromones.length;i++){
        ctx.beginPath();
        ctx.arc(pheromones[i].x, pheromones[i].y , 1, 0, Math.PI * 2);
        ctx.fillStyle = pheromones[i].color;
        ctx.fill();
        ctx.closePath();
    }
    if (colonyPos.x){drawColony(colonyPos.x, colonyPos.y);}
    for (let i = 0;i<walls.length;i++){
        drawWall(walls[i].x,walls[i].y);
    }
    for (let i = 0;i<ants.length;i++){
        ctx.drawImage(antImage,ants[i].x - 10,ants[i].y - 10,40,40);
    }
    for (let i = 0;i<foods.length;i++){
        drawFood(foods[i].x,foods[i].y);
    }
}

function clear(){
    colonyPos = { x: null, y: null };
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    walls = [];
    foods =[];
    reset();
}

//слайдеры
let antCount = document.getElementById("ants");
let outputCount = document.getElementById("antsCount");
outputCount.innerHTML = antCount.value;
antCount.oninput = function() {
    outputCount.innerHTML = this.value;
}

let slider = document.getElementById("range");
let output = document.getElementById("value");
output.innerHTML = slider.value;
slider.oninput = function() {
    output.innerHTML = this.value;
}

let colonyPos = { x: null, y: null };
let drawingColony = false;
let drawingWalls = false;
let drawingFood = false;
let isDrawing = false;
let walls = [];
let foods = [];

export {slider,antCount,colonyPos,drawAnts,ctx};

let antImage = new Image();
antImage.src = '../../source/ant_algorithm_images/ant.png';

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', endDrawing);
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addColony').addEventListener('click', switchColony);
    document.getElementById('addWall').addEventListener('click', switchWalls);
    document.getElementById('addFood').addEventListener('click', switchFood);
    document.getElementById('delete').addEventListener('click', clear);
});
