const axios = require("axios")

const ERROR_MSG = "api地址设置有误，请检查地址是否与个人中心提供一致。"

module.exports = {
  enter: () => {
    let inputValue = ""
    utools.setSubInput(({ text }) => {
      inputValue = text
    }, "请输入你想输入的")


    const sendSeeds = (e) => {
      if (+e.which === 13) {
        // 取出api并发送请求
        const url = window.utools.dbStorage.getItem("api")

        if(url.search("https://seedsnote.com/") === -1) {
          utools.setSubInputValue(ERROR_MSG)
        } else {
          axios.post(url, {
            content: inputValue
          }).then(res => {
            if(res.data.message) {
              utools.setSubInputValue(res.data.message)
            } else {
              utools.setSubInputValue(ERROR_MSG)
            }
          })
        }

        document.removeEventListener('keydown', sendSeeds)
      }
    }

    document.addEventListener('keydown', sendSeeds)
  }
}