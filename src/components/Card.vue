<template>
    <a :href="detailUrl">
        <div class="book-card">
            <img class="img" :src="book.image" @click.stop="showImg()"
            mode="aspectFit">  
            <div class="detail">
                <div class="row text-red"> 
                    <div class="left">
                        {{book.title}}
                    </div>
                    <div class="right">
                        {{book.rate}}<Rate :rate='book.rate'></Rate>
                    </div>
                </div>
                <div class="row">
                    <div class="left">
                        {{book.author}}
                    </div>
                    <div class="right text-red" >
                        浏览量:{{book.count}}
                    </div>
                </div>
                <div class="row">
                    <div class="left">
                        {{book.publisher}}
                    </div>
                    <div class="right">
                        {{book.user_info.nickName}}
                    </div>
                </div>
            </div>
        </div>
    </a>
</template>
<script>
import Rate from '@/components/Rate'
export default{
  props: {
    book: {
      type: Object
    }
  },
  computed: {
    detailUrl () {
      return '/pages/detail/main?id=' + this.book.id
    }
  },
  methods: {
    showImg () {
      wx.previewImage({
        urls: [this.book.image] // 需要预览的图片链接列表,
      })
    }
  },
  components: {
    Rate
  }
}
</script>
<style lang='scss'>
    .book-card{
        // height:400px;
        padding: 5px;
        overflow: hidden;
        margin: 5px 0;
        font-size: 14px;
        .img{
            width:90px;
            height:90px;
            float: left;
            margin:0 auto;
        }
          .detail{
            margin-left: 100px;
            .row{
                line-height:20px;
                margin-bottom:3px;
            }
            .right{
                float: right;
                // display: inline-block
            
            }
            .left{
                width: 160px;
                // margin-right:120px;
                display: inline-block
            }
        }
    }
</style>
