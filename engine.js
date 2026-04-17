class Engine {

    static load(...args) {
        window.onload = () => new Engine(...args);
    }

    constructor(firstSceneClass, storyDataUrl) {

        this.firstSceneClass = firstSceneClass;
        this.storyDataUrl = storyDataUrl;

        this.header = document.body.appendChild(document.createElement("h1"));
        this.output = document.body.appendChild(document.createElement("div"));
        this.actionsContainer = document.body.appendChild(document.createElement("div"));

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
        this.oxygenText = document.body.appendChild(document.createElement("h1"));
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
        this.lastMessage = paragraph;

        let div = document.createElement("div");
        div.appendChild(paragraph);
        this.output.appendChild(div);
    }

    showEnd(msg){
        let div = document.createElement("div");
        div.innerHTML = msg;
        this.output.appendChild(div);
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