import React from 'react'
import { connect } from 'react-redux'
import "../../info_box.scss"
import "./contacts.css"

import tele_icon from '../../../../../images/contacts_icons/telegram.png'
import insta_icon from '../../../../../images/contacts_icons/instagram.png'
import { click1 } from '../../../../play_sounds/playVariousSfx'

interface IState {
   muteModeReducer: boolean,
}

const ContactsPage: React.FC<IState> = ({muteModeReducer: isMuted}) => {

   function openTab(link: string) {
      isMuted ? click1.setVolume(0) : click1.play()
      setTimeout(() => {
         window.open(link, "_blank")
      }, 100);
   }

   return (
      <div className="infoBox line">
         <div className='contactsContainer'>

            <div className='dev flexI'>
               <h1 className='title'>DEVELOPER</h1>

               <a href="#"
               onClick={() => {openTab("https://t.me/two_bears_high_fiving"); return false}}>
                  <img className='teleIcon icon' src={tele_icon} alt="alt" />
               </a>

               <a href='#'
               onClick={() => {openTab("https://www.instagram.com/altair.freeman/"); return false}}>
                  <img className='icon' src={insta_icon} alt="alt" />
               </a>
            </div>

            <div className='design flexI'>
               <h1 className='title'>DESIGNER</h1>

               <a href='#'
               onClick={() => {openTab("https://t.me/c_h_a_m_e_l_e_o_n"); return false}}>
                  <img className='teleIcon icon' src={tele_icon} alt="alt" />
               </a>

               <a href='#'
               onClick={() => {openTab("https://www.instagram.com/0._.0.0__0/"); return false}}>
                  <img className='icon' src={insta_icon} alt="alt" />
               </a>
            </div>

         </div>
      </div>
   )
}

const mapStateToProps = (state: IState) => {
      return {
            muteModeReducer: state.muteModeReducer,
      }
}

export default connect(mapStateToProps, null)(ContactsPage);