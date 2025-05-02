import { createRouter, createWebHashHistory } from 'vue-router';

// Компоненты для маршрутов
import TaskList from '../views/TaskList.vue';
import TaskDetails from '../views/TaskDetails.vue';
import SolutionView from '../views/SolutionView.vue';
import CommentsList from '../views/CommentsList.vue';
import Leaderboard from '../views/Leaderboard.vue';
import ActivityCalendar from '../views/ActivityCalendar.vue';
import Mentorship from '../views/Mentorship.vue';
import Career from '../views/Career.vue'; // Основной компонент Карьеры

// Подкомпоненты для модуля Mentorship
import MentorsList from '../views/mentorship/MentorsList.vue';
import MentorSlots from '../views/mentorship/MentorSlots.vue';
import MentorSessions from '../views/mentorship/MentorSessions.vue';
import MentorReviews from '../views/mentorship/MentorReviews.vue';

// Подкомпоненты для модуля Career
import ConsultantsList from '../views/career/ConsultantsList.vue'; // НОВЫЙ ИМПОРТ
import VacanciesList from '../views/career/VacanciesList.vue';
import UserRecommendations from '../views/career/UserRecommendations.vue';
import UserProfile from '../views/career/UserProfile.vue';


const routes = [
  {
    path: '/',
    redirect: '/tasks'
  },
  {
    path: '/tasks',
    name: 'TaskList',
    component: TaskList
  },
  {
    path: '/tasks/:id',
    name: 'TaskDetails',
    component: TaskDetails,
    props: true
  },
  {
    path: '/solutions/:taskId',
    name: 'SolutionView',
    component: SolutionView,
    props: true
  },
  {
    path: '/tasks/:id/comments',
    name: 'CommentsList',
    component: CommentsList,
    props: true
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: Leaderboard
  },
  {
    path: '/activity',
    name: 'ActivityCalendar',
    component: ActivityCalendar
  },
  {
    path: '/mentorship',
    component: Mentorship,
    children: [
      {
        path: '',
        redirect: { name: 'MentorsList' }
      },
      {
        path: 'mentors',
        name: 'MentorsList',
        component: MentorsList
      },
      {
        path: 'slots',
        name: 'MentorSlots',
        component: MentorSlots
      },
      {
        path: 'sessions',
        name: 'MentorSessions',
        component: MentorSessions
      },
      {
        path: 'reviews',
        name: 'MentorReviews',
        component: MentorReviews
      }
    ]
  },
  {
    path: '/career',
    component: Career,
    children: [ // Дочерние маршруты для Карьеры
      {
        path: '', // Пустой путь будет перенаправлять на консультантов
        redirect: { name: 'ConsultantsList' }
      },
      { // НОВЫЙ МАРШРУТ
        path: 'consultants',
        name: 'ConsultantsList',
        component: ConsultantsList
      },
      {
        path: 'vacancies',
        name: 'VacanciesList',
        component: VacanciesList
      },
      {
        path: 'recommendations',
        name: 'UserRecommendations',
        component: UserRecommendations
      },
      {
        path: 'profile',
        name: 'UserProfile',
        component: UserProfile
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;