[13: 45, 21 / 11 / 2021] kamau waweru: gameDeveloper;

class Picture {
    constructor(src) {
        this.img = new Image();
        this.img.src = src;
    }
}

class Camera {
    follow(body) {
        if ((body.x + body.width / 2) < game.canvas.width / 2) {
            this.x = game.canvas.width / 2 - game.canvas.width / 2;
        } else if ((body.x + body.width / 2) > (game.background.width - game.canvas.width / 2)) {
            this.x = game.canvas.width / 2 - (game.background.width - game.canvas.width / 2);
        } else {
            this.x = game.canvas.width / 2 - (body.x + body.width / 2);
        }

        if ((body.y + body.height / 2) < game.canvas.height / 2) {
            this.y = game.canvas.height / 2 - game.canvas.height / 2;
        } else if ((body.y + body.height / 2) > (game.background.height - game.canvas.height / 2)) {
            this.y = game.canvas.height / 2 - (game.background.height - game.canvas.height / 2);
        } else {
            this.y = game.canvas.height / 2 - (body.y + body.height / 2);
        }

        game.ctx.setTransform(1, 0, 0, 1, 0, 0);
        game.ctx.translate(this.x, this.y);
    }
}

class Alert {
    pop(args) {
        this.background = document.createElement("div");
        this.background.setAttribute("id", "alert-background");

        this.break = document.createElement("br");

        this.box = document.createElement("div");
        this.box.setAttribute("id", "alert-box");

        if (args.title) {
            this.title = document.createElement("h1");
            this.title.innerHTML = `&nbsp&nbsp${args.title}&nbsp&nbsp`;
            this.title.setAttribute("id", "alert-title");
        }

        if (args.text) {
            this.text = document.createElement("h4");
            this.text.innerText = args.text;
            this.text.setAttribute("id", "alert-text");
        }

        this.buttonContainer = document.createElement("div");
        this.buttonContainer.setAttribute("id", "alert-button-container");

        if (args.buttons) {
            for (let text of args.buttons) {
                let button = document.createElement("button");

                button.innerText = text;
                button.setAttribute("class", "alert-button");
                button.onpointerdown = () => {
                    button.style.color = "#000";
                    button.style.backgroundColor = "#fff";
                }
                button.onpointerenter = () => {
                    button.style.color = "#fff";
                    button.style.backgroundColor = "#d14791";
                }
                button.onpointerout = () => {
                    button.style.color = "#fff";
                    button.style.backgroundColor = "#f23a9c";
                }
                button.onclick = () => {
                    this.background.remove();

                    if (args[`${text}Onclick`]) {
                        let func = eval(args[`${text}Onclick`]);
                        if (this.input) {
                            func(this.input.value);
                        } else {
                            func();
                        }
                    }
                }
                this.buttonContainer.appendChild(button);
            }
        } else {
            let button = document.createElement("button");

            button.innerText = "OK";
            button.setAttribute("class", "alert-button");
            button.onpointerdown = () => {
                button.style.color = "#000";
                button.style.backgroundColor = "#fff";
            }
            button.onpointerenter = () => {
                button.style.color = "#fff";
                button.style.backgroundColor = "#d14791";
            }
            button.onpointerout = () => {
                button.style.color = "#fff";
                button.style.backgroundColor = "#f23a9c";
            }
            button.onclick = () => {
                this.background.remove();
                this.box.remove();
            }
            this.buttonContainer.appendChild(button);
        }

        if (args.title) {
            this.box.appendChild(this.title);
        }
        this.box.appendChild(this.break);
        if (args.text) {
            this.box.appendChild(this.text);
        }
        this.box.appendChild(this.break);
        this.box.appendChild(this.buttonContainer);
        this.background.appendChild(this.box);

        document.body.appendChild(this.background);
    }
}

class Button {
    constructor(x, y, width, height, text) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;

        this.node = document.createElement("div");
        this.node.setAttribute("class", "button");

        this.node.style.left = `${this.x/100*(game.canvas.getBoundingClientRect().width) + game.canvas.getBoundingClientRect().left}px`;
        this.node.style.top = `${game.canvas.getBoundingClientRect().bottom - this.y/100*game.canvas.getBoundingClientRect().height}px`;
        this.node.style.width = `${this.width/100*(game.canvas.getBoundingClientRect().width)}px`;
        this.node.style.height = `${this.height/100*(game.canvas.getBoundingClientRect().height)}px`;

        this.node.innerText = this.text;

        document.body.appendChild(this.node);
    }
    resize() {
        this.node.style.left = `${this.x/100*(game.canvas.getBoundingClientRect().width) + game.canvas.getBoundingClientRect().left}px`;
        this.node.style.top = `${game.canvas.getBoundingClientRect().bottom - this.y/100*game.canvas.getBoundingClientRect().height}px`;
        this.node.style.width = `${this.width/100*(game.canvas.getBoundingClientRect().width)}px`;
        this.node.style.height = `${this.height/100*(game.canvas.getBoundingClientRect().height)}px`;
    }
}

class Lives {
    constructor(images, x, y, width, height) {
        this.images = images;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.img = this.images[0];
    }
    update(lives) {
        switch (lives) {
            case 2:
                this.img = this.images[1];

                break;
            case 1:
                this.img = this.images[2];

                break;
            default:
                this.img = this.images[0];
        }
    }
    render() {
        game.ctx.drawImage(this.img, -game.camera.x + this.x, -game.camera.y + this.y, this.width, this.height);
    }
}

class Score {
    constructor(img, x, y, width, height) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    render() {
        game.ctx.drawImage(this.img, -game.camera.x + this.x, -game.camera.y + this.y, this.width, this.height);

        game.ctx.fillStyle = "#fff";
        game.ctx.font = "18px Verdana";
        game.ctx.fillText(`X ${game.points}`, -game.camera.x + this.x + 37, -game.camera.y + this.y + 15);
    }
}

