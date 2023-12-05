import Application from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env';
import axios from 'axios';
import fs from "fs";

function jscode2session(code) {
  return new Promise((resolve, reject) => {
    return axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${ Env.get('AppID') }&secret=${ Env.get('AppSecret') }&js_code=${ code }&grant_type=authorization_code`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  });
}

function token() {
  return new Promise((resolve, reject) => {
    return axios.get(`https://api.weixin.qq.com/cgi-bin/token?appid=${ Env.get('AppID') }&secret=${ Env.get('AppSecret') }&grant_type=client_credential`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  });
}

function getUserPhoneNumber(access_token, data) {
  return new Promise((resolve, reject) => {
    return axios.post(`https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${ access_token }`, {
      code: data.code,
      openid: data.openid
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  });
}

// 小程序码
function getWxacode(data) {
  try {
    return new Promise(async (resolve, reject) => {
      const token = await this.token()
      return await axios({
        url: `https://api.weixin.qq.com/wxa/getwxacode?access_token=${ token.access_token }`,
        method: 'post',
        data: JSON.stringify({
          "width": "300",
          "path": data.path,
          "is_hyaline": false,
          "env_version": "trial" // 体验版
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        responseType: 'arraybuffer'
      }).then(response => {
        const path = `/uploads/wxacode/${ data.filename }.png`
        fs.writeFileSync(Application.publicPath(path), response.data, (err) => {
          if (err) {
            resolve(false)
          }

          fs.readFile(path, (data, err) => {
            if (err) {
              resolve(false)
            }

            resolve(path)
            // resolve(`/uploads/wxacode/${ data.name }.png`)
          })
        })
      }).catch(function (error) {
        console.log(error)
        reject(false)
      })
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  jscode2session,
  token,
  getWxacode,
  getUserPhoneNumber
}
