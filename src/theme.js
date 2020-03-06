import { createMuiTheme } from "@material-ui/core"
import { indigo as primary, pink as secondary } from "@material-ui/core/colors"

export const theme = createMuiTheme({
  palette: {
    primary,
    secondary
  },

  typography: {
    fontFamily: [
      "Noto Sans KR",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue"
    ].join(",")
  }
})
