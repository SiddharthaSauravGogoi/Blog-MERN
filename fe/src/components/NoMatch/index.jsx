import React from "react";
import { useLocation } from "react-router-dom";

export default function NoMatch() {
  const location = useLocation();
  return <>No page found at {location.pathname}</>;
}
