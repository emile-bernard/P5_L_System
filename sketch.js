//
//
//  (c) Tariq Rashid 2018
//  sketch supports content of Make Your Own Algorithmic Art
//  https://www.amazon.com/Make-Your-Own-Algorithmic-Art-ebook/dp/B07BP13VPR
//
//

// turtle code
let code = [...'F[LF]F[RF]F[F]'];
// empty notebook
let instructions = [];
// total number of generations
let generations = 0;
// step size, initial position, direction
let step = 0;

let turtleXPos = 400;
let turtleYPos = 725;
let turtleAngle = 0;

function setup(){
    createCanvas(windowWidth, windowHeight);
    background('#a4a4a4');
    noLoop();

    let generateButton = createButton('Generate Pattern');
    generateButton.style('background-color', '#ffffff');
    generateButton.style('text-color', '#000000');
    generateButton.position(40, 20);
    generateButton.mousePressed(function() {
        clear();
        background('#a4a4a4');
        redraw();
    });
}

function draw(){
    angleMode(DEGREES);
    stroke('#078831');
    strokeWeight(Math.round(random(1, 5)));

    evolve();
    drawPattern();
    drawParams();
}

function evolve() {
    generations = Math.round(random(2, 4));
    // loop over generations
    for (let gen = 1; gen <= generations; gen += 1) {
        // empty list of next generation code
        let next_gen_code = [];
        // visit each instruction
        for (let instruction of code) {
            // apply growth rule to F
            if (instruction == 'F') {
                next_gen_code.push(...'F[RF]F[LF]F[F]');
            } else {
                // no match so let it pass unchanged
                next_gen_code.push(instruction);
            }
        }
        // replace code with next_gen_code
        code = next_gen_code;
    }
}

function drawPattern() {
    step = Math.round(random(2, 6));
    // visit each instruction
    for (let instruction of code) {
        // interpret instruction
        if (instruction == 'F') {
            // go forward
            let newX = turtleXPos - (step * sin(turtleAngle));
            let newY = turtleYPos - (step * cos(turtleAngle));
            line(turtleXPos, turtleYPos, newX, newY);
            // update location
            turtleXPos = newX;
            turtleYPos = newY;
        } else if (instruction == 'L') {
            // turn left
            turtleAngle += 30;
        } else if (instruction == 'R') {
            // turn right
            turtleAngle -= 30;
        } else if (instruction == '[') {
            // store current position and angle
            instructions.push(turtleYPos);
            instructions.push(turtleXPos);
            instructions.push(turtleAngle);
        } else if (instruction == ']') {
            // retrieve previoous position and angle
            turtleAngle = instructions.pop();
            turtleXPos = instructions.pop();
            turtleYPos = instructions.pop();
        }
    }
}

function drawParams() {
    noStroke();
    fill(255);
    text('Code: ' + code, 20, 60);
    text('Generations: ' + generations, 20, 80);
    text('Step: ' + step, 20, 100);
}