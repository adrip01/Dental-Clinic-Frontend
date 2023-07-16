import React from "react";
import styles from "./Header.module.scss";

import ResponsiveAppBar from "./ResponsiveAppBar/ResponsiveAppBar";

export default function Header() {
  return (
    <div>
      <ResponsiveAppBar />
    </div>
  );
}
