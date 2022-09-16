export default class Space {

    anim(nbStars = 800, speed = 1) {
        for (let i=0; i < nbStars; i++) {
            let size = Math.floor((Math.random()*3)+2),
                animDur = Math.floor((Math.random()*15)+4) / (speed/2),
                posX = Math.floor((Math.random()*1060)+1),
                posY = Math.floor((Math.random()*800)+1);
            
            var randomAnimDuration = [
                '-webkit-animation-duration: ' + animDur + 's;',
                '-moz-animation-duration: ' + animDur + 's;',
                '-ms-animation-duration: ' + animDur + 's;',
                '-o-animation-duration: ' + animDur + 's;',
                'animation-duration: ' + animDur + 's;'
            ].join('');
            
            var style = 'width: ' + size + 'px; height: ' + size + 'px; left: ' + posX + 'px; top: ' + posY + 'px;' + randomAnimDuration;
            
            document.querySelector('#space').innerHTML += '<div class="star" style="' + style + '"></div>';
        }
        return this;
    }

    show() {
        document.querySelector('#space').style.display = 'block';
        return this;
    }

    hide() {
        document.querySelector('#space').style.display = 'none';
        return this;
    }
}
