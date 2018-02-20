import currencyFormatter from 'currency-formatter'

export default function (amount, format) {
  let formatObj
  const formatLength = format.length

  switch (formatLength) {
    case 3:
      formatObj = { code: format }
      break
    case 9:
      formatObj = { locale: format.slice(4, 9) }
      break
    default:
      return amount
  }

  return currencyFormatter.format(amount, formatObj)
}
