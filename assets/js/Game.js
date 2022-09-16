import Player from "./Player.js";
import Keyboard from "./Keyboard.js";
import Gamepad from "./Gamepad.js";
import Lobby from "../levels/lobby/Lobby.js";
import Space from "./Space.js";

export default class Game {
    constructor() {
        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");
        this.players = [];
        this.level = null;
        this.keyboard = null;
        this.gamepad = null;
    }

    drawGame() {
        this.gamepad.listen();
        // on vide tout le canvas
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); 

        // Afficher le niveau
        this.level.background.draw(this.ctx,0,0,1024,800).then(() => { 
            // Affichage des objets
            Promise.all(this.level.objects.map(obj => {                
                obj.src.draw(this.ctx, obj.x, obj.y, obj.w, obj.h, obj.scale.x, obj.scale.y);
            })).then(() => {
                // Afficher le personnage
                this.players[0].current.draw(
                    this.ctx, 
                    this.players[0].position.x, this.players[0].position.y, 
                    this.players[0].position.w, this.players[0].position.h,
                    this.players[0].currentScale.x, this.players[0].currentScale.y
                ).then(() => {
                    this.ctx.restore();
                });
            });
        });

        // Appel récursif de la fonction permettant de dessiner le canvas
        window.requestAnimationFrame(this.drawGame.bind(this));
    }

    load() {
        // charger les différents données du jeu (niveau et joueur)
        this.players[0] = new Player();
        this.level = new Lobby();

        // Si le fond espace est nécessaire pour le level
        if(this.level.space) { (new Space).anim().show(); }

        // Mise en écoute du clavier
        this.keyboard = (new Keyboard).listen();

        // Mise en écoute de la manette
        this.gamepad = (new Gamepad);

        // 1. Charger un personnage
        this.drawGame();
    }
}