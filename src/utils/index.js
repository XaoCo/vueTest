/**
 * @param {number} time
 * @param {string} type
 * @returns {string}
 */
export function formatDate(time, type = 'y-m-d') {
    // fn('13位数的时间戳', 'y-m-d h:i')
    // y-m-d h:i:s
    if (time === '-') {
      return time
    }
    if (time) {
      const now = new Date(time)
      const year = now.getFullYear()
      const month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
      const day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
      const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
      const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
      const second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
      let rDate = ''
      rDate = type.replace('y', year)
      rDate = rDate.replace('m', month)
      rDate = rDate.replace('d', day)
      rDate = rDate.replace('h', hour)
      rDate = rDate.replace('i', minute)
      rDate = rDate.replace('s', second)
      return rDate
    }
  }