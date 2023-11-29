import Database from '@ioc:Adonis/Lucid/Database';

function percentUserinfo(user_id) {
  return new Promise(async (resolve, reject) => {
    let percent = 0, percentText = ''
    const user = await Database.from('users').select('*').where({ user_id }).first()

    // 基础信息
    if (user.work) percent += 5
    if (user.birthday) percent += 5
    if (user.company) percent += 5
    if (user.contact_wechat) percent += 5
    if (user.detail) percent += 5
    if (user.height) percent += 5
    if (user.location) percent += 5
    if (user.phone) percent += 5
    if (user.nickname) percent += 5
    if (user.school) percent += 5

    // 个性化信息
    if (user.avatar_url) {
      const url = user.avatar_url.split('/')
      if (url[2] != 'normal-avatars') {
        percent += 10
      }
    }

    if (user.photos && user.photos.length) {
      if (user.photos.length > 4) percent += 20
      else if (user.photos.length > 2) percent += 10
      else percent += 5
    }

    if (user.video && user.video.length) {
      if (user.video.length > 4) percent += 20
      else if (user.video.length > 2) percent += 10
      else percent += 5
    }

    if (percent > 80) {
      percentText = ''
    } else if (percent > 60) {
      percentText = `您当前资料完善程度为 ${ percent }%`
    } else {
      percentText = `您当前资料完善不足`
    }

    resolve(percentText)
  });
}

module.exports = {
  percentUserinfo
}
