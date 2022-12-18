import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./reducers/store";

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
    // Wrap the application in a provider to make the store available to all components
    <Provider store={store}>
        <Router>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>
    </Provider>,
);
