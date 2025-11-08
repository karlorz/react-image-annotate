import React from "react"
import PropTypes from "prop-types"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

const FONT_STACK = [
  '"PingFang TC"',
  '"PingFang SC"',
  '-apple-system',
  '"system-ui"',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(", ")

const theme = createTheme({
  typography: {
    fontFamily: FONT_STACK,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: FONT_STACK,
        },
      },
    },
  },
})

export const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>{children}</div>
    </ThemeProvider>
  )
}

Theme.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Theme
