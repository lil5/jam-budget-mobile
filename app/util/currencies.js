import currencies from 'currency-formatter/currencies.json'
// import locales from 'currency-formatter/localeFormats.json'

const locales = ['de', 'ie', 'es', 'it', 'nl']
const arr = Object.keys(currencies)

locales.forEach(el => {
  arr.push('EUR ' + el)
})

export default arr.sort()
