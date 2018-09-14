<template>
    <div>
        <TopSwiper :tops="tops" v-if="tops.length"></TopSwiper>
        <Card v-for="book in books" :key="book.id" :book='book'></Card>
        <p class="text-footer" v-if="!more">没有更多数据啦</p>
    </div>
</template>
<script>
import {get} from '@/untl'
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'
export default{
  components: {
    Card,
    TopSwiper
  },
  data () {
    return {
      books: [],
      page: 0,
      more: true,
      tops: []
    }
  },
  methods: {
    async getList (init) {
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      const books = await get('/weapp/booklist', {page: this.page})
      if (books.list.length < 10 && this.page > 0) {
        this.more = false
      }
      if (init) {
        this.books = books.list
      } else {
        this.books = this.books.concat(books.list)
      }
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    },
    async getTop () {
      const tops = await get('/weapp/top')
      this.tops = tops.list.top
      // console.log(this.tops)
    }
  },
  onPullDownRefresh () { // 顶部下拉刷新
    this.getList(true)
    this.getTop()
  },
  onReachBottom () { // 底部刷新
    if (!this.more) {
      return false
    }
    this.page += 1
    this.getList()
  },
  mounted () {
    this.getList(true)
    this.getTop()
  }
}
</script>
<style>

</style>

