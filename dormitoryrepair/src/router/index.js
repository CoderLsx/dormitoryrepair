import { createRouter, createWebHistory } from "vue-router";
import login from "../views/login/login.vue";
import index from "../views/index/index.vue";
import maintenanceReport from "../views/maintenanceReport/maintenanceReport.vue";
import WXManagement from "../views/WXManagement/WXManagement.vue";
import studentManagement from "../views/studentManagement/studentManagement.vue";
import dormManagement from "../views/dormManagement/dormManagement.vue";
import workerManagement from "../views/workerManagement/workerManagement.vue";


const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/index",
    name: "index",
    component: index,
    children: [
      {
        path: "/index",
        redirect: "/index/maintenanceReport",
      },
      {
        path: "maintenanceReport",
        name: "maintenanceReport",
        component: maintenanceReport,
      },
      {
        path: "WXManagement",
        name: "WXManagement",
        component: WXManagement,
      },
      {
        path: "studentManagement",
        name: "studentManagement",
        component: studentManagement,
      },
      {
        path: "dormManagement",
        name: "dormManagement",
        component: dormManagement,
      },
      {
        path: "workerManagement",
        name: "workerManagement",
        component: workerManagement,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
