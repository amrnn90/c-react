import React from "react";
import { css } from "@emotion/core";
import Header from "./Header";
import Sidebar from "./Sidebar";

const render = ({ children }) => (
  <div css={styles}>
    <Header />
    <Sidebar />
    <main className="main">{children}</main>

    {/* <portal-target name="page-backdrop"  />
    <flash-messages /> */}
  </div>
);

const AppLayout = ({ children }) => {
  /** STATE */

  /** METHODS */

  /** HANDLERS */

  /** EFFECTS */

  return render({ children });
};

const styles = css`
  .main {
    padding-top: calc(var(--header-height) + var(--main-top-padding));
    padding-left: calc(var(--sidebar-width) + var(--main-horizontal-padding));
    padding-right: var(--main-horizontal-padding);
  }
`;

export default AppLayout;
