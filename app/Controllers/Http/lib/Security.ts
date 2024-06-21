const { msgSecCheck, mediaCheck } = require('./Weixin')

exports.center = function (data) {
  console.log(data);
  
  return new Promise(async (resolve, reject) => {
    const result = await msgSecCheck({
      ...data
    })

    console.log(result);    
  });
}