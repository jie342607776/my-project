<template>
<div class="bookinfo">
    <div class="thumb">
        <img class="back" :src="info.image" mode='aspectFill'>
        <img class="img" :src="info.image" mode='aspectFit'>
        <div class="info">
            <div class="title">{{info.title}}</div>
            <div class="author">{{info.author}}</div>
        </div>
    </div>
    <div class="detail">
        <div class="row "> 
            <div class="left">
                <img :src="userinfo.image">
                {{userinfo.name}}
            </div>
            <div class="right text-red">
                {{info.rate}}<Rate :rate='info.rate'></Rate>
            </div>
        </div>
        <div class="row">
            <div class="left">
                {{info.publisher}}
            </div>
            <div class="right">
                {{info.price}}
            </div>
        </div>
    </div>
    <div class="tags">
        <div class="icon" v-for="tag in info.tags" :key="tag">{{tag}}</div>
    </div>
    <div class="summary">
        <p v-for="(text, i) in info.summary" :key="i">{{text}}</p>
    </div>
</div>
</template>
<script>
import Rate from './Rate'
export default{
  props: {
    info: {
      type: Object
    }
  },
  components: {
    Rate
  },
  computed: {
    userinfo () {
      return this.info.user_info || {}
    }
  },
  mounted () {
    wx.showShareMenu({
      withShareTicket: true
    })
  }
}
</script>
<style lang="scss">
.bookinfo{
    font-size:14px;
    .tags{
        // padding: 10px 5px;
        .icon{
            color:#EA5149;
            border-radius: 10px;
            padding:5px;
            border: 1px solid #EA5149;
            display:inline-block;
            margin:5px
        }
    }
    .summary{
        margin-top: 5px;
        padding: 0 10px;
        p{
            text-indent: 2em;
        }
    }
    .thumb{
        position: relative;
        height:500rpx;
        width:750rpx;
        overflow: hidden;
        
        .back{
            width:100%;
            filter:blur(15px)
        }
        .img{
            position: absolute;
            height: 300rpx;
            left:0;
            top:30rpx;
            width:100%;
        }
        .info{
            position:absolute;
            color:white;
            width:100%;
            top:330rpx;
            text-align: center;
            .author{
                font-size:14px;
            }
            .title{
                font-size:20px;
            }
        }
    }
    .detail{
        padding: 5px 10px;
        .row{
            width:100%;
            margin-bottom: 10px;
        }
        img{
            width:20px;
            height: 20px;
            border-radius: 50%;
            vertical-align: middle;
        }
        .right{
        float: right;
        }
        .left{
            display: inline-block;
        }
    }
}
</style>