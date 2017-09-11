import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
const Index = r => require.ensure([], () => r(require('@/components/index.vue')), 'Index')
const Login = r => require.ensure([], () => r(require('@/components/login.vue')), 'Login')
const Works = r => require.ensure([], () => r(require('@/components/works.vue')), 'Works')
const Article = r => require.ensure([], () => r(require('@/components/article.vue')), 'Article')
const Register = r => require.ensure([], () => r(require('@/components/register.vue')), 'Register')
const List = r => require.ensure([], () => r(require('@/components/list.vue')), 'List')
const User = r => require.ensure([], () => r(require('@/components/user.vue')), 'User')
const Particular = r => require.ensure([], () => r(require('@/components/particular.vue')), 'Particular')
const Seek = r => require.ensure([], () => r(require('@/components/seek.vue')), 'Seek')
const Oar = r => require.ensure([], () => r(require('@/components/oar.vue')), 'Oar')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: Hello,
      children:[
             {path:'/',component:Index,
              children:[{path:'/',component:List}]
             },
             {path:'/works',component:List,
             children:[
              {path:'/works/all',component:List},
              {path:'/works/cartoon',component:List},
              {path:'/works/abbr',component:List},
              {path:'/works/plane',component:List},
              {path:'/works/webpage',component:List},
              {path:'/works/ikon',component:List},
              {path:'/works/photography',component:List},
              {path:'/works/space',component:List},
              {path:'/works/product',component:List},
              {path:'/works/three',component:List},
              {path:'/works/films',component:List},
              {path:'/works/handicarft',component:List},
              {path:'/works/art',component:List},
              {path:'/works/clothing',component:List},
              {path:'/works/rest',component:List}, 
             ]           
             },
             {path:'/article',component:Article,
              children:[{path:'/article',component:List}]
             },
      ]
    },
    {
    path:'/login',
    name:'login',
    component:Login
    },
    {
    	path:'/register',
    	name:'register',
    	component:Register
    },
    {
    	path:'/user',
    	name:'user',
    	component:User
    },
    {
    	path:'/particular/:works',
      name:'particular',
      component:Particular
    },
    {
    	path:'/seek/:value',
      name:'seek',
      component:Seek
    },
    {
    	path:'/oar',
    	name:'oar',
    	component:Oar
    }
  ]
})
