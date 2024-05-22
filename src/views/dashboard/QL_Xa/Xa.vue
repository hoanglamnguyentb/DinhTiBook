<template>
  <PageHeader :title="title" :items="items" />
  <a-row>
    <a-col :span="24">
      <a-card title="Danh sách xã">
        <template #extra>
          <a-space wrap>
            <a-button @click="openModalAdd" type="primary">Thêm mới</a-button>
            <a-button @click="this.$router.back()">Quay lại</a-button>
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
                    placeholder="Mã xã"
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
                        placeholder="Tên xã"
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
            :dataSource="lstXa"
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
                    <b-link
                      class="text-danger d-inline-block remove-item-btn"
                      @click="deleteXa(record.id)"
                    >
                      <i class="ri-delete-bin-5-fill fs-16"></i>
                    </b-link>
                  </li>
                  <li class="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover"
                            data-bs-placement="top" title="Cấu hình">
                            <router-link :to="{ name: 'QL_Thon', params: { id: record.ma } }">
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
  <ModalAddEditXa
    @addSuccess="loadData(optionPage.pageIndex, optionPage.pageSize)"
    ref="ModalAddEditXa"
  ></ModalAddEditXa>
  <ModalDetailXa ref="ModalDetailXa"></ModalDetailXa>
</template>
<script>
import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";
import Pagination from "../../../components/widgets/Pagination.vue";
import APIService from "@/helpers/ApiService";

import Common from "@/helpers/Common";
import ModalAddEditXa from "./ModalAddEditXa.vue";
import ModalDetailXa from "./ModalDetailXa.vue";

export default {
  created() {},
  mounted() {
    this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
  },
  components: {
    PageHeader,
    Pagination,
    ModalAddEditXa,
    ModalDetailXa,
  },
  page: {
    title: "Quản lý xã",
    meta: [
      {
        name: "Quản lý xã",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      
      title: "Quản lý xã",
      items: [
        {
          text: "Dashboard",
          href: "/",
        },
        {
          text: "Quản lý huyện",
          active: true,
        },
      ],
      date1: null,
      date: null,
      addCustomerModal: false,
      editCustomerModal: false,
      tableColumns: [
        { title: "Mã xã", dataIndex: "ma", key: "ma" },
        { title: "Tên xã", dataIndex: "ten", key: "ten" },
        { title: "Tên huyện", dataIndex: "tenHuyen", key: "tenHuyen" },
        { title: "Kinh độ", dataIndex: "kinhDo", key: "kinhDo" },
        { title: "Vĩ độ", dataIndex: "viDo", key: "viDo" },
        { title: "Loại", dataIndex: "loai", key: "loai" },
        { title: "Thao tác", key: "action", width: 200 },
      ],
      searchQuery: null,
      value: "All",
      value1: null,
      pages: [],
      lstXa: [],
      optionPage: {
        pageIndex: 1,
        pageSize: 20,
        totalCount: 0,
      },
      formSearch: {
        maFilter: "",
        tenFilter: "",
      },
      huyen:[],
    };
  },
  methods: {
    openModalAdd() {
      this.$refs.ModalAddEditXa.showModal();
    },
    openModalDetail(id) {
      this.$refs.ModalDetailXa.showModal(id);
    },
    openModalEdit(id) {
      this.$refs.ModalAddEditXa.showModal(id);
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
      var LoaiFilter = `XA`;
      var paramId = this.$route.params.id;
      var urlQuery = new URLSearchParams(searchParam).toString();
      var result = await APIService.get(`/DonViHanhChinh/GetDataPage?ParentIdFilter=${paramId}&LoaiFilter=${LoaiFilter}&` + urlQuery);
      this.lstXa = result.data.data.items;
      if (result.data.data != null && result.data.data.items != null) {
        var res = result.data.data;
        this.lstXa = result.data.data.items;
        this.optionPage.pageIndex = res.pageIndex;
        this.optionPage.pageSize = res.pageSize;
        this.optionPage.totalCount = res.totalCount;
        console.log('xa', this.lstXa[0].parentId)
        await this.getHuyen()
      }
     
     
    },
    async deleteXa(id) {
      var res = await APIService.delete(`/DonViHanhChinh/delete/${id}`);
      if (res.data.status !== "Success") {
        this.$message.error();
        return;
      }
      this.$message.success("Xóa xã thành công");
      this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
    },
    async getHuyen(){
      if (!this.lstXa || this.lstXa.length === 0) {
        return;
      }
      var MaHuyen = this.lstXa[0].parentId;
      var Loai = "HUYEN"
      var result = await APIService.get(`/DonViHanhChinh/GetDataPage?MaFilter=${MaHuyen}&LoaiFilter=${Loai}`);
      this.huyen = result.data.data.items;  
      if (this.huyen.length > 0) {
      this.lstXa.forEach(xa => {
        xa.tenHuyen = this.huyen[0].ten;
      });
      }
    }
  },
};
</script>
