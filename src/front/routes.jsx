// Import necessary components and functions from react-router-dom.

import {createBrowserRouter, createRoutesFromElements, Route,} from "react-router-dom";
import { Layout } from "./pages/Layout.jsx";
import { Home } from "./pages/Home.jsx";
import { Contact } from "./pages/Contact.jsx";
import { ContactCard } from "./components/ContactCard.jsx";
import { AddContact } from "./pages/AddContact.jsx";
import { Characters } from "./pages/Characters.jsx";
import { StarShips } from "./pages/StarShips.jsx";
import { Planets } from "./pages/Planets.jsx";
import { Contacts } from "./pages/Contacts.jsx";
import { CharacterDetails } from "./pages/CharacterDetails.jsx";
import { StarshipDetails } from "./pages/StarshipDetails.jsx";
import { PlanetDetails } from "./pages/PlanetDetails.jsx";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx"




export const router = createBrowserRouter(
    createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    
      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path= "/" element={<Home/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path= "/contact" element={<Contact/>} />
        <Route path= "/edit-contact/:id" element={<AddContact/>} />
        <Route path= "/add-contact" element={<AddContact/>} />
        <Route path= "/characters" element={<Characters/>} />
        <Route path= "/starships" element={<StarShips/>} />
        <Route path= "/planets" element={<Planets/>} />
        <Route path= "/contacts" element={<Contacts/>} />
        <Route path= "/character-details" element={<CharacterDetails/>} />
        <Route path= "/starship-details" element={<StarshipDetails/>} />
        <Route path= "/planet-details" element={<PlanetDetails/>} />
        <Route path="/signup" element={<Signup />} />
        </Route>

    )
);