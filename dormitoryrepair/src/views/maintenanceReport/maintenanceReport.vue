<template>
  <div class="demo-shadow">
    <h3>维修上报</h3>
    <el-form label-width="100px" :model="formLabelAlign">
      <el-form-item label="姓名">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="formLabelAlign.num" />
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="formLabelAlign.phone" />
      </el-form-item>
      <el-form-item label="宿舍号">
        <el-input v-model="formLabelAlign.dorNum" />
      </el-form-item>
      <el-form-item label="维修分类" prop="name">
        <el-select
          v-model="formLabelAlign.select"
          placeholder="维修种类"
          style="width: 100%"
        >
          <el-option label="水" value="1" />
          <el-option label="电" value="2" />
          <el-option label="暖" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="维修详细">
        <el-input
          rows="5"
          resize="none"
          type="textarea"
          v-model="formLabelAlign.detailed"
        />
      </el-form-item>
    </el-form>
    <div id="btndiv">
      <el-button type="primary" @click="onSubmit">上报</el-button>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
const open2 = () => {
  ElMessage({
    showClose: true,
    message: "上报成功",
    type: "success",
    center: true,
  });
};
export default {
  el: "",
  components: {},
  data() {
    return {
      formLabelAlign: {
        name: "",
        num: "",
        phone: "",
        dorNum: "",
        select: "",
        detailed: "",
      },
    };
  },
  methods: {
    send() {
      open2();
    },
    onSubmit() {},
  },
};
</script>

<style src="./maintenanceReport.css" scoped></style>
