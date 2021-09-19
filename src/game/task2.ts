import * as PIXI from "pixi.js";
import Game from "./game";
//const TWEEN = require('@tweenjs/tween.js')

let app: PIXI.Application
let tweenManager: any
let ticker: PIXI.Ticker
let allElements: Array<any> = []


const Task2 = {
    init: init,
};

function init() {
    app = window.app;
    tweenManager = window.tweenManager;
    ticker = app.ticker

    const container = new PIXI.Container()

    createNewText(container)

    const button = PIXI.Sprite.from("button")
    button.anchor.set(0.5);
    button.scale.set(0.5)
    button.x = app.screen.width - button.width * 0.6
    button.y = app.screen.height - button.height * 0.6
    button.interactive = true

    const buttonText = new PIXI.Text('RUN', { fontSize: 30, fill: 0xffffff});
    buttonText.anchor.set(0.5);
    buttonText.x = button.x
    buttonText.y = button.y

    app.stage.addChild(button);
    app.stage.addChild(buttonText);


    const backButton = PIXI.Sprite.from("button")
    backButton.anchor.set(0.5);
    backButton.scale.set(0.5)
    backButton.x = backButton.width * 0.6
    backButton.y = app.screen.height - backButton.height * 0.6
    backButton.interactive = true

    const backButtonText = new PIXI.Text('BACK', { fontSize: 30, fill: 0xffffff });
    backButtonText.anchor.set(0.5);
    backButtonText.x = backButton.x
    backButtonText.y = backButton.y

    app.stage.addChild(backButton);
    app.stage.addChild(backButtonText);


    allElements.push(backButton)
    allElements.push(backButtonText)
    allElements.push(container)
    allElements.push(button)
    allElements.push(buttonText)

    button.once('pointerdown', () => {
        Game.clickButtonFx(button)

        container.removeChildren()
        createNewText(container)
        let k = {temp : 0}
        let tween = new tweenManager.Tween(k)
        .to({ temp: 1 }, 2000)
        .repeat(Infinity)
        .onRepeat(() => {
            container.removeChildren()
            createNewText(container)

        })
        .start()
    });


    backButton.once('pointerdown', () => {
        Game.clickButtonFx(backButton)
        hide()
    });
}

function createNewText(container: PIXI.Container) {
    
    let patternArr = []
    let patternLen = randomIntFromInterval(3, 3)
    let min = 40
    let max = 100
    if(app.screen.width< app.screen.height) {
        min *= 0.5
        max *= 0.5
    }
    let fontSize = randomIntFromInterval(min, max)
    let objects: Array<PIXI.Sprite | PIXI.Text> = []

    const scaleText = new PIXI.Text('H', { fontSize: fontSize, fill: 0xffffff });

    for (let i = 0; i < patternLen; i++) {
        let nextPos = { x: 0, y: 0 }
        let nextScale = scaleText.height
        if (objects.length > 0) {
            let lastObject: PIXI.Sprite | PIXI.Text = objects[objects.length - 1]
            nextPos.x = lastObject.x + lastObject.width
            nextPos.y = lastObject.y
            nextScale = lastObject.height

        }
        if (Math.random() > 0.5) {
            patternArr.push("text")
            const txt = new PIXI.Text(randomText(5), { fontSize: fontSize, fill: 0xffffff });
            txt.anchor.set(0, 0.5);
            txt.x = nextPos.x
            txt.y = nextPos.y
            //if(nextScale !=1)txt.scale.set(nextScale / txt.height)
            //app.stage.addChild(txt)
            objects.push(txt)

            container.addChild(txt)
        }
        else {
            patternArr.push("image")
            const sprite = PIXI.Sprite.from(`emoji (${randomIntFromInterval(1, 151)})`);

            sprite.anchor.set(0, 0.5);
            sprite.x = nextPos.x
            sprite.y = nextPos.y
            sprite.scale.set(nextScale / sprite.height)
            //app.stage.addChild(sprite)
            objects.push(sprite)

            container.addChild(sprite)
        }

        app.stage.addChild(container)

        container.x = app.screen.width / 2 - container.width / 2
        container.y = app.screen.height / 2 - container.height / 2

    }
}

function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomText(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function hide() {
    allElements.forEach(e => {
        let tween = new tweenManager.Tween(e)
            .to({ alpha: 0 }, 50)
            .start()
    })
    setTimeout(() => {
        allElements.forEach(e => {
            e.parent.removeChild(e)
        })
        allElements = []
    }, 100);
    Game.showButtons()
}



export default Task2;