class Stage {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    render() {
        game.ctx.fillStyle = "#fff";
        game.ctx.font = "20px Verdana";
        game.ctx.fillText(`Stage: ${game.level}`, -game.camera.x + this.x, -game.camera.y + this.y);
    }
}

class MushroomCount {
    constructor(img, x, y, width, height) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    render() {
        game.ctx.drawImage(this.img, -game.camera.x + this.x, -game.camera.y + this.y, this.width, this.height);

        game.ctx.fillStyle = "#fff";
        game.ctx.font = "18px Verdana";
        game.ctx.fillText(`: ${game.mushroomsCollected}/5`, -game.camera.x + this.x + 35, -game.camera.y + this.y + 17);
    }
}

class Background {
    constructor(img, x, y, width, height) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    render() {
        game.ctx.clearRect(0, 0, 800, 1200);
        game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

class Sprite {
    constructor(frameWidth, frameHeight, frameColumn, frameStart, frameStop, frameRate) {
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameColumn = frameColumn;
        this.frameStart = frameStart;
        this.frameStop = frameStop;
        this.frameRate = frameRate;

        this.sx = this.frameStart * this.frameWidth;
        this.sy = this.frameColumn * this.frameHeight;
    }
    animate(img, x, y, width, height, flipX, flipY) {
        if (!game.paused) {
            this.frame = game.frame.current;

            if (this.frame % this.frameRate === 0) {
                this.sx += this.frameWidth;
            }
            if (this.sx > this.frameStop * this.frameWidth) {
                this.sx = this.frameStart * this.frameWidth;
            }
            if (this.frameStop !== this.frameEnd) {
                this.frameEnd = this.frameStop;
                this.sx = this.frameStart * this.frameWidth;
            }

            game.ctx.save();
            game.ctx.translate(x + width / 2, y + width / 2);
            game.ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
            game.ctx.translate(-(x + width / 2), -(y + width / 2));
            game.ctx.drawImage(img, this.sx, this.sy, this.frameWidth, this.frameHeight, x, y, width, height);
            game.ctx.restore();
        }
    }
}

class Player {
    constructor(img, x, y, width, height, flipped) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.flipped = flipped;

        if (this.flipped) {
            this.flipX = true;
        } else {
            this.flipX = false;
        }
        this.flipY = false;

        this.movingLeft = false;
        this.movingRight = false;

        this.vx = 0;
        this.vy = 0;

        this.jumping = false;

        this.lives = 3;

        this.sprite = new Sprite(32, 30, 0.1, 0, 20, 5);
    }
    physics() {
        this.x += this.vx;
        this.y += this.vy;

        this.vy += game.gravity;

        if (this.movingLeft) {
            this.left();
        } else if (this.movingRight) {
            this.right();
        } else {
            this.stop();
        }

        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.x + this.width >= game.background.width) {
            this.x = game.background.width - this.width;
        }
        if (this.y > game.background.height) {
            this.destroy();
        }
    }
    stand(platfromY) {
        this.jumping = false;

        this.vy = 0;
        this.y = platfromY - this.height;
    }
    left() {
        this.vx = -4;
        this.flipX = true;
        this.animate("walk");
    }
    right() {
        this.vx = 4;
        this.flipX = false;
        this.animate("walk");
    }
    jump() {
        if (!this.jumping) {
            this.vy = -10;
            this.jumping = true;
        }
    }
    highJump() {
        if (!this.jumping) {
            this.vy = -12.5;
            this.jumping = true;
        }
    }
    stop() {
        this.vx = 0;
        this.animate("stand");
    }
    bumpUp(platfromY, platformSize) {
        this.vy = 0;
        this.y = platfromY + platformSize - 5;
    }
    bumpRight(platformX) {
        this.vx = 0;
        this.x = (platformX - 5) - this.width;
    }
    bumpLeft(platformX, platformSize) {
        this.vx = 0;
        this.x = (platformX + 5) + platformSize;
    }
    destroy() {
        this.lives -= 1;

        if (this.lives === 0) {
            this.lives = 3;

            game.notifyLost();
        } else {
            game.restartLevel();
        }
        game.lives.update(this.lives);
    }
    respawn() {
        this.x = game.playerConfig[game.levelCode].x;
        this.y = game.playerConfig[game.levelCode].y;
        this.flipX = game.playerConfig[game.levelCode].flipped;

        this.vy = 0;
    }
    animate(animation) {
        switch (animation) {
            case "stand":
                this.sprite.frameStart = 0;
                this.sprite.frameStop = 10;
                this.sprite.frameRate = 5;

                break;
            case "walk":
                this.sprite.frameStart = 11;
                this.sprite.frameStop = 22;
                this.sprite.frameRate = 3;

                break;
            default:
                return;
        }
    }
    render() {
        this.sprite.animate(this.img, this.x, this.y, this.width, this.height, this.flipX, this.flipY);
    }
}

class Slime {
    constructor(img, x, y, width, height, start, stop) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.start = start;
        this.stop = stop;

        this.flipX = false;
        this.flipY = false;

        this.moving = 1;

        this.vx = 0;

        this.sprite = new Sprite(34, 27, 0.45, 0, 3, 10);
    }
    physics() {
        this.x += this.vx;

        if (this.moving === 0) {
            this.left();
        } else {
            this.right();
        }

        if (this.x <= this.start) {
            this.moving = 1;
        }
        if (this.x >= this.stop) {
            this.moving = 0;
        }
    }
    left() {
        this.vx = -2.5;
        this.flipX = false;
    }
    right() {
        this.vx = 2.5;
        this.flipX = true;
    }
    collide(body) {
        if (
            (body.x + body.width > this.x + 20) &&
            (body.x < this.x + this.width - 20) &&
            (body.y + body.height > this.y + 5) &&
            (body.y < this.y + this.height - 10)
        ) {
            game.player.destroy();
        }
    }
    render() {
        this.sprite.animate(this.img, this.x, this.y, this.width, this.height, this.flipX, this.flipY);
    }
}

