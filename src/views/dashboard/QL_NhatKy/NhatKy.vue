<template>
    <PageHeader :title="title" :items="items" />
    <a-row>
      <a-col :span="24">
        <a-card title="Nhật ký tài khoản">
          <template #extra>
            <a-space wrap>
              <!-- <a-button @click="openModalAdd" type="primary">Thêm mới</a-button> -->
              <a-button >Import</a-button>
            </a-space>
          </template>
  
          <b-card-body class="border-bottom-dashed border-bottom">
            <b-form>
              <b-row class="g-3">
                <b-col xl="6">
                  <div class="search-box">
                    <input
                      type="text"
                      class="form-control search"
                      placeholder="Địa chỉ IP"
                      v-model="formSearch.ip"
                    />
                    <i class="ri-search-line search-icon"></i>
                  </div>
                </b-col>
                <b-col xl="6">
                  <b-row class="g-3">
                    <b-col sm="8">
                      <div class="">
                        <input
                          v-model="formSearch.noiDung"
                          placeholder="Nội dung"
                          class="form-control"
                        />
                      </div>
                    </b-col>
                    <b-col sm="4">
                      <div>
                        <b-button
                          type="button"
                          variant="primary"
                          class="w-100"
                          @click="SearchData"
                        >
                          <i class="ri-equalizer-fill me-2 align-bottom"></i>Tìm kiếm 
                        </b-button>
                      </div>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-form>
          </b-card-body>
  
          <div>
            <a-table
              :columns="tableColumns"
              :dataSource="lstNhatKy"
              :pagination="false"
              :loading="loading"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                  <ul class="list-inline hstack gap-2 mb-0">
                    <li
                      class="list-inline-item"
                      data-bs-toggle="tooltip"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      title="Chi tiết"
                    >
                      <b-link
                        variant="text-info"
                        class="d-inline-block edit-item-btn"
                        @click="openModalDetail(record.id)"
                      >
                        <i class="ri-information-line fs-16"></i>
                      </b-link>
                    </li>
                    <!-- <li
                      class="list-inline-item edit"
                      data-bs-toggle="tooltip"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      title="Chỉnh sửa"
                    >
                      <b-link
                        variant="text-primary"
                        class="d-inline-block edit-item-btn"
                        @click="openModalEdit(record.id)"
                      >
                        <i class="ri-pencil-fill fs-16"></i>
                      </b-link>
                    </li> -->
                    <li
                      class="list-inline-item"
                      data-bs-toggle="tooltip"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      title="Remove"
                    >
                      <b-link
                        class="text-danger d-inline-block remove-item-btn"
                        @click="deleteThon(record.id)"
                      >
                        <i class="ri-delete-bin-5-fill fs-16"></i>
                      </b-link>
                    </li>
                  </ul>
                </template>
              </template>
            </a-table>
            <Pagination
              :total="optionPage.totalCount"
              :current="optionPage.pageIndex"
              :per-page="optionPage.pageSize"
              :pageRange="optionPage.totalCount"
              @page-changed="handlePageChange"
            />
          </div>
        </a-card>
      </a-col>
    </a-row>
    <ModalDetail ref="ModalDetail"></ModalDetail>
  </template>
  <script>
  import PageHeader from "@/components/page-header";
  import appConfig from "../../../../app.config";
  import Pagination from "../../../components/widgets/Pagination.vue";
  import APIService from "@/helpers/ApiService";
  
  import Common from "@/helpers/Common";
  import ModalDetail from "./ModalDetail.vue";
  
  export default {
    created() {},
    mounted() {
      this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
    },
    components: {
      PageHeader,
      Pagination,
      ModalDetail,
    },
    page: {
      title: "Quản lý nhật ký",
      meta: [
        {
          name: "Quản lý nhật ký",
          content: appConfig.description,
        },
      ],
    },
    data() {
      return {
        
        title: "Quản lý nhật ký",
        items: [
          {
            text: "Dashboard",
            href: "/",
          },
          {
            text: "Nhật ký tài khoản",
            active: true,
          },
        ],
        date1: null,
        date: null,
        addCustomerModal: false,
        editCustomerModal: false,
        tableColumns: [
          //{ title: "Trình duyệt", dataIndex: "browser", key: "browser" },
          //{ title: "Phiên bản", dataIndex: "version", key: "version" },
          //{ title: "Hệ điều hành", dataIndex: "platform", key: "platform" },
          { title: "Nội dung", dataIndex: "noiDung", key: "noiDung" },
          //{ title: "Thiết bị", dataIndex: "isMobile", key: "isMobile" },
          { title: "Loại", dataIndex: "loai", key: "loai" },
          { title: "Liên kết", dataIndex: "link", key: "link" },
          { title: "IP", dataIndex: "ip", key: "ip" },
          { title: "Thời gian", dataIndex: "time", key: "time" },
          { title: "Thao tác", key: "action", width: 200 },
        ],
        searchQuery: null,
        value: "All",
        value1: null,
        pages: [],
        lstNhatKy: [],
        optionPage: {
          pageIndex: 1,
          pageSize: 20,
          totalCount: 0,
        },
        formSearch: {
          noiDung: "",
          ip: "",
        },
        xa:{}
      };
    },
    methods: {
      openModalDetail(id) {
        this.$refs.ModalDetail.showModal(id);
      },
      handlePageChange(page) {
        this.optionPage.pageIndex = page;
        this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
      },
      SearchData() {
        var searchParam = {
          pageIndex: this.optionPage.pageIndex,
          pageSize: this.optionPage.pageSize,
          noiDung: this.formSearch.noiDung,
          ip: this.formSearch.ip,
        };
  
        this.loadData(1, 10, searchParam);
      },
      async loadData(pageIndex, pageSize, params) {
        var searchParam = {
          pageIndex: pageIndex,
          pageSize: pageSize,
        };
        if (params) {
          searchParam = params;
        }
        
      var urlQuery = new URLSearchParams(searchParam).toString();
        var result = await APIService.get(`/loghethong/get?`+urlQuery);
        this.lstNhatKy = result.data.data.items;
        if (result.data.data != null && result.data.data.items != null) {
          var res = result.data.data;
          this.lstNhatKy = result.data.data.items;
          this.optionPage.pageIndex = res.pageIndex;
          this.optionPage.pageSize = res.pageSize;
          this.optionPage.totalCount = res.totalCount;
        }
      },
      // async deleteThon(id) {
      //   var res = await APIService.delete(`/DonViHanhChinh/delete/${id}`);
      //   if (res.data.status !== "Success") {
      //     this.$message.error();
      //     return;
      //   }
      //   this.$message.success("Xóa thôn thành công");
      //   this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
      // },
    },
  };
  </script>
  