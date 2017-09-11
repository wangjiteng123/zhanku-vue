<template>
  <div class="hello"> 	
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
   	<div id="nav">
		      <router-link to='/'>首页推荐</router-link>
		      <router-link to='/works'>作品<span @click='reveal'>▼</span></router-link>
		      <router-link to='/article'>文章</router-link>
		</div>
		<div id="little" v-bind:style=" reveals ? all : allb " @click='reveal'>
				<router-link v-for='(lists,index) in list' :key=index :to="lists.type">
					{{lists.name}}
				</router-link>
			
		</div>
		<div id="all" v-bind:style=" reveals ? all : allb ">		
		</div>
		<router-view></router-view>
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
    	styleb:{left:'-4rem',display:'none'},
    	stylea:{left:'4rem'},
    	img:"../../static/img/icon-side.png",
    	imgs:"../../static/img/icon-side-close.png",
    	check:true,
    	reveals:true,
    	list:[],
    	username:"",
    	usershow:false,
    	serchs:false
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
				var _this=this;
				this.$http.get("../static/typelist.json").then(function(res){							
						_this.list=res.data
				    
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
  	seek(){
  		this.$router.push('/seek/:'+this.$refs.seeks.value)
  	}
  } 
}
</script>

<style scoped>
.hello{overflow: hidden;width: 100%;height: 740px;}
a {color:grey;text-decoration:none;}
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
ul li{list-style: none;}
#nav{width:100%;height: 0.8rem;}
#nav a{float: left;font-size: 0.3rem;width: 33%;height: 0.8rem;line-height: 0.8rem;display: block;}
#nav .router-link-exact-active{border-bottom: 3px solid green;color:orange;}


#all{position: absolute;background: black;opacity: 0.5;width: 100%;height: 100%;margin-top: 3rem;}
#little{width: 100%;height: 3rem;background: white;margin-top: 10px;position: absolute;z-index: 4;}
#little a{display: block;width: 25%;height: 0.6rem;font-size: 12px;float: left;line-height: 0.6rem;}
</style>
