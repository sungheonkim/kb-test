import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/patient/HomePage.vue';
import Medicine from '@/pages/patient/MedicinePage.vue';
import Prescription from '@/pages/patient/PrescriptionPage.vue';
import Mypage from '@/pages/patient/ProfilePage.vue';
import Login from '@/pages/login/LoginPageKakao.vue';
import LoginPageInfoMember from '@/pages/login/LoginPageInfoMember.vue';
import MedicineDetail from '@/pages/patient/MedicineDetail.vue';
import PrescriptionDetail from '@/pages/patient/PrescriptionDetail.vue';
import LoginPageInfoUser from '@/pages/login/LoginPageInfoUser.vue';
import LoginPageInfoUser2 from '@/pages/login/LoginPageInfoUser2.vue';
import LoginPageSuccess from '@/pages/login/LoginPageSuccess.vue';
import LoginPageDoctor from '@/pages/login/LoginPageDoctor.vue';
import LoginPageDoctor2 from '@/pages/login/LoginPageDoctor2.vue';
import LoginPagePharmacist from '@/pages/login/LoginPagePharmacist.vue';
import PharmacistPage from '@/pages/pharmacist/PharmacistPage.vue';
import PharmacistPageScanPayment from '@/pages/pharmacist/PharmacistPageScanPayment.vue';
import DoctorPage from '@/pages/doctor/DoctorPage.vue';
import DoctorFinalCheck from '@/pages/doctor/DoctorFinalCheck.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Home
    },
    {
      path: '/medicine',
      name: 'medicine',
      component: Medicine
    },
    {
      path: '/prescription',
      name: 'prescription',
      component: Prescription
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: Mypage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/login/member',
      name: 'loginPageInfoMember',
      component: LoginPageInfoMember
    },
    {
      path: '/login/bank_type',
      name: '/loginPageInfoUser',
      component: LoginPageInfoUser
    },
    {
      path: '/login/bank_id',
      name: '/loginPageInfoUser2',
      component: LoginPageInfoUser2
    },
    {
      path: '/login/doctor',
      name: '/loginPageDoctor',
      component: LoginPageDoctor
    },
    {
      path: '/login/doctor/license',
      name: '/loginPageDoctor2',
      component: LoginPageDoctor2
    },
    {
      path: '/login/pharmacist',
      name: '/LoginPagePharmacist',
      component: LoginPagePharmacist
    },
    {
      path: '/success',
      name: '/loginPageSuccess',
      component: LoginPageSuccess
    },
    {
      path: '/pharmacist',
      name: '/pharmacist',
      component: PharmacistPage
    },
    {
      path: '/pharmacist/:id',
      name: '/pharmacistPayment',
      component: PharmacistPageScanPayment
    },
    {
      path: '/doctor',
      name: '/doctorPage',
      component: DoctorPage
    },
    {
      path: '/doctor/check',
      name: '/doctorFinalCheck',
      component: DoctorFinalCheck
    },
    {
      path: '/medicine/:id',
      name: 'medicineDetail',
      component: MedicineDetail
    },
    {
      path: '/prescription/:id',
      name: 'PrescriptionDetail',
      component: PrescriptionDetail
    }
  ]
});

export default router;
