import UIFx from "uifx";

import pickUpFloppySfx from "../../sounds/pick_up_floppy.wav"
import putDownFloppySfx from "../../sounds/put_down_floppy.wav"
import insertFloppySound from "../../sounds/insert_floppy.wav"

import preloadSound from "../../sounds/preload_sound.wav"

import passGoodSfx from "../../sounds/passgood.wav"
import passBadSfx from "../../sounds/passbad.wav"

import yesSfx from "../../sounds/interface/yes.ogg"
import upperBtnsSfx from "../../sounds/interface/upperBtns.wav"
import scrollBtnsSfx from "../../sounds/interface/scrollSound.wav"
import click1Sfx from "../../sounds/interface/click1.wav"
import click2Sfx from "../../sounds/interface/click2.wav"



      export const upperBtns = new UIFx(
            upperBtnsSfx,
      )
      
      export const scrollBtns = new UIFx(
            scrollBtnsSfx,
      )

      export const click1 = new UIFx(
            click1Sfx,
      )

      export const click2 = new UIFx(
            click2Sfx,
      )

      export const pickUpSfx = new UIFx(
            pickUpFloppySfx,
      )

      export const putDownSfx = new UIFx(
            putDownFloppySfx,
      )

      export const clickYesSfx = new UIFx(
            yesSfx,
      )
      
      export const insertFloppySfx = new UIFx(
            insertFloppySound,
      )

      export const preloadSfx = new UIFx(
            preloadSound,
            {
                  volume: 0.6
            }
      )

      export const passAcceptedSfx = new UIFx(
            passGoodSfx
      )

      export const passDeclinedSfx = new UIFx(
            passBadSfx
      )