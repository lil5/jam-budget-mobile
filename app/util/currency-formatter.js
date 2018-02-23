import currencyFormatter from 'currency-formatter'

export default class CurrencyFormatter {
  constructor (defaultFormat, format = '') {
    const thisFormat = format === '' ? defaultFormat : format
    const formatLength = thisFormat.length

    this.formatObj = formatLength === 3
      ? { code: thisFormat }
      : formatLength > 3
        ? { locale: thisFormat.slice(4) }
        : {}
  }

  format (amount) {
    return currencyFormatter.format(amount, this.formatObj)
  }
}
