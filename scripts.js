
function setup (){
    createCanvas(400, 800)
    createBubble()
}

let bubbles = [];

let score = 0;
let speedMultiplier = 0;


// Timers fro tracking our bubble creation
const spawnTime = 1000;
let currentTime = 10;
let lastCreationTime = 0;

let bubbleColor = ["red", "blue", "orange", "green", "pink"];

function createBubble(){
    bubbleColor = color (random(bubbleColor))

    bubbles.push ( {
        x: random (25, 375),
        y: 0,
        r: 25,
        speed: random (5, 10 * score/100),
    })
    lastCreationTime = new Date().getTime();
}


let hero = {
    x: 200,
    y: 700,
    r: 50,
}


function draw (){
    background ("white")
    fill (155)
    circle (hero.x, hero.y, hero.r)
    textSize(32)
    text(score, 300, 50)

    life();
   
    fill (bubbleColor)
    for(let [index, bubble] of bubbles.entries()){
        circle(bubble.x, bubble.y, bubble.r)
        bubble.y = bubble.y + bubble.speed
        isHit(hero, bubble)
        isOffScreen(bubble, index)
    }

  
    currentTime = new Date().getTime();
    if (currentTime - lastCreationTime > spawnTime){
        createBubble();
    }

    hero.x = constrain(hero.x, (hero.r/2), 400 - (hero.r/2));
}

function keyReleased(){
	if (keyCode === LEFT_ARROW){
		hero.x = hero.x - 10;
} else if (keyCode === RIGHT_ARROW) {
		hero.x = hero.x + 10;
    }
}

function isOffScreen(bubble, index){
    if(bubble.y > 800){
        bubbles.splice(index,1)
        console.log(bubbles)
        score = score + 10
        speedMultiplier = 20
    }

}


function isHit(hero, bubble){
    if(bubble.x > hero.x && bubble.x + bubble.r < hero.x + hero.r){
        if(bubble.y + bubble.r > hero.y && bubble.y + bubble.r < hero.y + hero.r){
            console.log("hit!")
            window.location.reload();
        }
    
    }
}

// show lifes of character 

function life(){
    if(keyCode === LEFT_ARROW){
        fill ("red");
    }else if (keyCode === RIGHT_ARROW){
        fill ("blue")
    }

    textSize(12);
    text ("Lives", 10, 10);
    rect (20,20,10,10),
    rect (40,20,10,10),
    rect (60,20,10,10)  
}


//Increase bubble size

// function bubbleIncrease(){
//     if(bubbleColor = "blue"){
//             hero + 1;
//     }else if (bubbleColor = "purple"){
//             hero - 1;
//     }else if (bubbleColor = "red"){
//             hero = 0;
//     }
// }

