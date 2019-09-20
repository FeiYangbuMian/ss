import axios from '@/utils/request'

const operation = {
  // 集团
  addGroup (data) {
    return axios.post('/insertGroupForm', data)
  },
  getGroup (data) {
    return axios.get('/selectgroupform', {
      params: data
    })
  },
  // 建筑
  addBuilding (data) {
    return axios.post('/insertGroupForm', data)
  },
  getBuilding (data) {
    return axios.get('/selectgroupform', {
      params: data
    })
  },
  // 文体
  addSport (data) {
    return axios.post('/insertGroupForm', data)
  },
  getSport (data) {
    return axios.get('/selectgroupform', {
      params: data
    })
  },
  addActivity (data) {
    return axios.post('/insertActivityForm', data)
  },
  getActivity (data) {
    return axios.get('/selectActivityForm', {
      params: data
    })
  }
}

export default operation
