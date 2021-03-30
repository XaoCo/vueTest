import service from '@/utils/request'
// import axios from 'axios'
import { Message } from 'element-ui'
// // 导出excel兼容edge
// const service = axios.create({
//   timeout: 30000 // 单独设下载时间
// })
// service.interceptors.request.use(
//   config => {
//     if (localStorage.getItem('token')) {
//       config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}` || '';
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )
// service.interceptors.response.use(
//   res => {
//     return res
//   },
//   error => {
//     Message({
//       message: error.errorMsg,
//       type: 'error',
//       duration: 3000
//     })
//     return Promise.reject(error)
//   }
// )

/**
 * 导出
 */
export default function exportExcel(url, params, fileNa, zipFlag) {
  service.post(url, params, {
    responseType: 'blob' // 设置响应的数据类型为一个包含二进制数据的 Blob 对象，必须设置！！！
  }).then(res => {
    if (res.type === 'application/json') {
      const reader = new FileReader()
      reader.onload = e => {
        if (e.target.readyState === 2) {
          let res = {}
          res = JSON.parse(e.target.result)
          Message({
            message: res.errorMsg || 'Error',
            type: 'error',
            duration: 3000
          })
        }
      }
      reader.readAsText(res)
      return false
    } else {
      var blob = ''; var fileName = ''
      if (zipFlag) {
        blob = new Blob([res.data], { type: 'application/zip' })
        fileName = `${fileNa}.zip`
      } else {
        blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
        fileName = `${fileNa}.xlsx`
      }
      if ('msSaveOrOpenBlob' in navigator) {
        // Microsoft Edge and Microsoft Internet Explorer 10-11
        window.navigator.msSaveOrOpenBlob(blob, fileName)
      } else {
        const linkNode = document.createElement('a')
        linkNode.download = fileName // a标签的download属性规定下载文件的名称
        linkNode.style.display = 'none'
        linkNode.href = URL.createObjectURL(blob) // 生成一个Blob URL
        document.body.appendChild(linkNode)
        linkNode.click() // 模拟在按钮上的一次鼠标单击
        URL.revokeObjectURL(linkNode.href) // 释放URL 对象
        document.body.removeChild(linkNode)
      }
    }
  })
}

// import exportExcel from '@/utils/download'
// exportExcel('/active-file/batch-down', { activeId: this.activeId }, '活动资料', true)

// import { downloadFile } from '@/utils/download'

/**
 * 下载
 */
export function downloadFile(url, params, fileName) {
  service.post(url, params, {
    responseType: 'blob' // 设置响应的数据类型为一个包含二进制数据的 Blob 对象，必须设置！！！
  }).then(res => {
      const linkNode = document.createElement('a')
      linkNode.download = fileName // a标签的download属性规定下载文件的名称
      linkNode.style.display = 'none'
      linkNode.href = URL.createObjectURL(res.data) // 生成一个Blob URL
      document.body.appendChild(linkNode)
      linkNode.click() // 模拟在按钮上的一次鼠标单击
      URL.revokeObjectURL(linkNode.href) // 释放URL 对象
      document.body.removeChild(linkNode)
  })
}

// 跨域下载
// downloadFile (url, fileName) {
  // const x = new XMLHttpRequest();
  // x.open("GET", url, true);
  // x.responseType = 'blob';
  // x.onload = function () {
  //   const url = window.URL.createObjectURL(x.response)
  //   const a = document.createElement('a');
  //   a.href = url
  //   a.download = fileName;
  //   a.click()
  // }
  // x.send();
// },
