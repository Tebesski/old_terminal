import React from 'react'
import { ReactP5Wrapper } from "@p5-wrapper/react";
import {sketch} from './sketch';

import "../../info_box.scss"
import "./invaders.css"

const InvadersPage: React.FC = () => {

   return (
      <div className="infoBox">
         <ReactP5Wrapper sketch={sketch} />
      </div>
   )
}

export default InvadersPage;