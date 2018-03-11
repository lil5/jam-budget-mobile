import currencies from 'currency-formatter/currencies.json'
// import locales from 'currency-formatter/localeFormats.json'

const locales = ['de', 'ie', 'es', 'it', 'nl']
const arr = Object.keys(currencies)

locales.forEach(j => {
  arr.push('EUR ' + j)
})

export default arr.sort()
