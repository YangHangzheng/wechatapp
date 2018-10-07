// pages/list/list.js
const dayMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

Page({
  date: {
    weekWeather: [],
    city: '西安市'
  },

  onLoad(options) {
    this.setData ({
      city: options.city
    })
    this.getWeekWeather()
  },

  getWeekWeather(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future', //仅为示例，并非真实的接口地址
      data: {
        time: new Date().getTime(),
        city: this.data.city
      },
      success: res => {
        console.log(res)
        let result = res.data.result
        this.setWeekWeather(result)
        // this.setHourlyWeather(result)
        // this.setToday(result)
        complete: () => {
          callback && callback()
        }
      }
    })
  },
  setWeekWeather(result) {
    let weekWeather = [];
    for (let i = 0; i < 7; i += 1) {
      let date = new Date()
      date.setDate(date.getDate() + i)
      weekWeather.push({
        day: dayMap[date.getDay()],
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        temp: `${result[i].minTemp}° - ${result[i].maxTemp}°`,
        iconPath: '/images/' + result[i].weather + '-icon.png'
      })
    }
    weekWeather[0].day = '今天'
    this.setData ({
      weekWeather: weekWeather
    })
  }
})