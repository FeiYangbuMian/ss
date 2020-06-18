import axios from '@/util/request'

const sale = {
  // 返回项目名称
  getProjects () {
    return axios.get('/projectCode')
  },
  // 返回品名+规格
  getCommodities () {
    return axios.get('/commodityCode')
  },
  // 返回客户/承运商信息
  getClients () {
    return axios.get('/clientCode')
  },
  // 增删改查sale
  addSale (data) {
    return axios.post('/insertSaleTable', data)
  },
  getSales (data) {
    return axios.get('/saleList', {
      params: data
    })
  },
  delSale (data) {
    return axios.get('/delSale', {
      params: data
    })
  },
  // 增删改查sale
  addFreight (data) {
    return axios.post('/insertFreightTable', data)
  },
  getFreights (data) {
    return axios.get('/freightList', {
      params: data
    })
  },
  delFreight (data) {
    return axios.get('/delFreight', {
      params: data
    })
  }
}

export default sale
