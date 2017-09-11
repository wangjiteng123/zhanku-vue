<template>
	<div id="apps">
		<header><img src="http://static.zcool.cn/v1.1.1/passport/client/image/logo_black.png" class="_img"/></header>
		<div class="box">
			<input type="text" placeholder="用户名/手机号/电子邮箱" ref="username"/>
			<br>
		    <input type="password" placeholder="密码" ref="userpass"/>
		    <br>
		    <div class="small"><input type="checkbox" id="ch" checked="true"/>下次自动登录</div>
		    <br>
		    <button @click='change'>登录</button>
		</div>
		<div class="smallbox">
			<router-link to='/register' class="left">立即注册</router-link>
			<router-link to='/register' class="right">忘记密码?</router-link>
		</div>
	</div>
</template>

<script>
	export default{
		name:'apps',
		data(){
			return{
				ss:"sss",
				user:{
					_number:'',
					_name:'',
					_pass:''
				},
				arr:[],
				arrs:true
			}
		},
		created:function(){
            $.cookie.json=true;
            var _arr=$.cookie("user");
            if(_arr!=null){
	          this.arr=_arr;
            }
		},
		methods:{
			change(){
				var val=/^[a-z][a-zA-Z0-9]{5,19}$/;
			    var _name=this.$refs.username.value;
			    var _pass=this.$refs.userpass.value;
				for(var i=0;i<this.arr.length;i++){
					if(_name===this.arr[i]._name&&_pass===this.arr[i]._pass){
						this.arrs=false
						break
					}
				}			
				if(!_name||!_pass){
					alert("密码或用户名不能为空!");
					return;
				}else if( (val.test(_name) && val.test(_pass)) ===false){
					alert("用户名或密码格式错误!");
					return
				}else if(this.arrs){
					alert("该用户与密码不匹配")
					return
				}else{
					this.user._name=_name;
					this.user._pass=_pass;
					$.cookie("nowuser",this.user);
					this.$router.push('/')
				}	
			}	
		}
	}	
</script>

<style>
a{text-decoration: none;}
header{width: 100%;height: 1rem;}
header ._img{width: 3rem;height: 30px;}
.box{font-size: 20px;margin-top:20px ;}
#apps input{width: 80%;height: 25px;margin: 10px 0;padding: 10px;}
.small{text-align: left;width: 80%;margin: 0 auto;font-size: 13px;}
.box #ch{height: 13px;width: 13px;}	
.box button{width:350px;background-color: #ffd100;color: #282828;height: 50px;padding: 12px;text-align: center;white-space: nowrap;
    vertical-align: middle;border: none;font-size: 18px;}
#apps a{font-size: 13px;}
.smallbox{width: 80%;margin: 10px auto;}
.smallbox .left{float: left;}
.smallbox .right{float: right;}    
</style>