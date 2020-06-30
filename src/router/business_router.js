const businessRouter = [{
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/bpmn',
    name: 'bpmn',
    component: () => import('@/views/bpmn/index.vue'),
  }
]
export default businessRouter;