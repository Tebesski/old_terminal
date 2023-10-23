import {useEffect, useState} from "react";
import { connect } from "react-redux";
import { muteModeOff, muteModeOn } from "../redux-store/actions";

import * as sfx from '../play_sounds/playVariousSfx'
import {playButtonsSfx, playHeavyButtonSfx} from "../play_sounds/playButtonsSfx"

import "./preloadScreen.css"

interface IMode {
   muteModeOn: Function,
   muteModeOff: Function,
}

const PreloadScreen = ({muteModeOn, muteModeOff}: IMode) => {

   const [soundsPreloaded, preloadSounds] = useState(true);
   const [warningHidden, showWarning] = useState(true)
   const [setupHidden, showSetup] = useState(true)
   const [btn1Hidden, showBtn1] = useState(true)
   const [btn2Hidden, showBtn2] = useState(true)
   const [preloadPageIsHidden, hidePreloadPage] = useState(false)

   const [soundOption, setupSound] = useState(2)
   const btns = document.getElementsByClassName("btn-7");
   
   useEffect(() => {
      if(soundsPreloaded) {
         Object.entries(sfx).forEach((e) => {
            e[1].setVolume(0)
            e[1].play()
            setTimeout(() => {
               e[1].setVolume(1)
            }, 2000);
         })
         Object.entries(playButtonsSfx).forEach((e) => {
            e[1].setVolume(0)
            e[1].play()
            setTimeout(() => {
               e[1].setVolume(1)
            }, 2000);
         })
         Object.entries(playHeavyButtonSfx).forEach((e) => {
            e[1].setVolume(0)
            e[1].play()
            console.log(e);
            setTimeout(() => {
               e[1].setVolume(1)
            }, 2000);
         })

         setTimeout(() => {
            showWarning(false);
         }, 4000);

         setTimeout(() => {
            showSetup(false);
         }, 9000);

         setTimeout(() => {
            showBtn1(false);
         }, 13500);

         setTimeout(() => {
            showBtn2(false);
         }, 14000);

         preloadSounds(false)
      }

      if(soundOption === 1) {
         muteModeOff()

         btns[1].setAttribute("disabled", "true")
         btns[0].classList.add("btnC")
      }
      
      else if(soundOption === 0) {
         muteModeOn()

         btns[0].setAttribute("disabled", "true")
         btns[1].classList.add("btnC")
      }

   }, [soundOption])

   function setSoundVolume() {      
      setTimeout(() => {
         document.getElementById("preloadContainer")?.classList.add("disappear")
      }, 500);
      setTimeout(() => {
         hidePreloadPage(true)
      }, 2700);
   }

   return (
      <div hidden={preloadPageIsHidden} id="preloadContainer">
         <h1 className="nowLoadingText loading">
            Now loading
         </h1>

         <h1 hidden={warningHidden} className="soundsWarningText">There are sounds on this website</h1>
         <div>
            <h1 hidden={setupHidden} className="soundsSetupText">Would you like to hear them?</h1>

            <button hidden={btn1Hidden} className="custom-btn btn-7 btn-yes"
            onClick={() => {sfx.clickYesSfx.play(); setupSound(1); setSoundVolume()}}>
               YES
            </button>
            
            <button hidden={btn2Hidden} className="custom-btn btn-7 btn-no"
            onClick={() => {setupSound(0); setSoundVolume()}}>
               NO
            </button>

         </div>
      </div>
   )

}

const mapDispatchToProps = (dispatch: Function) => {
      return {
            muteModeOff: () => dispatch(muteModeOff()),
            muteModeOn: () => dispatch(muteModeOn()),
      }
}

export default connect(null, mapDispatchToProps)(PreloadScreen);