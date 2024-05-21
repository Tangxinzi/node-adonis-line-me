const axios = require('axios');

exports.data = function (i, j) {    
  return new Promise((resolve, reject) => {
      axios.get(`http://0.0.0.0:3333/data/industry.json`)
      .then(response => {        
        if (response.data.zpData[i]['subLevelModelList'][j]) {
          resolve(response.data.zpData[i]['subLevelModelList'][j]['name'])          
        } else {
          resolve('')
        }
      })
      .catch(error => {
        console.log(error);        
        reject('');
      });
  });
}
