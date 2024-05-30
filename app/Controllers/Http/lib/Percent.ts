import Database from '@ioc:Adonis/Lucid/Database';

// 分值，介绍人、被介绍人、普通用户
const score = {
  // 职业数据
  company: [10, 10, 10],
  work: [5, 3, 3],
  job_title: [10, 5, 5],
  salary: [5, 5, 5],
  school: [10, 10, 10],
  education: [5, 5, 5],

  // 个人数据
  nickname: [3, 3, 3],
  avatar_url: [5, 0, 5],
  birthday: [5, 5, 5],
  height: [3, 3, 3],
  weight: [3, 3, 3],
  sex: [3, 3, 3],
  mbti: [3, 3, 3],
  photos: [3, 5, 5],
  introduction: [5, 5, 5],
  detail: [5, 5, 5],
  expectation: [0, 5, 5],
  contact_wechat: [3, 3, 3],
  location: [3, 3, 3],
  phone: [3, 3, 3],

  // 其它
  relation_text: [0, 5, 0]
}

// 用户资料打分
function percentUserinfo(user_id) {
  return new Promise(async (resolve, reject) => {
    let percent = 0, value = '', text = ''
    const user = await Database.from('users').select('*').where({ user_id }).first() || {}
    
    // 普通用户
    if (user.type == 1) {
      if (user.company) percent += score.company[2]
      if (user.work.length > 5) percent += score.work[2]
      if (user.job_title) percent += score.job_title[2]
      if (user.salary) percent += score.salary[2]
      if (user.school) percent += score.school[2]
      if (user.education >= 0) percent += score.education[2]
      
      if (user.nickname) percent += score.nickname[2]
      if (user.avatar_url) percent += score.avatar_url[2]
      if (user.birthday) percent += score.birthday[2]
      if (user.height) percent += score.height[2]
      if (user.weight) percent += score.weight[2]
      if (user.sex >= 0) percent += score.sex[2]
      if (user.photos.length > 12) {
        user.photos = JSON.parse(user.photos)
        percent += user.photos.length * score.photos[2]
      }
      if (user.detail) percent += score.detail[2]
      if (user.expectation) percent += score.expectation[2]
      if (user.contact_wechat) percent += score.contact_wechat[2]
      if (user.location) percent += score.location[2]
      if (user.phone) percent += score.phone[2]
    }

    // 介绍人
    if (user.type == 2) {
      if (user.company) percent += score.company[0]
      if (user.work.length > 5) percent += score.work[0]
      if (user.job_title) percent += score.job_title[0]
      if (user.salary) percent += score.salary[0]
      if (user.school) percent += score.school[0]
      if (user.education >= 0) percent += score.education[0]

      if (user.nickname) percent += score.nickname[0]
      if (user.avatar_url) percent += score.avatar_url[0]
      if (user.birthday) percent += score.birthday[0]
      if (user.height) percent += score.height[0]
      if (user.weight) percent += score.weight[0]
      if (user.sex >= 0) percent += score.sex[0]
      if (user.photos.length > 12) {
        user.photos = JSON.parse(user.photos)
        percent += user.photos.length * score.photos[2]
      }
      if (user.detail) percent += score.detail[0]
      if (user.expectation) percent += score.expectation[0]
      if (user.contact_wechat) percent += score.contact_wechat[0]
      if (user.location) percent += score.location[0]
      if (user.phone) percent += score.phone[0]
    }

    if (percent >= 100) {
      value = '100%'
      percent = 100
      text = ''
    } else if (percent >= 80) {
      value = percent + '%'
      text = ''
    } else if (percent >= 65) {
      value = percent + '%'
      text = ''
    } else {
      value = percent + '%'
      text = '完善资料进度低'
    }

    resolve({ number: percent, value, text })
  });
}

// 被介绍资料打分
function percentCustomerinfo(id) {
  return new Promise(async (resolve, reject) => {
    let percent = 0, value = '', text = ''
    const log = await Database.from('customer_log').select('*').where({ id }).first() || {}
    const customer = await Database.from('customer').select('*').where({ relation_user_id: id }).first() || {}

    if (log.company) percent += score.company[0]
    if (log.work.length > 5) percent += score.work[0]
    if (log.job_title) percent += score.job_title[0]
    if (log.salary) percent += score.salary[0]
    if (log.school) percent += score.school[0]
    if (log.education >= 0) percent += score.education[0]

    if (log.nickname) percent += score.nickname[0]
    if (log.avatar_url) percent += score.avatar_url[0]
    if (log.birthday) percent += score.birthday[0]
    if (log.height) percent += score.height[0]
    if (log.weight) percent += score.weight[0]
    if (log.sex >= 0) percent += score.sex[0]
    if (log.photos.length > 12) {
      log.photos = JSON.parse(log.photos)
      percent += log.photos.length * score.photos[2]
    }
    if (log.expectation) percent += score.expectation[0]
    if (log.contact_wechat) percent += score.contact_wechat[0]
    if (log.location) percent += score.location[0]
    if (log.phone) percent += score.phone[0]

    if (customer.relation_text) percent += customer.relation_text[0]
    if (customer.introduction) percent += customer.introduction[0]

    if (percent >= 100) {
      value = '100%'
      percent = 100
      text = ''
    } else if (percent >= 80) {
      value = percent + '%'
      text = ''
    } else if (percent >= 65) {
      value = percent + '%'
      text = ''
    } else {
      value = percent + '%'
      text = '完善资料进度低'
    }

    resolve({ number: percent, text, value })
  });
}

module.exports = {
  percentUserinfo,
  percentCustomerinfo
}
