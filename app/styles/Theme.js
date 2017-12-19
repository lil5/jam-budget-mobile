import { COLOR } from 'react-native-material-ui'

// https://github.com/xotahal/react-native-material-ui/blob/master/src/styles/colors.js
// https://material.io/guidelines/style/color.html#color-color-palette
//

const lightPalette = {
  primaryColor: COLOR.lightBlue300,
  secondaryColor: COLOR.blueGrey100,
  accentColor: COLOR.blueGrey800,
  canvasColor: 'white',
  alternateTextColor: 'white',
}

export default {
  palette: lightPalette,
  actionButton: {
    container: {
      backgroundColor: lightPalette.primaryColor,
    },
  },
  // drawerSectionActiveItem: {
  //   container: { backgroundColor: COLOR.blueGrey50 },
  // },
  // drawerSection: { container: { paddingVertical: 0 } },
  // see TODO.md
}
