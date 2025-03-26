import { NavLink } from "react-router";

const Nav = () => (
    <nav>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/conway">Conway</NavLink>
            </li>
            <li>
                <NavLink to="/pokemons">Pokemons</NavLink>
            </li>
            <li>
                <NavLink to="/about">About</NavLink>
            </li>
        </ul>
    </nav>
);

export default Nav;