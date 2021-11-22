
function setup (){
    createCanvas(400, 800)
    createBubble()
}

let lives = 3;

let bubbles = [];

let score = 0;
let speedMultiplier = 0;


// Timers fro tracking our bubble creation
const spawnTime = 1000;
let currentTime = 10;
let lastCreationTime = 0;


function createBubble(){
    let bubbleColor = ["red", "purple", "blue", "orange", "green", "pink"];

    bubbles.push ( {
        x: random (25, 375),
        y: 0,
        r: 25,
        speed: random (1,3 * score/200),
        color: random(bubbleColor)
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
    fill (0)
    circle (hero.x, hero.y, hero.r)
    textSize(32)
    text(score, 300, 50)

    lifeRect();
    heroDies();
   
    for(let [index, bubble] of bubbles.entries()){
        fill (bubble.color)
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
        console.log(bubbles)
        //score = score + 10
        speedMultiplier = 5
    }

}

function isHit(hero, bubble){
    if(bubble.x > hero.x && bubble.x + bubble.r < hero.x + hero.r){
        if(bubble.y + bubble.r > hero.y && bubble.y + bubble.r < hero.y + hero.r){
            
            if(bubble.color = "blue"){
                console.log("hit!");
                bubble.x = bubble.x +1;
                score = score + 10;
            }else if (bubble.color = "red"){
                window.location.reload();
            }
        }
    
    }
}


// show lifes of character 
function lifeRect(){
    textSize(12);
    text ("Lives", 10, 10);

    let lives = [
        {
            color: "gray",
            x: 20,
            y: 20,
            w: 10,
            h: 10,
            deadColor: "black"
        },
        {
            color: "gray",
            x: 40,
            y: 20,
            w: 10,
            h: 10,
            deadColor: "black"
        },
        {
            color: "gray",
            x: 60,
            y: 20,
            w: 10,
            h: 10,
            deadColor: "black"  
        }
    ]
    for (let life of lives){
        fill(life.color);
        rect(life.x, life.y, life.w, life.h)
    }
            
            // if(bubble.color = "red"){
            //     fill(deadColor)
            // }
}

//Hero dies
function heroDies(bubble){
    console.log(lives)
    
}


