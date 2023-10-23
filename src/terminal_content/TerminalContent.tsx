import React, { useState } from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { upperBtns } from '../play_sounds/playVariousSfx'

import { MouseParallaxChild } from "react-parallax-mouse";

import InfoBox from "./InfoBox/InfoBox";

import "./terminal_content.css"

interface IState {
     terminalActivatedReducer: boolean,
     zoomInReducer: boolean,
     muteModeReducer: boolean,
}

const TerminalContent = ({terminalActivatedReducer: terminalActivated, muteModeReducer: isMuted}: any) => {
      const [isShowed, showElem] = useState(false)
      const [buttonState, triggerButton] = useState({
         buttonActivated: false,
         id: "",
      })
      const [infoBoxState, triggerInfoBox] = useState(
         {
            infoBoxShowed: false,
            infoBoxId: ""
         }
      )

      if(terminalActivated) {
         setTimeout(() => {
               showElem(true)
         }, 1000);
      }

      function clickButton(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
         isMuted ? upperBtns.setVolume(0) : upperBtns.play()
         const button = event.target as HTMLButtonElement
         const buttonIdState = buttonState.id;
         const triggerBtn = () => triggerButton({
            buttonActivated: true,
            id: button.id,
         });
         const triggerInfo = () => triggerInfoBox({
            infoBoxShowed: true,
            infoBoxId: button.id + "InfoBox"
         })

         if(buttonState.buttonActivated && button.id === buttonIdState) {
            return
         }

         if(buttonIdState) {
            document.getElementById(`${buttonIdState}`)?.classList.remove("buttonActive")
         }

         triggerBtn()
         triggerInfo()
         button.classList.add("buttonActive")
      }

   return (
      <div hidden={!terminalActivated} id="contentContainer">
            <MouseParallaxChild factorX={0.083} factorY={0.083} className="parallax">
               <div className="btnContainer">
                  <Link hidden={!isShowed} to="/about">
                     <button  id="about" className="button" onClick={(event) => clickButton(event as React.MouseEvent<HTMLButtonElement, MouseEvent>)}>ABOUT_ME</button>
                  </Link>

                  <Link to="/portfolio">
                     <button hidden={!isShowed} id="portfolio" className="button" onClick={(event) => clickButton(event as React.MouseEvent<HTMLButtonElement, MouseEvent>)}>PORTFOLIO</button>
                  </Link>

                  <Link to="/reviews">
                     <button hidden={!isShowed} id="reviews" className="button" onClick={(event) => clickButton(event as React.MouseEvent<HTMLButtonElement, MouseEvent>)}>REVIEWS</button>
                  </Link>

                  <Link to="/invaders">
                     <button hidden={!isShowed} id="invaders" className="button" onClick={(event) => clickButton(event as React.MouseEvent<HTMLButtonElement, MouseEvent>)}>INVADERS!</button>
                  </Link>

                  <Link to="/contacts">
                     <button hidden={!isShowed} id="contacts" className="button" onClick={(event) => clickButton(event as React.MouseEvent<HTMLButtonElement, MouseEvent>)}>CONTACTS</button>
                  </Link>
               </div>
               
               <InfoBox {...infoBoxState}/>

            </MouseParallaxChild>
      </div>
   )
}

const mapStateToProps = (state: IState) => {
      return {
            terminalActivatedReducer: state.terminalActivatedReducer,
            muteModeReducer: state.muteModeReducer,
      }
}

export default connect(mapStateToProps, null)(TerminalContent);