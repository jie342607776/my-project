import Vue from 'vue'
import Comment from './Comment'

const app = new Vue(Comment)
app.$mount()

export default{
  config: {
    navigationBarTitleText: '我的评论',
    enablePullDownRefresh: true
  }
}
