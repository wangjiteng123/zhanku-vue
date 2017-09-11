<template>
	<div>
		<div id="serchsmall">
	  		<img src="../../static/img/icon-search.png">
	  		<input type="text" placeholder="搜索" ref="seeks"/>
	  		<button @click='seek'>开始</button>
	  		<button @click="serch">取消</button>
        </div>		
		<ul class="bigbox">
			<div v-if="img.length===0" id="sorry">
				抱歉，没有找到你需要的信息
			</div>
		    <li v-for='(imgs,index) in img' >		  	
			  	<img :src="imgs.src" class="imgbox" @click="changes(index)"/>			 
			  	<div class="worksbox" @click="changes(index)">
			  		<p class="one">{{imgs.name}}</p>
			  	    <div class="workbox">
			  	    	<p>{{imgs.anname}}</p>
			  	        <p><img src="../../static/img/icon-view.png" />&nbsp;{{imgs.looknumber}}&nbsp;
			  	           <img src="../../static/img/icon-zan.png">&nbsp;{{imgs.fansnumber}}
			  	        </p>
			  	    </div>
			  	</div>		  	
		   </li>	  
		</ul>
        <div class="add" v-if="show===false"><img src="../../static/img/loading.gif"></div>
        <div><a href="/"><img src="http://static.zcool.cn/v3.5.170824.4/zcool/client/image/down-app2.png" width="100%" style="display:block"></a></div>
		 
        <footer class="footer">
			 <div class="cl">
				<div class="l c-999">		
					<a href="#">触屏版</a>
					|<a href="http://www.zcool.com.cn/index.html?switchPage=on" style="color: #333">电脑版</a> 
				
				</div>
				<div class="r  c-999">
					<a href="http://m.zcool.com.cn/suggest.do">反馈</a> | <span onClick="gotop()" class="gotop">回顶部</span>
				</div>
			</div>
	
			<div  class="Copyright">
				Copyright&copy; 2006 - 2017 ZCOOL</div>

       </footer>		
	</div>
	
	
</template>

<script>
	export default{
		name:'seek',
	    data(){
			return {
			img:[],
			imge:[],
			show:true,
			names:[],
			index:"",
			
	        }
		},
		mounted:function(){
			this.getData();
		},
		methods:{
			getData:function(){
				var _lo=location.href;
			    var _hr=_lo.split(":");
			    this.index=_hr[_hr.length-1];
			    this.$refs.seeks.value=this.index
			    console.log(this.index+111)
				var _this=this;
				this.$http.get("../static/works.json").then(function(res){					
					for(var i=0;i<10;i++){
						if(res.data[i].name.indexOf(_this.index)>=0||res.data[i].anname.indexOf(_this.index)>=0){					
						_this.img.push(res.data[i])
						_this.names.push(res.data[i].id)
						}
					}
					
				})
			},
			changes(index){
				
	  		    this.$router.push('/particular/:'+this.names[index])
	  	    },
	  	    serch(){
  				this.$router.push('/')
		  	},
		  	seek(){
		  		this.$router.push('/seek/:'+this.$refs.seeks.value)
		  		window.location.reload()
		  	}
		}
	}
	
	
</script>

<style>
#serchsmall{width: 100%;height: 50px;z-index: 10;background: black;line-height: 50px;position: relative;}
#serchsmall input{background:white;padding:3px 3px 3px 26px; z-index: 6;width: 67%;height: 24px;border: none;float: left;margin-top: 13px;margin-left: 10px;}
#serchsmall button{float: left;height: 30px;width: 40px;background:#2E2E2E;border: none;color: white;margin-top: 13px;margin-left: 4px;}
#serchsmall img{position: absolute;left:13px;top: 18px;height: 20px;width: 20px;}		
.bigbox{margin: 20px 0;}	
.bigbox li{list-style:none;overflow: hidden;margin-top:10px ;}
#sorry{font-size: 0.3rem;text-align: left;color: red;}
.imgbox{float: left;width: 3rem;height: 2rem;}
.worksbox{float: left;width: 4.2rem;font-size: 0.2rem;position: relative;}	
.worksbox .one{font-size: 0.3rem;text-align: left;margin-left: 10px;}
.workbox{position: absolute;top: 1.2rem;margin-left: 10px;}
.workbox p{font-size: 0.1rem;letter-spacing: 2px;}
.workbox p img{height: 17px;width: 17px;}
footer{ text-align: center;background-color: #f9f9f9;padding: 22px 10px;font-size: 12px;} 
footer a{color: #999;}
footer .cl{overflow: hidden;}
footer .l{float: left;}
footer .r{float: right;} 
footer .Copyright{margin:10px auto;}
	
	
</style>