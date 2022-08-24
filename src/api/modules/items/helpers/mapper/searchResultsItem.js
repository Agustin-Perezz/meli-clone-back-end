const transformDate = require("../transformDate");
const formatPrice = require('../formatPrice');

module.exports = searchResultsItem = async( seller_data, questions_data, description_data, reviews_data, data_item ) => {

  const { plain_text } = await description_data.json(); 
  const { seller_reputation, nickname } = await seller_data.json();
  const { reviews: reviews_resp, rating_average, rating_levels:rating } = await reviews_data.json();
  const { questions: data_questions } = await questions_data.json();
 
  let attributes = [];
  let groupAttributes = [];
  let maxSizeGroupAttributes = 4;
  data_item.attributes.forEach(( at, index ) => { 
    groupAttributes.push({ 
      name: at.name,
      value: at.value_name,
    });
    if ( index === maxSizeGroupAttributes ) { 
      maxSizeGroupAttributes+=4;
      attributes.push( groupAttributes );
      groupAttributes = [];
    }
  }) 
  const previewAttribute = attributes[0];
  attributes.shift();

  const all_reviews = reviews_resp.map( review => {
    const date = transformDate( review.date_created );
    return {
      title: review.title,
      content: review.content,
      date_created: date, 
      rate: review.rate,
      likes: review.likes,
      dislikes: review.dislikes,
      porcentage: review.rate,
    };
  });
  const list = Object.values( rating );
  list.reverse();
  const total_reviews = list.reduce((a,b) => a+b, 0);
  const rating_levels = list.map(( value => {
    return { 
      value,
      porcentage_width: (( value * 100 ) / total_reviews).toFixed(2),
    }
  }));
  
  const positive_reviews = all_reviews.filter( review => review.porcentage >= 3 );
  const negative_reviews = all_reviews.filter( review => review.porcentage < 3 );
  const rating_average_fixed = rating_average.toFixed(1);

  let questions = [];
  if ( data_questions ) { 
    questions = data_questions.map( q => {  
      return {
        question: q.text, 
        answer: q.status === 'ANSWERED' ? q.answer.text : 'false', 
      };
    });
  }
  const previewQuestion = questions[0];
  questions.shift();

  let pictures = [];
  data_item.pictures.forEach((img, index) => {
    if ( index >= 8 ) { return; }
    pictures.push( img.url )
  });
  
  const description = plain_text.split('.').map( paragraph => paragraph += '.' );
  description.pop();
  
  const transactions_total = formatPrice( seller_reputation.transactions.total ).toString().substring(1);

  const location = {
    city: data_item.seller_address.city.name,
    province: data_item.seller_address.state.name,
  };
  
  const images = {
    mercado_credit_url: 'https://http2.mlstatic.com/storage/logos-api-admin/51b446b0-571c-11e8-9a2d-4b2bd7b1bf77-m.svg',
    credit: [
      'https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg',
      'https://http2.mlstatic.com/storage/logos-api-admin/b2c93a40-f3be-11eb-9984-b7076edb0bb7-m.svg',
      'https://http2.mlstatic.com/storage/logos-api-admin/992bc350-f3be-11eb-826e-6db365b9e0dd-m.svg',
      'https://http2.mlstatic.com/storage/logos-api-admin/aa2b8f70-5c85-11ec-ae75-df2bef173be2-m.svg'
    ],
    debit: [ 
      'https://http2.mlstatic.com/storage/logos-api-admin/312238e0-571b-11e8-823a-758d95db88db-m.svg',
      'https://http2.mlstatic.com/storage/logos-api-admin/ce454480-445f-11eb-bf78-3b1ee7bf744c-m.svg',
      'https://http2.mlstatic.com/storage/logos-api-admin/157dce60-571b-11e8-95d8-631c1a9a92a9-m.svg',
      'https://http2.mlstatic.com/storage/logos-api-admin/cb0af1c0-f3be-11eb-8e0d-6f4af49bf82e-m.svg',
    ],
    efectivo: [
      'https://http2.mlstatic.com/storage/logos-api-admin/fec5f230-06ee-11ea-8e1e-273366cc763d-m.svg',
      'https://http2.mlstatic.com/storage/logos-api-admin/443c34d0-571b-11e8-823a-758d95db88db-m.svg',
    ]
  };

  return {
    basic_info: { 
      title: data_item.title,
      condition: data_item.condition === 'new' ? 'Nuevo' : 'Reacondicionado',
      price: formatPrice(data_item.price),
      installaments: formatPrice(data_item.price / 12),
      sold_quantity: data_item.sold_quantity,
      total_reviews: all_reviews.length,
      rating_average,
      free_shipping: data_item.shipping.free_shipping,
    },
    pictures,
    seller: {
      nickname,
      location,
      reputation: seller_reputation.power_seller_status,
      transactions: seller_reputation.transactions,
      transactions_total
    },
    list_attributes: { 
      previewAttribute,
      attributes,
      images,
    },
    description,
    list_questions: {
      previewQuestion,
      questions,
    },
    reviews: {
      rating_average_fixed,
      total_reviews,
      rating_levels,
      list_reviews: {
        all_reviews,
        positive_reviews,
        negative_reviews
      },
    },
  }
  }