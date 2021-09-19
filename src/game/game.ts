import * as PIXI from "pixi.js";
import Task1 from "./task1";
import Task2 from "./task2";
import Task3 from "./task3";


let app: PIXI.Application
let tweenManager: any
let ticker: PIXI.Ticker

const Game = {
    load: gameLoad,
    start: gameStart,
    showButtons: showButtons,
    clickButtonFx: clickButtonFx,
    buttonsEnable: true,
};

let buttonElements: Array<PIXI.Sprite | PIXI.Text> = []


function gameLoad() {
    app = window.app;
    tweenManager = window.tweenManager;

    app.loader.add("card", "../assets/cardJoker.png");
    app.loader.add("button", "../assets/button.png");
    app.loader.add("tileset", "../assets/emojiAtlas.json");
    app.loader.add("torch", "../assets/torch.png");
    app.loader.add("particle", "../assets/particleAtlas.json");

    app.loader.load((loader, resources) => {
        gameStart();
        app.ticker.add(delta => {
            tweenManager.update()
        })


    });
}

function gameStart() {
    console.log("Game Starts");
    app = window.app;
    tweenManager = window.tweenManager;
    ticker = app.ticker

    const fps = new PIXI.Text('FPS: 0', { fill: 0xffffff  ,stroke: 0x444444, strokeThickness: 6 });
    fps.x = 20
    fps.y = 10
    app.stage.addChild(fps);

    console.log(fps)
    ticker.add(() => {
        fps.text = `FPS: ${ticker.FPS.toFixed(2)}`;
    });

    let buttons: Array<PIXI.Sprite> = []

    for (let i = 0; i < 3; i++) {
        const button = PIXI.Sprite.from("button")
        button.anchor.set(0.5);
        button.scale.set(0.5)
        button.x = app.screen.width / 2
        button.y = app.screen.height * 0.5 + (i - 1) * button.height * 1.2
        button.interactive = true

        const buttonText = new PIXI.Text('TASK ' + (i + 1), { fontSize: 30, fill: 0xffffff });
        buttonText.anchor.set(0.5);
        buttonText.x = button.x
        buttonText.y = button.y

        app.stage.addChild(button);
        app.stage.addChild(buttonText);

        buttons.push(button)
        buttonElements.push(button)
        buttonElements.push(buttonText)

    }

    buttons[0].on("pointerdown", () => {
        if (!Game.buttonsEnable) return
        Game.clickButtonFx(buttons[0])
        Task1.init()
        hideButtons()
    })

    buttons[1].on("pointerdown", () => {
        if (!Game.buttonsEnable) return
        Game.clickButtonFx(buttons[1])
        Task2.init()
        hideButtons()
    })

    buttons[2].on("pointerdown", () => {
        if (!Game.buttonsEnable) return
        Game.clickButtonFx(buttons[2])
        Task3.init()
        hideButtons()
    })

}

function clickButtonFx(button: PIXI.Sprite|PIXI.Text) {
    button.tint = 0x444444
    setTimeout(function() {
        button.tint = 0xffffff
    }, 100);
}

function showButtons() {
    buttonElements.forEach(e => {
        let tween = new tweenManager.Tween(e)
            .to({ alpha: 1 }, 100)
            .start()
    })
    setTimeout(() => {
        Game.buttonsEnable = true
    }, 100);
}

function hideButtons() {
    buttonElements.forEach(e => {
        let tween = new tweenManager.Tween(e)
            .to({ alpha: 0 }, 100)
            .start()
    })
}




export default Game;
