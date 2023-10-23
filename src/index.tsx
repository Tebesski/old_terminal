import ReactDOM from "react-dom/client";
import { createStore } from "redux";

import {rootReducer} from "./redux-store/reducers";
import { Provider } from "react-redux";

import Main from "./Main";

const store = createStore(rootReducer)

const container = document.getElementById("root")!;
const root = ReactDOM.createRoot(container);
root.render(
      <Provider store={store}>
         <Main />
      </Provider>
   )