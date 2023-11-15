import { BrowserRouter } from "react-router-dom";
import { Routes as ReactDomRoutes, Route } from "react-router-dom";

import React from 'react'
import Login from "../pages/Login";
import Home from "../pages/Home";
import Reclamo from "../pages/Reclamo";
import NuevoReclamo from "../pages/NuevoReclamo";
import Unidad from "../pages/Unidad";
import Admin from "../pages/Admin";
import UnidadEdificio from "../pages/UnidadEdificio";
import AdminReclamo from "../pages/AdminReclamo";

const Routes = () => {
  
  return (
    <BrowserRouter>
        <ReactDomRoutes>
            <Route path= '/' element={<Login />}></Route>
            <Route path= '/home' element={<Home />}></Route>
            <Route path= '/reclamos' element={<Reclamo />}></Route>
            <Route path= '/reclamos/nuevo' element={<NuevoReclamo />}></Route>
            <Route path= '/unidades' element={<Unidad />}></Route>
            <Route path= '/admin/home' element={<Admin />}></Route>
            <Route path= '/admin/unidades/:id' element={<UnidadEdificio />}></Route>
            <Route path= '/admin/unidades' element={<Unidad />}></Route>
            <Route path= '/admin/reclamos' element={<AdminReclamo />}></Route>
        </ReactDomRoutes >
      </BrowserRouter>
  )
}

export default Routes