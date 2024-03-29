const formatPrice = require('../formatPrice');

module.exports = searchResultsItems = async( resp_items ) => {

  const { results, available_filters, filters: filter, query, paging } = await resp_items.json();


  const result_products = results.map( product => {

    let offert;
    const format_id = product.currency_id === 'ARS' ? 'es-AR' : 'en-US';
    if ( product.prices.prices[1] && product.prices.prices[1].type === 'promotion' ) {
      let discount = product.prices.prices[1];

      offert = { 
        amount: formatPrice(discount.amount, product.currency_id, format_id),
        regular_amount: formatPrice(discount.regular_amount, product.currency_id, format_id),
        offer_percentaje: Math.round(Math.abs(((discount.amount / discount.regular_amount) * 100 ) - 100 )),
      }
    } else { offert = false };

    const picture = `https://http2.mlstatic.com/D_NQ_NP_${ product.thumbnail_id }-O.webp`;

    let price = formatPrice( product.price, product.currency_id, format_id );
    if ( format_id === 'en-US' ) { price = price.slice(1); }
    
    return {
      id: product.id,
      title: product.title,
      price,
      picture,
      free_shipping: product.shipping.free_shipping,
      full: product.shipping.logistic_type === 'fulfillment',
      condition: product.condition,
      installments: product.installments !== null && product.installments.rate === 0 ? product.installments.quantity : false,  
      offert,
      country_id: product.currency_id
    }
  });
  
  const answer = filter.find(({ id }) => id === 'category')
  let categories = [];
  if ( answer ) {
    categories = answer.values[0].path_from_root.map(({ name }) => name) 
  };

  const available_sorts = [
    { "id": "relevance", "name": "Más relevantes" },
    { "id": "price_asc", "name": "Menor precio" },
    { "id": "price_desc", "name": "Mayor precio" }
  ];
  
  return {
    basic_info: {
      query,
      total: paging.total,
    },
    result_products,
    categories,
    available_filters,
    available_sorts,
  };
  
}