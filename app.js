const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const icons = []
const numIcons = 100;
let mouseX = null;
let mouseY = null;

const images = [
    '/img/spider.jpg',
    '/img/spider1.jpg',
    '/img/spider2.jpg',
    '/img/spider3.jpg',
    '/img/spider4.jpg',
    '/img/spider6.jpg',
    '/img/spider7.png'
]

class Particle {
    constructor(size, x, y, speedX, speedY, image){
        this.size = size;
        this.x = x;
        this.y = y;
        this.speedX = speedX * SPEED_MULTIPLIER
        this.speedY = speedY * SPEED_MULTIPLIER
        this.image = new Image();
        this.image.src = image
    }

    update(){
        // New coordinates, by adding speedX to x
            //  (increase in current width number to current width number)
                // e.g x = 25px += 5px will cause image to move 5px 
        this.x += this.speedX; 
        this.y += this.speedY;

        if (this.x + this.size === 0 || this.x + this.size === canvas.width){
            this.speedX = -this.speedX
        }

        if (this.y + this.size === 0 || this.y + this.size === canvas.height){
            this.speedY = -this.speedY
        }
// Idea for movement when mouse i contacted
        // if (mouseX !== null && this.x + this.size === mouseX || this.y + this.size === mouseY){
        //     this.x += (this.speedX * 2)
        //     this.y += (this.speedY * 2)
        // }

        if (mouseX !== null && mouseY !== null){
            const dist = Math.hypot(mouseX - this.x, mouseY - this.y)
            if (dist < 200){
                const angle = Math.atan2(this.y - mouseY, this.x - mouseX)
                this.x += Math.cos(angle) * 2;
                this.y += Math.sin(angle) * 2;
            }

            if (this.x < 0){
                this.x = 0
            }
            if (this.x > canvas.width){
                this.x = canvas.width - this.x.size
            }

            if (this.y < 0) {
                this.y = 0
            }
            if (this.y > canvas.height){
                this.y = canvas.height - this.size;
            }
        }    
    }

    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.size, this.size)
    }
}

function init(){
    for (let i = 0; i < numIcons; i++){
        const size = 40 * Math.random() * 20;
        const x = Math.random * (canvas.width - size)
        const y = Math.random * (canvas.height - size)
        const speedX = Math.random() - 2;
        const speedY = Math.random() - 2;
        const image = images[Math.floor(Math.random() * images.length)];
        icons.push(new Particle(size, x, y, speedX, speedY, image))
    }
}


function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    icons.forEach(icon => {
        icon.update()
        icon.draw()
    })
    requestAnimationFrame(animate)
}

init()
animate()