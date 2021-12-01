let screen = 0;
// let blowFish;

// function preload(){
//     blowFish = loadImage("blowfish.png")
// }

function setup (){
    createCanvas(500, 800)
    createBubble()
}

let lives = 3;

let bubbles = [];

let score = 0;
let speedMultiplier = 0;

// Timers for tracking our bubble creation
const spawnTime = 1000;
let currentTime = 10;
let lastCreationTime = 0;


function createBubble(){
    let bubbleColor = ["red", "purple", "blue", "orange", "green", "pink"];

    bubbles.push ( {
        x: random (25, 375),
        y: 0,
        r: random (25, 50),
        speed: random (1,3 * score/200),
        color: random(bubbleColor),
        hit: false,
        
    })
    lastCreationTime = new Date().getTime();
}


let hero = {
    x: 200,
    y: 775,
    r: 50,
    lives: 3,
}


function draw (){
    if (screen == 0){

        background (0)
        fill(255)
        textAlign(CENTER)
        text('Click to start', width/2, height/2)
    
    }else if (screen == 1){

        background ("white")
        // image(blowFish, hero.x, hero.y, hero.r)
        fill (0)
        circle (hero.x, hero.y, hero.r)
        fill(255)
        rect(400, 0, 100, 800)
        fill("blue")
        textSize(16)
        text(score, 430, 80)

        lifeRect();
       
   
    for(let [index, bubble] of bubbles.entries()){
        fill (bubble.color)
        circle(bubble.x, bubble.y, bubble.r)
        bubble.y = bubble.y + bubble.speed
        bubble.hit = collideCircleCircle(bubble.x, bubble.y, bubble.r, hero.x, hero.y, hero.r)
        bubbleHitHero(bubble, index)
        isOffScreen(bubble, index)

    }

    currentTime = new Date().getTime();
    if (currentTime - lastCreationTime > spawnTime){
        createBubble();
    }

    hero.x = constrain(hero.x, (hero.r/2), 400 - (hero.r/2));

    console.log(hero.lives)
    }
}

// Bubbles hit hero
function bubbleHitHero(bubble, index){
    if(bubble.hit == true && bubble.color == "red"){
        bubbles.splice(index, 1)
        hero.lives = hero.lives - 1
        }

        if(bubble.hit == true && bubble.color == "blue"){
            bubbles.splice(index, 1);
            score = score + 10;
        }

        if(bubble.hit == true && bubble.color == "purple"){
            bubbles.splice(index, 1);
            score = score + 20
        }

        if(bubble.hit == true && bubble.color == "pink"){
            bubbles.splice(index, 1);
            score = score - 5
        }

        if(bubble.hit == true && bubble.color == "orange"){
            bubbles.splice(index, 1);
            score = score - 10
        }

        if(bubble.hit == true && bubble.color == "green"){
            bubbles.splice(index, 1);
            score = score + 1
        }
}

function keyPressed(){
	if (keyCode === LEFT_ARROW){
		hero.x = hero.x - 10;
} else if (keyCode === RIGHT_ARROW) {
		hero.x = hero.x + 10;
    }
}

function isOffScreen(bubble, index){
    if(bubble.y > 800){
        bubbles.splice(index,1)
//         // console.log(bubbles)
//         //score = score + 10
//         speedMultiplier = 5
    }

}

// show lifes of character 
function lifeRect(){
    fill("blue")
    textSize(16);
    text ("Lives ", 425, 18);

    let lives = [
        {
            color: "gray",
            x: 420,
            y: 30,
            w: 10,
            h: 10,
            deadColor: "black"
        },
        {
            color: "gray",
            x: 440,
            y: 30,
            w: 10,
            h: 10,
            deadColor: "black"
        },
        {
            color: "gray",
            x: 460,
            y: 30,
            w: 10,
            h: 10,
            deadColor: "black"  
        }
    ]

    for (let life of lives){
        fill(life.color);
        rect(life.x, life.y, life.w, life.h)

        if(hero.lives == 2){
            lives.splice(2)
        }

            if(hero.lives == 1){
                lives.splice(1,2)
            }

                if(hero.lives == 0){
                    lives.splice(0,1,2)
                    window.location.reload()
                }
     }  
}

function increaseSpeed(){
    if(score = score + 100) {
        speedMultiplier = (speedMultiplier + 1)/10
    }
}
  
function mousePressed(){
    if (screen == 0) {
        screen = 1;
      }
    }
