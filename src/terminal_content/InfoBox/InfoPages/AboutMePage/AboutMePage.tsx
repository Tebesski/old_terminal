import React, {useState} from 'react'
import { connect } from 'react-redux'
import "../../info_box.scss"
import "./about_me.css"
import { click2, upperBtns } from '../../../../play_sounds/playVariousSfx'

import marvelousMe from "../../../../../images/marvelous_me.png"

import { AboutMeText } from './AboutMeText'

interface IState {
   muteModeReducer: boolean,
}

const AboutMePage: React.FC<IState> = ({muteModeReducer: isMuted}) => {

   // STATES
   const [{about, photo}, scrollIt] = useState({
      about: true,
      photo: false,
   })

   const [buttonState, triggerButton] = useState({
         buttonActivated: false,
         id: "bio",
      })

   const [aboutBoxState, tiggerAboutBox] = useState(
         {
            hidden: true,
            id: ""
         }
      )

   // SCROLL FUNCTION
   const scroll = (direction: string) => {
      isMuted ? upperBtns.setVolume(0) : upperBtns.play()
      if(direction === "about") {
         scrollIt({
            about: true,
            photo: false,    
         })
      } else {
         scrollIt({
            about: false,
            photo: true,    
         })  
      }
   }

   // BUTTONS MANIPULATION
   function clickButton(event: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) {
      const button = event.target as HTMLButtonElement | HTMLDivElement
      const buttonIdState = buttonState.id;
      const triggerBtn = () => triggerButton({
         buttonActivated: true,
         id: button.id,
      });
      const triggerInfo = () => tiggerAboutBox({
         hidden: false,
         id: button.id + "Box"
      })

      if(buttonState.buttonActivated && button.id === buttonIdState) {
         document.getElementById(`${buttonIdState}`)?.classList.remove("aboutButtonsActive")
         triggerButton({buttonActivated: false, id: button.id})
         tiggerAboutBox({hidden: true, id: ""})
         return
      }

      if(button.id === "close") {
         isMuted ? click2.setVolume(0) : click2.play()
         document.getElementById(`${buttonIdState}`)?.classList.remove("aboutButtonsActive")
         triggerButton({buttonActivated: false, id: button.id})
         tiggerAboutBox({hidden: true, id: ""})
         return;
      }

      if(buttonIdState) {
         isMuted ? upperBtns.setVolume(0) : upperBtns.play()
         document.getElementById(`${buttonIdState}`)?.classList.remove("aboutButtonsActive")
      }

      triggerBtn()
      triggerInfo()
      button.classList.add("aboutButtonsActive")
   }
   
   function buttonGenerator(buttonId: string) {
      return (
            <button id={buttonId} className="aboutButtons" hidden={!aboutBoxState.hidden}
            onClick={(event) => clickButton(event as React.MouseEvent<HTMLButtonElement, MouseEvent>)}>{buttonId.toUpperCase()}</button>
      )
   }

   function textBoxGenerator(boxId: string) {
      return (
            <div className='aboutTextBox'
            hidden={!aboutBoxState.hidden && aboutBoxState.id === boxId ? false : true}>
               <div id="close" className='close'
               onClick={(event) => clickButton(event as React.MouseEvent<HTMLDivElement, MouseEvent>)}></div>

               <AboutMeText boxId={boxId} />
            </div>
      )
   }


   return (
      <div className="infoBox">
         <div className="aboutTextGrid" hidden={about ? false : true}>
            {buttonGenerator("bio")}
            {textBoxGenerator("bioBox")}
            
            {buttonGenerator("hobbies")}
            {textBoxGenerator("hobbiesBox")}

            {buttonGenerator("values")}
            {textBoxGenerator("valuesBox")}

            {buttonGenerator("views")}
            {textBoxGenerator("viewsBox")}
            
            {buttonGenerator("character")}
            {textBoxGenerator("characterBox")}
            
            {buttonGenerator("plans")}
            {textBoxGenerator("plansBox")}

         </div>
         <button hidden={about ? false : true} className="aboutButtons meBtn" onClick={() => scroll("photo")}>
            › ME, MYSELF, AND I ‹
         </button>
         
         <img hidden={about ? true : false} src={marvelousMe} className="marvelousMe" alt="alt"/>

         <button hidden={photo ? false : true} className="aboutButtons back" onClick={() => scroll("about")}>
            BACK
         </button>
      </div>
   )
}

const mapStateToProps = (state: IState) => {
      return {
            muteModeReducer: state.muteModeReducer,
      }
}

export default connect(mapStateToProps, null)(AboutMePage);