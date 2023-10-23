import React, { useState } from "react"
import { connect } from "react-redux";

import { zoomInAction } from "../redux-store/actions";
import { activatedTerminalAction } from "../redux-store/actions";

import { MouseParallaxChild } from "react-parallax-mouse";

import * as sfx from '../play_sounds/playVariousSfx'
import {playButtonsSfx, playHeavyButtonSfx} from "../play_sounds/playButtonsSfx"

import old_terminal_placeholder from "../../images/screen_images/old_terminal_placeholder.png"
import floppy_lay from "../../images/floppy_disk_images/floppy_lay_placeholder.png"
import floppy_take from "../../images/floppy_disk_images/floppy_take_placeholder.png"
import table from "../../images/table_image/table.png"

import "./terminal_screen.css"
import "./progressBarAnimation.css"
import "../background/background.css"
import "../floppy_disk/floppy_disk.css"
import "../table/table.css"

interface IPassword {
      clearPasswordArray: string[],
      i: number,
}

interface IState {
     terminalActivatedReducer: boolean,
     zoomInReducer: boolean,
     zoomIn: Function,
     activateTerminal: Function,
     muteModeReducer: boolean,
}

// COMPONENT //
const TerminalScreen = ({zoomInReducer: isZoomed, zoomIn, activateTerminal, muteModeReducer: isMuted}: IState) => {

      const [floppyTaken, takeTheFloppy] = useState(false)
      const [terminalIsLoading, preloadTerminal] = useState(false)
      const [terminalLoaded, loadTerminal] = useState(false)
      const [passFieldInvoked, invokePassField] = useState(false)
      const [passwordAccepted, acceptPassword] = useState<boolean>(false)
      const [clearPasswordState, setClearPassword] = useState<any>(
                  {
                        "clearPasswordArray": [],
                        "i": 0,
                  }
      )

      // WINDOW.ONKEYDOWN
      window.onkeydown = (event) => {
            backspace = false;
            if(event.code.startsWith("Key") || event.code.startsWith("Digit")) {
                  isMuted ? playButtonsSfx().setVolume(0) : playButtonsSfx().play()
            }

            else if(event.code.startsWith("Enter")) {
                  isMuted ? playHeavyButtonSfx().setVolume(0) : playHeavyButtonSfx().play()

                        if(passwordAccepted && clearPasswordState.clearPasswordArray.length === 4) {
                              zoomIn()
                              isMuted ? sfx.passAcceptedSfx.setVolume(0) : sfx.passAcceptedSfx.play()
                              activateTerminal()
                              invokePassField(false)
                              return
                        }

                  isMuted ? sfx.passDeclinedSfx.setVolume(0) : sfx.passDeclinedSfx.play()
            }
            
            else if(event.key.includes("Backspace")) {
                  backspace = true;
                  isMuted ? playHeavyButtonSfx().setVolume(0) : playHeavyButtonSfx().play()
            }
      }

      function takeFloppy(event: React.MouseEvent) {
            const target = event.target as HTMLImageElement

            if(!floppyTaken) {
                  isMuted ? sfx.pickUpSfx.setVolume(0) : sfx.pickUpSfx.play()
                  target.ondragstart = () => false

                  target.style.position = 'absolute';
                  target.style.width = '90px';
                  target.style.height = '90px';
                  moveAt(target, event.pageX, event.pageY)
                  takeTheFloppy(true)
                  document.onmousemove = function(event) {
                        event.preventDefault()
                        moveAt(target, event.pageX, event.pageY)

                        target.hidden = true;
                        const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
                        target.hidden = false;
                        if(elemBelow?.closest('.terminalScreen')) {
                              document.onmousemove = null;
                              isMuted ? sfx.insertFloppySfx.setVolume(0) : sfx.insertFloppySfx.play()
                              insertFloppy(target)
                        }
                  }
                  target.onclick = () => target.setAttribute('style', 'inset: 440px 1000px;')
            } else {
                  isMuted ? sfx.putDownSfx.setVolume(0) : sfx.putDownSfx.play()
                  target.onmouseup = null;
                  document.onmousemove = null;
                  takeTheFloppy(false)
            }
      }

      function insertFloppy(target: HTMLImageElement) {
            const loadingBar = document.getElementById('terminalProgressBar') as HTMLInputElement
            target.remove()

            takeTheFloppy(false)

            setTimeout(() => {

                  isMuted ? sfx.preloadSfx.setVolume(0) : sfx.preloadSfx.play()
                  preloadTerminal(true)

                  setTimeout(() => {
                        preloadTerminal(false)
                        loadTerminal(true)

                        const loading = setInterval(() => {
                              if (loadingBar.value.length > 7) {
                                    clearInterval(loading)
                                    loadTerminal(false)
                                    invokePasswordScreen()
                              }
                              loadingBar.value = loadingBar.value + `#`;
                        }, Math.random() * 1000)
                  }, 2300);

            }, 1300);
      }

      function invokePasswordScreen() {
            const terminalPasswordField = document.getElementById('terminalPasswordField') as HTMLInputElement
            invokePassField(true)

            setTimeout(() => {
                  terminalPasswordField.focus()
            }, 0);

            function refocus(elem: HTMLInputElement) {
                  setTimeout(function(){elem.focus()}, 10);
            }

            terminalPasswordField.onblur = () => {
                 refocus(terminalPasswordField)
            }
      }

      function moveAt(target: HTMLImageElement, pageX: number, pageY: number) {
            target.style.left = pageX - target.offsetWidth / 2 + 'px';
            target.style.top = pageY - target.offsetWidth / 2 + 'px';
      }

      function screenPush() {
            
      }

      let backspace: boolean = false;

      function encryptPassword(target: HTMLInputElement){

                  setClearPassword(({clearPasswordArray, i}: IPassword) => {
                        if (backspace) {
                              i--
                              validatePassword(clearPasswordArray.join(''))
                              return {
                                    clearPasswordArray: clearPasswordArray.slice(0, -1),
                                    i: i,
                              }
                        }

                        const oldArr = clearPasswordArray;
                        const newArr = [...oldArr, target.value[i]]
                        i++
                        if(newArr.length > 0) {validatePassword(newArr.join(''))}

                        let encryptedInput = target.value.replace(/./g, "*")
                        target.value = encryptedInput;

                        return {
                              clearPasswordArray: newArr,
                              i,};
                  })
      }

      function validatePassword(passField: string) {
            passField.includes("7437") ? acceptPassword(true) : acceptPassword(false);
      }

      return(
                  <div className="vh-100 vw-100 pageContainer">
                        <div>
                              <MouseParallaxChild
                              factorX={0.1}
                              factorY={0.1}>
                                    <img
                                    className={isZoomed ? "zoomedBackground parallax" : "unzoomedBackground"}
                                    src="https://cdna.artstation.com/p/assets/images/images/048/775/512/large/eidorian-art-bunker-abandonado-fondo.jpg?1650913246"
                                    alt="bcg" />
                              </MouseParallaxChild>

                              <div className={isZoomed ? "terminalSetup zoomedSetup" : "terminalSetup unzoomedSetup"}>
                                    <input
                                    type="text"
                                    id="terminalProgressBar"
                                    hidden={!terminalLoaded}
                                    disabled={true}/>
                                    
                                    <div id="loadingAnimation" hidden={!terminalIsLoading}>
                                          <div className="bottomLeftAnimation"></div>
                                          <div className="bottomRightAnimation"></div>

                                          <div className="progressBarAnimationPillarLeft"></div>
                                          <div className="progressBarAnimationPillarRight"></div>

                                          <div className="progressBarAnimationTopRight"></div>
                                          <div className="progressBarAnimationTopLeft"></div>
                                    </div>

                                    <input id="terminalPasswordField"
                                    type="text"
                                    onChange={(event) => encryptPassword(event.target)}
                                    maxLength={4}
                                    hidden={!passFieldInvoked}
                                    />

                                    <MouseParallaxChild
                                    factorX={0.02}
                                    factorY={0.02}>
                                          <img src={old_terminal_placeholder} alt="Old Terminal"
                                          className="terminalScreen"
                                          onClick={screenPush}/>
                                    </MouseParallaxChild>

                                    <img
                                    onClick={(event) => takeFloppy(event)}
                                    className={isZoomed ? "floppy zoomedFloppy" : "floppy"}
                                    src={floppyTaken ? floppy_take : floppy_lay} alt="floppy" />

                                    <img
                                    className={isZoomed ? "table zoomedTable" : "table"}
                                    src={table} alt="table" />
                              </div>

                              
                        </div>
                  </div>
   )
}

const mapStateToProps = (state: IState) => {
      return {
            terminalActivatedReducer: state.terminalActivatedReducer,
            zoomInReducer: state.zoomInReducer,
            muteModeReducer: state.muteModeReducer,
      }
}

const mapDispatchToProps = (dispatch: Function) => {
      return {
            zoomIn: () => dispatch(zoomInAction()),
            activateTerminal: () => dispatch(activatedTerminalAction()),
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(TerminalScreen);