import * as PIXI from "pixi.js";
import Game from "./game";

let app: PIXI.Application
let tweenManager: any
let ticker: PIXI.Ticker
let allElements: Array<any> = []

const Task1 = {
    init: init,
};

function init() {
    app = window.app;
    tweenManager = window.tweenManager;
    ticker = app.ticker

    let leftStackPos = {
        x: app.screen.width * 0.4,
        y: app.screen.height * 0.75,
    }

    let rightStackPos = {
        x: app.screen.width * 0.6,
        y: app.screen.height * 0.75,
    }

    if(app.screen.width< app.screen.height) {
        leftStackPos.x = app.screen.width * 0.33,
        rightStackPos.x = app.screen.width * 0.67,

        leftStackPos.y = rightStackPos.y = app.screen.height * 0.7
    }

    let leftStack: Array<PIXI.Sprite> = []
    let rightStack: Array<PIXI.Sprite> = []


    for (let i = 0; i < 144; i++) {
        const sprite = PIXI.Sprite.from("card");
        if(app.screen.width<app.screen.height) {
            sprite.scale.set(app.screen.height * 0.2/ sprite.height)

        }
        else{
            sprite.scale.set(app.screen.height * 0.3/ sprite.height)
            
        }
        sprite.anchor.set(0.5);
        sprite.x = leftStackPos.x
        sprite.y = leftStackPos.y - i * sprite.height * 0.01
        app.stage.addChild(sprite);

        leftStack.push(sprite)


        allElements.push(sprite)
    }


    const button = PIXI.Sprite.from("button")
    button.anchor.set(0.5);
    button.scale.set(0.5)
    button.x = app.screen.width - button.width * 0.6
    button.y = app.screen.height - button.height * 0.6
    button.interactive = true

    const buttonText = new PIXI.Text('RUN', { fontSize: 30, fill: 0xffffff });
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

    allElements.push(button)
    allElements.push(buttonText)
    allElements.push(backButton)
    allElements.push(backButtonText)


    button.once('pointerdown', () => {
        let startTime = performance.now()
        Game.clickButtonFx(button)
        

        let animDuration = 2000
        let delayBetween = 1000

        const parentCont = button.parent
        while (leftStack.length > 0) {
            let card: PIXI.Sprite = leftStack.pop()!
            let tweenX = new tweenManager.Tween(card)
                .to({ x: rightStackPos.x }, animDuration)
                .delay(rightStack.length * delayBetween)
                .easing(tweenManager.Easing.Quadratic.InOut)
                // .onComplete(() => {
                //     console.log("time:", Math.round(performance.now() - startTime))
                // })

            let tweenY = new tweenManager.Tween(card)
                .to({ y: rightStackPos.y - rightStack.length * card.height * 0.01 }, animDuration / 2)
                .delay(rightStack.length * delayBetween + animDuration / 2)
                .easing(tweenManager.Easing.Quadratic.InOut)
                .onStart((c:PIXI.Sprite) => {
                    parentCont.removeChild(c)
                    parentCont.addChild(c)
                })


            tweenX.start()
            tweenY.start()
            rightStack.push(card)

        }
    });

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




export default Task1;