class Eater {
    constructor(img, x, y, width, height) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.flipX = false;
        this.flipY = false;

        this.sprite = new Sprite(64, 41, 0.4, 0, 13, 6);
    }
    direction(body) {
        if (body.x + body.width / 2 > this.x + this.width / 2) {
            this.flipX = true;
        } else {
            this.flipX = false;
        }
    }
    collide(body) {
        if (
            (body.x + body.width > this.x + 35) &&
            (body.x < this.x + this.width - 35) &&
            (body.y + body.height > this.y + 40) &&
            (body.y < this.y + this.height)
        ) {
            game.player.destroy();
        }
    }
    render() {
        this.sprite.animate(this.img, this.x, this.y, this.width, this.height, this.flipX, this.flipY);
    }
}

class Ghost {
    constructor(img, x, y, width, height, flipped) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.flipped = flipped;

        if (this.flipped) {
            this.flipX = true;
            this.direction = "right";
        } else {
            this.flipX = false;
            this.direction = "left";
        }
        this.flipY = false;

        this.shooting = false;

        this.sprite = new Sprite(80, 60, 1.45, 0, 2, 30);
    }
    shoot() {
        if ((this.sprite.sx / this.sprite.frameWidth === 2) && !this.shooting) {
            this.shooting = true;
            game.bolts.push(new Bolt(game.assets.boltImg.img, this.flipped ? this.x + 70 : this.x + 30, this.y + 48, 10, 10, this.x - 150, this.x + this.width + 150, this.direction));
        }
        if (this.sprite.sx / this.sprite.frameWidth === 0) {
            this.shooting = false;
        }
    }
    render() {
        this.sprite.animate(this.img, this.x, this.y, this.width, this.height, this.flipX, this.flipY);
    }
}

