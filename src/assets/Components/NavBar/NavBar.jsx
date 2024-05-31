import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import "./NavBar.css"

export default function NavBar( { totalPrice } ) {
  return (
    <Navbar className="bg-slate-900	text-gray-300">
      <NavbarBrand>
        <p className="font-bold text-inherit">Chacao Pizza 🍕</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink to="/">
            Inicio
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to="/carrito">
            Carrito
          </NavLink>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
