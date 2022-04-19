<template>
  <el-button id="addStudent" type="primary" size="large" @click="addStudent()"
    >添加学生</el-button
  >
  <el-table :data="filterTableData" style="width: 100%" height="90%">
    <el-table-column
      prop="studentID"
      label="学生学号"
      min-width="80"
      align="center"
    />
    <el-table-column
      prop="studentName"
      label="学生姓名"
      min-width="80"
      align="center"
    />
    <el-table-column
      prop="studentSex"
      label="学生性别"
      min-width="80"
      align="center"
    />
    <el-table-column
      prop="phoneNumber"
      label="电话号码"
      min-width="80"
      align="center"
    />
    <el-table-column
      prop="speciality"
      label="专业"
      min-width="100"
      align="center"
    />
    <el-table-column prop="class" label="班级" min-width="80" align="center" />
    <el-table-column
      prop="counsellorName"
      label="辅导员"
      min-width="80"
      align="center"
    />
    <el-table-column
      prop="schoolName"
      label="学校名称"
      min-width="100"
      align="center"
    />
    <el-table-column
      prop="schoolCampus"
      label="校区"
      min-width="100"
      align="center"
    />
    <el-table-column align="center" min-width="180">
      <template #header>
        <el-input v-model="search" size="small" placeholder="搜索学生信息" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index)"
          >编辑信息</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    :page-size="pageSize"
    @current-change="changePage"
  />
  <div id="trigger" v-if="openTrigger">
    <submit-student @goback="goback" :workerform="form"></submit-student>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";
import submitStudent from "./submitStudent/submitStudent.vue";
export default {
  el: "",
  components: {
    ElMessage,
    ElMessageBox,
    submitStudent,
  },
  data() {
    return {
      tableData: [
        {
          studentID: "18240131",
          studentName: "林鑫",
          studentSex: "男",
          phoneNumber: "10022286",
          speciality: "软件工程(嵌入式培养)",
          class: "182401",
          counsellorName: "王建华",
          schoolName: "南京邮电大学",
          schoolCampus: "扬州校区",
        },
        {
          studentID: "18240130",
          studentName: "郁蒋辉",
          studentSex: "男",
          phoneNumber: "10086",
          speciality: "软件工程(嵌入式培养)",
          class: "182401",
          counsellorName: "王建华",
          schoolName: "南京邮电大学",
          schoolCampus: "扬州校区",
        },
      ],
      search: "",
      total: 1,
      pageSize: 20,
      openTrigger: 0,
      isupdata: 0,
      form: "",
    };
  },
  methods: {
    handleEdit(index) {
      // this.$router.push(
      //   "/index/submitStudent/" + this.tableData[index].studentID
      // );
      this.openTrigger = 1;
      this.form = {
        studentID: this.tableData[index].studentID,
        studentName: this.tableData[index].studentName,
        studentSex: this.tableData[index].studentSex,
        phoneNumber: this.tableData[index].phoneNumber,
        speciality: this.tableData[index].speciality,
        class: this.tableData[index].class,
        counsellorName: this.tableData[index].counsellorName,
        schoolName: this.tableData[index].schoolName,
        schoolCampus: this.tableData[index].schoolCampus,
      };
    },
    handleDelete(index) {
      ElMessageBox.confirm("确定要删除该学生信息吗?", "删除", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ElMessage({
            type: "success",
            message: "删除成功",
          });
          this.tableData.splice(index, 1);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消操作",
          });
        });
    },
    addStudent() {
      // this.$router.push("/index/submitStudent/newStudent");
      this.openTrigger = 1;
    },
    goback(isGoback) {
      this.openTrigger = isGoback;
      this.form = "";
    },
    changePage() {},
  },
  computed: {
    filterTableData() {
      return this.tableData.filter(
        (data) =>
          !this.search ||
          data.studentID.toLowerCase().includes(this.search.toLowerCase()) ||
          data.studentName.toLowerCase().includes(this.search.toLowerCase()) ||
          data.studentSex.toLowerCase().includes(this.search.toLowerCase()) ||
          data.speciality.toLowerCase().includes(this.search.toLowerCase()) ||
          data.counsellorName
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          data.schoolName.toLowerCase().includes(this.search.toLowerCase()) ||
          data.schoolCampus.toLowerCase().includes(this.search.toLowerCase()) ||
          data.phoneNumber.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
};
</script>

<style src="./studentManagement.css" scoped></style>
