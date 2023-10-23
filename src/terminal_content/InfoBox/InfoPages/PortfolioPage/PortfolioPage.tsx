import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import "../../info_box.scss"
import "./portfolio.css"

import { scrollBtns } from '../../../../play_sounds/playVariousSfx'

import mysite_thumbnail from '../../../../../images/portfolio_images/folio_my_website.png'
import in_progress_thumbnail from '../../../../../images/portfolio_images/in_progress.png'
import lorem from '../../../../../images/portfolio_images/lorem.png'
import { Routes, Route, useNavigate } from 'react-router-dom'

interface IState {
   muteModeReducer: boolean,
}

const PortfolioPage: React.FC<IState> = ({muteModeReducer: isMuted}) => {

   const navigate = useNavigate();
   const pages = ["/portfolio/1", "/portfolio/2", "/portfolio/3"]
   const [pageIndex, setPageIndex] = useState(0)

   const navigateToPage = (direction: number) => {
      isMuted ? scrollBtns.setVolume(0) : scrollBtns.play()
      const pageIndexTmp = pageIndex + direction

      setPageIndex(pageIndexTmp)
   }

   const arrowLeft = document.getElementById("arrowLeft")
   const arrowRight = document.getElementById("arrowRight")
   
   useEffect(() => {
      if (pageIndex === 0) {
         arrowLeft?.setAttribute("disabled", "disabled")
         arrowLeft?.classList.add("inactive")
         navigate(pages[pageIndex])
         return
      }

      if (pageIndex === pages.length - 1) {
      arrowRight?.setAttribute("disabled", "disabled")
      arrowRight?.classList.add("inactive")
      navigate(pages[pageIndex])
      return
   }
      
   arrowRight?.removeAttribute("disabled")
   arrowRight?.classList.remove("inactive")
   arrowLeft?.removeAttribute("disabled")
   arrowLeft?.classList.remove("inactive")
   
   navigate(pages[pageIndex])
   
   }, [pageIndex])

      return (
         
               <div className="infoBox gallery-container">
                  <button disabled={pageIndex === 0 ? true : false}
                  id="arrowLeft"
                  onClick={() => navigateToPage(-1)}
                  className={pageIndex === 0 ? "inactive scroll" : "scroll"}>❰</button>
                     <Routes>
                        <Route path="/1" element={<img className='gallery-item' src={mysite_thumbnail} alt="Loading ..." />}/>
                        <Route path="/2" element={<img className='gallery-item' src={in_progress_thumbnail} alt="Loading ..." />}/>
                        <Route path="/3" element={<img className='gallery-item' src={lorem} alt="Loading ..." />}/>
                     </Routes>
                  <button id="arrowRight" onClick={() => navigateToPage(1)} className='scroll'>❱</button>
               </div>
         
      )
}

// 
// 
// 

const mapStateToProps = (state: IState) => {
      return {
            muteModeReducer: state.muteModeReducer,
      }
}

export default connect(mapStateToProps, null)(PortfolioPage);