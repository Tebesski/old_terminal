import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { MouseParallaxContainer } from "react-parallax-mouse";

import TerminalScreen from "./terminal_screen/TerminalScreen";
import TerminalContent from "./terminal_content/TerminalContent";
import PreloadScreen from "./preload_screen/PreloadScreen";

interface IState {
     zoomInReducer: boolean,
}

const Main = ({zoomInReducer: isZoomed}: IState) => {

  return (
    <MouseParallaxContainer enabled={isZoomed} containerStyle={{userSelect: "none"}}>
      <BrowserRouter>
          <PreloadScreen />
          <TerminalScreen />
          <TerminalContent />
      </BrowserRouter>
    </MouseParallaxContainer>
    )
};

const mapStateToProps = (state: IState) => {
      return {
            zoomInReducer: state.zoomInReducer,
      }
}

export default connect(mapStateToProps, null)(Main);