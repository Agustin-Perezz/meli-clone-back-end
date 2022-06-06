
module.exports = searchResultsItems = async( resp_items ) => {

  const { results, available_sorts, available_filters, filters: filter, query, paging } = await resp_items.json();

  const result_products = results.map( product => {

    let offert;
    if ( product.prices.prices[1] ) {
      offert = { 
        amount: product.prices.prices[1].amount,
        regular_amount: product.prices.prices[1].regular_amount,
      }
    } else { offert = false };

    return {
      id: product.id,
      title: product.title,
      picture: product.thumbnail,
      price: product.price,
      free_shipping: product.shipping.free_shipping,
      full: product.shipping.logistic_type === 'fulfillment' ? 'true' : 'false',
      condition: product.condition,
      installments: product.installments !== null && product.installments.rate === 0 ? product.installments.quantity : false,  
      offert
    }
  });
  
  const answer = filter.find(({ id }) => id === 'category')
  let categories = [];
  if ( answer ) {
    categories = answer.values[0].path_from_root.map(({ name }) => name) 
  };

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