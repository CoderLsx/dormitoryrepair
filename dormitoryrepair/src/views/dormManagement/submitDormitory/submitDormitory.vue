<template>
  <div class="formTable">
    <el-page-header :icon="ArrowLeft" title="返回" @click="goBack()" />
    <h3>编辑宿舍信息</h3>
    <el-form :model="form" label-width="100px" label-position="right">
      <el-form-item label="校区">
        <el-input v-model="form.schoolCampus" />
      </el-form-item>
      <el-form-item label="楼号">
        <el-input v-model="form.buildingNo" />
      </el-form-item>
      <el-form-item label="宿舍号">
        <el-input v-model="form.dormitoryNo" />
      </el-form-item>
    </el-form>
    <div id="btndiv">
      <el-button type="primary" @click="onSubmit">编辑宿舍</el-button>
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
        schoolCampus: "扬州校区",
        buildingNo: "八号楼",
        dormitoryNo: "8134",
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
      // this.$router.push("/index/dormManagement");
      this.$emit("goback", this.isGoback);
    },
  },
  created() {
    if (this.workerform != "") {
      this.form.schoolCampus = this.workerform.schoolCampus;
      this.form.buildingNo = this.workerform.buildingNo;
      this.form.dormitoryNo = this.workerform.dormitoryNo;
    }
  },
};
</script>

<style src="./submitDormitory.css" scoped></style>
