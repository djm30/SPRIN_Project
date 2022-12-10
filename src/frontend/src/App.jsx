import React, { useState, useEffect } from "react";
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
import { submitLogin, tryReauthenticate } from "./reducers/authReducer";
import { initializeResources } from "./reducers/resourceReducer";
import { initializeEvents } from "./reducers/eventReducer";
import SingleResourcePage from "./pages/SingleResourcePage";
import SingleEventPage from "./pages/SingleEventPage";
import { useResource, useEvent } from "./hooks";
import NotFound from "./pages/NotFound";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        // Try to reauthenticate on page reload if a session id is found
        // dispatch(submitLogin("dylan@email.com", "Password123"));
        dispatch(tryReauthenticate());
        dispatch(initializeResources());
        dispatch(initializeEvents());
    }, []);

    return (
        <>
            <Notification />
            <div className="font-body overflow-x-hidden -z-50">
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
