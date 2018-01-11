import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import Checklists from '@/components/Checklists'
import Manga from '@/components/Manga'
import Export from '@/components/Export'
import ExportForm from '@/components/Export/ExportForm'
import ExportSuccess from '@/components/Export/ExportSuccess'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/checklists',
      name: 'Checklists',
      component: Checklists
    },
    {
      path: '/checklists/:dateShort/mangas',
      name: 'Manga',
      component: Manga
    },
    {
      path: '/export',
      component: Export,
      children: [
        {
          path: '',
          name: 'Export',
          component: ExportForm
        },
        {
          path: 'success',
          name: 'ExportSuccess',
          component: ExportSuccess
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    setTimeout(() => { document.querySelector('main[role="main"]').scrollTop = 0 }, 100)
    return { x: 0, y: 0 }
  }
})
