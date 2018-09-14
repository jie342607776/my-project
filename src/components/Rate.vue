<template>
    <div class="rate">
        <span>☆☆☆☆☆</span>
        <div class="cover" :style="style">★★★★★</div>
    </div>
</template>
<script>
    export default{
      props: {
        rate: {
          type: [Number, String],
          dafault: '0'
        }
      },
      computed: {
        style () {
          return `width:${this.rate / 2}em`
        }
      },
      created () {
        // console.log(typeof this.rate );
      }
    }
</script>
<style lang="scss">
    .rate{
        position: relative;
        display: inline-block;
        .cover{
            position:absolute;
            display:inline-block;
            left: 0;
            top: 0;
            width:0;
            overflow: hidden;
        }
    }
</style>