<template>
  <component :is="props.is" v-bind="$attrs"></component>
</template>
<script setup lang="ts">
const props = defineProps<{
  is: string
}>()
</script>
<style scoped lang="scss"></style>
