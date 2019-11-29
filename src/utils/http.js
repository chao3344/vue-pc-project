import axios from 'axios'

export const get = (url) => {
  return axios({
    url,
  })
  .then((result) => {
    return result.data.data
  })
}

export const post = (url,data) => {
  return axios({
    url,
    data,
    method:'POST'
  })
  .then((result) => {
    return result.data.data
  })
}

