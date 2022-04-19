<template>
  <div class="formTable">
    <el-page-header :icon="ArrowLeft" title="返回" @click="goBack()" />
    <h3>编辑学生信息</h3>
    <el-form :model="form" label-width="100px" label-position="right">
      <el-form-item label="学生学号">
        <el-input v-model="form.studentID" />
      </el-form-item>
      <el-form-item label="学生姓名">
        <el-input v-model="form.studentName" />
      </el-form-item>
      <el-form-item label="学生性别">
        <el-radio-group v-model="form.studentSex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.phoneNumber" />
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="form.speciality" />
      </el-form-item>
      <el-form-item label="辅导员">
        <el-input v-model="form.class" />
      </el-form-item>
      <el-form-item label="学校名称">
        <el-input v-model="form.counsellorName" />
      </el-form-item>
      <el-form-item label="校区">
        <el-input v-model="form.schoolName" />
      </el-form-item>
    </el-form>
    <div id="btndiv">
      <el-button type="primary" @click="onSubmit">编辑学生</el-button>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { ArrowLeft } from "@element-plus/icons-vue";
const open1 = () => {
  ElMessage({
    message: "编辑成功",
    type: "success",
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
        studentID: "",
        studentName: "",
        studentSex: 1,
        phoneNumber: "",
        speciality: "",
        class: "",
        counsellorName: "",
        schoolName: "",
        schoolCampus: "",
      },
    };
  },
  setup(props, context) {
    return {
      ArrowLeft,
    };
  },
  methods: {
    onSubmit() {
      open1();
    },
    goBack() {
      // this.$router.push("/index/studentManagement");
      this.$emit("goback", this.isGoback);
    },
  },
  created() {
    if (this.workerform != "") {
      this.form.studentID = this.workerform.studentID;
      this.form.studentName = this.workerform.studentName;
      if (this.workerform.studentSex == "男") {
        this.form.studentSex = 1;
      } else {
        this.form.studentSex = 0;
      }
      this.form.phoneNumber = this.workerform.phoneNumber;
      this.form.speciality = this.workerform.speciality;
      this.form.class = this.workerform.class;
      this.form.counsellorName = this.workerform.counsellorName;
      this.form.schoolName = this.workerform.schoolName;
      this.form.schoolCampus = this.workerform.schoolCampus;
    }
  },
};
</script>

<style src="./submitStudent.css" scoped></style>
