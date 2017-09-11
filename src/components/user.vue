<template>
	<div>	
		<div id="serchsmallbox" v-if='serchs===true'>
	  		<img src="../../static/img/icon-search.png">
	  		<input type="text" placeholder="搜索" ref="seeks"/>
	  		<button @click='seek'>开始</button>
	  		<button @click="serch">取消</button>
	  	</div>
	  	<div v-if='serchs===true' @click="serch" id="serchbox">	
	  	</div>
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
	   	    
	   	    <div>
	   	    	<dl>
	   	    		<dd><img src="http://img.zcool.cn/community/1noavatar.gif@145w_145h_2o_100sh.jpg"></dd>
	   	    		<dt><p>{{this.username}}</p>
	   	    		    <p>成都/学生</p>
	   	    		    <p>粉丝：关注：</p>
	   	    		</dt>
	   	    	</dl>	   	    	
	   	    </div>	   	    
	   	    <ul id="message">
	   	    	<li @click="showmessagea" v-bind:class="{ colors: isActive, 'nocolors': hasError }">原创</li>
	   	    	<li @click="showmessageb" v-bind:class="{ nocolors: isActive, 'colors': hasError }">资料</li>
	   	    </ul>
	   	    <div id="space" v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
	   	    <div id="orginal" v-bind:class="{ active: hasError , 'text-danger':isActive }">
	   	    	<ul>
	   	    		<li>人气：{{this.messages}}</li>
	   	    		<li>酷龄：{{this.messages}}</li>
	   	    		<li class="blank"></li>
	   	    		<li>性别：{{this.messages}}</li>
	   	    		<li>现居：{{this.messages}}</li>
	   	    		<li>职业：{{this.messages}}</li>
	   	    		<li>生日：{{this.messages}}</li>
	   	    		<li>家乡：{{this.messages}}</li>
	   	    		<li class="blank"></li>
	   	    		<li>院校：{{this.messages}}</li>
	   	    		<li>邮箱：{{this.messages}}</li>
	   	    		<li>手机号：{{this.messages}}</li>
	   	    		<li>微信：{{this.messages}}</li>
	   	    		<li>QQ：{{this.messages}}</li>
	   	    		<li class="blank"></li>
	   	    		<li>简介：{{this.messages}}</li>
	   	    	</ul>
	   	    </div>
	   	    <div id="material"></div>	   	    
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
  name: 'hello',
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
    	list:[],
    	username:"",
    	usershow:false,
    	serchs:false,
    	messages:'用户很懒，什么都没留下',
    	isActive: true,
        hasError: false
    }
  },
   mounted:function(){
		
		$.cookie.json=true;
	    var _arr=$.cookie("nowuser")||null;
	    if(_arr===null){
	       this.usershow=true;    	
	    }else{
	    	this.username=_arr._name;
	    }
	},
  methods:{	
	  	change(e){
	        this.check=!this.check 		
	  	},
	  	reveal(e){
	  		  this.reveals=!this.reveals		  
	  	},
	  	changeNow(event){
	  		console.log(this)
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
		seek(){
		    this.$router.push('/seek/:'+this.$refs.seeks.value)
		  	window.location.reload()
		},
		showmessagea(){
			this.isActive= true
            this.hasError= false
		},
		showmessageb(){
			this.isActive=false
            this.hasError= true
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
#app{overflow: hidden;}
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
dl{overflow: hidden; position: relative;}
dl dd{float: left;}
dl dt{float: left;}
dl dt p{font-size: 0.3rem;margin-left: 10px;text-align: left;margin-top: 10px;}
dl dt p:nth-child(1){font-size: 0.5rem;}
dl dt p:nth-child(2){font-size: 0.2rem;}
dl dt p:nth-child(3){font-size: 0.2rem;color: grey;position: absolute;bottom: 10px;}

.active{display: block;}
.text-danger{display:none}
#message{width: 100%;height:1rem;margin-bottom: 20px;}
#message li{float: left;width: 50%;height: 1rem;font-size: 16px;line-height: 1rem;}
#message .colors{border-bottom: 2px solid orange;}
#orginal ul{width: 100%;}
#orginal ul li{letter-spacing: 2px;color: #999;margin: 5px 0;width: 100%;height: 21px;line-height: 21px;font-size: 0.2rem;text-align: left;border-bottom: 1px solid #d4d4d4;padding: 14px 10px;}
#orginal ul .blank{padding: 0;}

footer{ text-align: center;background-color: #f9f9f9;padding: 22px 10px;font-size: 12px;} 
footer a{color: #999;}
footer .cl{overflow: hidden;}
footer .l{float: left;}
footer .r{float: right;} 
footer .Copyright{margin:10px auto;}

</style>