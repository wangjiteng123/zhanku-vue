<template>
	<div id="appb">
		<header><img src="http://static.zcool.cn/v1.1.1/passport/client/image/logo_black.png" class="_img"/></header>
		<div class="box">
			<input type="text" placeholder="手机号" id="usernumber" ref="number"/>
			<br>
			<input type="type" placeholder="用户名" id="username" ref="name"/>
			<br>
		    <input type="password" placeholder="密码" id="uaerpassword" ref="password"/>
		    <br>
		    <div class="ver-box">
		     <input type="text" placeholder="验证码" class="ver-in"/><span class="ver">获取验证码</span>
		    </div>
		    <br>
		    <button @click='change'>注册</button>
		    <div class="small"><input type="checkbox" id="ch" ref="ch"/>我已阅读并接受用户协议</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		name:'appb',
		data(){
			return{
				ss:"sss",
				user:{
					_number:'',
					_name:'',
					_pass:''
				},
				arr:[],
				arrs:false
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
			var _number=this.$refs.number.value;
			var _name=this.$refs.name.value;
			var _pass=this.$refs.password.value;
			for(var i=0;i<this.arr.length;i++){
				if(_name===this.arr[i]._name){
					this.arrs=true
					break
				}
			}			
			if(!_number||!_name||!_pass){
				alert("密码或用户名不能为空!");
				return;
			}else if( (val.test(_name) && val.test(_pass)) ===false){
				alert("用户名或密码格式错误!");
				return
			}else if(this.arrs){
				alert("该用户已存在")
				console.log("sss")
				return
			}else if(this.$refs.ch.checked===false){
				alert("请阅读用户协议")
				return
			}
			else{
				this.user._number=_number,
				this.user._name=_name,
				this.user._pass=_pass,		
				this.arr.push(this.user);
				for(var i=0;i<this.arr.length;i++){
					console.log(this.arr[i]._name)
					}
				$.cookie("user",this.arr);
				this.$router.push('/login')
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
#appb input{width: 80%;height: 25px;margin: 10px 0;padding: 10px;border:none}

.small{text-align: left;width: 80%;margin: 0 auto;font-size: 13px;}

.box #ch{height: 13px;width: 13px;}	

.box button{width:350px;background-color: #ffd100;color: #282828;height: 50px;padding: 12px;text-align: center;white-space: nowrap;
    vertical-align: middle;border: none;font-size: 18px;}

#appb a{font-size: 13px;}
#appb .ver-box{width: 80%;margin: 0 auto;height: 60px;}
#appb .ver-box .ver-in{width: 60%;height: 100%;padding: 0;float: left;}
#appb .ver{display: block;width:35%;height: 100%;font-size: 15px;float: left;line-height: 60px;background: #ffd100;margin: 10px 0;}
</style>