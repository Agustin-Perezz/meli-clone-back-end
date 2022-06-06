
module.exports = transformDate = ( data ) => {
  const date = new Date( data ).toDateString().split(' ');
  return`${ date[2] } ${ date[1] } ${ date[3] }`; 
}