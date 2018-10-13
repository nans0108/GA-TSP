function Gene(cities, path) {
	this.cities = cities;
	this.path = path;
	this.fitness = 0;

	this.findRoute = function() {
		var path = [];
		var counter = 0;
		var p;
		while(counter < this.cities.length){
			p = floor(random(cities.length));
			if(!this.addedAlready(p, path)) {
				path.push(p);
				counter++;
			}
		}
		return path;
	}

	this.addedAlready = function(p, path) {
		for(var i=0; i<path.length; i++){
			if(path[i] == p) return true;
		}
		return false;
	}

	if(this.path == null) this.path = this.findRoute();

	this.fitnessFromDistance = function() {
		var distanceSum = 0;
		for(var i=0; i<this.path.length-1; i++){
			distanceSum += Math.sqrt(Math.pow(this.cities[this.path[i]].x - this.cities[this.path[i+1]].x, 2) + Math.pow(this.cities[this.path[i]].y - this.cities[this.path[i+1]].y, 2));
		}
		return distanceSum;
	}

	this.getFitness = function() {
		var distanceSum = this.fitnessFromDistance();
		var fit = map(1 / distanceSum, 0, 0.1, 0, 1000);
		this.fitness = floor(10000 * fit);
	}

	this.crossover = function(gene2){
		var length = floor(random(1, this.path.length/3));
		var startingPoint = floor(random(0, this.path.length - (this.path.length/3)));
		var newPath = [];
		var checked = [];
		var nextGene = [];
		var count = 0;
		for(var i=startingPoint; i<startingPoint+length; i++) {
			newPath[i] = this.path[i];
			checked[count] = this.path[i];
			count++;
		}
		for(var j=0; j<gene2.path.length; j++) {
			if(!this.isAlreadyFilled(gene2.path[j], checked)) {
				nextGene.push(gene2.path[j]);
			}
		}
		for(var p=0;p<startingPoint;p++){
			newPath[p] = nextGene[p];
		}
		var q = startingPoint;
		for(var g=startingPoint+length; g<this.path.length; g++) {
			newPath[g] = nextGene[q];
			q++;
		}
		return new Gene(cities, newPath);
	}

	this.isAlreadyFilled = function(element, checked) {
		for(var i=0; i<checked.length; i++){
			if(element == checked[i])	return true;
		}
		return false;
	}

	this.mutate = function(mutatRate) {
		for(var i=0; i<this.path.length; i++){
			for(var k=0; k<this.path.length; k++){
				var rand = random(0,1);
				if((k != i) && (mutatRate > rand)){
					var tempElement = this.path[k];
					this.path[k] = this.path[i];
					this.path[i] = tempElement;
				}
			}
		}
	}
}
