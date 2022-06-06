require('dotenv').config();
const BASE_URL = process.env.BASE_URL;

module.exports = builderUrl = ( product, sort, filters ) => {
  const custom_url = new URL( `${ BASE_URL }/sites/MLA/search?`);
  custom_url.searchParams.append( 'q', product );
  if ( sort ) { custom_url.searchParams.append( 'sort', sort ); }
  if ( filters ) {
    for (const filter of filters) { custom_url.searchParams.append( filter.key, filter.id_filter ); }
  }
  return custom_url.href;
}