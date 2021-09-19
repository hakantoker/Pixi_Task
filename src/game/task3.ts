import * as PIXI from "pixi.js";
import * as particles from '@pixi/particle-emitter'
import Game from "./game";

//const TWEEN = require('@tweenjs/tween.js')

let app: PIXI.Application
let tweenManager: any
let ticker: PIXI.Ticker
let allElements: Array<any> = []


const Task3 = {
    init: init,
};

function init() {
    app = window.app;
    tweenManager = window.tweenManager;
    ticker = app.ticker

    const torch = PIXI.Sprite.from("torch")
    torch.anchor.set(0.9, 0.1)
    torch.scale.set(0.3)
    torch.x = app.screen.width / 2
    torch.y = app.screen.height / 2
    app.stage.addChild(torch)

    const container = new PIXI.Container()
    container.width = app.screen.width
    container.height = app.screen.height
    container.x = app.screen.width / 2
    container.y = app.screen.height / 2

    app.stage.addChild(container)

    let oldConfig = {
        "alpha": {
            "start": 0.75,
            "end": 0.05
        },
        "scale": {
            "start": 0.2,
            "end": 4,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#ffff00",
            "end": "#ff0000"
        },
        "speed": {
            "start": 200,
            "end": 400,
            "minimumSpeedMultiplier": 0.8
        },
        "acceleration": {
            "x": 0,
            "y": -54
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": 250,
            "max": 290
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 20,
            "max": 80
        },
        "lifetime": {
            "min": 0.6,
            "max": 0.7
        },
        "blendMode": "add",
        "frequency": 0.07,
        "emitterLifetime": -1,
        "maxParticles": 10,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "circle",
        "spawnCircle": {
            "x": -10,
            "y": 10,
            "r": 10
        }
    }

    let texturesArr = ["mc_fx-explo2_004",
        "mc_fx-explo2_005",
        "mc_fx-explo2_006",
        "mc_fx-explo2_007",
        "mc_fx-explo2_008",
        "mc_fx-explo2_009",
        "mc_fx-explo2_010",
        "mc_fx-explo2_011",
        "mc_fx-explo2_012",
        "mc_fx-explo2_013",
        "mc_fx-explo2_014",
        "mc_fx-explo2_015",
        "mc_fx-explo2_016",
        "mc_fx-explo2_017",
        "mc_fx-explo2_018",
        "mc_fx-explo2_019",
        "mc_fx-explo2_020",
        "mc_fx-explo2_021",
        "mc_fx-explo2_022",
        "mc_fx-explo2_023",
        "mc_fx-explo2_024",]



    var emitter = new particles.Emitter(
        container, particles.upgradeConfig(oldConfig, texturesArr)
    );
    var elapsed = Date.now();
    var update = function () {
        requestAnimationFrame(update);
        var now = Date.now();
        emitter.update((now - elapsed) * 0.001);
        elapsed = now;
    };
    emitter.emit = true;
    console.log(emitter.update)
    update();

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
    allElements.push(torch)
    allElements.push(container)

    backButton.once('pointerdown', () => {
        Game.clickButtonFx(backButton)

        hide()
    });
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




export default Task3;
