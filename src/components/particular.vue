<template>
	<div>
		<div id="serchsmallbox" v-if='serchs===true'>
	  		<img src="../../static/img/icon-search.png">
	  		<input type="text" placeholder="搜索" ref="seeks"/>
	  		<button @click='seek'>开始</button>
	  		<button @click="serch">取消</button>
  	   </div>
		<div v-if='serchs===true' @click="serch" id="serchbox"></div>
	    <div id="person" v-bind:style=" check ? styleb : styles ">   
	   		<div id="h">
	   			<img src='../../static/img/60x60.jpg'/>   		
		   		<div id="login-enter">
		   			    <div v-if="this.usershow===true"><router-link to='/login'>登录</router-link><router-link to="/register">注册</router-link></div>
		   		      <p v-if="this.usershow===false" @click="enteruser"><router-link to='/'>{{this.username}}</router-link></p>   		
		   		</div>
	   		</div>
	   		<div id="down">
		   		<a href="#">原创</a>
		   		<a href="#">活动</a>
		   	  <a href="#">招聘</a>
		   		<a href="#">赛事</a>
		   		<a href="#">站酷海洛</a> 	
	   		</div>
	   		<p id="out" v-if="this.usershow===false" @click="out">退出登录</p>
	    </div>	
	  	<div id="main" v-bind:style=" check ? styles : stylea ">
		   	<header>
		   		<img id="Nav" v-bind:src=" check ? img : imgs"  @click='change'/>
		   		<a href="#">
		   		  <img id="logo" src='../../static/img/logo.png'/>
		   		</a>
		   		<img id="serch" src="../../static/img/icon-search2.png" @click='serch'/>
		   		<router-link to='/login' v-if="this.usershow===true"><img id="myself" src="../../static/img/icon-login.png"/></router-link>
		   	  <router-link to='/' v-if="this.usershow===false"><img id="letter" src="../../static/img/icon-lette.png"></router-link>
		   	</header>
		   	<div id="bigbox">
			   	<h2>{{this.list.name}}</h2>
			    <p id="writename">{{this.list.anname}}</p>
				<div id="imgbox">
					<p>作者很懒，没有什么介绍</p>
					<img :src="this.list.src">
					<div class="recommend" v-if="this.recommend===true" @click="recommen"><img src="../../static/img/iconpic-zan.png"/>推荐</div>
					<div class="recommends" v-if="this.recommend===false"><img src="../../static/img/iconpic-zan-disabled.png"/>已推荐</div>
				</div>
			</div>
			<div class="snsbar">
				 <img src="../../static/img/icon-comment.png"/><span>5</span>
			     <img src="../../static/img/icon-zan.png"/>
			     <span>{{this.list.fansnumber}}</span>
			     <img src="../../static/img/icon-view.png"/>
			     <span>{{this.list.looknumber}}</span>
			     <p>原创作品-{{this.list.typec}}</p>
			     <p>本作品有站酷网：<span class="ans">{{this.list.anname}} </span>原创，未经许可请勿用作商业用途</p>
			</div>
			<fieldset>
				<legend>更多作品</legend>
				<img :src="imglists" v-for="(imglists,index) in imglist" @click="changes(index)">
				
			</fieldset>
			<div><a href="/appdown?from=m0"><img src="http://static.zcool.cn/v3.5.170824.4/zcool/client/image/down-app2.png" width="100%" style="display:block"></a></div>		 
			
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
	    	    
	</div>
</template>

