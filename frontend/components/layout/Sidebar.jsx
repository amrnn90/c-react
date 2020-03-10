import React, { useContext } from "react";
import { css } from "@emotion/core";
import { NavLink } from "react-router-dom";
import { StructureContext } from "../structure/StructureProvider";
import Icon from "../Icon";

const render = ({ routes }) => (
  <nav className="sidebar" css={styles}>
    <ul className="sidebar-items">
      {routes.index.map(route => (
        <li className="sidebar-items__item" key={route.path}>
          <NavLink to={route.path}>
            <span className="icon-wrapper">
              <Icon name="folder" size="24px" className="menu-icon" />
            </span>
            <span>{route.resource.label}</span>
          </NavLink>
        </li>
      ))}
      <li className="sidebar-items__item">
        <NavLink to="/" exact>
          <span className="icon-wrapper">
            <Icon name="file" size="24px" className="menu-icon" />
          </span>
          <span>Folders</span>
        </NavLink>
      </li>
      <li className="sidebar-items__item">
        <NavLink to="/" exact>
          <span className="icon-wrapper">
            <Icon name="trash" size="24px" className="menu-icon" />
          </span>
          <span>Deleted Files</span>
        </NavLink>
      </li>
    </ul>
  </nav>
);

const Sidebar = () => {
  /** STATE */
  const { routes } = useContext(StructureContext);
  console.log(routes);

  /** METHODS */

  /** HANDLERS */

  /** EFFECTS */

  return render({ routes });
};

const styles = css`
  /* .sidebar */
  position: fixed;
  left: 0;
  z-index: 7777;
  width: var(--sidebar-width);
  height: 100vh;
  padding-top: 200px;
  background: white;
  box-shadow: 3px 0 30px rgba(black, 0.05);
  display: flex;
  justify-content: center;

  .sidebar-items {
    max-width: var(--sp-16);
  }

  .sidebar-items__item {
    margin-bottom: var(--sp-9);
    font-weight: var(--fw-regular);
    font-size: var(--fz-xs);
    color: var(--grey-7);
    a {
      display: flex;
      align-items: flex-start;
    }

    .active {
      color: var(--grey-4);
    }

    .icon-wrapper {
      display: flex;
      align-items: center;
      height: 1.5em;
      margin-right: var(--sp-4);
    }
  }
`;

export default Sidebar;
