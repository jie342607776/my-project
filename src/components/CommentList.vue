<template>
    <div class="commentList">
        <div class="title" v-if="commentList">评论</div>
        <div class="list" 
        v-for="comment in commentList.list" 
        :key="comment.id"
        @click="showinfo(comment)">
            <div class="user">
                <img class="image" :src="comment.avatar" mode='aspectFit'>
                <span> {{comment.nickName}}</span>
            </div>
            <div class="info">
                <span>{{comment.location||'未知位置'}}</span>
                <span class="text-red"> —— </span>
                <span>{{comment.phone||'未知型号'}}</span>
            </div>
            <div class="comment">
                {{comment.comment}}
            </div>
        </div>
    </div>
</template>
<script>
    export default{
      props: {
        commentList: [],
        type: ''
      },
      methods: {
        showinfo (e) {
          if (this.type === 'user') {
            wx.navigateTo({ url: '/pages/detail/main?id=' + e.bookid })
          }
        }
      }
    }
</script>
<style lang="scss">
    .commentList{
        margin-top: 10px;
        background: #eee;
        font-size: 14px;
        // padding-bottom: 10px;
        .title{
            // font-size: 20px;
            padding: 10px;
        }
        .info{
            float: right;
            
        }
        .list{
            margin-bottom: 10px;
            background: white;
            padding: 5px 20px;
            .user{
                display: inline;
                .image{
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    vertical-align: middle;
                }
            }
            .comment{
                margin: 10px 0;
            }
        }
    }
</style>