<script>
export default {
  name: 'particular',
  data () {
    return {
    	all:{display:"none"},
    	allb:{display:"block"},
    	styles:{left:'0'},
    	styleb:{left:'-4rem'},
    	stylea:{left:'4rem'},
    	img:"../../static/img/icon-side.png",
    	imgs:"../../static/img/icon-side-close.png",
    	check:true,
    	reveals:true,
    	list:"",
    	imglist:[],
    	username:"",
    	usershow:false,
    	serchs:false,
    	index:"",
    	recommend:true,
    	names:[],
    }
  },
   mounted:function(){
   	    this.getData();
		$.cookie.json=true;
	    var _arr=$.cookie("nowuser")||null;
	    if(_arr===null){
	       this.usershow=true;    	
	    }else{
	    	this.username=_arr._name;
	    }
	       
	},
   methods:{
  	getData:function(){
  		        var _lo=location.href;
			    var _hr=_lo.split(":");
			    this.index=_hr[_hr.length-1];			   
				var _this=this;
				this.$http.get("../static/works.json").then(function(res){							
						for(var i=0;i<res.data.length;i++){
							if(parseInt(_this.index) === res.data[i].id){
								_this.list=res.data[i]
							}
						}
						for(var i=0;i<3;i++){
							_this.imglist.push(res.data[i].src)
							_this.names.push(res.data[i].id)
						}
				})
						
	},	
  	change(e){
        this.check=!this.check 		
  	},
  	reveal(e){
  		  this.reveals=!this.reveals		  
  	},
  	out(){
  		this.usershow=true
  		$.cookie("nowuser","");
  	},
  	serch(){
  		this.serchs=!this.serchs
  	},
  	enteruser(){
  		this.$router.push('/user')
  	},
  	recommen(){
  		this.recommend=false
  	},
  	changes(index){		
  		this.$router.push('/particular/:'+this.names[index])
  		window.location.reload()
  	},
    seek(){
    	console.log("ss")
		this.$router.push('/seek/:'+this.$refs.seeks.value)
//		window.location.reload()		
    }	
  	
  } 
}	
</script>
<style>
a {color:grey;text-decoration:none;}
ul li{list-style: none;}
#serchbox{width: 100%;height: 100%;background: black;opacity: 0.5;position: absolute;z-index: 5;}
#serchsmallbox{width: 100%;height: 30px;z-index: 10;opacity: 1;position: absolute;top: 10px;left: 10px;}
#serchsmallbox input{background:white;padding:3px 3px 3px 26px; z-index: 6;width: 67%;height: 24px;border: none;float: left;}
#serchsmallbox button{float: left;height: 100%;width: 45px;background:#2E2E2E;border: none;color: white;}
#serchsmallbox img{position: absolute;left: 3px;top: 5px;height: 20px;width: 20px;}
	
#person{width: 4rem;height: 100%;background: #2e2e2e;position: absolute;top: 0;}
#person #h{font-size: 0.2rem;margin-top: 20px;overflow: hidden;line-height: 40px;border-bottom: 1px solid #3e3e3e;}
#person #h img{width: 40px;height: 40px;float: left;margin-left: 20px;}
#person #h #login-enter{float: left;color: white;margin-left: 10px;}
#person #h #login-enter a{margin:0 5px;float: left;width: 25px;}
#person #h #login-enter p a{float: none;width: 100%;}
#person #down{float: left;width: 100%;}
#person  a{font-size: 0.2rem;height: 40px;line-height: 40px;border-bottom: 1px solid #3e3e3e;width: 100%;display: block;}
#person #out{position: absolute;bottom: 0;font-size: 0.3rem;width: 100%;color: wheat;}
#main{position: absolute;left: 0;width: 100%;}
#main header{width: 100%;height: 1rem;background:#282828;}
#main header img{float: left;}
#main header #Nav{margin-left: 10px;margin-top: 15px;width: 30px;height: 26px;}
#main header #logo{height:25px;margin-top: 15px;margin-left: 1.5rem;}
#main header #serch,#myself,#letter{position: absolute;top: 15px;height: 25px;}
#main header #serch{right: 1rem;}
#main header #myself{right: 10px;}
#main header #letter{right: 10px;}	

#bigbox h2{font-size: 0.5rem;text-align: left;margin-top: 10px;color: #2d2d2d}
#bigbox #writename{font-size: 0.2rem;text-align: left;margin-top: 10px;color:#f59000;}
#imgbox{border-top: 1px solid #d6d6d6;border-bottom: 1px solid #d6d6d6;margin: 10px 0;}
#imgbox p{font-size: 0.3rem;text-align: left;margin: 10px;}
.recommend{
	width: 100%;
height: 50px;
background: #ffd100;
text-align: center;
line-height: 50px;
color: #282828;
font-size: 16px;
font-weight: bold;
margin-bottom: 10px;
}
.recommend img{width: 18px;height: 18px;}
.recommends{
width: 100%;
height: 50px;
text-align: center;
line-height: 50px;
font-size: 16px;
font-weight: bold;
background-color: #d4d4d4;
color: #999999;
margin-bottom: 10px;
}
.recommends img{width: 18px;height: 18px;}

.snsbar{margin-top: 10px;font-size: 16px;text-align: left;}
.snsbar img{width: 24px;height: 24px;}
.snsbar span{margin:0 5px;}
.ans{color: orange;}
.snsbar p{margin: 10px 0;font-size: 12px;color: #999999;}
fieldset{font-size: 16px;border-left: none;border-right: none;margin: 20px 0;}
fieldset legend{margin: 0 5px;}
fieldset img{width: 30%;margin:20px 1.5%;}
footer{ text-align: center;background-color: #f9f9f9;padding: 22px 10px;font-size: 12px;} 
footer a{color: #999;}
footer .cl{overflow: hidden;}
footer .l{float: left;}
footer .r{float: right;} 
footer .Copyright{margin:10px auto;}	
</style>