<template>
  <!-- 分页组件 -->
  <el-pagination class="pagination" :current-page="pageable.pageNum" :page-size="pageable.pageSize"
    :page-sizes="[10, 25, 50, 100]" :background="true" layout="total, sizes, prev, pager, next, jumper"
    :total="pageable.total" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
</template>

<script setup lang="ts" name="Pagination">
interface Pageable {
  pageNum: number
  pageSize: number
  total: number
}

interface PaginationProps {
  pageable: Pageable
  handleSizeChange: (size: number) => void
  handleCurrentChange: (currentPage: number) => void
}

defineProps<PaginationProps>()
</script>

<style lang="scss">
@import '../style/index';
</style>
