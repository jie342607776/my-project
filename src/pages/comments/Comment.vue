<template>
<div class="container">
  <CommentList v-if='userinfo.openId && commentList'
       type='user' 
       :commentList="commentList"></CommentList>
  <div v-if='userinfo.openId'>
    <div class="page-title">我的图书</div>
    <Card 
      v-for='book in books' 
      :key='book.id'
      :book='book'></Card>
    <div v-if='!books.length'>暂时还没添加过书，快去添加几本把</div>
  </div>
  <div class="footer" v-if="!userinfo.openId">请先登录</div> 
</div>
</template>
<script>
import {get} from '@/untl'
import CommentList from '@/components/CommentList'
import Card from '@/components/Card'
export default {
  data () {
    return {
      commentList: [],
      books: [],
      userinfo: {}
    }
  },
  components: {
    CommentList,
    Card
  },
  methods: {
    init () {
      wx.showNavigationBarLoading()
      this.getComments()
      this.getBooks()
      wx.hideNavigationBarLoading()
    },
    async getBooks () {
      const books = await get('/weapp/booklist', {
        openid: this.userinfo.openId
      })
      this.books = books.list
    },
    async getComments () {
      const comments = await get('/weapp/getcomment', {
        openid: this.userinfo.openId
      })
      this.commentList = comments
    }
  },
  onPullDownRefresh () {
    this.init()
    wx.stopPullDownRefresh()
  },
  onShow () {
    if (!this.userinfo.openId) {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo
        this.init()
      }
    }
  }
}
</script>
<style lang="scss">
.container{
    .page-title{
        font-size: 14px;
        background: #eee;
        padding: 10px;
    }
    .footer{
      padding: 10px;
      text-align: center;
    }
}

</style>
