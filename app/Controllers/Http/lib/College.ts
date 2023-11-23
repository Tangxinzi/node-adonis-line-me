const axios = require('axios');

exports.data = function (i, j) {
  return new Promise((resolve, reject) => {
    axios.get(`http://0.0.0.0:3333/data/college.json`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error);
      });
  });
}
