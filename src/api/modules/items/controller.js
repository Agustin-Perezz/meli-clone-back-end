const fetch = require('node-fetch');
const builderUrl = require('./helpers/builderUrl');
const searchResultsItem = require('./helpers/mapper/searchResultsItem');
const searchResultsItems = require('./helpers/mapper/searchResultsItems');

require('dotenv').config();
const BASE_URL = process.env.BASE_URL;

const getItems = async( req, res ) => {

  try {
    const { sort, filters, product } = req.body;
    const url = builderUrl( product, sort, filters );
    console.log( url )
    const resp_items = await fetch( url );

    const filtered_data = await searchResultsItems( resp_items );
    
    res.status(200).send( filtered_data );
    
  } catch (error) {
    console.log( error );  
  }
}

const getItem = async( req, res ) => {
  
  try {
    const { item_id } = req.params;

    const resp_item = await fetch(`${ BASE_URL }/items/${ item_id }`);
    const data_item = await resp_item.json();
    
    const [ seller_data, questions_data, description_data, reviews_data ] = await Promise.all([
      fetch(`${ BASE_URL }/users/${ data_item.seller_id }`),
      fetch(`${ BASE_URL }/questions/search?item_id=${ item_id }`),
      fetch(`${ BASE_URL }/items/${ item_id }/description`),
      fetch(`${ BASE_URL }/reviews/item/${ item_id }`),
    ]);

    const filtered_data = await searchResultsItem( seller_data, questions_data, description_data, reviews_data, data_item );

    res.status(200).send( filtered_data ); 

  } catch (error) {
    console.log( error ); 
  }
}

module.exports = { getItem, getItems };
