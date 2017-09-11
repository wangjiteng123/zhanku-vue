<template>
	<div>
		 <ul class="bigbox">
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
        
         <div class="more" @click='Add' v-if="show===true">点击加载更多</div>
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
	name:'works',
    data(){
		return {
		img:[],
		imge:[],
		show:true,
		names:[]
        }
	},
	mounted:function(){
		this.getData();
		},
		methods:{
			getData:function(){
				var _this=this;
				this.$http.get("../static/works.json").then(function(res){					
					for(var i=0;i<10;i++){
						_this.img.push(res.data[i])
						_this.names.push(res.data[i].id)
					}
					for(var i=10;i<res.data.length;i++){
						_this.imge.push(res.data[i])
						_this.names.push(res.data[i].id)
					}
				})
			},
			changes(index){
				console.log(this.names[index])
			
  		        this.$router.push('/particular/:'+this.names[index])
  	        },
			Add(){
				this.show=false;
				var _this=this				
				setTimeout(function(){
				    _this.img=[..._this.img,..._this.imge];
				    _this.show=true;					
				},2000)				
			}
		}
	}
	
	
</script>

<style>
.bigbox{margin-top: 20px;}	
.bigbox li{list-style:none;overflow: hidden;margin-top:10px ;}
.imgbox{float: left;width: 3rem;height: 2rem;}
.worksbox{float: left;width: 4.2rem;font-size: 0.2rem;position: relative;}	
.worksbox .one{font-size: 0.3rem;text-align: left;margin-left: 10px;}
.workbox{position: absolute;top: 1.2rem;margin-left: 10px;}
.workbox p{font-size: 0.1rem;letter-spacing: 2px;}
.workbox p img{height: 17px;width: 17px;}
.more{font-size: 0.3rem;margin: 10px;}

footer{ text-align: center;background-color: #f9f9f9;padding: 22px 10px;font-size: 12px;} 
footer a{color: #999;}
footer .cl{overflow: hidden;}
footer .l{float: left;}
footer .r{float: right;} 
footer .Copyright{margin:10px auto;}
	
	
</style>