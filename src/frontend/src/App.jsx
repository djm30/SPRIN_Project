import { useState, useEffect } from "react";
import {
  getResources,
  getResource,
  createResource,
} from "./services/resourceService";
import { login, logout } from "./services/authService";

function App() {
  useEffect(() => {
    login("dylan@email.com", "Password123").then((response) =>
      console.log(response),
    );
    logout().then(() => console.log("Logged out"));
    getResources().then((resources) => console.log(resources));
    getResource("632ae3bfcb441554342c322d").then((resource) =>
      console.log(resource),
    );
    createResource().then((response) => console.log(response));
  }, []);
  return <div>Frontend</div>;
}

export default App;
