<template>
	<div>
		<div id="works">
			<transition-group tag='ul' class='clearfix slide' name='image'>
					<li v-for='(image,index) in img' :key='index' v-show='index===mark'>
						<a><img :src="image"></a>
					</li>
				</transition-group>
			<div class="bullet">
				<span v-for='(item,index) in img.length' :class="{'active':index===mark}" @click='change(index)' :key='index'></span>
			</div>		
		</div>
     <router-view></router-view>    	
	</div>

</template>

<script>
export default{
  name:'app',
  data() {
  	return{
    mark: 0,
    img: [
      'http://img.zcool.cn/community/focus/40ee59a6378b0000016a10e15791.jpg',
      'http://img.zcool.cn/community/focus/7ebe59a386000000016a100c3265.jpg',
      'http://img.zcool.cn/community/focus/907759a637370000016a108fa70a.jpg	',
      'http://img.zcool.cn/community/focus/b18c59a6375a0000016a10182d44.jpg',
      'http://img.zcool.cn/community/focus/d72459a637100000016a1053aaf5.jpg',
      'http://img.zcool.cn/community/focus/ee4659a386320000016a10364d4b.jpg',
    ]
   }
  },
  methods: {
    change (i) {
      this.mark = i
      console.log(i)
    },
    autoplay () {
      var _img = this.img.length
      this.mark++
      if (this.mark === _img) {
        this.mark = 0
        return
      }
    },
    play () {
      setInterval(this.autoplay, 3000)
    }
  }, 
  created () {
    this.play()
  }
}
</script>

<style>
ul li{list-style: none;}
.slide li{position: absolute;}
#works{width: 100%;height:195px;margin:0 auto;position: relative;overflow: hidden;}
.slide{height: 100%;}
.slide img{width: 100%;}
.bullet{position: absolute;left: 2.5rem;bottom: 10px;height: 5px;width: 200px;z-index: 5;}
.bullet span{height: 10px;width: 10px;border-radius: 50%;background:gray;display: block;float: left;margin-left: 10px;}
.bullet .active{background: red;}


</style>