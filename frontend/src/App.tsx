import React from "react";

import { CssBaseline } from "@mui/material";
import { StyledAppWrap } from "./styled";
import { Currency } from "./pages";

function App() {
  return (
    <StyledAppWrap>
      <CssBaseline />
      <Currency />
    </StyledAppWrap>
  );
}

export default App;
