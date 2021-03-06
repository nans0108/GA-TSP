var circleRadius = 10;
var citiesNumber = 20;
var cities = [];
var path = [];
var population,currentBest;
var count = 0;
var run = true;

function setup() {
	createCanvas(500,510);
	reset();
}

function reset() {
	background(255);
	generateCityLocations();
	drawGeneratedLocationsAndPathBetweenThem();
	var popMax = 20;
	var mutationRate = 0.05;
	population = new Population(popMax, mutationRate, cities);
}

function draw() {
	var currentBestTemp = currentBest;
	var genMaxFit = population.maxFitness();
	if(currentBest == null) {
		currentBest = genMaxFit;
	} else {
		if(currentBest.fitness<genMaxFit.fitness){
			currentBest = genMaxFit;
		}
	}
	drawGeneratedLocationsAndPathBetweenThem();
	text("Generation: " + population.generation, 0, 505);
	text("Maximum Fitness: " + floor(currentBest.fitnessFromDistance()), 325, 505);
	population.naturalSelection();
	population.generateNewPopulation();
}

function drawGeneratedLocationsAndPathBetweenThem() {
	background(255);
	for(var i=0; i<cities.length; i++){
		ellipse(cities[i].x, cities[i].y, (circleRadius*2), (circleRadius*2));
	}
	if(currentBest != null){
		for(var j=0; j<currentBest.path.length-1; j++){
			line(cities[currentBest.path[j]].x, cities[currentBest.path[j]].y, cities[currentBest.path[j+1]].x, cities[currentBest.path[j+1]].y);
		}
	}
}

function generateCityLocations(){
	for(var i=0; i<citiesNumber; i++){
		cities.push(createVector(random(10, width-10), random(10, 500-10)));
	}
}

function keyPressed(){
	if(keyCode == 32){
		if(run) {
			run = false;
			noLoop();
		} else {
			run = true;
			loop();
		}
	}
}

function mouseClicked(){
	currentBest = null;
	count = 0;
	cities = [];
	path = [];
	reset();
}
