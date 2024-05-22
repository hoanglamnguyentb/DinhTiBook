<template>
  <b-row class="g-0 text-center text-sm-start align-items-center mb-3">
    <b-col sm="6">
      
    </b-col>
    <b-col sm="6">
      <div class="d-flex justify-content-end mt-3" :class="wrapperClass">
        <div class="pagination-wrap hstack gap-2"> 
          <ul class="pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0" :class="paginationClass">
            <li 
            class="page-item"
            @click.prevent="changePage(prevPage)"
            :disabled="current === 1">
              <b-link 
              class="page-link" 
              href="#"
              :disabled="current === 1">
                <i class="mdi mdi-chevron-left" v-if="!enableText" /> 
                <span v-if="enableText">Trước</span>
              </b-link>
            </li>
            <li class="page-item" v-if="hasFirst()">
              <b-link 
              href="#" 
              class="page-link" 
              @click.prevent="changePage(1)">1</b-link>
            </li>
            <li class="page-item" v-if="hasFirst()">...</li>
            <li class="page-item" v-for="(page, i) in pages" :key="i">
              <b-link 
              href="#" 
              class="page-link"
              :class="{
                active: current === page,
              }"
              @click.prevent="changePage(page)">{{ page }}</b-link>
            </li>
            <li class="page-item" v-if="hasLast()">...</li>
            <li class="page-item" v-if="hasLast()">
              <b-link 
              href="#" 
              class="page-link" 
              @click.prevent="changePage(totalPages)">{{ totalPages }}</b-link>
            </li>
            <li 
            class="page-item"
            @click.prevent="changePage(nextPage)"
            :disabled="current === totalPages">
            <b-link 
              class="page-link" 
              href="#"
              :disabled="current === totalPages">
                <i class="mdi mdi-chevron-right" v-if="!enableText" /> 
                <span v-if="enableText">Sau</span>
              </b-link>
            </li>
          </ul>
        </div>
      </div>
    </b-col>
  </b-row>
  </template>
  
<script>
  import { defineComponent } from "vue";
  export default defineComponent({
    name: "Pagination",
    props: {
      options: {
        type: Array,
        default: () => [{}],
      },
      enableText: {
        type: Boolean,
        default: false,
      },
      enableInput: {
        type: Boolean,
        default: false,
      },
      enableSelect: {
        type: Boolean,
        default: false,
      },
      enableSearch: {
        type: Boolean,
        default: false,
      },
      pageChanged: {
        type: Function,
      },
      perPageChanged: {
        type: Function,
      },
      current: {
        type: Number,
        default: 1,
      },
      total: {
        type: Number,
        default: 0,
      },
      perPage: {
        type: Number,
        default: 10,
      },
      pageRange: {
        type: Number,
        default: 2,
      },
      textBeforeInput: {
        type: String,
        default: "Go to page",
      },
      textAfterInput: {
        type: String,
        default: "Go",
      },
      paginationClass: {
        type: String,
        default: "default",
      },
      searchClasss: {
        type: String,
        default: "default",
      },
      wrapperClass: {
        type: String,
        default: "justify-between",
      },
    },
    data() {
      return {
        input: "",
        input2: null,
      };
    },
    methods: {
      hasFirst: function () {
        return this.rangeStart !== 1;
      },
      hasLast: function () {
        return this.rangeEnd < this.totalPages;
      },
      hasPrev: function () {
        return this.current > 1;
      },
      hasNext: function () {
        return this.current < this.totalPages;
      },
      changePage: function (page) {
        if (page > 0 && page <= this.totalPages) {
          this.$emit("page-changed", page);
        }
        if (this.pageChanged) {
          this.pageChanged({ currentPage: page });
        }
      },
      customPerPageChange(page) {
        this.perPageChanged({ currentPerPage: page });
      },
    },
    computed: {
      pages: function () {
        var pages = [];
  
        for (var i = this.rangeStart; i <= this.rangeEnd; i++) {
          pages.push(i);
        }
  
        return pages;
      },
      rangeStart: function () {
        var start = this.current - this.pageRange;
  
        return start > 0 ? start : 1;
      },
      rangeEnd: function () {
        var end = this.current + this.pageRange;
  
        return end < this.totalPages ? end : this.totalPages;
      },
      totalPages: function () {
        return Math.ceil(this.total / this.perPage);
      },
      nextPage: function () {
        return this.current + 1;
      },
      prevPage: function () {
        return this.current - 1;
      },
    },
  });
</script>
  
<style scoped lang="css">
  
</style>
  