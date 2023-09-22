const Env = require('@ioc:Adonis/Core/Env');
const axios = require('axios');

function jscode2session(code) {
  return new Promise((resolve, reject) => {
    return axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${ Env.get('AppId') }&secret=${ Env.get('AppSecret') }&js_code=${ code }&grant_type=authorization_code`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  });
}

module.exports = {
  jscode2session
}
