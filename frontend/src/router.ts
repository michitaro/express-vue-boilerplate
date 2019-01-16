import Vue from 'vue';
import Router from 'vue-router';
import { session } from './session';
import LogIn from "./views/LogIn.vue";
import Home from './views/Home.vue';


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn,
      meta: { public: true },
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  console.log('beforeeach')
  if (!session.loggedIn && to.matched.every(r => !r.meta.public)) {
    console.log('session refresh')
    const { error } = await session.refresh()
    if (error)
      return next({ name: 'login' })
  }
  next()
})

export default router