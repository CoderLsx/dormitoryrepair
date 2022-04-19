<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="1"
          text-color="#fff"
        >
          <el-menu-item index="1" @click="go(1)" v-if="access.student">
            <el-icon><pointer /></el-icon>
            <span>{{ title.title1 }}</span>
          </el-menu-item>
          <el-menu-item index="2" @click="go(2)" v-if="access.worker">
            <el-icon><tickets /></el-icon>
            <span>{{ title.title2 }}</span>
          </el-menu-item>
          <el-sub-menu index="3" v-if="access.schoolAdmin">
            <template #title>
              <el-icon><document /></el-icon>
              <span>{{ title.title3 }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="go(3)">
                <el-icon><avatar /></el-icon>
                <span>学生信息管理</span>
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <el-menu-item index="3-2" @click="go(4)">
                <el-icon><house /></el-icon>
                <span>宿舍信息管理</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="4" @click="go(5)" v-if="access.superAdmin">
            <el-icon><files /></el-icon>
            <span>{{ title.title4 }}</span>
          </el-menu-item>
          <!-- <el-menu-item index="0" id="logout" @click="logout">注销</el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header">
            <!-- <span id="headerTitle">{{ title.title1 }}</span> -->
            <span id="logout" @click="go(0)">注销</span>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {
  Pointer,
  Document,
  Location,
  House,
  Avatar,
  Tickets,
  Files,
} from "@element-plus/icons-vue";
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
  components: {
    Location,
    Pointer,
    Document,
    House,
    Avatar,
    Tickets,
    Files,
  },
  data() {
    return {
      formLabelAlign: {
        name: "",
        num: "",
        phone: "",
        dorNum: "",
        select: "",
      },
      title: {
        title1: "维修上报",
        title2: "报修管理",
        title3: "信息管理",
        title4: "维修工分类维护",
      },
      path: [
        "/login",
        "/index/maintenanceReport",
        "/index/WXManagement",
        "/index/studentManagement",
        "/index/dormManagement",
        "/index/workerManagement",
      ],
      access: {
        student: 0,
        worker: 0,
        schoolAdmin: 0,
        superAdmin: 0,
      },
    };
  },
  methods: {
    go(i) {
      // if (i == 0) {
      //   this.$store.commit("Logout");
      // }
      // if (this.$store.state.token.level == 0) {
      //   this.access.student = 1;
      // } else if (this.$store.state.token.level == 1) {
      //   if (i <= 2) {
      //     this.$router.push(this.path[i]);
      //   } else {
      //     open2();
      //   }
      // } else if (this.$store.state.token.level == 2) {
      //   if (i <= 4) {
      //     this.$router.push(this.path[i]);
      //   } else {
      //     open2();
      //   }
      // } else {

      // }
      this.$router.push(this.path[i]);
    },
  },
  created() {
    if (this.$store.state.token.level == 0) {
      this.access.student = 1;
    } else if (this.$store.state.token.level == 1) {
      this.access.student = 1;
      this.access.worker = 1;
    } else if (this.$store.state.token.level == 2) {
      this.access.student = 1;
      this.access.worker = 1;
      this.access.schoolAdmin = 1;
    } else if (this.$store.state.token.level == 3) {
      this.access.student = 1;
      this.access.worker = 1;
      this.access.schoolAdmin = 1;
      this.access.superAdmin = 1;
    }
  },
};
</script>
<style src="./index.css" scoped></style>
