<template>
    <div class="detail">
        <BookInfo :info="info"></BookInfo>
        <CommentList :commentList='commentList' v-if="commentList"></CommentList>
        <div class="comment" v-if="ifshow">
            <textarea class="textare"
                    v-model="comment"
                    placeholder="请输入您的评论"
                    maxlength=100></textarea>
            <div class="phone">
                手机型号：
                <switch color="#EA5A49" :checked='phone' @change="getPhone"></switch>
                <span class="text-red" >{{phone}}</span>
            </div>
            <div class="location">
                地理位置：
                <switch color="red" :checked='location' @change="getLocation"></switch>
                <span class="text-red" >{{location}}</span>
            </div>
            <button class="submit" @click='addComment'>评论</button>
        </div>
        <div class="noComment" v-else>未登录或已经评论过</div>
    </div>
</template>
<script>
import {get, post, showModal} from '@/untl'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'
export default{
  data () {
    return {
      bookid: '',
      info: '',
      location: '',
      phone: '',
      comment: '',
      commentList: [],
      openid: ''
    }
  },
  components: {
    BookInfo, CommentList
  },
  computed: {
    ifshow () {
      if (!this.openid) {
        return false
      }
      if(!this.commentList.list){
        return false
      }
      if (this.commentList.list.filter(v => {
        return v.openid === this.openid
      }).length > 0) {
        return false
      }
      return true
    }
  },
  methods: {
    async addComment () {
      if (!this.comment) {
        showModal('评论失败', '请输入评论')
        return
      }
      const data = {
        openid: this.openid,
        bookid: this.bookid,
        comment: this.comment,
        phone: this.phone,
        location: this.location
      }
      // console.log(data)
      try {
        await post('/weapp/addcomment', data)
        this.comment = ''
        this.getcommentList()
      } catch (e) {
        showModal('失败', e.msg)
      }
    },
    async getcommentList () {
      const comments = await get('/weapp/getcomment', {bookid: this.bookid})
      this.commentList = comments
    },
    getLocation (e) {
      // wx2fd2e15bac1fa0a9
      const ak = 'kCbYcGikr8vrYLfn4S73LskpGMcZZo0W'
      const url = 'http://api.map.baidu.com/geocoder/v2/'
      if (e.target.value) {
        wx.getLocation({
          type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标,
          success: geo => {
            console.log(geo)
            wx.request({
              url, // 开发者服务器接口地址",
              data: {
                location: `${geo.latitude},${geo.longitude}`,
                ak,
                output: 'json'
              }, // 请求的参数",
              method: 'GET',
              dataType: 'json', // 如果设为json，会尝试对返回的数据做一次 JSON.parse
              success: res => {
                console.log(res)
                if (res.data.status === 0) {
                  this.location = res.data.result.addressComponent.city
                } else {
                  this.location = '未知地址'
                }
              },
              fail: () => {},
              complete: () => {}
            })
          },
          fail: () => {
            console.log('getLocation failed')
          }
        })
      } else {
        this.location = ''
      }
    },
    getPhone (e) {
      // console.log(e);
      if (e.target.value) {
        const info = wx.getSystemInfoSync()
        this.phone = info.model
      } else {
        this.phone = ''
      }
    },
    async getDetail () {
      const info = await get('/weapp/bookdetail', {id: this.bookid})
      wx.setNavigationBarTitle({ title: info.title })
      this.info = info
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
    this.getcommentList()
    this.openid = wx.getStorageSync('userinfo').openId
    console.log(this.openid)
  }
}
</script>
<style lang="scss">
    .noComment{
        // margin-bottom: 10px;
        padding: 10px;
        font-size: 14px;
        text-align: center;
    }
    .comment{
        margin: 10px 0;
        // padding:15px;
        .textare{
            background: #eeeeee;
            padding: 10px;
            width: 100%;
            height:200rpx;
        }
        .phone{
            margin-top: 10px;
            padding:5px 10px;
        }
        .location{
            margin-top: 10px;
            padding:5px 10px;
        }
    }
</style>
