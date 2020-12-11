import { createStore } from "redux";
//import rootReducer from "./reducers/rootReducer";
const rootReducer = require("./reducers/rootReducer");

/**
 * Our basic redux store with only one reducer. In a larger application this is where we will combine the various reducers
 * for our various entities
 */
const store = createStore(rootReducer);

export default store;
