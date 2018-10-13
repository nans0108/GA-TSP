function Population(popMax, mutationRate, cities) {
	this.popMax = popMax;
	this.mutRate = mutationRate;
	this.cities = cities;
	this.population = [];
	this.matingPool = [];
	this.generation = 1;
	this.amount = 0;
	this.p = 0;
	for(var i=0; i<this.popMax; i++) {
		this.population.push(new Gene(this.cities, null));
		this.population[i].getFitness();
	}

	this.maxFitness = function() {
		var j = -1;
		var index = 0;
		for(var i=0; i<this.population.length; i++){
			this.population[i].getFitness();
			if(this.population[i].fitness > j){
				j=this.population[i].fitness;
				index = i;
			}
		}
		return this.population[index];
	}

	this.naturalSelection = function() {
		this.matingPool.length = 2000000;
		for(var i=0; i<this.population.length; i++) {
			this.p = this.population[i].fitness/3.5;
			for(var j=0; j<this.p; j++) {
				this.amount++;
				if (this.amount>this.matingPool.length) {
					this.matingPool.push(this.population[i]);
				} else {
					this.matingPool[this.amount] = (this.population[i]);
				}
			}
		}
	}

	this.generateNewPopulation = function() {
		for(var a=0; a<this.population.length; a++) {
			var i = floor(random(this.amount - 1));
			var j = floor(random(this.amount - 1));
			var newChild = this.matingPool[i].crossover(this.matingPool[j]);
			newChild.mutate(this.mutatRate);
			this.population[a] = newChild;
		}

		this.amount = 0;
		this.p = 0;
		this.matingPool = [];
		this.generation++;
	}
}
