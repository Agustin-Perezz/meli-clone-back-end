const transformDate = require("../transformDate");

module.exports = searchResultsItem = async( seller_data, questions_data, description_data, reviews_data, data_item ) => {

  const { plain_text: description } = await description_data.json(); 
  const { seller_reputation, nickname } = await seller_data.json();
  const { reviews: reviews_resp, rating_average, rating_levels } = await reviews_data.json();
  const { questions: data_questions } = await questions_data.json();
 
  const attributes = data_item.attributes.map( at => {
    return {  
      name: at.name,
      value: at.value_name,
    };
  });

  const group_reviews = reviews_resp.map( review => {
    const date = transformDate( review.date_created );
    return {
      title: review.title,
      content: review.content,
      date_created: date, 
      rate: review.rate,
      likes: review.likes,
      dislikes: review.dislikes,
      type: review.rate >= 3 ? 'postive' : 'negative',
    };
  });

  const questions = data_questions.map( q => {  
    return {
      question: q.text, 
      answer: q.status === 'ANSWERED' ? q.answer.text : 'no_answered', 
    };
  });

  const pictures = data_item.pictures.map( img => img.url );
  
  return {
    basic_info: { 
      title: data_item.title,
      condition: data_item.condition,
      price: data_item.price,
      pictures,
    },
    seller: {
      nickname,
      reputation: seller_reputation.power_seller_status,
      transactions: seller_reputation.transactions
    },
    attributes,
    description,
    questions,
    reviews: {
      rating_average,
      total_reviews: group_reviews.length,
      rating_levels,
      group_reviews,
    },
  }
}