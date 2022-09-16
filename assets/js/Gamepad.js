export default class Gamepad {
    constructor() {
        this.sendEventModulo = 0;
        this.touchPressed = [];
        this.gp = null;
        window.addEventListener("gamepadconnected", (e) => {
            this.gp = navigator.getGamepads()[0]; // Get the first gamepad object
        });

        window.addEventListener("gamepaddisconnected", (e) => {
            this.gp = null;
        });
    }

    listen() {
        this.sendEventModulo++;
        this.touchPressed = [];
        if(this.gp !== null) {
            this.gp = navigator.getGamepads()[0];
            /* 12 == 'ArrowUp', 13 == 'ArrowDown', 14 == 'ArrowLeft', 15 == 'ArrowRight' */
            if (this.gp.buttons[12].pressed) this.touchPressed.push('ArrowUp');
            if (this.gp.buttons[13].pressed) this.touchPressed.push('ArrowDown');
            if (this.gp.buttons[14].pressed) this.touchPressed.push('ArrowLeft');
            if (this.gp.buttons[15].pressed) this.touchPressed.push('ArrowRight');
               
            if(this.sendEventModulo%3 == 0) {
                // On declenche un event en transmetttant la liste des touches pressés
                document.dispatchEvent(new CustomEvent('player-move', {detail : this.touchPressed }));
            }
        }
    }
}