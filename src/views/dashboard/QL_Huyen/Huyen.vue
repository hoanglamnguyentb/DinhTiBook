<template>
  <PageHeader :title="title" :items="items" />
  <a-row>
    <a-col :span="24">
      <a-card title="Danh sách huyện">
        <template #extra>
          <a-button @click="openModalAdd" type="primary">Thêm mới</a-button>
          
          <a-button style="margin-left: 10px;" @click="exportExcel">Export Data</a-button>
          <a-button style="margin-left: 10px;" @click="importData">Import Data</a-button>
        </template>
        <div>
          <b-card-body class="border-bottom-dashed border-bottom">
            <b-form>
              <b-row class="g-3">
                <b-col xl="6">
                  <div class="search-box">
                    <input
                      type="text"
                      class="form-control search"
                      placeholder="Mã huyện"
                      v-model="formSearch.maFilter"
                    />
                    <i class="ri-search-line search-icon"></i>
                  </div>
                </b-col>
                <b-col xl="6">
                  <b-row class="g-3">
                    <b-col sm="8">
                      <div class="">
                        <input
                          v-model="formSearch.tenFilter"
                          placeholder="Tên huyện"
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
          <a-table
            :columns="tableColumns"
            :dataSource="lstHuyen"
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
                  <li
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
                  </li>
                  <li
                    class="list-inline-item"
                    data-bs-toggle="tooltip"
                    data-bs-trigger="hover"
                    data-bs-placement="top"
                    title="Remove"
                  >

                    <a-popconfirm
                      title="Bạn có muốn xóa bản ghi này ?"
                      ok-text="Có"
                      cancel-text="Không"
                      @confirm="deleteHuyen(record.id)"
                      @cancel="cancel"
                    >
                    <b-link
                      class="text-danger d-inline-block remove-item-btn"
                    >                
                      <i class="ri-delete-bin-5-fill fs-16"></i>
                    </b-link>
                    </a-popconfirm>
                  </li>

                  <li class="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover"
                            data-bs-placement="top" title="Cấu hình">
                            <router-link :to="{ name: 'QL_Xa', params: { id: record.ma } }">
                              <i class="ri-equalizer-line fs-16"></i>
                            </router-link>
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
  <ModalAddEditHuyen
    @addSuccess="loadData(optionPage.pageIndex, optionPage.pageSize)"
    ref="modalAddEditHuyen"
  ></ModalAddEditHuyen>
  <ModalDetailHuyen ref="modalDetailHuyen"></ModalDetailHuyen>
</template>
<script>
import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";
import Pagination from "../../../components/widgets/Pagination.vue";
import APIService from "@/helpers/ApiService";
import { SearchOutlined } from "@ant-design/icons-vue";

import Common from "@/helpers/Common";
import ModalAddEditHuyen from "./ModalAddEditHuyen.vue";
import ModalDetailHuyen from "./ModalDetailHuyen.vue";

export default {
  created() {},
  mounted() {
    this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
  },
  components: {
    PageHeader,
    Pagination,
    ModalAddEditHuyen,
    ModalDetailHuyen,
    SearchOutlined,
  },
  page: {
    title: "Quản lý huyện",
    meta: [
      {
        name: "Quản lý huyện",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "Quản lý huyện",
      items: [
        {
          text: "Dashboard",
          href: "/",
        },
        {
          text: "Quản lý tỉnh",
          active: true,
        },
      ],
      date1: null,
      date: null,
      addCustomerModal: false,
      editCustomerModal: false,
      tableColumns: [
        { title: "Mã huyện", dataIndex: "ma", key: "ma" },
        { title: "Tên huyện", dataIndex: "ten", key: "ten" },
        { title: "Thao tác", key: "action", width: 200 },
      ],
      searchQuery: null,
      value: "All",
      value1: null,
      pages: [],
      lstHuyen: [],
      optionPage: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
      },
      formSearch: {
        maFilter: "",
        tenFilter: "",
      },
    };
  },
  methods: {
    openModalAdd() {
      this.$refs.modalAddEditHuyen.showModal();
    },
    openModalDetail(id) {
      this.$refs.modalDetailHuyen.showModal(id);
    },
    openModalEdit(id) {
      this.$refs.modalAddEditHuyen.showModal(id);
    },
    handlePageChange(page) {
      this.optionPage.pageIndex = page;
      this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
    },
    SearchData() {
      var searchParam = {
        pageIndex: this.optionPage.pageIndex,
        pageSize: this.optionPage.pageSize,
        tenFilter: this.formSearch.tenFilter,
        maFilter: this.formSearch.maFilter,
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
      var LoaiFilter = `HUYEN`;
      var urlQuery = new URLSearchParams(searchParam).toString();
      var result = await APIService.get(
        `/DonViHanhChinh/GetDataPage?LoaiFilter=${LoaiFilter}&` + urlQuery
      );
      this.lstHuyen = result.data.data.items;
      if (result.data.data != null && result.data.data.items != null) {
        var res = result.data.data;
        this.lstHuyen = result.data.data.items;
        this.optionPage.pageIndex = res.pageIndex;
        this.optionPage.pageSize = res.pageSize;
        this.optionPage.totalCount = res.totalCount;
      }
    },
    async deleteHuyen(id) {
      var res = await APIService.delete(`/DonViHanhChinh/delete/${id}`);
      if (res.data.status !== "Success") {
        this.$message.error();
        return;
      }
      this.$message.success("Xóa huyện thành công");
      this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
    },
    formatDate: Common.formatDate,
  },
};
</script>
