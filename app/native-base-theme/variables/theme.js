import color from 'color'
import { Platform, Dimensions, PixelRatio } from 'react-native'

import palette from './../../palette'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
const platform = Platform.OS
const platformStyle = undefined
const isIphoneX =
  platform === 'ios' && deviceHeight === 812 && deviceWidth === 375

export default Object.assign({}, {
  platformStyle,
  platform,

  // Color
  brandPrimary: palette.primaryColor,
  brandSecondary: palette.secondaryColor,
  brandInfo: palette.info,
  brandSuccess: palette.success,
  brandDanger: palette.danger,
  brandWarning: palette.warning,
  brandDark: palette.primaryTextColor,
  brandLight: palette.canvasColor,

  // Android
  androidRipple: false,
  androidRippleColor: 'rgba(256, 256, 256, 0.3)',
  androidRippleColorDark: 'rgba(0, 0, 0, 0.15)',
  btnUppercaseAndroidText: true,

  // Badge
  badgeBg: palette.primaryTextColor,
  badgeColor: palette.alternateTextColor,
  badgePadding: platform === 'ios' ? 3 : 0,

  // Button
  btnFontFamily: platform === 'ios' ? 'System' : 'Roboto_medium',
  btnDisabledBg: palette.grey,
  buttonPadding: 6,
  get btnPrimaryBg () {
    return this.brandPrimary
  },
  get btnPrimaryColor () {
    return this.inverseTextColor
  },
  get btnInfoBg () {
    return this.brandInfo
  },
  get btnInfoColor () {
    return this.inverseTextColor
  },
  get btnSuccessBg () {
    return this.brandSuccess
  },
  get btnSuccessColor () {
    return this.inverseTextColor
  },
  get btnDangerBg () {
    return this.brandDanger
  },
  get btnDangerColor () {
    return this.inverseTextColor
  },
  get btnWarningBg () {
    return this.brandWarning
  },
  get btnWarningColor () {
    return this.inverseTextColor
  },
  get btnTextSize () {
    return platform === 'ios' ? this.fontSizeBase * 1.1 : this.fontSizeBase - 1
  },
  get btnTextSizeLarge () {
    return this.fontSizeBase * 1.5
  },
  get btnTextSizeSmall () {
    return this.fontSizeBase * 0.8
  },
  get borderRadiusLarge () {
    return this.fontSizeBase * 3.8
  },
  get iconSizeLarge () {
    return this.iconFontSize * 1.5
  },
  get iconSizeSmall () {
    return this.iconFontSize * 0.6
  },

  // Card
  cardDefaultBg: palette.canvasColor,
  cardBorderColor: palette.grey,

  // CheckBox
  CheckboxRadius: platform === 'ios' ? 13 : 0,
  CheckboxBorderWidth: platform === 'ios' ? 1 : 2,
  CheckboxPaddingLeft: platform === 'ios' ? 4 : 2,
  CheckboxPaddingBottom: platform === 'ios' ? 0 : 5,
  CheckboxIconSize: platform === 'ios' ? 21 : 14,
  CheckboxIconMarginTop: platform === 'ios' ? undefined : 1,
  CheckboxFontSize: platform === 'ios' ? 23 / 0.9 : 18,
  DefaultFontSize: 17,
  checkboxBgColor: palette.primaryColor,
  checkboxSize: 20,
  checkboxTickColor: palette.alternateTextColor,

  // Font
  fontFamily: platform === 'ios' ? 'System' : 'Roboto',
  fontSizeBase: 15,
  get fontSizeH1 () {
    return this.fontSizeBase * 1.6
  },
  get fontSizeH2 () {
    return this.fontSizeBase * 1.4
  },
  get fontSizeH3 () {
    return this.fontSizeBase * 1.2
  },

  // Footer
  footerHeight: isIphoneX ? 89 : 55,
  get footerDefaultBg () { return platform === 'ios' ? palette.canvasColor : palette.primaryColor },
  footerPaddingBottom: isIphoneX ? 34 : 0,

  // FooterTab
  tabBarTextColor: palette.primaryColor,
  tabBarTextSize: platform === 'ios' ? 14 : 11,
  activeTab: palette.canvasColor,
  sTabBarActiveTextColor: palette.primaryColor,
  tabBarActiveTextColor: palette.primaryColor,
  get tabActiveBgColor () { return color(palette.canvasColor /* this.tabBgColor */).darken(0.05).hex() }, // not sure if this works

  // Header
  get toolbarBtnColor () { return platform === 'ios' ? palette.primaryColor : palette.alternateTextColor },
  get toolbarDefaultBg () { return platform === 'ios' ? palette.canvasColor : palette.primaryColor },
  toolbarHeight: platform === 'ios' ? (isIphoneX ? 88 : 64) : 56,
  toolbarSearchIconSize: platform === 'ios' ? 20 : 23,
  get toolbarInputColor () { return platform === 'ios' ? palette.primaryTextColor : palette.alternateTextColor },
  searchBarHeight: platform === 'ios' ? 30 : 40,
  searchBarInputHeight: platform === 'ios' ? 30 : 50,
  toolbarBtnTextColor: palette.alternateTextColor,
  toolbarDefaultBorder: palette.secondaryColor,
  iosStatusbar: platform === 'ios' ? 'dark-content' : 'light-content',
  get statusBarColor () {
    return color(this.toolbarDefaultBg)
      .darken(0.1)
      .hex()
  },
  get darkenHeader () {
    return color(this.tabBgColor)
      .darken(0.03)
      .hex()
  },

  // Content
  contentBgColor: palette.canvasColor,

  // Icon
  iconFamily: 'SimpleLineIcons',
  iconFontSize: platform === 'ios' ? 30 : 28,
  iconHeaderSize: platform === 'ios' ? 33 : 24,

  // InputGroup
  inputFontSize: 17,
  inputBorderColor: palette.secondaryColor,
  inputSuccessBorderColor: palette.success,
  inputErrorBorderColor: palette.danger,
  inputHeightBase: 50,
  get inputColor () {
    return this.textColor
  },
  get inputColorPlaceholder () {
    return palette.secondaryColor
  },

  // Line Height
  btnLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 22,
  lineHeight: platform === 'ios' ? 20 : 24,

  // List
  listBg: 'transparent',
  listBorderColor: 'transparent',
  listDividerBg: palette.secondaryColor,
  listBtnUnderlayColor: 'transparent',
  listItemPadding: platform === 'ios' ? 10 : 12,
  listNoteColor: palette.secondaryColor,
  listNoteSize: 13,

  // Progress Bar
  defaultProgressColor: palette.primaryColor,
  inverseProgressColor: palette.secondaryColor,

  // Radio Button
  radioBtnSize: platform === 'ios' ? 25 : 23,
  radioSelectedColorAndroid: palette.primaryColor,
  radioBtnLineHeight: platform === 'ios' ? 29 : 24,
  radioColor: this.brandPrimary,

  // Segment
  get segmentBackgroundColor () { return platform === 'ios' ? palette.canvasColor : palette.primaryColor },
  get segmentActiveBackgroundColor () { return platform === 'ios' ? palette.canvasColor : palette.canvasColor },
  get segmentTextColor () { return platform === 'ios' ? palette.canvasColor : palette.alternateTextColor },
  get segmentActiveTextColor () { return platform === 'ios' ? palette.alternateTextColor : palette.primaryColor },
  get segmentBorderColor () { return platform === 'ios' ? palette.canvasColor : palette.canvasColor },
  get segmentBorderColorMain () { return platform === 'ios' ? '#a7a6ab' : palette.primaryColor },

  // Spinner
  defaultSpinnerColor: palette.primaryColor,
  inverseSpinnerColor: palette.secondaryColor,

  // Separator
  separatorBgColor: 'transparent',
  separatorColor: palette.secondaryColor,

  // Tab
  get tabDefaultBg () { return platform === 'ios' ? palette.canvasColor : palette.primaryColor },
  topTabBarTextColor: palette.grey,
  get topTabBarActiveTextColor () { return platform === 'ios' ? palette.primaryColor : palette.alternateTextColor },
  get topTabBarBorderColor () { return platform === 'ios' ? palette.canvasColor : palette.primaryColor },
  get topTabBarActiveBorderColor () { return platform === 'ios' ? palette.primaryColor : palette.alternateTextColor },

  // Tabs
  tabBgColor: palette.canvasColor,
  tabFontSize: 15,

  // Text
  textColor: palette.primaryTextColor,
  inverseTextColor: palette.alternateTextColor,
  noteFontSize: 14,
  get defaultTextColor () {
    return this.textColor
  },

  // Title
  titleFontfamily: platform === 'ios' ? 'System' : 'Roboto_medium',
  titleFontSize: platform === 'ios' ? 17 : 19,
  subTitleFontSize: platform === 'ios' ? 12 : 14,
  get subtitleColor () { return platform === 'ios' ? palette.secondaryTextColor : palette.alternateTextColor },
  get titleFontColor () { return platform === 'ios' ? palette.primaryTextColor : palette.alternateTextColor },

  // Other
  borderRadiusBase: platform === 'ios' ? 5 : 2,
  borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
  contentPadding: 15,
  dropdownLinkColor: '#414142',
  inputLineHeight: 24,
  deviceWidth,
  deviceHeight,
  isIphoneX,
  inputGroupRoundedBorderRadius: 30,
})
