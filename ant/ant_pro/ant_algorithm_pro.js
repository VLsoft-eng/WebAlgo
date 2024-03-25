import{slider,drawAnts,antCount,colonyPos,ctx} from "./field.js";

const dir = ['top','bottom','left','right'];

class Ant{
    constructor(x,y,condition,direction) {
        this.x = x;
        this.y = y;
        this.condition = condition;
        this.direction = direction;
        this.path = [{x:colonyPos.x,y:colonyPos.y}];
    }
}

function reset(){
    ants=[];
    shortestPath = [];
}

function getColorAtPosition(x, y) {
    const imageData = ctx.getImageData(x, y, 1, 1);
    const rgb = imageData.data;
    return {r:rgb[0],g:rgb[1],b: rgb[2]};
}


function antMove(ant){
    if (ant.condition === 'start'){
        if (ant.path.length >= shortestPath.length){
            ant.condition='returning';
            return;
        }
        ant.x = shortestPath[ant.path.length].x;
        ant.y = shortestPath[ant.path.length].y;
        ant.path.push({x:ant.x,y:ant.y});
        return;
    }
    if (ant.condition === 'returning' && ant.path.length !== 0){
        ant.x = ant.path[ant.path.length-1].x;
        ant.y = ant.path[ant.path.length-1].y;
        ant.path.pop();
        console.log(ant.path);
        return;
    } if (ant.path.length === 0) {
        ant.condition = 'start';
        ant.path.push({x:colonyPos.x,y:colonyPos.y})
        return;
    }

    let random = Math.random();
    let color = getColorAtPosition(ant.x,ant.y);

    // проверка на еду
    if (color.r === 0 && color.g === 128 && color.b === 0){
        ant.condition = 'returning';
        if (ant.path.length < shortestPath.len){
            shortestPath = ant.path.slice();
            shortestPath.len = ant.path.length;
            console.log(shortestPath);
        }
        return;
    }
    // обновление позиций
    if (ant.direction === 'top'){
        if (ant.y<=1) {ant.direction = 'bottom';}
        ant.y--;
        if (random>0.5){
            ant.x--;
        } else if (random<=0.5){
            ant.x++;
        }
    } else if (ant.direction === 'bottom'){
        if (ant.y>=499) {ant.direction = 'top';}
        ant.y++;
        if (random>0.5){
            ant.x--;
        } else if (random<=0.5){
            ant.x++;
        }

    } else if (ant.direction === 'left'){
        if (ant.x<=1){ant.direction = 'right';}
        ant.x--;
        if (random>0.5){
            ant.y--;
        } else if (random<=0.5){
            ant.y++;
        }

    } else if (ant.direction === 'right'){
        if (ant.x>=750){ant.direction='left';}
        ant.x++;
        if (random>0.5){
            ant.y--;
        } else if (random<=0.5){
            ant.y++;
        }
    }

    // проверка на стенку
    if (color.r === 255 && color.g === 222 && color.b === 173){
        ant.x = ant.path[ant.path.length-1].x;
        ant.y = ant.path[ant.path.length-1].y;
        ant.path.pop();
        ant.direction = dir[Math.floor(Math.random()*4)];
        return;
    }

    if (random<0.01){
        ant.direction = dir[Math.floor(Math.random()*4)];
    }
    ant.path.push({x:ant.x,y:ant.y});
}

function antAlgorithm(){
    reset();
    if (!colonyPos.x) {alert("Сначала поставьте колонию"); return;}
    shortestPath.len = Number.MAX_VALUE;

    for (let i = 0; i < antCount.value;i++){
        ants.push(new Ant(colonyPos.x,colonyPos.y,'searching',dir[Math.floor(Math.random()*4)]));
    }
    function visualize(){
        for (let i =0;i < antCount.value;i++){
            antMove(ants[i]);
        }
        drawAnts(ants);
        setTimeout(visualize,100-slider.value);
    }
    visualize();
}
let ants = [];
let shortestPath = [];
export{reset};
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start').addEventListener('click', antAlgorithm);
});