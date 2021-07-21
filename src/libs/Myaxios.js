import Axios from 'axios'

// 配置axios的根路径
Axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
Axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
}, error => {
  console.log(error.response)
  return Promise.error(error)
})
Axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          console.log('401')
          break
        case 402:
          console.log('402')
          break
        default:
          break
      }
    }
    return Promise.reject(error.response)
  }
)
export default Axios
