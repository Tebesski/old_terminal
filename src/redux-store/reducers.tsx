import { combineReducers } from "redux";
import { terminalActivatedReducer } from "./terminalActivatedReducer";
import { zoomInReducer } from "./zoomInReducer";
import { muteModeReducer } from "./muteModeReducer";

export const rootReducer = combineReducers({
  terminalActivatedReducer,
  zoomInReducer,
  muteModeReducer,
})