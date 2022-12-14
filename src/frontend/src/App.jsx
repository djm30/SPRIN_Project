import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Partners from "./pages/Partners";
import Events from "./pages/Events";
import Resources from "./pages/Resources";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notification from "./components/UI/Notification";
import { useDispatch } from "react-redux";

import Footer from "./components/UI/Footer/Footer";
import { tryReauthenticate } from "./reducers/authReducer";
import { incrementStats } from "./reducers/statsReducer";
import statTypes from "./services/statTypes";
import { initializeResources } from "./reducers/resourceReducer";
import { initializeEvents } from "./reducers/eventReducer";
import SingleResourcePage from "./pages/SingleResourcePage";
import SingleEventPage from "./pages/SingleEventPage";
import { useResource, useEvent } from "./hooks";
import NotFound from "./pages/NotFound";

// Main app component
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        // Try to reauthenticate on page reload if a session id is found
        dispatch(tryReauthenticate());
        dispatch(incrementStats(statTypes.VIEWS));

        // Initialize resources and events
        dispatch(initializeResources());
        dispatch(initializeEvents());
    }, []);

    return (
        <>
            {/* Notification component to display all notifications published from the application */}
            <Notification />
            <div className="font-body overflow-x-hidden -z-50">
                {/* Defined routing for the application here */}
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to={"/home"} replace />}
                    />
                    <Route path="/home" element={<Home />} />
                    <Route path="/partners" element={<Partners />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/resources/:id"
                        element={
                            <SingleResourcePage resource={useResource()} />
                        }
                    />
                    <Route
                        path="/events/:id"
                        element={<SingleEventPage event={useEvent()} />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </div>
        </>
    );
}

export default App;
