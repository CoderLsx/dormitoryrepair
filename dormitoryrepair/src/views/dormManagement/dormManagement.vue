<template>
  <el-button id="addDorm" type="primary" size="large" @click="addDromitory()"
    >添加宿舍</el-button
  >
  <el-table :data="filterTableData" style="width: 100%" height="90%">
    <el-table-column
      prop="schoolCampus"
      label="校区"
      min-width="80"
      align="center"
    />
    <el-table-column
      prop="buildingNo"
      label="楼号"
      min-width="80"
      align="center"
    />
    <el-table-column
      prop="dormitoryNo"
      label="宿舍号"
      min-width="80"
      align="center"
    />
    <el-table-column align="center" min-width="80">
      <template #header>
        <el-input v-model="search" size="small" placeholder="搜索宿舍信息" />
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
    <submit-dormitory @goback="goback" :workerform="form"></submit-dormitory>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";
import submitDormitory from "./submitDormitory/submitDormitory.vue";
export default {
  el: "",
  components: {
    ElMessage,
    ElMessageBox,
    submitDormitory,
  },
  data() {
    return {
      tableData: [
        {
          schoolCampus: "扬州校区",
          buildingNo: "八号楼",
          dormitoryNo: "8134",
        },
      ],
      total: 1,
      pageSize: 20,
      search: "",
      openTrigger: 0,
      isupdata: 0,
      form: "",
    };
  },
  methods: {
    handleEdit(index) {
      this.openTrigger = 1;
      this.form = {
        schoolCampus: this.tableData[index].schoolCampus,
        buildingNo: this.tableData[index].buildingNo,
        dormitoryNo: this.tableData[index].dormitoryNo,
      };
    },
    handleDelete(index) {
      ElMessageBox.confirm("确定要删除该宿舍信息吗?", "删除", {
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
    addDromitory() {
      // this.$router.push("/index/submitDormitory/newDromitory");
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
          data.schoolCampus.toLowerCase().includes(this.search.toLowerCase()) ||
          data.buildingNo.toLowerCase().includes(this.search.toLowerCase()) ||
          data.dormitoryNo.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
};
</script>

<style src="./dormManagement.css" scoped></style>
