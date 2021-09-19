import * as PIXI from 'pixi.js'
const TWEEN = require('@tweenjs/tween.js')

import Game from './game/game';

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb, // light blue

})
document.body.appendChild(app.view)

declare global {
    interface Window { app: PIXI.Application; tweenManager: any}
}

window.app = app
window.tweenManager = TWEEN

Game.load()