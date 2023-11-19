import { BrowserRouter } from "react-router-dom";
import { Routes as ReactDomRoutes, Route } from "react-router-dom";

import React from 'react'
import Login from "../pages/Login";
import Home from "../pages/Home";
import Reclamo from "../pages/Reclamo";
import NuevoReclamo from "../pages/NuevoReclamo";
import Persona from "../pages/Persona";
import Admin from "../pages/Admin";
import UnidadEdificio from "../pages/UnidadEdificio";
import AdminReclamo from "../pages/AdminReclamo";
import Unidad from "../pages/Unidad";

const Routes = () => {
  
  return (
    <BrowserRouter>
        <ReactDomRoutes>
            <Route path= '/' element={<Login />}></Route>
            <Route path= '/home' element={<Home />}></Route>
            <Route path= '/reclamos' element={<Reclamo />}></Route>
            <Route path= '/reclamos/nuevo' element={<NuevoReclamo />}></Route>
            <Route path= '/admin/home' element={<Admin />}></Route>
            <Route path= '/admin/unidades/:id' element={<UnidadEdificio />}></Route>
            <Route path= '/admin/unidad/:id/:piso/:numero' element={<Unidad />}></Route>
            <Route path= '/admin/personas' element={<Persona />}></Route>
            <Route path= '/admin/reclamos' element={<AdminReclamo />}></Route>
        </ReactDomRoutes >
      </BrowserRouter>
  )
}

export default Routes