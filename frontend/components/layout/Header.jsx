import React, { useEffect, useState, useContext } from "react";
import { css } from "@emotion/core";
import Dropdown from "../popups/Dropdown";
import { StructureContext } from "../structure/StructureProvider";

const render = () => (
  <header className="header" css={styles}>
    {/* tippy */}
    <Dropdown content={renderProfileDropdown()}>
      <button className="profile-image">
        <img aria-haspopup="true" src="https://i.pravatar.cc/40?u=amr" />
      </button>
    </Dropdown>
  </header>
);

const renderProfileDropdown = () => {
  return <LogoutButton />;
};

const LogoutButton = () => {
  const [csrfToken, setCsrfToken] = useState("");
  const { apiUrls } = useContext(StructureContext);
  const logoutUrl = apiUrls && apiUrls.logout;

  useEffect(() => {
    const token = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");
    setCsrfToken(token);
  }, []);

  return (
    <form action={logoutUrl} method="POST">
      <input type="hidden" name="_token" value={csrfToken} />
      <button type="submit">Logout</button>
    </form>
  );
};

const Header = () => {
  /** STATE */

  /** METHODS */

  /** HANDLERS */

  /** EFFECTS */

  return render();
};

const styles = css`
  /* .header */
  position: fixed;
  top: 0;
  background: white;
  width: 100%;
  height: var(--header-height);
  display: flex;
  align-items: center;
  z-index: 1000;
  padding-left: calc(var(--sidebar-width) + var(--main-horizontal-padding));
  padding-right: var(--main-horizontal-padding);

  .profile-image {
    margin-left: auto;
    border-radius: 50%;
    flex-shrink: 0;
    width: var(--sp-9);
    height: var(--sp-9);
    border: 1px solid var(--grey-9);
    cursor: pointer;
  }
`;
export default Header;
