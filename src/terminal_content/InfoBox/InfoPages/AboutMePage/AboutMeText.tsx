import React from "react"

type boxId = {
   boxId: string
}

export const AboutMeText: React.FC<boxId> = ({boxId}) => {
   return (
      <React.Fragment>
         <p className="aboutText" hidden={boxId === "bioBox" ? false : true}>
            BIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIOBIO
         </p>

         <p className="aboutText" hidden={boxId === "hobbiesBox" ? false : true}>
            HOBBIESHOBBIESHOBBIESHOBBIESHOBBIESHOBBIESHOBBIESHOBBIESHOBBIESHOBBIESHOBBIESHOBBIESHOBBIESHOBBIESHOBBIESHOBBIES
         </p>

         <p className="aboutText" hidden={boxId === "valuesBox" ? false : true}>
            VALUESVALUESVALUESVALUESVALUESVALUESVALUESVALUESVALUESVALUESVALUESVALUESVALUESVALUESVALUESVALUES
         </p>

         <p className="aboutText" hidden={boxId === "viewsBox" ? false : true}>
            VIEWSVIEWSVIEWSVIEWSVIEWSVIEWSVIEWSVIEWSVIEWSVIEWSVIEWSVIEWSVIEWSVIEWSVIEWSVIEWSVIEWSVIEWS
         </p>

         <p className="aboutText" hidden={boxId === "characterBox" ? false : true}>
            CHARACTERCHARACTERCHARACTERCHARACTERCHARACTERCHARACTERCHARACTERCHARACTERCHARACTERCHARACTERCHARACTERCHARACTERCHARACTER
         </p>

         <p className="aboutText" hidden={boxId === "plansBox" ? false : true}>
            PLANSPLANSPLANSPLANSPLANSPLANSPLANSPLANSPLANSPLANSPLANSPLANSPLANSPLANSPLANSPLANSPLANSPLANS
         </p>
      </React.Fragment>
   )
}