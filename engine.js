class Engine {

    static load(...args) {
        window.onload = () => new Engine(...args);
    }

    constructor(firstSceneClass, storyDataUrl) {

        this.firstSceneClass = firstSceneClass;
        this.storyDataUrl = storyDataUrl;

        //Theres probably a way to do this with css and html and just have javascript find the elements but i cant be asked
        this.header = document.body.appendChild(document.createElement("h1"));

        this.contentContainer = document.body.appendChild(document.createElement("div"));
        this.contentContainer.style.width = "66%";
        this.contentContainer.style.height = "90%";
        this.contentContainer.style.display = "inline-block";
        this.contentContainer.style.verticalAlign = "top";
        this.contentContainer.style.overflowY = "auto";
        this.contentContainer.style.overflowX = "hidden";

        this.output = this.contentContainer.appendChild(document.createElement("div"));

        this.mapContainer = document.body.appendChild(document.createElement("div"));
        this.mapContainer.style.width = "33%";
        this.mapContainer.style.display = "inline-block";

        this.mapImage = this.mapContainer.appendChild(document.createElement("img"));
        this.mapImage.src = "images/map/Outside.png";
        this.mapImage.style.width = "100%";
        this.mapImage.style.height = "100%";
        this.mapImage.style.imageRendering = "pixelated";
        this.mapImage.style.border = "0.5vw solid #333333"
        this.mapImage.style.borderRadius = "0.5vw"

        this.actionsContainer = this.contentContainer.appendChild(document.createElement("div"));

        fetch(storyDataUrl).then(
            (response) => response.json()
        ).then(
            (json) => {
                this.storyData = json;
                this.gotoScene(firstSceneClass)
            }
        );
    }

    gotoScene(sceneClass, data) {
        this.scene = new sceneClass(this);
        this.scene.create(data);
    }

    addChoice(action, data) {
        let button = this.actionsContainer.appendChild(document.createElement("button"));
        button.innerText = action;
        button.onclick = () => {
            while(this.actionsContainer.firstChild) {
                this.actionsContainer.removeChild(this.actionsContainer.firstChild)
            }
            this.scene.handleChoice(data);
        }
    }

    updateOxygenText(oxygen){
        if (this.oxygenText){
            this.oxygenText.remove();
        }
        this.oxygenText = this.contentContainer.appendChild(document.createElement("h1"));
        this.oxygenText.textContent = "Oxygen: " + oxygen;
    }

    setTitle(title) {
        document.title = title;
        this.header.innerText = title;
    }

    show(msg) {
        if (this.lastLastMessage){
            this.lastLastMessage.style.fontSize = "15px";
            this.lastLastMessage.style.margin = "10px";
            this.lastLastMessage.style.color = "lightgray";
        }
        if (this.lastMessage){
            this.lastLastMessage = this.lastMessage;
        }

        let paragraph = document.createElement("p");
        paragraph.textContent = msg;
        paragraph.style.fontSize = "28px";

        paragraph.style.transition = "none";
        paragraph.style.transform = "scale(0.001)"
        paragraph.style.opacity = "0"

        this.lastMessage = paragraph;

        let div = document.createElement("div");
        div.appendChild(paragraph);
        this.output.appendChild(div);

        //This thingy waits a frame
        requestAnimationFrame(() => {
            paragraph.style.removeProperty("transition");
            paragraph.style.removeProperty("transform");
            paragraph.style.removeProperty("opacity");
            // Scroll the thingy down
            this.contentContainer.scrollTop = 9999999;
        });
    }

    showEnd(msg){
        let div = document.createElement("div");
        div.innerHTML = msg;
        this.output.appendChild(div);
    }

    SetMapImage(image){
        this.mapImage.src = "images/map/" + image + ".png";
    }
}

class Scene {
    constructor(engine) {
        this.engine = engine;
    }

    create() { }

    update() { }

    handleChoice(action) {
        console.warn('no choice handler on scene ', this);
    }
}