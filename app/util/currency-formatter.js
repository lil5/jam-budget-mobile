import currencyFormatter from 'currency-formatter'

export default function (amount, format) {
  let formatObj
  const formatLength = format.length

  if (formatLength === 3) {
    formatObj = { code: format }
  } else if (formatLength > 3) {
    formatObj = { locale: format.slice(4) }
  } else {
    return amount
  }

  return currencyFormatter.format(amount, formatObj)
}
