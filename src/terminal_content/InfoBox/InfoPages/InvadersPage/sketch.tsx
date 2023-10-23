import p5 from "p5"
import { P5CanvasInstance, Sketch } from "@p5-wrapper/react";

(window as any).p5 = p5;

await import("p5/lib/addons/p5.sound");

export const sketch: Sketch = (p5: P5CanvasInstance) => {
   p5.setup = () => {
      p5.createCanvas(628, 400)

      // set modes
      p5.rectMode(p5.CENTER)
      p5.textAlign(p5.CENTER)
      p5.imageMode(p5.CENTER)
      // backgroundMusic.play()

      p5.keyPressed = () => {
         if (p5.keyCode === p5.LEFT_ARROW && p5.keyIsPressed) {
            if (p1x <= 20) return
            p1x = p1x - pSpeed
         }

         if (p5.keyCode === p5.RIGHT_ARROW && p5.keyIsPressed) {
            if (p1x >= p5.width - 20) return
            p1x = p1x + pSpeed
         }
      } // close keyPressed

      p5.keyTyped = () => {
         if (p5.keyCode === 32 && p5.keyIsPressed) {
            fire = true // fire rocket
            // if (r1y === p1y) pShootSfx.play()
         } else {
            fire = false
         }
      } // close keyTyped
   }

   // global
   // player
   let p1x = 314 // p1 stands for player 1
   let p1y = 360
   let pWidth = 32
   let pHeight = 32
   let pSpeed = 2

   // rocket
   let r1x = p1x
   let r1y = p1y
   let r1pos = 0 // keep track of where rocket currently is
   let rWidth = 8
   let rHeight = 8
   let rSpeed = 6
   let fire = false // is rocket fired?

   //boss alien
   let boss1x = 300
   let boss1y = 80
   let boss1width = 72
   let boss1height = 39
   let bSpeed = 2.5
   let bDirection = 1
   let bossLife = 100
   let br1x = boss1x
   let br1y = boss1y
   let bossRocketPos = 1

   // aliens
   let aWidth = 32
   let aHeight = 32
   let row = 1
   let currentRow = row
   let rowDistance = 5
   let aDistance = 0
   let aSpeed = 1
   let aDirection = 1
   // row 1
   let a1x = 68
   let a1y = 120
   let a2x = 118
   let a2y = 120
   let a3x = 167
   let a3y = 120
   let a4x = 217
   let a4y = 120
   let a5x = 267
   let a5y = 120
   let a6x = 317
   let a6y = 120
   let a7x = 367
   let a7y = 120
   let a8x = 417
   let a8y = 120
   let a9x = 467
   let a9y = 120
   let a10x = 517
   let a10y = 120
   let a11x = 567
   let a11y = 120
   // row 2
   let a12x = 68
   let a12y = 170
   let a13x = 118
   let a13y = 170
   let a14x = 167
   let a14y = 170
   let a15x = 217
   let a15y = 170
   let a16x = 267
   let a16y = 170
   let a17x = 317
   let a17y = 170
   let a18x = 367
   let a18y = 170
   let a19x = 417
   let a19y = 170
   let a20x = 467
   let a20y = 170
   let a21x = 517
   let a21y = 170
   let a22x = 567
   let a22y = 170

   // meteors
   let m1x = 100
   let m1y = 290
   let m1size = 50 // square so one size for w and h

   let m2x = 312
   let m2y = 290
   let m2size = 50 // square so one size for w and h

   let m3x = 528
   let m3y = 290
   let m3size = 50 // square so one size for w and h

   // STAGES & counters
   let score = 0
   let stage = 0 // which func should be running right now
   // stage 0 = splash
   // stage 1 = game
   // stage 2 = win
   // stage 3 = lose
   let totalTime: number
   let splashTime: number
   let gameTime: number
   let timeLimit = 90
   let lives = 3

   // multimedia
   // images
   let shipImg: p5.Image
   let alienImg: p5.Image
   let bossImg: p5.Image
   let meteorImg: p5.Image
   let alienExplosion: p5.Image
   let bossExplosion: p5.Image
   let meteorExplosion: p5.Image

   // fonts
   let font: p5.Font
   let splashFont: p5.Font

   // sounds

   let pShootSfx: p5.SoundFile
   let pHitSfx: p5.SoundFile
   let bHitSfx: p5.SoundFile

   let aDeathSfx: p5.SoundFile
   let bDeathSfx: p5.SoundFile

   let lostSfx:p5.SoundFile
   let victorySfx:p5.SoundFile

   let menuMusic: p5.SoundFile
   let backgroundMusic: p5.SoundFile

   p5.draw = () => {
      totalTime = p5.millis()
      if (stage === 0) {
         splash()
      }
      if (stage === 1) {
         game()
      }
      if (stage === 2) {
         win()
      }
      if (stage === 3) {
         lose()
      }

      // stages management
      if (p5.mouseIsPressed === true && stage === 0) {
         stage = 1
      }
      if (gameTime >= timeLimit) {
         stage = 3
      }
   } // close draw

   function splash() {
      // start clock
      splashTime = totalTime
      // menuMusic.play()

      p5.background(0) //black

      // appearance of world
      p5.stroke(0, 255, 0) // green
      p5.noFill()
      p5.strokeWeight(3)
      p5.rect(p5.width / 2, p5.height / 2, p5.width, p5.height)

      // draw banner
      p5.noStroke()

      // words for splash
      p5.fill(0, 255, 0)
      p5.textSize(30)
      p5.textFont(splashFont)
      p5.text("KOSMOS INVADERS", p5.width / 2, 60)
      p5.textSize(25)
      p5.textFont(font)
      p5.text("SAVE THE KOSMOS, OH MIGHTY HERO!", p5.width / 2, 83)

      p5.textSize(30)
      p5.textFont(splashFont)
      p5.text("HOW TO PLAY", p5.width / 2, 170)

      p5.textSize(20)
      p5.textFont(splashFont)
      p5.text("MOVE: < >", p5.width / 2, 210)
      p5.text("SHOOT: [SPACE]", p5.width / 2, 240)
      p5.text("DON'T LET THEM LAND ON EARTH!", p5.width / 2, 280)

      p5.textSize(25)
      p5.textFont(font)
      p5.text("CLICK ON SCREEN TO BEGIN", p5.width / 2, 360)
   } // close splash

   function win() {
      p5.background(0, 255, 0) // green

      // appearance of world
      p5.stroke(0) // black
      p5.noFill()
      p5.strokeWeight(3)
      p5.rect(p5.width / 2, p5.height / 2, p5.width, p5.height)

      // draw banner
      p5.noStroke()

      // words for win
      p5.fill(0)
      p5.textSize(30)
      p5.textFont(splashFont)
      p5.text("VICTORY!", p5.width / 2, p5.height / 2)
      p5.textSize(25)
      p5.textFont(font)
      p5.text("REFRESH TO PLAY AGAIN", p5.width / 2, p5.height / 2 + 30)
   } // close win

   function lose() {
      p5.background(255, 0, 0) // green

      // appearance of world
      p5.stroke(0) // black
      p5.noFill()
      p5.strokeWeight(3)
      p5.rect(p5.width / 2, p5.height / 2, p5.width, p5.height)

      // draw banner
      p5.noStroke()

      // words for win
      p5.fill(0)
      p5.textSize(30)
      p5.textFont(splashFont)
      p5.text("DEFEATED!", p5.width / 2, p5.height / 2 - 40)
      p5.text("YOUR SCORE: ", p5.width / 2, p5.height / 2)
      p5.text(score, p5.width / 2 + 185, p5.height / 2)
      p5.textSize(25)
      p5.textFont(font)
      p5.text("REFRESH TO PLAY AGAIN", p5.width / 2, p5.height / 2 + 80)
   } // close lose

   function game() {
      // call looping function
      p5.keyPressed()
      p5.keyTyped()

      p5.background(0) //black

      // appearance of world
      p5.stroke(0, 255, 0) // green
      p5.noFill()
      p5.strokeWeight(3)
      p5.rect(p5.width / 2, p5.height / 2, p5.width, p5.height)

      // draw banner
      p5.noStroke()
      p5.fill(0, 255, 0) // green
      p5.rect(p5.width / 2, 25, p5.width, 50)

      // draw player
      p5.noStroke()
      p5.fill(0, 0, 255)
      p5.image(shipImg, p1x, p1y, pWidth, pHeight)

      // draw alien
      p5.fill(255)
      // row1
      p5.image(alienImg, a1x, a1y, aWidth, aHeight)
      p5.image(alienImg, a2x, a2y, aWidth, aHeight)
      p5.image(alienImg, a3x, a3y, aWidth, aHeight)
      p5.image(alienImg, a4x, a4y, aWidth, aHeight)
      p5.image(alienImg, a5x, a5y, aWidth, aHeight)
      p5.image(alienImg, a6x, a6y, aWidth, aHeight)
      p5.image(alienImg, a7x, a7y, aWidth, aHeight)
      p5.image(alienImg, a8x, a8y, aWidth, aHeight)
      p5.image(alienImg, a9x, a9y, aWidth, aHeight)
      p5.image(alienImg, a10x, a10y, aWidth, aHeight)
      p5.image(alienImg, a11x, a11y, aWidth, aHeight)
      // row2
      p5.image(alienImg, a12x, a12y, aWidth, aHeight)
      p5.image(alienImg, a13x, a13y, aWidth, aHeight)
      p5.image(alienImg, a14x, a14y, aWidth, aHeight)
      p5.image(alienImg, a15x, a15y, aWidth, aHeight)
      p5.image(alienImg, a16x, a16y, aWidth, aHeight)
      p5.image(alienImg, a17x, a17y, aWidth, aHeight)
      p5.image(alienImg, a18x, a18y, aWidth, aHeight)
      p5.image(alienImg, a19x, a19y, aWidth, aHeight)
      p5.image(alienImg, a20x, a20y, aWidth, aHeight)
      p5.image(alienImg, a21x, a21y, aWidth, aHeight)
      p5.image(alienImg, a22x, a22y, aWidth, aHeight)

      // allow motion
      a1x = a1x + aSpeed * aDirection
      a1y = a1y + aDistance
      a2x = a2x + aSpeed * aDirection
      a2y = a2y + aDistance
      a3x = a3x + aSpeed * aDirection
      a3y = a3y + aDistance
      a4x = a4x + aSpeed * aDirection
      a4y = a4y + aDistance
      a5x = a5x + aSpeed * aDirection
      a5y = a5y + aDistance
      a6x = a6x + aSpeed * aDirection
      a6y = a6y + aDistance
      a7x = a7x + aSpeed * aDirection
      a7y = a7y + aDistance
      a8x = a8x + aSpeed * aDirection
      a8y = a8y + aDistance
      a9x = a9x + aSpeed * aDirection
      a9y = a9y + aDistance
      a10x = a10x + aSpeed * aDirection
      a10y = a10y + aDistance
      a11x = a11x + aSpeed * aDirection
      a11y = a11y + aDistance
      a12x = a12x + aSpeed * aDirection
      a12y = a12y + aDistance
      a13x = a13x + aSpeed * aDirection
      a13y = a13y + aDistance
      a14x = a14x + aSpeed * aDirection
      a14y = a14y + aDistance
      a15x = a15x + aSpeed * aDirection
      a15y = a15y + aDistance
      a16x = a16x + aSpeed * aDirection
      a16y = a16y + aDistance
      a17x = a17x + aSpeed * aDirection
      a17y = a17y + aDistance
      a18x = a18x + aSpeed * aDirection
      a18y = a18y + aDistance
      a19x = a19x + aSpeed * aDirection
      a19y = a19y + aDistance
      a20x = a20x + aSpeed * aDirection
      a20y = a20y + aDistance
      a21x = a21x + aSpeed * aDirection
      a21y = a21y + aDistance
      a22x = a22x + aSpeed * aDirection
      a22y = a22y + aDistance

      if (a11x >= p5.width - 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a10x >= p5.width - 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a9x >= p5.width - 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a8x >= p5.width - 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a7x >= p5.width - 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a6x >= p5.width - 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a5x >= p5.width - 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a4x >= p5.width - 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a3x >= p5.width - 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a2x >= p5.width - 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a1x >= p5.width - 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a1x <= 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a2x <= 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a3x <= 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a4x <= 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a5x <= 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a6x <= 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a7x <= 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a8x <= 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a9x <= 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a10x <= 40) {
         aDirection = aDirection * -1
         row = row + 1
      }
      if (a11x <= 40) {
         aDirection = aDirection * -1
         row = row + 1
      }

      if (row > currentRow) {
         aDistance = rowDistance
         currentRow = row
      } else {
         aDistance = 0
      }

      if (row >= 46) {
         stage = 3
         // lostSfx.play()
      }

      // run rocket function
      rockets()

      // collisions (rockets vs. aliens)
      aliens()

      // meteors
      meteros()

      // boss
      boss()

      // gametime functions
      splashTime = splashTime // stop splash timer to save amount of time we are on splash
      gameTime = p5.int((totalTime - splashTime) / 1000)

      // status bar
      //score
      p5.fill(0) // black
      p5.textSize(30)
      p5.textFont(font)
      p5.text("SCORE: ", 50, 34)
      p5.text(score, 90, 34)
      // hp
      p5.fill(0) // black
      p5.textSize(30)
      p5.textFont(font)
      p5.text("LIVES: ", 314, 34)
      p5.text(lives, 364, 34)
      // timer
      p5.textSize(30)
      p5.textFont(font)
      p5.text("TIME: ", 568, 34)
      p5.text(timeLimit - gameTime, 608, 34)

      if (score === 550) {
         // victorySfx.play()
         stage = 2
      }
      if (gameTime >= timeLimit) {
         // lostSfx.play()
      }
      if (lives <= 0) {
         stage = 3
         // bDeathSfx.play()
         // lostSfx.play()
      }
   } // close game

   function boss() {
      p5.image(bossImg, boss1x, boss1y, boss1width, boss1height)
      p5.textFont(font)
      p5.textSize(12)
      p5.fill(255, 0, 0)
      p5.text("[" + bossLife + "]", boss1x, boss1y - 20)

      // move boss
      boss1x = boss1x + bSpeed * bDirection
      if (boss1x >= p5.width - 60) {
         bDirection = bDirection * -1
      }
      if (boss1x <= 60) {
         bDirection = bDirection * -1
      }

      // rocket hit boss
      if (
         r1x >= boss1x - boss1width / 2 &&
         r1x <= boss1x + boss1width / 2 &&
         r1y >= boss1y - boss1height / 2 &&
         r1y <= boss1y + boss1height / 2
      ) {
         if (bossLife >= 20) {
            bossLife = bossLife - 10
            // bHitSfx.play()
            r1pos = 2
         } else {
            score = score + 450
            bSpeed = 0
            p5.image(bossExplosion, boss1x, boss1y, 164, 164)
            boss1x = -1000
            // bDeathSfx.play()
            r1pos = 2
         }
      }

      p5.fill(0, 255, 0)
      p5.rect(br1x, br1y, rWidth, rHeight)

      if (bossRocketPos === 1) {
         br1y = br1y + 4
         br1x = br1x
      }
      if (br1y >= p5.height) {
         bossRocketPos = 2
      }
      if (bossRocketPos === 2) {
         br1y = boss1y
         br1x = boss1x
         bossRocketPos = 1
      }

      // boss rocket hit player
      if (
         br1x >= p1x - pWidth / 2 &&
         br1x <= p1x + pWidth / 2 &&
         br1y >= p1y - pHeight / 2 &&
         br1y <= p1y + pHeight / 2
      ) {
         lives = lives - 1
         // pHitSfx.play()
         p1x = p5.width / 2
         bossRocketPos = 2
      }
   } // close boss

   function rockets() {
      // rocket positions:
      // 0 = with player 1, ready to be fired
      // 1 = in motion after firing
      // 2 = collision with object, return to p1

      // draw rocket
      p5.fill(26, 175, 255) // light blue
      p5.rect(r1x, r1y + 5, rWidth, rHeight)

      // keep rockets track
      if (fire === true && r1pos === 0) {
         r1pos = 1
      }

      // fire rockets
      if (r1pos === 1) {
         r1x = r1x // stop following player
         r1y = r1y - rSpeed // mode vertically

         // if exceeds window or misses
         if (r1y <= 65) {
            r1pos = 2 // reload
         }

         // reload on #2 command
      } else {
         // when not firing, the rocket is with player
         r1y = p1y
         r1x = p1x
      }
      if (r1pos === 2) {
         r1y = p1y
         r1x = p1x
         r1pos = 0
      }
   } // close rockets

   function aliens() {
      // alien 1
      if (
         r1x >= a1x - aWidth / 2 &&
         r1x <= a1x + aWidth / 2 &&
         r1y >= a1y - aHeight / 2 &&
         r1y + 6 <= a1y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a1x, a1y, 64, 64)
         a1y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to player
      } // close alien 1

      // alien 2
      if (
         r1x >= a2x - aWidth / 2 &&
         r1x <= a2x + aWidth / 2 &&
         r1y >= a2y - aHeight / 2 &&
         r1y + 6 <= a2y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a2x, a1y, 64, 64)
         a2y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to player
      } // close alien 2

      // alien 3
      if (
         r1x >= a3x - aWidth / 2 &&
         r1x <= a3x + aWidth / 2 &&
         r1y >= a3y - aHeight / 2 &&
         r1y + 6 <= a3y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a3x, a1y, 64, 64)
         a3y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to player
      } // close alien 3

      // alien 4
      if (
         r1x >= a4x - aWidth / 2 &&
         r1x <= a4x + aWidth / 2 &&
         r1y >= a4y - aHeight / 2 &&
         r1y + 6 <= a4y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a4x, a1y, 64, 64)
         a4y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to player
      } // close alien 4

      // alien 5
      if (
         r1x >= a5x - aWidth / 2 &&
         r1x <= a5x + aWidth / 2 &&
         r1y >= a5y - aHeight / 2 &&
         r1y + 6 <= a5y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a5x, a1y, 64, 64)
         a5y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to player
      } // close alien 5

      // alien 6
      if (
         r1x >= a6x - aWidth / 2 &&
         r1x <= a6x + aWidth / 2 &&
         r1y >= a6y - aHeight / 2 &&
         r1y + 6 <= a6y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a6x, a1y, 64, 64)
         a6y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to player
      } // close alien 6

      // alien 7
      if (
         r1x >= a7x - aWidth / 2 &&
         r1x <= a7x + aWidth / 2 &&
         r1y >= a7y - aHeight / 2 &&
         r1y + 6 <= a7y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a7x, a1y, 64, 64)
         a7y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to player
      } // close alien 7

      // alien 8
      if (
         r1x >= a8x - aWidth / 2 &&
         r1x <= a8x + aWidth / 2 &&
         r1y >= a8y - aHeight / 2 &&
         r1y + 6 <= a8y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a8x, a1y, 64, 64)
         a8y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to player
      } // close alien 8

      // alien 9
      if (
         r1x >= a9x - aWidth / 2 &&
         r1x <= a9x + aWidth / 2 &&
         r1y >= a9y - aHeight / 2 &&
         r1y + 6 <= a9y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a9x, a1y, 64, 64)
         a9y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to player
      } // close alien 9

      // alien 10
      if (
         r1x >= a10x - aWidth / 2 &&
         r1x <= a10x + aWidth / 2 &&
         r1y >= a10y - aHeight / 2 &&
         r1y + 6 <= a10y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a10x, a1y, 64, 64)
         a10y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to player
      } // close alien 10

      // alien 11
      if (
         r1x >= a11x - aWidth / 2 &&
         r1x <= a11x + aWidth / 2 &&
         r1y >= a11y - aHeight / 2 &&
         r1y + 6 <= a11y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a11x, a1y, 64, 64)
         a11y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to player
      } // close alien 11

      // alien 12
      if (
         r1x >= a12x - aWidth / 2 &&
         r1x <= a12x + aWidth / 2 &&
         r1y >= a12y - aHeight / 2 &&
         r1y + 6 <= a12y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a12x, a1y + 50, 64, 64)
         a12y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to player
      } // close alien 12

      // alien 13
      if (
         r1x >= a13x - aWidth / 2 &&
         r1x <= a13x + aWidth / 2 &&
         r1y >= a13y - aHeight / 2 &&
         r1y + 6 <= a13y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a13x, a1y + 50, 64, 64)
         a13y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to player
      } // close alien 13

      // alien 14
      if (
         r1x >= a14x - aWidth / 2 &&
         r1x <= a14x + aWidth / 2 &&
         r1y >= a14y - aHeight / 2 &&
         r1y + 6 <= a14y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a14x, a1y + 50, 64, 64)
         a14y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to player
      } // close alien 14

      // alien 15
      if (
         r1x >= a15x - aWidth / 2 &&
         r1x <= a15x + aWidth / 2 &&
         r1y >= a15y - aHeight / 2 &&
         r1y + 6 <= a15y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a15x, a1y + 50, 64, 64)
         a15y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to player
      } // close alien 15

      // alien 16
      if (
         r1x >= a16x - aWidth / 2 &&
         r1x <= a16x + aWidth / 2 &&
         r1y >= a16y - aHeight / 2 &&
         r1y + 6 <= a16y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a16x, a1y + 50, 64, 64)
         a16y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to player
      } // close alien 16

      // alien 17
      if (
         r1x >= a17x - aWidth / 2 &&
         r1x <= a17x + aWidth / 2 &&
         r1y >= a17y - aHeight / 2 &&
         r1y + 6 <= a17y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a17x, a1y + 50, 64, 64)
         a17y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to player
      } // close alien 17

      // alien 18
      if (
         r1x >= a18x - aWidth / 2 &&
         r1x <= a18x + aWidth / 2 &&
         r1y >= a18y - aHeight / 2 &&
         r1y + 6 <= a18y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a18x, a1y + 50, 64, 64)
         a18y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to the player
      } // close alien 18

      // alien 19
      if (
         r1x >= a19x - aWidth / 2 &&
         r1x <= a19x + aWidth / 2 &&
         r1y >= a19y - aHeight / 2 &&
         r1y + 6 <= a19y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a19x + 1417, a1y + 50, 64, 64)
         a19y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to the player
      } // close alien 19

      // alien 20
      if (
         r1x >= a20x - aWidth / 2 &&
         r1x <= a20x + aWidth / 2 &&
         r1y >= a20y - aHeight / 2 &&
         r1y + 6 <= a20y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a20x + 1467, a1y + 50, 64, 64)
         a20y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to the player
      } // close alien 20

      // alien 21
      if (
         r1x >= a21x - aWidth / 2 &&
         r1x <= a21x + aWidth / 2 &&
         r1y >= a21y - aHeight / 2 &&
         r1y + 6 <= a21y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a21x + 1517, a1y + 50, 64, 64)
         a21y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to the player
      } // close alien 21

      // alien 22
      if (
         r1x >= a22x - aWidth / 2 &&
         r1x <= a22x + aWidth / 2 &&
         r1y >= a22y - aHeight / 2 &&
         r1y + 6 <= a22y + aHeight / 2
      ) {
         // add points
         // aDeathSfx.play()
         score = score + 25
         p5.image(alienExplosion, a22x + 1567, a1y + 50, 64, 64)
         a22y = -1000 // send alien off-screen
         r1pos = 2 // send rocket back to the player
      } // close alien 22
   } // close aliens

   function meteros() {
      // draw meteors
      p5.image(meteorImg, m1x, m1y, m1size, m1size)
      p5.image(meteorImg, m2x, m2y, m2size, m2size)
      p5.image(meteorImg, m3x, m3y, m3size, m3size)

      // player hit meteor 1
      if (
         r1x >= m1x - m1size / 2 &&
         r1x <= m1x + m1size / 2 &&
         r1y >= m1y - m1size / 2 &&
         r1y <= m1y + m1size / 2
      ) {
         if (m1size >= 25) {
            m1size = m1size - 16.67
            r1pos = 2
            // pHitSfx.play()
         } else {
            m1x = -1000
            p5.image(meteorExplosion, m1x + 1100, m1y, 96, 96)
            r1pos = 2
            // aDeathSfx.play()
         }
      }
      // player hit meteor 2
      if (
         r1x >= m2x - m2size / 2 &&
         r1x <= m2x + m2size / 2 &&
         r1y >= m2y - m2size / 2 &&
         r1y <= m2y + m2size / 2
      ) {
         if (m2size >= 25) {
            m2size = m2size - 16.67
            r1pos = 2
            // pHitSfx.play()
         } else {
            m2x = -1000
            p5.image(meteorExplosion, m2x + 1312, m2y, 96, 96)
            r1pos = 2
            // aDeathSfx.play()
         }
      }
      // player hit meteor 3
      if (
         r1x >= m3x - m3size / 2 &&
         r1x <= m3x + m3size / 2 &&
         r1y >= m3y - m3size / 2 &&
         r1y <= m3y + m3size / 2
      ) {
         if (m3size >= 25) {
            m3size = m3size - 16.67
            r1pos = 2
            // pHitSfx.play()
         } else {
            m3x = -1000
            p5.image(meteorExplosion, m3x + 1528, m3y, 96, 96)
            r1pos = 2
            // aDeathSfx.play()
         }
      }

      // BOSS HIT METEORS
      // boss hit meteor 1
      if (
         br1x >= m1x - m1size / 2 &&
         br1x <= m1x + m1size / 2 &&
         br1y >= m1y - m1size / 2 &&
         br1y <= m1y + m1size / 2
      ) {
         if (m1size >= 25) {
            m1size = m1size - 16.67
            bossRocketPos = 2
            // pHitSfx.play()
         } else {
            m1x = -1000
            p5.image(meteorExplosion, m1x + 1100, m1y, 96, 96)
            bossRocketPos = 2
            // aDeathSfx.play()
         }
      }
      // boss hit meteor 2
      if (
         br1x >= m2x - m2size / 2 &&
         br1x <= m2x + m2size / 2 &&
         br1y >= m2y - m2size / 2 &&
         br1y <= m2y + m2size / 2
      ) {
         if (m2size >= 25) {
            m2size = m2size - 16.67
            bossRocketPos = 2
            // pHitSfx.play()
         } else {
            m2x = -1000
            p5.image(meteorExplosion, m2x + 1312, m2y, 96, 96)
            bossRocketPos = 2
            // aDeathSfx.play()
         }
      }
      // boss hit meteor 3
      if (
         br1x >= m3x - m3size / 2 &&
         br1x <= m3x + m3size / 2 &&
         br1y >= m3y - m3size / 2 &&
         br1y <= m3y + m3size / 2
      ) {
         if (m3size >= 25) {
            m3size = m3size - 16.67
            bossRocketPos = 2
            // pHitSfx.play()
         } else {
            m3x = -1000
            p5.image(meteorExplosion, m3x + 1528, m3y, 96, 96)
            bossRocketPos = 2
            // aDeathSfx.play()
         }
      }
   } // close meteors
   
   p5.preload = () => {
      shipImg = p5.loadImage("http://127.0.0.1:5500/images/invaders_images/ship.png")
      alienImg = p5.loadImage("http://127.0.0.1:5500/images/invaders_images/alien.png")
      bossImg = p5.loadImage("http://127.0.0.1:5500/images/invaders_images/boss.png")
      alienExplosion = p5.loadImage("http://127.0.0.1:5500/images/invaders_images/alien_explosion.png")
      bossExplosion = p5.loadImage("http://127.0.0.1:5500/images/invaders_images/boss_explosion.png")
      meteorExplosion = p5.loadImage("http://127.0.0.1:5500/images/invaders_images/meteor_explosion.png")
      meteorImg = p5.loadImage("http://127.0.0.1:5500/images/invaders_images/meteor.png")

      // fonts
      font = p5.loadFont("http://127.0.0.1:5500/font/VT323.ttf")
      splashFont = p5.loadFont("http://127.0.0.1:5500/font/invadersFont.ttf")

      // sounds

      // pShootSfx = p5.loadSound("http://127.0.0.1:5500/sounds/invaders/p_shoot.wav")
      // pShootSfx.setVolume(0.1)
      // pHitSfx = p5.loadSound("http://127.0.0.1:5500/sounds/invaders/p_hit.wav")
      // bHitSfx = p5.loadSound("http://127.0.0.1:5500/sounds/invaders/b_hit.wav")

      // aDeathSfx = p5.loadSound("http://127.0.0.1:5500/sounds/invaders/a_death.wav")
      // bDeathSfx = p5.loadSound("http://127.0.0.1:5500/sounds/invaders/b_death.wav")

      // lostSfx = p5.loadSound("http://127.0.0.1:5500/sounds/invaders/lost.wav")
      // victorySfx = p5.loadSound("http://127.0.0.1:5500/sounds/invaders/victory.mp3")
      // victorySfx.setVolume(0.4)

      // menuMusic = p5.loadSound("http://127.0.0.1:5500/sounds/invaders/menu_music.ogg")
      // backgroundMusic = p5.loadSound("http://127.0.0.1:5500/sounds/invaders/background_music.ogg")
      // backgroundMusic.setVolume(0.1)
   } // close preload
}
