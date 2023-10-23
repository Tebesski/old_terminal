import btn1 from "../../sounds/char/btn1.wav"
import btn2 from "../../sounds/char/btn2.wav"
import btn3 from "../../sounds/char/btn3.wav"
import btn4 from "../../sounds/char/btn4.wav"
import btn5 from "../../sounds/char/btn5.wav"
import btn6 from "../../sounds/char/btn6.wav"

import enter1 from "../../sounds/char/enter1.wav"
import enter2 from "../../sounds/char/enter2.wav"
import enter3 from "../../sounds/char/enter3.wav"

import UIFx from "uifx"

export function playButtonsSfx() {

   const sounds = [btn1, btn2, btn3, btn4, btn5, btn6];
   const sound = sounds[Math.floor(Math.random()*sounds.length)];

   return new UIFx(
         sound,
      )
}

export function playHeavyButtonSfx() {

   const sounds = [enter1, enter2, enter3]
   const sound = sounds[Math.floor(Math.random()*sounds.length)];

   return new UIFx(
         sound,
      )
}