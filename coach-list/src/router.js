import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './components/coaches/CoachesList.vue';
import CoachDetail from './components/coaches/CoachDetail.vue';
import CoachRegistration from './components/coaches/CoachRegistration.vue';
import ContactCoach from './components/requests/ContactCoach.vue';
import RequestsList from './components/requests/RequestsList.vue';
import NotFound from './components/NotFound.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches'},
        { path: '/coaches', component: CoachesList },
        {
            path: '/coaches/:id',
            component: CoachDetail,
            props: true,
            children: [
              { path: 'contact', component: ContactCoach } // /coaches/c1/contact
            ]
        },
        { path: '/coaches/:id/contact', component: ContactCoach },
        { path: '/register', component: CoachRegistration },
        { path: '/requests', component: RequestsList },
        { path: '/:notFound(.*)', component: NotFound }
    ]
});

export default router;