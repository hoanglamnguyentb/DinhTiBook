<template>
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th v-for="(column, index) in columns" :key="index" :style="{ width: column.width + 'px',textAlign: column.align }">{{ column.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(record, index) in dataSource" :key="index">
        <td v-for="(column, colIndex) in columns" :key="colIndex" :style="{ textAlign: column.align }">
          <slot :name="column.dataIndex" :record="record">
            {{ record[column.dataIndex] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
name: 'TableComponent',
props: {
    columns: {
      type: Array,
      required: true
    },
    dataSource: {
      type: Array,
      required: true
    },
    tableClass: {
      type: String,
      default: ""
    }
  }
}
</script>