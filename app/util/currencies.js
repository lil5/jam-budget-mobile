import currencies from 'currency-formatter/currencies.json'
import locales from 'currency-formatter/localeFormats.json'

const arr = Object.keys(currencies)

Object.keys(locales).forEach(el => {
  arr.push('EUR ' + el)
})

export default arr.sort()
