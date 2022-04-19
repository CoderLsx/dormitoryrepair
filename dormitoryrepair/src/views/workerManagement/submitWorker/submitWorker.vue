<template>
  <div class="formTable">
    <el-page-header :icon="ArrowLeft" title="返回" @click="goBack()" />
    <h3>编辑员工信息</h3>
    <el-form :model="form" label-width="100px" label-position="right">
      <el-form-item label="工号">
        <el-input v-model="form.jobNumber" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.workerName" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.workerSex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="维修号码">
        <el-input v-model="form.workerPhoneNumber" />
      </el-form-item>
      <el-form-item label="工种">
        <el-input v-model="form.workType" />
      </el-form-item>
    </el-form>
    <div id="btndiv">
      <el-button type="primary" @click="onSubmit">编辑员工</el-button>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { ArrowLeft } from "@element-plus/icons-vue";
import request from "../../../utils/http";
// const open1 = () => {
//   ElMessage({
//     message: "编辑成功",
//     type: "success",
//     center: true,
//   });
// };

const open2 = () => {
  ElMessage({
    message: "编辑失败",
    type: "error",
    center: true,
  });
};

const open3 = () => {
  ElMessage({
    message: "工号不能修改",
    type: "error",
    center: true,
  });
};
export default {
  el: "",
  components: {},
  props: ["workerform"],
  data() {
    return {
      form: {
        jobNumber: "",
        workerName: "",
        workerSex: 1,
        workerPhoneNumber: "",
        workType: "",
      },
      isNewWorker: true,
      isGoback: 0,
      isSubmit: 1,
    };
  },
  setup(props, context) {
    return {
      ArrowLeft,
    };
  },
  methods: {
    onSubmit() {
      if (this.isNewWorker) {
        request.post({
          url: "/Maintenance/addMaintenanceWorker",
          data: {
            jobNumber: this.form.jobNumber,
            workType: this.form.workType,
            workerName: this.form.workerName,
            workerPhoneNumber: this.form.workerPhoneNumber,
            workerSex: this.form.workerSex,
          },
          success: (res) => {
            console.log(res);
            if (res.data.retCode == "000000") {
              // open1();
              this.$emit("submit", [this.isSubmit, this.isGoback]);
            }
          },
          fail: (err) => {
            console.log(err);
            open2();
          },
        });
      } else {
        request.put({
          url: "/Maintenance/updateMaintenanceWorker",
          data: {
            jobNumber: this.form.jobNumber,
            workType: this.form.workType,
            workerName: this.form.workerName,
            workerPhoneNumber: this.form.workerPhoneNumber,
            workerSex: this.form.workerSex,
          },
          success: (res) => {
            console.log(res);
            console.log(this.form.workerSex);
            if (res.data.retCode == "999999") {
              open3();
              this.form.jobNumber = this.workerform.jobNumber;
            } else {
              this.$emit("submit", [this.isSubmit, this.isGoback]);
            }
          },
          fail: (err) => {
            console.log(err);
            open2();
          },
        });
      }
    },
    goBack() {
      // this.$router.push("/index/workerManagement");
      this.$emit("goback", this.isGoback);
    },
  },
  created() {
    if (this.workerform != "") {
      this.isNewWorker = false;
      console.log("this is old");
      console.log(this.isNewWorker);
      console.log(this.$route.query);
      this.form.jobNumber = this.workerform.jobNumber;
      this.form.workerName = this.workerform.workerName;
      if (this.workerform.workerSex == "男") {
        this.form.workerSex = 1;
      } else {
        this.form.workerSex = 0;
      }
      this.form.workerPhoneNumber = this.workerform.workerPhoneNumber;
      this.form.workType = this.workerform.workType;
    } else {
      console.log("this is new");
    }
  },
};
</script>

<style src="./submitWorker.css" scoped></style>
