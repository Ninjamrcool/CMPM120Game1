
//------------------- DATA --------------------------------//

let locationsVisited = []



//------------------- DATA --------------------------------//


class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); 
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key];

        //Check if location has been visited
        if (locationsVisited.includes(key) && locationData.BodyVisited){
            this.engine.show(locationData.BodyVisited);
        }
        else{
            this.engine.show(locationData.Body);
        }

        if(locationData.Choices && locationData.Choices.length > 0) {
            for(let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice);
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
            if (!locationsVisited.includes(choice.Target)){
                locationsVisited.push(choice.Target);
            }
            console.log(locationsVisited);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');