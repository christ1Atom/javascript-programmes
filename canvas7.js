// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width=innerWidth;
canvas.height=innerHeight;


// Variables

var mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};

var colors = [
	'#2185C5',
	'#7ECEFD',
	'#FFF6E5',
	'#FF7F66'
];

var gravity = 1;
var friction = 0.5;
// Event Listeners
addEventListener("mousemove",function(event){
	mouse.x = event.clientX,
	mouse.y = event.clientY;
});

addEventListener("resize",function(){
	canvas.width=innerWidth;
	canvas.height=innerHeight;

	init();
});

addEventListener("click",function(){
	init();
});

// Utility Functions 
function randomIntFromRange(min,max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors){
	return colors[Math.floor(Math.random() * colors.length)];
}

// Objects
function Ball(x, y, dy, dx,radius, color){
	this.x=x;
	this.y=y;
	this.dy=dy;
	this.dx=dx;
	this.radius = radius;
	this.color=color;

	this.update=function(){
		this.draw();
		if(this.y + this.radius + this.dy > innerHeight){
			this.dy=-this.dy * friction;
		}else{
			this.dy +=gravity;
			console.log(this.y, innerHeight);
		}

		if(this.x + this.radius + this.dx > innerWidth ||
		   this.x - this.radius  < 0){
			this.dx=-this.dx;
		}
		this.y += this.dy;
		this.x +=this.dx;
	};
	this.draw=function(){
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false);
		c.fillStyle=this.color;
		c.fill();
		c.stroke();
	};
}

// Implementation
var ball;
var ballArray;
function init(){
	ballArray=[];
	for(var i=0; i < 400; i++){
	   var radius=randomIntFromRange(8,20);
	   var x = randomIntFromRange(radius, canvas.width - radius);
	   var y = randomIntFromRange(0, canvas.height - radius);
	   var dx=randomIntFromRange(-2,2);
	   var dy=randomIntFromRange(-2,2);
	   var color=randomColor(colors);
	   ballArray.push(new Ball(x,y,dy, dx, radius, color));
	}
	//ball = new Ball(innerWidth / 2, innerHeight / 2, 2, 30, 'red');
	//console.log(ball);
	console.log(ballArray);
}

// Animation Loop
function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	for(var i=0; i < ballArray.length; i++){
		ballArray[i].update();
	}
	//c.fillText("HTML CANVAS BOILTERPLATE",mouse.x,mouse.y);
	//ball.update();
}

init();
animate();
