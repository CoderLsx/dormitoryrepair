<template>
  <el-table :data="tableData" style="width: 100%" height="90%">
    <el-table-column
      prop="name"
      label="上报人"
      min-width="100"
      align="center"
    />
    <el-table-column
      prop="number"
      label="学号"
      min-width="100"
      align="center"
    />
    <el-table-column
      prop="phone"
      label="联系方式"
      min-width="100"
      align="center"
    />
    <el-table-column
      prop="dorNum"
      label="宿舍号"
      min-width="100"
      align="center"
    />
    <el-table-column
      prop="select"
      label="维修分类"
      min-width="100"
      align="center"
    />
    <el-table-column prop="detailed" label="维修详细" min-width="180" />
    <el-table-column
      prop="worker"
      label="维修工"
      min-width="100"
      align="center"
    />
    <el-table-column
      prop="repaired"
      label="维修进度"
      min-width="100"
      align="center"
    >
      <template #default="scope">
        <el-tag
          class="ml-2"
          type="success"
          v-if="tableData[scope.$index].repaired"
          >已修理
        </el-tag>
        <el-tag class="ml-2" type="danger" v-else>未修理</el-tag>
      </template>
    </el-table-column>
    <el-table-column min-width="150" align="center">
      <template #header>
        <el-input v-model="search" size="small" placeholder="搜索" />
      </template>
      <template #default="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index)"
          type="primary"
          :disabled="tableData[scope.$index].repaired"
        >
          已修理
        </el-button>
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
</template>

<script>
export default {
  el: "",
  components: {},
  data() {
    return {
      tableData: [
        {
          name: "郁蒋晖",
          number: "18240130",
          phone: "10086",
          dorNum: "8134",
          select: "暖",
          detailed: "空调坏了",
          repaired: false,
          worker: "林鑫",
        },
      ],
      total: 1,
      pageSize: 20,
      search: "",
    };
  },
  methods: {
    handleEdit(index) {
      this.tableData[index].repaired = true;
    },
    changePage() {},
  },
};
</script>

<style src="./WXManagement.css" scoped></style>
