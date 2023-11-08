const Env = require('@ioc:Adonis/Core/Env');
const axios = require('axios');

function jscode2session(code) {
  return new Promise((resolve, reject) => {
    return axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${'wx8f18e8f9cc9c49f2' }&secret=${ 'd27c32f434eb5685cc10dd381976bf93' }&js_code=${ code }&grant_type=authorization_code`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  });
}

function getuserphonenumber(access_token, code, openid) {
  return new Promise((resolve, reject) => {
    return axios.get(`https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${ access_token }`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  });
}

module.exports = {
  jscode2session,
  getuserphonenumber
}
