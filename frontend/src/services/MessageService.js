import Api from '@/services/Api'

export default {
  // get all messages
  index (userId) {
    return Api().get(`messages/${userId}`)
  }
}
