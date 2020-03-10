import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { css, Global } from "@emotion/core";
import FeatherSprite from "../svgs/feather-sprite.svg";
import StructureProvider from "./structure/StructureProvider";
import ResourceIndex from "../screens/ResourceIndex";

const render = () => (
  <>
    {globalStyles()}

    <FeatherSprite style={{ display: "none" }} />

    <StructureProvider>
      {({ routes }) => (
        <Router>
          {renderRoutes(routes)}

          {routes.index.map(route => (
            <Link key={route.path} to={route.path}>
              {route.props.resource.label}
            </Link>
          ))}
        </Router>
      )}
    </StructureProvider>
  </>
);

const renderRoutes = routes => (
  <>
    {routes.index.map(route => (
      <Route
        key={route.path}
        path={route.path}
        component={ResourceIndex}
        {...route.props}
      />
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
        background: #eee;
        line-height: 1.5;
      }

      span {
        vertical-align: middle;
      }
    `}
  />
);

export default App;