class Bolt {
    constructor(img, x, y, width, height, minX, maxX, direction) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.minX = minX;
        this.maxX = maxX;
        this.direction = direction;
    }
    physics() {
        switch (this.direction) {
            case "left":
                this.x -= 3;
                break;
            case "right":
                this.x += 3;
                break;
        }

        if ((this.x > this.maxX) || (this.x + this.width < this.minX)) {
            this.destroy();
        }
    }
    collide(body) {
        if (
            (body.x + body.width > this.x + 15) &&
            (body.x < this.x + this.width - 15) &&
            (body.y + body.height > this.y) &&
            (body.y < this.y + this.height)
        ) {
            this.destroy();

            game.player.destroy();
        }
    }
    destroy() {
        let index = game.bolts.indexOf(this);

        for (let i in game.bolts) {
            if (parseInt(i) === index) {
                game.bolts.splice(index, 1);
            }
        }
    }
    render() {
        game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

class Mushroom {
    constructor(img, x, y, width, height) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    collide(body) {
        if (
            (body.x + body.width > this.x) &&
            (body.x < this.x + this.width) &&
            (body.y + body.height > this.y) &&
            (body.y < this.y + this.height)
        ) {
            this.destroy();
        }
    }
    destroy() {
        let index = game.mushrooms.indexOf(this);

        for (let i in game.mushrooms) {
            if (parseInt(i) === index) {
                game.mushrooms.splice(index, 1);

                ++game.mushroomsCollected;
            }
        }
    }
    render() {
        game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

class Diamond {
    constructor(img, x, y, width, height) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    collide(body) {
        if (
            (body.x + body.width > this.x + 10) &&
            (body.x < this.x + this.width - 10) &&
            (body.y + body.height > this.y) &&
            (body.y < this.y + this.height)
        ) {
            this.destroy();
        }
    }
    destroy() {
        let index = game.diamonds.indexOf(this);

        for (let i in game.diamonds) {
            if (parseInt(i) === index) {
                game.diamonds.splice(index, 1);

                ++game.points;
            }
        }
    }
    render() {
        game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

class Tilemap {
    constructor(img, mapX, mapY, mapWidth, mapHeight, tileSize, scale) {
        this.img = img;
        this.mapX = mapX;
        this.mapY = mapY;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.tileSize = tileSize;
        this.scale = scale;

        this.newMapWidth = this.mapWidth * this.scale;
        this.newMapHeight = this.mapHeight * this.scale;
        this.newTileSize = this.tileSize * this.scale;
    }
    render() {
        game.ctx.drawImage(this.img, this.mapX, this.mapY, this.newMapWidth, this.newMapHeight);
    }
}

class Platforms {
    constructor(tileArray) {
        this.mapX = game.tilemap.mapX;
        this.mapY = game.tilemap.mapY;
        this.mapWidth = game.tilemap.newMapWidth;
        this.mapHeight = game.tilemap.newMapHeight;
        this.tileSize = game.tilemap.newTileSize;

        this.tiles = tileArray;
    }
    collide(body) {
        let tileIndex = 0;

        for (let y = 0; y < this.mapHeight; y += this.tileSize) {
            for (let x = 0; x < this.mapWidth; x += this.tileSize) {
                let tile = this.tiles[tileIndex];

                let tileX = this.mapX + x;
                let tileY = this.mapY + y;
                let tileSize = this.tileSize;

                if (tile != 0) {
                    if (
                        (body.x + body.width) > (tileX + 5) &&
                        (body.x) < (tileX + tileSize - 5) &&
                        (body.y + body.height) < (tileY + tileSize) &&
                        (body.y + body.height) > (tileY) &&
                        (body.vy > 0)
                    ) {
                        body.stand(tileY);
                    }
                    if (
                        (body.x + body.width) > (tileX + 5) &&
                        (body.x) < (tileX + tileSize - 5) &&
                        (body.y) < (tileY + tileSize - 5) &&
                        (body.y) > (tileY) &&
                        (body.vy < 0)
                    ) {
                        body.bumpUp(tileY, tileSize);
                    }
                    if (
                        (body.y + body.height) > (tileY) &&
                        (body.y) < (tileY + tileSize) &&
                        (body.x + body.width) < (tileX) &&
                        (body.x + body.width) > (tileX - 4.5) &&
                        (body.vx > 0)
                    ) {
                        body.bumpRight(tileX);
                    }
                    if (
                        (body.y + body.height) > (tileY + 0.5) &&
                        (body.y) < (tileY + tileSize) &&
                        (body.x) < (tileX + tileSize + 4.5) &&
                        (body.x) > (tileX + tileSize) &&
                        (body.vx < 0)
                    ) {
                        body.bumpLeft(tileX, tileSize);
                    }
                }
                ++tileIndex;
            }
        }
    }
}

class Spikes {
    constructor(tileArray) {
        this.mapX = game.tilemap.mapX;
        this.mapY = game.tilemap.mapY;
        this.mapWidth = game.tilemap.newMapWidth;
        this.mapHeight = game.tilemap.newMapHeight;
        this.tileSize = game.tilemap.newTileSize;

        this.tiles = tileArray;
    }
    collide(body) {
        let tileIndex = 0;

        for (let y = 0; y < this.mapHeight; y += this.tileSize) {
            for (let x = 0; x < this.mapWidth; x += this.tileSize) {
                let tile = this.tiles[tileIndex];

                let tileX = this.mapX + x;
                let tileY = this.mapY + y;
                let tileSize = this.tileSize;

                if (tile != 0) {
                    if (
                        (body.x + body.width > tileX + 10) &&
                        (body.x < tileX + tileSize - 10) &&
                        (body.y + body.height > tileY + 22) &&
                        (body.y < tileY + tileSize - 27)
                    ) {
                        game.player.destroy();
                    }
                }
                ++tileIndex;
            }
        }
    }
}

class Jumpers {
    constructor(tileArray) {
        this.mapX = game.tilemap.mapX;
        this.mapY = game.tilemap.mapY;
        this.mapWidth = game.tilemap.newMapWidth;
        this.mapHeight = game.tilemap.newMapHeight;
        this.tileSize = game.tilemap.newTileSize;

        this.tiles = tileArray;
    }
    collide(body) {
        let tileIndex = 0;

        for (let y = 0; y < this.mapHeight; y += this.tileSize) {
            for (let x = 0; x < this.mapWidth; x += this.tileSize) {
                let tile = this.tiles[tileIndex];

                let tileX = this.mapX + x;
                let tileY = this.mapY + y;
                let tileSize = this.tileSize;

                if (tile != 0) {
                    if (
                        (body.x + body.width > tileX) &&
                        (body.x < tileX + tileSize) &&
                        (body.y + body.height > tileY) &&
                        (body.y < tileY + tileSize)
                    ) {
                        body.jumping = false;
                        body.highJump();
                    }
                }
                ++tileIndex;
            }
        }
    }
}

class Portal {
    constructor(img, x, y, width, height, flipped) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.flipped = flipped;

        if (this.flipped) {
            this.flipX = true;
        } else {
            this.flipX = false;
        }
        this.flipY = false;

        this.sprite = new Sprite(64, 64, 0, 0, 7, 7);
    }
    collide(body) {
        if (
            (body.x + body.width > this.x + 70) &&
            (body.x < this.x + this.width - 70) &&
            (body.y + body.height > this.y + 50) &&
            (body.y < this.y + this.height - 50)
        ) {
            if (game.mushroomsCollected === 5) {
                game.nextLevel();
            } else {
                game.notifyMushrooms(this.x, this.width);
            }
        }
    }
    respawn() {
        this.x = game.portalConfig[game.levelCode].x;
        this.y = game.portalConfig[game.levelCode].y;
        this.flipX = game.portalConfig[game.levelCode].flipped;
    }
    render() {
        this.sprite.animate(this.img, this.x, this.y, this.width, this.height, this.flipX, this.flipY);
    }
}

class Game {
    main() {
        this.canvas = document.querySelector("#game");
        this.ctx = this.canvas.getContext("2d", {
            alpha: false,
            desynchronized: true
        });
        this.canvas.width = 400;
        this.canvas.height = 600;

        this.ratio = 2 / 3;

        this.frame = {
            current: 0,
            update: () => {
                if (this.frame.current > 999) {
                    this.frame.current = 0;
                }
                ++this.frame.current;
            }
        }
    }
    setup() {
        this.initVariables();
        this.generatelevel();
        this.generateSlimes();
        this.generateEaters();
        this.generateGhosts();
        this.generateMushrooms();
        this.generateDiamonds();
        this.generatePortal();
        this.generatePlayer();
        this.generateInfo();
        this.initializeAlert();
        this.initializeMenu();
        this.initializeCamera();
        this.intializeControls();
        this.loop();
    }
    initVariables() {
        this.gravity = 0.5;

        this.initPoints = 0;
        this.points = 0;

        this.mushroomsCollected = 0;

        this.level = 1;
        this.levelCode = `level${this.level}`;

        this.music = document.querySelector("#music");

        this.paused = false;
    }
    generatelevel() {
        this.background = new Background(this.assets[`bg${this.level}Img`].img, 0, 0, 1680, 1110);

        this.tilemap = new Tilemap(this.assets[`level${this.level}Img`].img, 0, 50, 560, 320, 8, 3);

        this.platforms = new Platforms(this.data[this.levelCode].platforms);

        this.spikes = new Spikes(this.data[this.levelCode].spikes);

        this.jumpers = new Jumpers(this.data[this.levelCode].jumpers);
    }
    generateSlimes() {
        this.slimeConfig = {
            level1: [{
                    x: 330,
                    y: 580,
                    start: 330,
                    stop: 650
                },
                {
                    x: 1125,
                    y: 628,
                    start: 1125,
                    stop: 1345
                },
                {
                    x: 1150,
                    y: 268,
                    start: 1150,
                    stop: 1420
                },
                {
                    x: 260,
                    y: 221,
                    start: 260,
                    stop: 432
                }
            ],
            level2: [{
                    x: 1020,
                    y: 868,
                    start: 1020,
                    stop: 1280
                },
                {
                    x: 1020,
                    y: 699,
                    start: 1020,
                    stop: 1230
                },
                {
                    x: 370,
                    y: 460,
                    start: 370,
                    stop: 600
                },
                {
                    x: 0,
                    y: 173,
                    start: 0,
                    stop: 265
                },
                {
                    x: 1040,
                    y: 196,
                    start: 1040,
                    stop: 1275
                }
            ],
            level3: [{
                    x: 740,
                    y: 172,
                    start: 740,
                    stop: 940
                },
                {
                    x: 340,
                    y: 436,
                    start: 330,
                    stop: 555
                },
                {
                    x: 835,
                    y: 724,
                    start: 835,
                    stop: 1055
                },
                {
                    x: 310,
                    y: 844,
                    start: 310,
                    stop: 505
                }
            ]
        };
        this.slimes = new Array();

        for (let i of this.slimeConfig[this.levelCode]) {
            let slime = new Slime(this.assets.slimeImg.img, i.x, i.y, 50, 50, i.start, i.stop);

            this.slimes.push(slime);
        }
    }
    generateEaters() {
        this.eaterConfig = {
            level1: [{
                    x: 880,
                    y: 657
                },
                {
                    x: 560,
                    y: 753
                },
                {
                    x: 925,
                    y: 297
                },
            ],
            level2: [{
                    x: 1500,
                    y: 656
                },
                {
                    x: 290,
                    y: 874
                },
                {
                    x: 70,
                    y: 344
                },
                {
                    x: 1120,
                    y: 440
                }
            ],
            level3: [{
                    x: 1235,
                    y: 177
                },
                {
                    x: 500,
                    y: 225
                },
                {
                    x: 620,
                    y: 657
                },
                {
                    x: 1140,
                    y: 369
                }
            ]
        };
        this.eaters = new Array();

        for (let i of this.eaterConfig[this.levelCode]) {
            let eater = new Eater(this.assets.eaterImg.img, i.x, i.y, 100, 70);

            this.eaters.push(eater);
        }
    }
    generateGhosts() {
        this.ghostConfig = {
            level1: [{
                    x: 1420,
                    y: 390,
                    flipped: false
                },
                {
                    x: 1030,
                    y: 800,
                    flipped: false
                },
                {
                    x: 1025,
                    y: 55,
                    flipped: false
                }
            ],
            level2: [{
                    x: 890,
                    y: 177,
                    flipped: false
                },
                {
                    x: 0,
                    y: 730,
                    flipped: true
                },
                {
                    x: 635,
                    y: 680,
                    flipped: true
                }
            ],
            level3: [{
                    x: 1510,
                    y: 515,
                    flipped: false
                },
                {
                    x: 135,
                    y: 558,
                    flipped: true
                },
                {
                    x: 810,
                    y: 826,
                    flipped: false
                }
            ]
        };
        this.ghosts = new Array();
        this.bolts = new Array();

        for (let i of this.ghostConfig[this.levelCode]) {
            let ghost = new Ghost(this.assets.ghostImg.img, i.x, i.y, 110, 85, i.flipped);

            this.ghosts.push(ghost);
        }
    }
    generateMushrooms() {
        this.mushroomConfig = {
            level1: [{
                    x: 60,
                    y: 795
                },
                {
                    x: 1605,
                    y: 723
                },
                {
                    x: 1625,
                    y: 363
                },
                {
                    x: 35,
                    y: 147
                },
                {
                    x: 45,
                    y: 411
                }
            ],
            level2: [{
                    x: 1654,
                    y: 676
                },
                {
                    x: 120,
                    y: 580
                },
                {
                    x: 0,
                    y: 364
                },
                {
                    x: 1650,
                    y: 484
                },
                {
                    x: 5,
                    y: 172
                }
            ],
            level3: [{
                    x: 2,
                    y: 148
                },
                {
                    x: 2,
                    y: 460
                },
                {
                    x: 2,
                    y: 652
                },
                {
                    x: 1620,
                    y: 388
                },
                {
                    x: 1640,
                    y: 868
                }
            ]
        };
        this.mushrooms = new Array();

        for (let i of this.mushroomConfig[this.levelCode]) {
            let mushroom = new Mushroom(this.assets.mushroomImg.img, i.x, i.y, 25, 25);

            this.mushrooms.push(mushroom);
        }
    }
    generateDiamonds() {
        this.diamondConfig = {
            level1: [{
                    x: 200,
                    y: 800
                },
                {
                    x: 260,
                    y: 800
                },
                {
                    x: 320,
                    y: 800
                },
                {
                    x: 550,
                    y: 500
                },
                {
                    x: 610,
                    y: 500
                },
                {
                    x: 670,
                    y: 500
                },
                {
                    x: 650,
                    y: 710
                },
                {
                    x: 590,
                    y: 710
                },
                {
                    x: 530,
                    y: 710
                },
                {
                    x: 555,
                    y: 875
                },
                {
                    x: 630,
                    y: 875
                },
                {
                    x: 1220,
                    y: 765
                },
                {
                    x: 1280,
                    y: 765
                },
                {
                    x: 1340,
                    y: 765
                },
                {
                    x: 1540,
                    y: 850
                },
                {
                    x: 1590,
                    y: 850
                },
                {
                    x: 1640,
                    y: 850
                },
                {
                    x: 1205,
                    y: 200
                },
                {
                    x: 1265,
                    y: 200
                },
                {
                    x: 1325,
                    y: 200
                },
                {
                    x: 895,
                    y: 250
                },
                {
                    x: 955,
                    y: 250
                },
                {
                    x: 1015,
                    y: 250
                },
                {
                    x: 630,
                    y: 250
                },
                {
                    x: 690,
                    y: 250
                },
                {
                    x: 100,
                    y: 390
                },
                {
                    x: 150,
                    y: 390
                },
                {
                    x: 90,
                    y: 120
                },
                {
                    x: 140,
                    y: 120
                },
            ],
            level2: [{
                    x: 1070,
                    y: 770
                },
                {
                    x: 1130,
                    y: 770
                },
                {
                    x: 1190,
                    y: 770
                },
                {
                    x: 1110,
                    y: 600
                },
                {
                    x: 1170,
                    y: 600
                },
                {
                    x: 1550,
                    y: 415
                },
                {
                    x: 1610,
                    y: 415
                },
                {
                    x: 1500,
                    y: 300
                },
                {
                    x: 1545,
                    y: 300
                },
                {
                    x: 1590,
                    y: 300
                },
                {
                    x: 1635,
                    y: 300
                },
                {
                    x: 770,
                    y: 450
                },
                {
                    x: 830,
                    y: 450
                },
                {
                    x: 890,
                    y: 450
                },
                {
                    x: 650,
                    y: 850
                },
                {
                    x: 700,
                    y: 850
                },
                {
                    x: 750,
                    y: 850
                },
                {
                    x: 650,
                    y: 880
                },
                {
                    x: 700,
                    y: 880
                },
                {
                    x: 750,
                    y: 880
                },
                {
                    x: 425,
                    y: 620
                },
                {
                    x: 485,
                    y: 620
                },
                {
                    x: 545,
                    y: 620
                },
                {
                    x: 40,
                    y: 100
                },
                {
                    x: 100,
                    y: 100
                },
                {
                    x: 160,
                    y: 100
                },
                {
                    x: 220,
                    y: 100
                },
                {
                    x: 430,
                    y: 400
                },
                {
                    x: 490,
                    y: 400
                },
                {
                    x: 550,
                    y: 400
                },
                {
                    x: 1110,
                    y: 115
                },
                {
                    x: 1170,
                    y: 115
                },
                {
                    x: 1230,
                    y: 115
                }
            ],
            level3: [{
                    x: 1275,
                    y: 105
                },
                {
                    x: 1215,
                    y: 105
                },
                {
                    x: 1155,
                    y: 105
                },
                {
                    x: 900,
                    y: 80
                },
                {
                    x: 840,
                    y: 80
                },
                {
                    x: 780,
                    y: 80
                },
                {
                    x: 35,
                    y: 90
                },
                {
                    x: 95,
                    y: 90
                },
                {
                    x: 155,
                    y: 90
                },
                {
                    x: 10,
                    y: 260
                },
                {
                    x: 70,
                    y: 260
                },
                {
                    x: 10,
                    y: 300
                },
                {
                    x: 70,
                    y: 300
                },
                {
                    x: 1108,
                    y: 320
                },
                {
                    x: 1168,
                    y: 320
                },
                {
                    x: 1228,
                    y: 320
                },
                {
                    x: 1348,
                    y: 320
                },
                {
                    x: 1408,
                    y: 320
                },
                {
                    x: 1468,
                    y: 320
                },
                {
                    x: 1630,
                    y: 683
                },
                {
                    x: 1630,
                    y: 713
                },
                {
                    x: 1630,
                    y: 743
                },
                {
                    x: 388,
                    y: 360
                },
                {
                    x: 448,
                    y: 360
                },
                {
                    x: 508,
                    y: 360
                },
                {
                    x: 1052,
                    y: 500
                },
                {
                    x: 1112,
                    y: 500
                },
                {
                    x: 1172,
                    y: 500
                },
                {
                    x: 1320,
                    y: 860
                },
                {
                    x: 1380,
                    y: 860
                },
                {
                    x: 1440,
                    y: 860
                },
                {
                    x: 1000,
                    y: 840
                },
                {
                    x: 1060,
                    y: 840
                },
                {
                    x: 1120,
                    y: 840
                }
            ]
        };
        this.diamonds = new Array();

        for (let i of this.diamondConfig[this.levelCode]) {
            let diamond = new Diamond(this.assets.diamondImg.img, i.x, i.y, 33.5, 20.5);

            this.diamonds.push(diamond);
        }
    }
    generatePortal() {
        this.portalConfig = {
            level1: {
                x: 1570,
                y: 0,
                flipped: true
            },
            level2: {
                x: 1570,
                y: 50,
                flipped: true
            },
            level3: {
                x: -40,
                y: 700,
                flipped: false
            }
        }

        this.portal = new Portal(this.assets.portalImg.img, this.portalConfig[this.levelCode].x, this.portalConfig[this.levelCode].y, 140, 130, this.portalConfig[this.levelCode].flipped);
    }
    generatePlayer() {
        this.playerConfig = {
            level1: {
                x: 50,
                y: 525,
                flipped: false
            },
            level2: {
                x: 1600,
                y: 800,
                flipped: true
            },
            level3: {
                x: 1600,
                y: 30,
                flipped: true
            }
        }

        this.player = new Player(this.assets.playerImg.img, this.playerConfig[this.levelCode].x, this.playerConfig[this.levelCode].y, 45, 45, this.playerConfig[this.levelCode].flipped);
    }
    generateInfo() {
        this.lives = new Lives([this.assets.lives1Img.img, this.assets.lives2Img.img, this.assets.lives3Img.img], 10, 10, 100, 23);

        this.score = new Score(this.assets.diamondImg.img, 10, 45, 32, 18);

        this.mushroomCount = new MushroomCount(this.assets.mushroomImg.img, 305, 45, 27, 23);

        this.stage = new Stage(305, 28);
    }
    restartGame() {
        this.player.lives = 3;

        this.lives.update();

        this.level = 1;
        this.levelCode = `level${this.level}`;

        this.initPoints = 0;
        this.points = this.initPoints;
        this.mushroomsCollected = 0;

        this.slimes = new Array();
        this.eaters = new Array();
        this.ghosts = new Array();
        this.bolts = new Array();
        this.mushrooms = new Array();
        this.diamonds = new Array();

        this.generatelevel();
        this.generateSlimes();
        this.generateEaters();
        this.generateGhosts();
        this.generateMushrooms();
        this.generateDiamonds();
        this.generatelevel();

        this.portal.respawn();
        this.player.respawn();

        this.showStory();
    }
    restartLevel() {
        this.points = this.initPoints;
        this.mushroomsCollected = 0;

        this.mushrooms = new Array();
        this.diamonds = new Array();

        this.generateMushrooms();
        this.generateDiamonds();

        this.player.respawn();
    }
    nextLevel() {
        if (this.level === 3) {
            this.player.lives = 3;

            this.lives.update();

            this.notifyCompleted();
        } else {
            this.level += 1;
            this.levelCode = `level${this.level}`;

            this.initPoints = this.points;
            this.mushroomsCollected = 0;

            this.slimes = new Array();
            this.eaters = new Array();
            this.ghosts = new Array();
            this.bolts = new Array();
            this.mushrooms = new Array();
            this.diamonds = new Array();

            this.generatelevel();
            this.generateSlimes();
            this.generateEaters();
            this.generateGhosts();
            this.generateMushrooms();
            this.generateDiamonds();

            this.portal.respawn();
            this.player.respawn();

            this.showStory();
        }
    }
    notifyMushrooms(portalX, portalWidth) {
        this.paused = true;

        this.alert.pop({
            title: "Attention!",
            text: "Collect all the mushrooms before going through the portal!",
            buttons: ["Okay"],
            OkayOnclick: () => {
                if (portalX + portalWidth / 2 < this.player.x + this.player.width / 2) {
                    this.player.x += 30;
                } else {
                    this.player.x -= 30;
                }
                game.paused = false;
            }
        });
    }
    notifyCompleted() {
        this.paused = true;

        this.alert.pop({
            title: "Congratulations!",
            text: `You have finished the game with ${this.points} points!`,
            buttons: ["Restart"],
            RestartOnclick: () => {
                this.level = 0;
                this.levelCode = `level${this.level}`;

                this.initPoints = 0;
                this.points = this.initPoints;

                this.paused = false;

                this.nextLevel();
            }
        });
    }
    notifyLost() {
        this.paused = true;

        this.alert.pop({
            title: "You lost!",
            text: `You have lost all your lives, better luck next time! You scored ${this.points} points.`,
            buttons: ["Restart"],
            RestartOnclick: () => {
                this.paused = false;

                this.restartGame();
            }
        });
    }
    notifyStory(story) {
        this.paused = true;

        this.alert.pop({
            title: "Story",
            text: story,
            buttons: ["Okay"],
            OkayOnclick: () => {
                this.paused = false;
            }
        });
    }
    showStory() {
        switch (this.level) {
            case 1:
                this.story = "Your galaxy 'Titania' has been invaded by extraterrestrial creatures who want to rule it. Your fellow titatians have all died and you are the only survivor. The only option you have is to escape from the galaxy (along with some mushrooms to eat)!";

                break;
            case 2:
                this.story = "The portal has brought you to a planet called 'Jerrico'. You have ran out of your food, so you need to collect more mushrooms from this planet while avoiding the creatures!";

                break;
            case 3:
                this.story = "The portal has brought you to yet another planet called 'Phoenix'. This planet has a portal that leads to a safe place in another galaxy. Hurry up before the creatures eat you!";

                break;
        }
        this.notifyStory(this.story);
    }
    showIntructions() {
        this.alert.pop({
            title: "Instructions",
            text: "1) You need to avoid all the enemies and find a portal to escape.\n\n2) You need to collect all the mushrooms scattered across the level to enter the portal.\n\n3) If you find small blue colored trampolines, you can stand over them to get a jump boost.\n\n4) You can gain points by collecting diamonds.\n\n5) You have total three lives. You lose the game once you run out of lives.",
            buttons: ["Okay"],
            OkayOnclick: () => {
                this.initializeMenu();
            }
        });
    }
    initializeAlert() {
        this.alert = new Alert();
    }
    initializeMenu() {
        this.paused = true;

        this.alert.pop({
            title: "Galaxy Invaders",
            text: "Ready to play?",
            buttons: ["Play", "Instructions"],
            PlayOnclick: () => {
                if (!this.music.playing) {
                    this.music.playing = true;

                    this.music.play();
                }

                this.paused = false;

                this.showStory();
            },
            InstructionsOnclick: () => {
                this.showIntructions();
            }
        });
    }
    initializeCamera() {
        this.camera = new Camera();
    }
    intializeControls() {
        this.leftButton = new Button(5, 20, 22.5, 15, "LEFT");

        this.leftButton.node.onpointerdown = () => {
            this.player.movingLeft = true;
        }
        this.leftButton.node.onpointerup = () => {
            this.player.movingLeft = false;
        }
        this.leftButton.node.onpointerout = () => {
            this.player.movingLeft = false;
        }

        this.rightButton = new Button(30, 20, 22.5, 15, "RIGHT");

        this.rightButton.node.onpointerdown = () => {
            this.player.movingRight = true;
        }
        this.rightButton.node.onpointerup = () => {
            this.player.movingRight = false;
        }
        this.rightButton.node.onpointerout = () => {
            this.player.movingRight = false;
        }

        this.jumpButton = new Button(72.5, 20, 22.5, 15, "JUMP");

        this.jumpButton.node.onpointerdown = () => {
            this.player.jump();
        }

        this.buttons = [this.leftButton, this.rightButton, this.jumpButton];
    }
    onKeyDown(e) {
        switch (e.keyCode) {
            case 32:
                this.player.jump();

                break;
            case 37:
                this.player.movingLeft = true;

                break;
            case 38:
                this.player.jump();

                break;
            case 39:
                this.player.movingRight = true;

                break;
        }
    }
    onKeyUp(e) {
        switch (e.keyCode) {
            case 37:
                this.player.movingLeft = false;

                break;
            case 39:
                this.player.movingRight = false;

                break;
        }
    }
    update() {
        for (let slime of this.slimes) {
            slime.physics();
            slime.collide(this.player);
        }
        for (let eater of this.eaters) {
            eater.direction(this.player);
            eater.collide(this.player);
        }
        for (let ghost of this.ghosts) {
            ghost.shoot();
        }
        for (let bolt of this.bolts) {
            bolt.physics();
            bolt.collide(this.player);
        }
        for (let mushroom of this.mushrooms) {
            mushroom.collide(this.player);
        }
        for (let diamond of this.diamonds) {
            diamond.collide(this.player);
        }
        this.player.physics();
        this.portal.collide(this.player);
        this.platforms.collide(this.player);
        this.spikes.collide(this.player);
        this.jumpers.collide(this.player);
        this.frame.update();
    }
    render() {
        this.background.render();
        this.tilemap.render();
        for (let slime of this.slimes) {
            slime.render();
        }
        for (let eater of this.eaters) {
            eater.render();
        }
        for (let ghost of this.ghosts) {
            ghost.render();
        }
        for (let bolt of this.bolts) {
            bolt.render();
        }
        for (let mushroom of this.mushrooms) {
            mushroom.render();
        }
        for (let diamond of this.diamonds) {
            diamond.render();
        }
        this.portal.render();
        this.player.render();
        this.lives.render();
        this.score.render();
        this.stage.render();
        this.mushroomCount.render();
        this.camera.follow(this.player);
    }
    loop() {
        if (!this.paused) {
            this.update();
        }
        this.render();

        window.requestAnimationFrame(() => {
            this.loop();
        });
    }
    addEventListeners() {
        window.onkeydown = (e) => {
            this.onKeyDown(e);
        }
        window.onkeyup = (e) => {
            this.onKeyUp(e);
        }
    }
    resize() {
        if (window.innerWidth / window.innerHeight < this.ratio) {
            this.canvas.style.width = `${window.innerWidth}px`;
            this.canvas.style.height = `${window.innerWidth/this.ratio}px`;
        } else {
            this.canvas.style.width = `${window.innerHeight*this.ratio}px`;
            this.canvas.style.height = `${window.innerHeight}px`;
        }
        if (this.buttons) {
            for (let button of this.buttons) {
                button.resize();
            }
        }
    }
    load() {
        this.urls = {
            level1Img: "https://cdn.jsdelivr.net/gh/Quickcoder2005/Galaxy-Invaders@main/assets/maps/level1.png",
            level2Img: "https://cdn.jsdelivr.net/gh/Quickcoder2005/Galaxy-Invaders@main/assets/maps/level2.png",
            level3Img: "https://cdn.jsdelivr.net/gh/Quickcoder2005/Galaxy-Invaders@main/assets/maps/level3.png",
            bg1Img: "https://cdn.jsdelivr.net/gh/Quickcoder2005/Galaxy-Invaders@main/assets/backgrounds/background1.png",
            bg2Img: "https://cdn.jsdelivr.net/gh/Quickcoder2005/Galaxy-Invaders@main/assets/backgrounds/background2.png",
            bg3Img: "https://cdn.jsdelivr.net/gh/Quickcoder2005/Galaxy-Invaders@main/assets/backgrounds/background3.png",
            playerImg: "https://cdn.jsdelivr.net/gh/Quickcoder2005/Galaxy-Invaders@main/assets/sprites/player.png",
            slimeImg: "https://cdn.jsdelivr.net/gh/Quickcoder2005/Galaxy-Invaders@main/assets/sprites/slime.png",
            eaterImg: "https://cdn.jsdelivr.net/gh/Quickcoder2005/Galaxy-Invaders@main/assets/sprites/eater.png",
            ghostImg: "https://cdn.jsdelivr.net/gh/Quickcoder2005/Galaxy-Invaders@main/assets/sprites/ghost.png",
            portalImg: "https://cdn.jsdelivr.net/gh/Quickcoder2005/Galaxy-Invaders@main/assets/sprites/portal.png",
            boltImg: "https://cdn.jsdelivr.net/gh/Quickcoder2005/Galaxy-Invaders@main/assets/images/bolt.png",
            mushroomImg: "https://cdn.jsdelivr.net/gh/Quickcoder2005/Galaxy-Invaders@main/assets/images/mushroom.png",
            diamondImg: "https://cdn.jsdelivr.net/gh/Quickcoder2005/Galaxy-Invaders@main/assets/images/diamond.png",
            lives1Img: "https://cdn.jsdelivr.net/gh/Quickcoder2005/Galaxy-Invaders@main/assets/images/lives1.png",
            lives2Img: "https://cdn.jsdelivr.net/gh/Quickcoder2005/Galaxy-Invaders@main/assets/images/lives2.png",
            lives3Img: "https://cdn.jsdelivr.net/gh/Quickcoder2005/Galaxy-Invaders@main/assets/images/lives3.png"
        };
        this.assets = new Object();

        this.urlLen = Object.keys(this.urls).length;

        for (let i in this.urls) {
            fetch(this.urls[i]).then((response) => response.blob()).then(data => {
                let url = URL.createObjectURL(data);

                this.assets[i] = new Picture(url);

                if (Object.keys(this.assets).length === this.urlLen) {
                    fetch("https://cdn.jsdelivr.net/gh/Quickcoder2005/Galaxy-Invaders@main/assets/maps/levels.json").then((response) => response.json()).then((data) => {
                        this.data = data;

                        this.setup();
                        this.loaded();
                    });
                }
            });
        }
    }
    loaded() {
        document.querySelector("#loader").remove();
    }
    init() {
        this.ctx.imageSmoothingEnabled = false;

        this.resize();
        this.addEventListeners();

        window.onresize = () => {
            this.resize();
        }
    }
}

window.onload = () => {
        game = new Game();

        game.load();
        game.main();
        game.init();
    }
    [13: 47, 21 / 11 / 2021] //kamau waweru ....scrolling is not allowed//anyway give me the feedback