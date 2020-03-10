import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { css, Global } from "@emotion/core";
import FeatherSprite from "../svgs/feather-sprite.svg";
import StructureProvider from "./structure/StructureProvider";
import ResourceIndex from "../screens/ResourceIndex";
import AppLayout from "./layout/AppLayout";

const render = () => (
  <>
    {globalStyles()}

    <FeatherSprite style={{ display: "none" }} />

    <StructureProvider>
      {({ routes }) => (
        <Router>
          <AppLayout>{renderRoutes(routes)}</AppLayout>
        </Router>
      )}
    </StructureProvider>
  </>
);

const renderRoutes = routes => (
  <>
    {routes.index.map(route => (
      <Route key={route.path} path={route.path}>
        <ResourceIndex resource={route.resource} />
      </Route>
    ))}
  </>
);

const App = () => {
  /** STATE */

  /** METHODS */

  /** HANDLERS */

  /** EFFECTS */

  return render();
};

const globalStyles = () => (
  <Global
    styles={css`
      body {
      }

      span {
        vertical-align: middle;
      }
    `}
  />
);

export default App;
