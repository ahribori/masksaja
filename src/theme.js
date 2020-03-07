import { createMuiTheme } from "@material-ui/core"
import { indigo as primary, deepPurple as secondary } from "@material-ui/core/colors"

export const theme = createMuiTheme({
  palette: {
    primary,
    secondary
  },
  typography: {
    fontFamily: [
      "Noto Sans KR",
    ].join(",")
  }
})
