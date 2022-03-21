import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./customLink.scss";

function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <>
      <Link to={to} className={match ? "link active" : "link"} {...props}>
        {children}
      </Link>
    </>
  );
}

export default CustomLink;
