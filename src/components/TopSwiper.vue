<template>
    <div class="swiper">
        <swiper 
        indicator-dots='true' 
        autoplay='true'
        interval='5000'
        circular='true'>
            <div v-for="(item,Imgindex) in imgUrl" :key="Imgindex">
                <swiper-item >
                    <img mode="aspectFit" 
                    class="img"
                    :src="img.image" 
                    v-for="img in item" 
                    :key="img.id"
                    @click="getDetail(img)">
                </swiper-item>  
            </div>
        </swiper>
    </div>
</template>
<script>
    export default{
      props: {
        tops: {
          type: Array
        }
      },
      computed: {
        imgUrl (item) {
          return [this.tops.slice(0, 3), this.tops.slice(3, 6), this.tops.slice(6)]
        }
      },
      methods: {
        getDetail (item) {
          wx.navigateTo({ url: '/pages/detail/main?id=' + item.id })
        }
      }
    }
</script>
<style lang="scss">
    .swiper{
        margin-top:5px;
        .img{
            width: 33%;
            height:240rpx;
        }
    }
</style>
