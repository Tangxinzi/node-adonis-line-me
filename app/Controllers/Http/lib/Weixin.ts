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

// URL Link
function generateUrllink(data) {
  try {
    return new Promise(async (resolve, reject) => {
      const token = await this.token()
      return await axios({
        url: `https://api.weixin.qq.com/wxa/generate_urllink?access_token=${ token.access_token }`,
        method: 'post',
        data: JSON.stringify({
          "path": data.path,
          "env_version": "trial" // 体验版
        }),
        // headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        // },
        // responseType: 'arraybuffer'
      }).then(response => {
        resolve(response.data)
      }).catch(function (error) {
        console.log(error)
        reject(false)
      })
    });
  } catch (e) {
    console.log(e);
  }
}

// Short Link
function genwxaShortlink(data) {
  try {
    return new Promise(async (resolve, reject) => {
      const token = await this.token()
      return await axios({
        url: `https://api.weixin.qq.com/wxa/genwxashortlink?access_token=${ token.access_token }`,
        method: 'post',
        data: JSON.stringify({
          "page_url": data.path,
          "page_title": "test"
        }),
        // headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        // },
        // responseType: 'arraybuffer'
      }).then(response => {
        resolve(response.data)
      }).catch(function (error) {
        console.log(error)
        reject(false)
      })
    });
  } catch (e) {
    console.log(e);
  }
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

async function msgSecCheck(data) {
  try {
    const tokenData = await token()
    const response = await axios({
      url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${ tokenData.access_token }`,
      method: 'post',
      data: JSON.stringify({
        "content": data.content,
        "version": 2,
        "scene": data.scene,
        "openid": data.openid,
        "title": data.title,
        "nickname": data.nickname,
        "signature": data.signature
      })
    })

    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// https://developers.weixin.qq.com/miniprogram/dev/framework/security.imgSecCheck.html
async function imgSecCheck(data) {
  try {
    const tokenData = await token()
    const response = await axios({
      url: `https://api.weixin.qq.com/wxa/img_sec_check?access_token=${ tokenData.access_token }`,
      method: 'post',
      data: JSON.stringify({
        "media": ''
      })
    })

    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function mediaCheck(data) {
  try {
    const tokenData = await token()
    console.log(tokenData);

    const response = await axios({
      url: `https://api.weixin.qq.com/wxa/media_check_async?access_token=${ tokenData.access_token }`,
      method: 'post',
      data: JSON.stringify({
        "media_url": 'https://t07nvpkj.beesnat.com' + data.content,
        "media_type": data.media_type,
        "version": 2,
        "scene": data.scene,
        "openid": data.openid
      })
    })

    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  jscode2session,
  token,
  generateUrllink,
  genwxaShortlink,
  getWxacode,
  getUserPhoneNumber,
  msgSecCheck,
  mediaCheck
}
