
module.exports = formatPrice = ( price, currency_id, format_id ) => new Intl.NumberFormat( format_id, {
  style: "currency",
  currency: currency_id,
  maximumFractionDigits: 0,
}).format( price ).replace(',', '.');
