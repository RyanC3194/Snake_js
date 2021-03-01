"use strict"
let score = 0
document.getElementById("score").innerHTML = "Score: " + score


let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
drawCoord()

let head_coord =  [0,0] //[x,y]
let bodies = [head_coord.slice()]; // [coord1, coord2, coord3, ...] //[x1,y1,x2,y2...]


fillBox() // set the first tile
let input = moveRight; //one of the 4 function: moveDown, moveUP, moveRight, moveLeft
let clear = false;

let food_coord = [-1, -1]

let inGame = false


document.addEventListener('keydown', keyDownEvent);







function start() {
    reset()
    setFood()
    if (!inGame) {
        move()
    }
    inGame = true

}

function reset() {
    score = 0
    document.getElementById("score").innerHTML = "Score: " + score
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, 500, 500)
    ctx.fillStyle = 'red'
    ctx.fillRect(0,0, 50, 50)
    drawCoord()
    head_coord =  [0,0]
    input = moveRight
    bodies = [head_coord.slice()]
    clear = true
    fillBox()

}

function keyDownEvent(e) {
    switch (e.code) {
        case ('ArrowRight'):
            input = moveRight;
            break;
        case ('ArrowDown'):
            input = moveDown;
            break;
        case ('ArrowUp'):
            input = moveUp;
            break;
        case ('ArrowLeft'):
            input = moveLeft
            break;
    }
}

function checkCondition(){
    //check for bound
    if (head_coord[0] < 0 || head_coord[0] >= 500 || head_coord[1] < 0 || head_coord[1] >= 500){
        return false
    }

    // check for body collision
    for (let i = 0; i < bodies.length - 1; i++) {
        if ( head_coord[0] === bodies[i][0] && head_coord[1]===bodies[i][1]) {
            return false
        }
    }
    return true
}

function move() {
    input()
    bodies.push(head_coord.slice())

    if (!checkCondition()) {
        inGame = false
        gameEnd()
        return
    }

    fillBox()
    if (head_coord[0] === food_coord[0] && head_coord[1] === food_coord[1]) {
        score += 100
        setFood()
        clear = false
    }
    oneStep()
}


function oneStep() {
    if (clear) {
        clearLast()
        score -= 1
    }
    else {
        clear = true
    }
    document.getElementById("score").innerHTML = "Score: " + score
    setTimeout(move, 500)
}

function clearLast() {
    clearBox(bodies[0])
    bodies.shift()
}



function moveDown() {
    head_coord[1] += 50
}

function moveUp() {
    head_coord[1] -= 50
}

function moveRight() {
    head_coord[0] += 50
}

function moveLeft() {
    head_coord[0] -= 50
}


function clearBox(coord) {
    ctx.fillStyle = 'white'
    ctx.fillRect(coord[0], coord[1], 50, 50)
    drawCoord()
}

function fillBox() {
    ctx.fillStyle = 'red'
    ctx.fillRect(head_coord[0], head_coord[1], 50, 50)
    drawCoord()
}



function drawCoord() {
    ctx.strokeStyle = 'aqua'
    for (let i = 0; i < 11; i++)
    {
        ctx.moveTo(50 * i, 0)
        ctx.lineTo(50 * i, 500)
        ctx.stroke()

        ctx.moveTo(0, 50 * i)
        ctx.lineTo(500, 50 * i)
        ctx.stroke()
    }
}

function gameEnd() {
    ctx.fillStyle = 'green'
    ctx.fillRect(0, 0, 500, 500)
}

function setFood() {
    food_coord = randomCoord()
    let onBodies = false
    while (true) {
        onBodies = false
        for (let i = 0; i < bodies.length; i++) {
            if ( food_coord[0] === bodies[i][0] && food_coord[1]===bodies[i][1]) {
                onBodies = true
            }
        }
        if (onBodies) {
            food_coord = randomCoord()
        }
        else {
            break;
        }
    }
    ctx.fillStyle = 'yellow'
    ctx.fillRect(food_coord[0], food_coord[1], 50,50)
    drawCoord()
}

function randomCoord() {
    return [50 * Math.floor(Math.random() * 10),50 * Math.floor(Math.random() * 10)]
}