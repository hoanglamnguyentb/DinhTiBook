<template>
  <PageHeader :title="title" :items="items" />
  <a-row>
    <a-col :span="24">
      <a-card title="Danh sách chức năng">
        <template #extra>
          <a-button @click="openModalAdd" type="primary">Thêm mới</a-button>
        </template>
        <div>
          <!-- <b-card-body style="margin-bottom: 20px;">
            <b-form>
              <b-row class="g-3">
                <b-col xl="6">
                  <div class="search-box">
                    <input
                      type="text"
                      class="form-control search"
                      placeholder="Mã chức năng"
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
                          placeholder="Tên chức năng"
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
          </b-card-body> -->
          <a-row  style="margin-bottom: 20px;" :gutter="24">
            <a-col :span="12">
              <a-input v-model:value="formSearch.maFilter" @keyup.enter="SearchData" placeholder="Mã chức năng">
                <template #prefix>
                  <i class="ri-search-line search-icon"></i>
                </template>
              </a-input>
            </a-col>
            <a-col :span="12">
              <a-input v-model:value="formSearch.tenFilter" @keyup.enter="SearchData" placeholder="Tên chức năng">
                <template #prefix>
                  <i class="ri-search-line search-icon"></i>
                </template>
              </a-input>
            </a-col>
          </a-row>
          <a-table
            :columns="tableColumns"
            :dataSource="lstChucNang"
            :pagination="false"
            :loading="loading"
            rowKey="id"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'actions'">
                <ul class="list-inline hstack gap-2 mb-0">
                  <li class="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover"
                    data-bs-placement="top" title="Quản lý thao tác">
                    <router-link :to="{ name: 'QL_ThaoTac', params: { chucNangId: record.id } }">
                      <i class="ri-equalizer-line fs-16"></i>
                    </router-link>
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
                      @click="openModalEdit(record)"
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
                      @confirm="deleteChucNang(record.id)"
                      @cancel="cancel"
                    >
                    <b-link
                      class="text-danger d-inline-block remove-item-btn"
                    >                
                      <i class="ri-delete-bin-5-fill fs-16"></i>
                    </b-link>
                    </a-popconfirm>
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
  <ModalAddEditChucNang
    @addSuccess="loadData(optionPage.pageIndex, optionPage.pageSize)"
    ref="modalAddEditChucNang"
  ></ModalAddEditChucNang>
</template>
<script>
import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";
import Pagination from "../../../components/widgets/Pagination.vue";
import APIService from "@/helpers/ApiService"
// import { SearchOutlined } from '@ant-design/icons-vue';
import Common from "@/helpers/Common"
import ModalAddEditChucNang from "./ModalAddEditChucNang.vue";

export default {
  mounted() {
    this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);

  },
  components: {
    PageHeader,
    Pagination,
    ModalAddEditChucNang
  },
  page: {
    title: "Quản lý chức năng",
    meta: [
      {
        name: "Quản lý chức năng",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "Quản lý chức năng",
      items: [
        {
          text: "Dashboard",
          href: "/",
        },
        {
          text: "Quản lý chức năng",
          active: true,
        },
      ],
      tableColumns: [
        { title: "Mã chức năng", dataIndex: "maChucNang", key: "ma" },
        { title: "Tên chức năng", dataIndex: "tenChucNang", key: "ten" },
        { title: "Thứ tự", dataIndex: "thuTu", key: "thuTu" },
        { title: "Trạng thái", dataIndex: "trangThai", key: "trangThai" },
        { title: "Thao tác", key: "actions", width: 200 },
      ],
      searchQuery: null,
      pages: [],
      lstChucNang: [],
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
    formatDate: Common.formatDate,
    openModalAdd() {
      this.$refs.modalAddEditChucNang.showModal();
    },
    openModalEdit(record) {
      this.$refs.modalAddEditChucNang.showModal(record);
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
      var urlQuery = new URLSearchParams(searchParam).toString();
      var result = (await APIService.get(
        `/ChucNang/GetListChucNang?` + urlQuery
      )).data;
      this.lstChucNang = result.data.items;
      if (result.data != null && result.data.items != null) {
        var res = result.data;
        this.lstChucNang = result.data.items;
        this.optionPage.pageIndex = res.pageIndex;
        this.optionPage.pageSize = res.pageSize;
        this.optionPage.totalCount = res.totalCount;
      }
    },
    async deleteChucNang(id) {
      var res = await APIService.delete(`/ChucNang/${id}`);
      if (res.data.status !== "Success") {
        this.$message.error();
        return;
      }
      this.$message.success("Xóa chức năng thành công");
      this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
    },
  }
}
</script>
