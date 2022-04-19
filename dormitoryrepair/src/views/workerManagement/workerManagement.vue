<template>
  <el-button id="addWorker" type="primary" size="large" @click="addWorker()"
    >添加维修工</el-button
  >
  <el-table :data="filterTableData" style="width: 100%" height="90%">
    <el-table-column
      prop="jobNumber"
      label="工号"
      min-width="80"
      align="center"
    />
    <el-table-column
      prop="workerName"
      label="姓名"
      min-width="80"
      align="center"
    />
    <el-table-column
      prop="workerSex"
      label="性别"
      min-width="80"
      align="center"
    />
    <el-table-column
      prop="workerPhoneNumber"
      label="维修号码"
      min-width="80"
      align="center"
    />
    <el-table-column
      prop="workType"
      label="工种"
      min-width="100"
      align="center"
    />
    <el-table-column align="center" min-width="100">
      <template #header>
        <el-input v-model="search" size="small" placeholder="搜索维修工信息" />
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
    <submit-worker
      @goback="goback"
      @submit="updata"
      :workerform="form"
    ></submit-worker>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";
import request from "../../utils/http";
import submitWorker from "./submitWorker/submitWorker.vue";

const open1 = () => {
  ElMessage({
    message: "编辑成功",
    type: "success",
    center: true,
  });
};

export default {
  el: "",
  components: {
    ElMessage,
    ElMessageBox,
    submitWorker,
  },
  data() {
    return {
      tableData: [],
      search: "",
      total: 1,
      pageSize: 20,
      openTrigger: 0,
      isupdata: 0,
      form: "",
    };
  },
  methods: {
    changePage(val) {
      console.log(val);
      this.$axios({
        url:
          "qryMaintenanceWorker?curPage=" + val + "&pageSize=" + this.pageSize,
      })
        .then((res) => {
          console.log(res);
          this.tableData = res.data.retList;
          this.total = res.data.totalRow;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleEdit(index) {
      this.openTrigger = 1;
      this.form = {
        jobNumber: this.tableData[index].jobNumber,
        workerName: this.tableData[index].workerName,
        workerSex: this.tableData[index].workerSex,
        workerPhoneNumber: this.tableData[index].workerPhoneNumber,
        workType: this.tableData[index].workType,
      };
    },
    handleDelete(index) {
      ElMessageBox.confirm("确定要删除该员工信息吗?", "删除", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          request.delete({
            url:
              "/deleteMaintenanceWorker?jobNumber=" +
              this.tableData[index].jobNumber,
            success: (res) => {
              ElMessage({
                type: "success",
                message: "删除成功",
              });
              request.get({
                url:
                  "qryMaintenanceWorker?curPage=" +
                  this.page +
                  "&pageSize=" +
                  this.pageSize,
                success: (res) => {
                  for (let i in res.data.retList) {
                    if (res.data.retList[i].workerSex == 1) {
                      res.data.retList[i].workerSex = "男";
                    } else {
                      res.data.retList[i].workerSex = "女";
                    }
                  }
                  this.tableData = res.data.retList;
                  this.total = res.data.totalRow;
                  console.log(res);
                },
                fail: (err) => {
                  console.log(err);
                },
              });
            },
            fail: (err) => {
              console.log(err);
            },
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消操作",
          });
        });
    },
    addWorker() {
      this.openTrigger = 1;
    },
    goback(isGoback) {
      this.openTrigger = isGoback;
      this.form = "";
    },
    updata(isSubmit, isGoback) {
      this.isupdata = isSubmit;
      if (this.isupdata) {
        // console.log(isSubmit);
        request.get({
          url:
            "/Maintenance/qryMaintenanceWorker?curPage=" +
            this.page +
            "&pageSize=" +
            this.pageSize,
          success: (res) => {
            console.log(res);

            for (let i in res.data.retList) {
              if (res.data.retList[i].workerSex == 1) {
                res.data.retList[i].workerSex = "男";
              } else {
                res.data.retList[i].workerSex = "女";
              }
            }
            this.tableData = res.data.retList;
            this.total = res.data.totalRow;

            this.openTrigger = isGoback;
            open1();
          },
          fail: (err) => {
            console.log(err);
          },
        });
      }
    },
  },
  computed: {
    filterTableData() {
      return this.tableData.filter(
        (data) =>
          !this.search ||
          data.jobNumber.toLowerCase().includes(this.search.toLowerCase()) ||
          data.workerName.toLowerCase().includes(this.search.toLowerCase()) ||
          data.workerSex.toLowerCase().includes(this.search.toLowerCase()) ||
          data.workerType.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  created() {
    this.$axios({
      url:
        "/Maintenance/qryMaintenanceWorker?curPage=" +
        this.page +
        "&pageSize=" +
        this.pageSize,
    })
      .then((res) => {
        console.log(res);
        for (let i in res.data.retList) {
          if (res.data.retList[i].workerSex == 1) {
            res.data.retList[i].workerSex = "男";
          } else {
            res.data.retList[i].workerSex = "女";
          }
        }
        this.tableData = res.data.retList;
        this.total = res.data.totalRow;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style src="./workerManagement.css" scoped></style>
