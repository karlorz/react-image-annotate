// Migrated from react-material-workspace-layout
// Modernized for React 19 compatibility

import React from "react"
import HeaderButton from "./HeaderButton"
import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme()

const Container = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  backgroundColor: "#fff",
  borderBottom: "1px solid #ccc",
  alignItems: "center",
  flexShrink: 1,
  boxSizing: "border-box",
}))

export const Header = ({
  leftSideContent = null,
  hideHeaderText = false,
  items,
  onClickItem,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box flexGrow={1}>{leftSideContent}</Box>
        {items.map((item) => (
          <HeaderButton
            key={item.name}
            hideText={hideHeaderText}
            onClick={() => onClickItem(item)}
            {...item}
          />
        ))}
      </Container>
    </ThemeProvider>
  )
}

export default Header
