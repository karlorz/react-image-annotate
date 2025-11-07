// Migrated from react-material-workspace-layout
// Modernized for React 19 compatibility

import React from "react"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useIconDictionary } from "./icon-dictionary"
import { iconMapping } from "./icon-mapping"
import { colors } from "@mui/material"

const theme = createTheme()
const defaultNameIconMapping = iconMapping

const getIcon = (name, customIconMapping) => {
  const Icon =
    customIconMapping[name?.toLowerCase()] ||
    defaultNameIconMapping[name?.toLowerCase()] ||
    defaultNameIconMapping.help
  return <Icon />
}

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  width: 60,
  paddingTop: 8,
  paddingBottom: 4,
  marginLeft: 1,
  marginRight: 1,
}))

const ButtonInnerContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}))

const IconContainer = styled("div")(({ theme }) => ({
  color: colors.grey[700],
  "& .MuiSvgIcon-root": {
    width: 18,
    height: 18,
  },
}))

const Text = styled("div")(({ theme }) => ({
  fontWeight: "bold",
  fontSize: 11,
  color: colors.grey[800],
  display: "flex",
  alignItems: "center",
  lineHeight: 1,
  justifyContent: "center",
}))

export const HeaderButton = ({
  name,
  icon,
  disabled,
  onClick,
  hideText = false,
}) => {
  const customIconMapping = useIconDictionary()

  return (
    <ThemeProvider theme={theme}>
      <StyledButton onClick={onClick} disabled={disabled}>
        <ButtonInnerContent>
          <IconContainer
            style={
              hideText
                ? { height: 32, paddingTop: 8 }
                : { height: 20, paddingTop: 0 }
            }
          >
            {icon || getIcon(name, customIconMapping)}
          </IconContainer>
          {!hideText && (
            <Text>
              <div>{name}</div>
            </Text>
          )}
        </ButtonInnerContent>
      </StyledButton>
    </ThemeProvider>
  )
}

export default HeaderButton
