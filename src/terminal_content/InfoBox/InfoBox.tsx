import React from "react"
import "./info_box.scss"

import AboutMePage from "./InfoPages/AboutMePage/AboutMePage"
import ReviewsPage from "./InfoPages/ReviewsPage/ReviewsPage"
import ContactsPage from "./InfoPages/ContactsPage/ContactsPage"
import PortfolioPage from "./InfoPages/PortfolioPage/PortfolioPage"
import InvadersPage from "./InfoPages/InvadersPage/InvadersPage"
import { Route, Routes } from "react-router-dom"

export interface IInfoBoxProps {
   infoBoxShowed: boolean,
   infoBoxId: string,
}

const InfoBox: React.FC<IInfoBoxProps> = (infoBoxState) => {

   return (
      <div hidden={!infoBoxState.infoBoxShowed}>
         <Routes>
            <Route path="/about" element={<AboutMePage {...infoBoxState} />} />
            <Route path="/portfolio/*" element={<PortfolioPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/invaders" element={<InvadersPage />} />
         </Routes>
      </div>
   )
}

export default InfoBox;