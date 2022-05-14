// jump
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if ("" == "") {
        main.vy += -150
    }
})
// ném đạn
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`đạn`, main, 100, -200)
    projectile.ay = GRAVITY
})
// set gravity
function spawn_enemies () {
    for (let value of tiles.getTilesByType(assets.tile`transparency16`)) {
        enemies = sprites.create(img`
            ........................
            ........................
            ........................
            ..........ffff..........
            ........ff1111ff........
            .......fb111111bf.......
            .......f1111111dbf......
            ......fd1111111ddf......
            ......fd111111dddf......
            ......fd111ddddddf......
            ......fd111ddddddf......
            ......fd1dddddddbf......
            ......fd1dfbddbbff......
            ......fbddfcdbbcf.......
            .....ffffccddbfff.......
            ....fcb1bbbfcffff.......
            ....f1b1dcffffffff......
            ....fdfdf..ffffffffff...
            .....f.f.....ffffff.....
            ........................
            ........................
            ........................
            ........................
            ........................
            `, SpriteKind.Enemy)
        tiles.placeOnTile(enemies, value)
        enemies.follow(main, 100)
    }
    enemies.setStayInScreen(false)
}
function introgame (text: string) {
    mySprite = sprites.create(image.create(160, 20), SpriteKind.Player)
    images.printText(mySprite.image, text, 0)
    mySprite.ay = -10
    mySprite.y = 130
    mySprite.lifespan = 6000
    pause(1000)
}
function printmessage () {
    text_list = [
    "",
    "welcome to game",
    "create by III musketeers ",
    "........................"
    ]
    effects.starField.startScreenEffect()
    for (let value of text_list) {
        introgame(value)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
let text_list: string[] = []
let mySprite: Sprite = null
let enemies: Sprite = null
let projectile: Sprite = null
let GRAVITY = 0
let main: Sprite = null
scene.setBackgroundColor(9)
tiles.setCurrentTilemap(tilemap`level`)
main = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f f f . . . . 
    . . . . f f e e e e f 2 f . . . 
    . . . f f e e e e f 2 2 2 f . . 
    . . . f e e e f f e e e e f . . 
    . . . f f f f e e 2 2 2 2 e f . 
    . . . f e 2 2 2 f f f f e 2 f . 
    . . f f f f f f f e e e f f f . 
    . . f f e 4 4 e b f 4 4 e e f . 
    . . f e e 4 d 4 1 f d d e f . . 
    . . . f e e e 4 d d d d f . . . 
    . . . . 4 d d e 4 4 4 e f . . . 
    . . . . e d d e 2 2 2 2 f . . . 
    . . . . f e e f 4 4 5 5 f f . . 
    . . . . f f f f f f f f f f . . 
    . . . . . f f . . . f f f . . . 
    `, SpriteKind.Player)
main.setPosition(2, 11)
controller.moveSprite(main, 100, 0)
main.setStayInScreen(true)
GRAVITY = 500
main.ay = GRAVITY
scene.cameraFollowSprite(main)
info.setLife(3)
