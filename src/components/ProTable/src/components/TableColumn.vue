<template>
  <component :is="renderLoop(column)"></component>
</template>
<script lang="tsx" setup name="TableColumn">
import { inject, ref, useSlots } from 'vue'
import { ColumnProps } from '../types'
import { filterEnum, formatValue, handleRowAccordingToProp } from '../utils'

defineProps<{ column: ColumnProps }>()

const slots = useSlots()

const enumMap = inject('enumMap', ref(new Map()))

// 渲染表格数据
const renderCellData = (item: ColumnProps, scope: { [key: string]: any }) => {
  return enumMap.value.get(item.prop) && item.isFilterEnum
    ? filterEnum(
      handleRowAccordingToProp(scope.row, item.prop!),
      enumMap.value.get(item.prop)!,
      item.fieldNames,
    )
    : formatValue(handleRowAccordingToProp(scope.row, item.prop!))
}

// 获取 tag 类型
const getTagType = (item: ColumnProps, scope: { [key: string]: any }) => {
  return filterEnum(
    handleRowAccordingToProp(scope.row, item.prop!),
    enumMap.value.get(item.prop),
    item.fieldNames,
    'tag',
  ) as any
}

const renderLoop = (item: ColumnProps) => {
  return (
    <>
      {item.isShow && (
        <el-table-column
          {...item}
          align={item.align ?? 'center'}
          showOverflowTooltip={
            item.showOverflowTooltip ?? item.prop !== 'operation'
          }
        >
          {{
            default: (scope: any) => {
              if (item._children)
                return item._children.map((child) => renderLoop(child))
              if (item.render) return item.render(scope)
              if (slots[item.prop!]) return slots[item.prop!]!(scope)
              if (item.tag)
                return (
                  <el-tag type={getTagType(item, scope)}>
                    {renderCellData(item, scope)}
                  </el-tag>
                )
              return renderCellData(item, scope)
            },
            header: () => {
              if (item.headerRender) return item.headerRender(item)
              if (slots[`${item.prop}Header`])
                return slots[`${item.prop}Header`]!({ row: item })
              return item.label
            },
          }}
        </el-table-column>
      )}
    </>
  )
}
</script>
