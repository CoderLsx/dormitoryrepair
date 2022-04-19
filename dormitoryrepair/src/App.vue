<template>
  <router-view></router-view>
</template>

<script>
import { ElMessage } from "element-plus";

const open2 = () => {
  ElMessage({
    message: "您的身份无权限访问",
    type: "error",
    center: true,
  });
};
export default {
  el: "",
  components: {},
  data() {
    return {};
  },
  methods: {},
  watch: {
    // 监听路由的跳转
    "$route.path": function (newValue, oldValue) {
      if (newValue != "/login") {
        // 若没登录，跳转至登录界面
        if (this.$store.state.token == null) {
          this.$router.replace("/login");
        }
        // 若为学生，跳转无权限页面返回至上报页面
        else if (this.$store.state.token.level == 0) {
          if (newValue != "/index/maintenanceReport") {
            this.$router.replace("/index/maintenanceReport");
            console.log(oldValue);
            open2();
          } else {
            console.log(newValue);
            console.log(oldValue);
          }
        }
        // 若为维修工，跳转无权限页面返回至上报页面
        else if (this.$store.state.token.level == 1) {
          if (
            newValue != "/index/WXManagement" &&
            newValue != "/index/maintenanceReport"
          ) {
            this.$router.replace("/index/maintenanceReport");
            open2();
          }
        }
        // 若为学校管理员，跳转无权限页面返回至上报页面
        else if (this.$store.state.token.level == 2) {
          if (newValue == "/index/workerManagement") {
            this.$router.replace("/index/maintenanceReport");
            open2();
          }
        }
      }
    },
  },
};
</script>

<style scoped></style>
