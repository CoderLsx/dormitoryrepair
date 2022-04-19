<template>
  <div id="background" />
  <div class="login_table">
    <h2>宿舍报修</h2>
    <el-form label-width="120px" v-if="isadmin">
      <el-form-item label="账号" prop="name">
        <el-input type="text" v-model="userName" />
      </el-form-item>
      <el-form-item label="密码" prop="name">
        <el-input type="password" v-model="passWord" />
      </el-form-item>
      <el-form-item label="身份" prop="name">
        <el-select v-model="select" placeholder="Select" style="width: 200px">
          <el-option label="学生" value="0" />
          <el-option label="维修员" value="1" />
          <el-option label="管理员" value="2" />
          <el-option label="超级管理员" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "../../utils/http";
import { ElMessage } from "element-plus";

const open2 = () => {
  ElMessage({
    message: "用户名或密码错误",
    type: "error",
    center: true,
  });
};
export default {
  data() {
    return {
      userName: "",
      passWord: "",
      isadmin: true,
      select: "学生",
      level: "",
    };
  },
  methods: {
    login() {
      if (this.select == "学生") {
        this.level = 0;
      } else {
        this.level = this.select;
      }
      request.post({
        url: "/Login/userLogin",
        data: {
          level: this.level,
          loginNo: this.userName,
          password: this.passWord,
        },
        success: (res) => {
          if (res.data.retCode == "00000") {
            this.$store.commit("Login", res.data.retList[0]);
            // console.log(res.data.retList[0]);
            this.$router.push("./index");
          } else if (
            res.data.retCode == "A0201" ||
            res.data.retCode == "A0120"
          ) {
            console.log("用户名不存在");
            open2();
          }
          console.log(res);
        },
        fail: (err) => {
          console.log(err);
          console.log(this.select);
        },
      });
    },
  },
};
</script>
<style src="./login.css" scoped></style>
