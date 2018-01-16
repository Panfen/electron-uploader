import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import Upload from '@/components/LandingPage/Upload'
import Album from '@/components/LandingPage/Album'
import Setting from '@/components/LandingPage/Setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/upload'
    },
    {
      path: '/landingpage',
      component: LandingPage,
      children: [
        {
          path: '/upload',
          component: Upload
        },{
          path: '/album',
          component: Album
        },{
          path: '/setting',
          component: Setting
        }
      ]
    }
  ]
})
