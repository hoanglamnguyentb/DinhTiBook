<template>
  <PageHeader :title="title" :items="items" />
  <a-row>
    <a-col :span="24">
      <a-card title="Danh sách thông báo">
        <template #extra>
          <a-button @click="ReadAllThongBao()" style="margin-right: 10px" type="primary">
            Đánh dấu tất cả là đã đọc </a-button
          ><a-popconfirm
            title="Bạn có muốn xóa bản ghi này ?"
            ok-text="Có"
            cancel-text="Không"
            @confirm="DeleteAllThongBao()"
            @cancel="cancel"
          >
            <a-button type="primary">Xóa tất cả thông báo </a-button></a-popconfirm
          >
        </template>

        <b-card-body class="border-bottom-dashed border-bottom">
          <b-form>
            <b-row class="g-3">
              <b-col xl="4">
                <div class="search-box">
                  <input
                    type="text"
                    class="form-control search"
                    placeholder="Người gửi"
                    v-model="formSearch.createdByFilter"
                  />
                  <i class="ri-search-line search-icon"></i>
                </div>
              </b-col>
              <b-col xl="8">
                <b-row class="g-3">
                  <b-col sm="4">
                    <div class="">
                      <input
                        v-model="formSearch.noiDungFilter"
                        placeholder="Nội dung"
                        class="form-control"
                      />
                    </div>
                  </b-col>
                  <b-col sm="4">
                    <b-form-select v-model="formSearch.daXemFilter" class="mb-3">
                      <b-form-select-option value="">-- Tất cả --</b-form-select-option>
                      <b-form-select-option value="true">Đã đọc</b-form-select-option>
                      <b-form-select-option value="false"
                        >Chưa đọc</b-form-select-option
                      ></b-form-select
                    >
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
        <!-- <a-card class="border-bottom-dashed border-bottom">
            <a-form>
              <a-row :gutter="3">
                <a-col :span="8">
                  <div class="search-box">
                    <a-input v-model="formSearch.createdByFilter" placeholder="     Người gửi" />
                    <i class="ri-search-line search-icon"></i>
                  </div>
                </a-col>
                <a-col :span="12">
                  <a-row :gutter="3">
                    <a-col :span="8">
                      <a-input v-model="formSearch.noiDungFilter" placeholder="Nội dung" />
                    </a-col>
                    <a-col :span="8">
                      <a-select style="" v-model="formSearch.daXemFilter" class="mb-3">
                        <a-select-option value="">-- Tất cả --</a-select-option>
                        <a-select-option value="true">Đã đọc</a-select-option>
                        <a-select-option value="false">Chưa đọc</a-select-option>
                      </a-select>
                    </a-col>
                    <a-col :span="8">
                      <a-button type="primary" class="w-100" @click="SearchData">
                        <i class="ri-equalizer-fill me-2 align-bottom"></i>Tìm kiếm
                      </a-button>
                    </a-col>
                  </a-row>
                </a-col>
              </a-row>
            </a-form>
          </a-card>-->
        <div>
          <div v-if="optionPage.totalCount === 0" class="noresult">
            <a-empty :image="image" :description="description">
              <lottie
                class="avatar-xl"
                :options="defaultOptions"
                :height="75"
                :width="75"
              />
            </a-empty>
          </div>
          <a-table
            v-if="optionPage.totalCount != 0"
            :columns="tableColumns"
            :dataSource="lstThongbao"
            :pagination="false"
            :loading="loading"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'createdDate'">
                <span>
                  {{ record.createdDate ? formatDate(record.createdDate) : "" }}
                </span>
              </template>
              <template v-if="column.key === 'daXem'">
                <a-tag
                  style="width: 70px; text-align: center"
                  :color="record.daXem === false ? 'blue' : 'green'"
                >
                  {{ record.daXem ? "Đã đọc" : "Chưa đọc" }}
                </a-tag>
              </template>
              <template v-if="column.key === 'link'">
                <a @click="ReadThongBao(record.id)" v-bind:href="record.link"
                  ><i class="ri-eye-fill fs-16"></i
                ></a>
              </template>
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
                    title="Đánh dấu đã đọc"
                  >
                    <b-link
                      variant="text-primary"
                      class="d-inline-block edit-item-btn"
                      @click="ReadThongBao(record.id)"
                    >
                      <i class="ri-check-double-line fs-16"></i>
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
                      @confirm="deleteThongBao(record.id)"
                      @cancel="cancel"
                    >
                      <b-link class="text-danger d-inline-block remove-item-btn">
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
  <ModalDetailThongBao ref="modalDetailThongBao"></ModalDetailThongBao>
</template>
<script>
import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";
import Pagination from "../../../components/widgets/Pagination.vue";
import APIService from "@/helpers/ApiService";
import { Empty } from "ant-design-vue";
import Common from "@/helpers/Common";
import ModalDetailThongBao from "./ModalDetailThongBao.vue";

export default {
  created() {},
  mounted() {
    this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
  },
  components: {
    PageHeader,
    Pagination,
    ModalDetailThongBao,

    AEmpty: Empty,
  },
  page: {
    title: "Quản lý thông báo",
    meta: [
      {
        name: "Quản lý thông báo",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      image: "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg", // Thay đổi hình ảnh tùy theo nhu cầu của bạn
      description: "Hiện tại chưa có dữ liệu để hiển thị. Vui lòng thêm mới hoặc Import.",
      title: "Quản lý thông báo",
      items: [
        {
          text: "Dashboard",
          href: "/",
        },
        {
          text: "Tất cả các thông báo",
          active: true,
        },
      ],
      date1: null,
      date: null,
      tableColumns: [
        { title: "Người gửi", dataIndex: "createdBy", key: "createBy" },
        { title: "Nội dung", dataIndex: "noiDung", key: "noiDung" },
        { title: "Thời gian", dataIndex: "createdDate", key: "createdDate" },
        { title: "Trạng thái", dataIndex: "daXem", key: "daXem" },
        { title: "Xem", dataIndex: "link", key: "link" },
        { title: "Thao tác", key: "action", width: 200 },
      ],
      searchQuery: null,
      value: "All",
      value1: null,
      pages: [],
      lstThongbao: [],
      optionPage: {
        pageIndex: 1,
        pageSize: 20,
        totalCount: 0,
      },
      formSearch: {
        createdByFilter: "",
        // nguoiNhanFilter: "",
        noiDungFilter: "",
        daXemFilter: "",
      },
    };
  },
  methods: {
    openModalDetail(id) {
      this.$refs.modalDetailThongBao.showModal(id);
    },
    handlePageChange(page) {
      this.optionPage.pageIndex = page;
      this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
    },
    SearchData() {
      var searchParam = {
        pageIndex: this.optionPage.pageIndex,
        pageSize: this.optionPage.pageSize,
        createdByFilter: this.formSearch.createdByFilter,
        noiDungFilter: this.formSearch.noiDungFilter,
        daXemFilter: this.formSearch.daXemFilter,
      };

      this.loadData(1, 10, searchParam);
    },
    formatDate(dateStr) {
      return (
        dateStr.slice(11, 16) +
        " ngày " +
        dateStr.slice(8, 10) +
        "-" +
        dateStr.slice(5, 7) +
        "-" +
        dateStr.slice(0, 4)
      );
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
      var result = await APIService.get(`/ThongBao/GetDataPage?` + urlQuery);
      this.lstThongbao = result.data.data.items;
      if (result.data.data != null && result.data.data.items != null) {
        var res = result.data.data;
        this.lstThongbao = result.data.data.items;
        this.optionPage.pageIndex = res.pageIndex;
        this.optionPage.pageSize = res.pageSize;
        this.optionPage.totalCount = res.totalCount;
        this.lstThongbao.createDate = this.formatDate(this.lstThongbao.createdDate) 
      }
    },
    async deleteThongBao(id) {
      var res = await APIService.delete(`/ThongBao/delete/${id}`);
      if (res.data.status !== "Success") {
        this.$message.error();
        return;
      }
      this.$message.success("Xóa thông báo thành công");
      this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
    },

    async ReadThongBao(id) {
      var res = await APIService.put(`/ThongBao/Read/${id}`);
      if (res.data.status !== "Success") {
        this.$message.error();
        return;
      }
      this.$message.success("Đã đọc thông báo!");
      this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
    },

    async ReadAllThongBao(id) {
      var res = await APIService.put(`/ThongBao/ReadAll`);
      if (res.data.status !== "Success") {
        this.$message.error();
        return;
      }
      this.$message.success("Đã đọc tất cả thông báo!");
      this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
    },
    async DeleteAllThongBao(id) {
      var res = await APIService.delete(`/ThongBao/DeleteAll`);
      if (res.data.status !== "Success") {
        this.$message.error(res.message);
        return;
      }
      this.$message.success("Đã xóa tất cả thông báo!");
      this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
    },
  },
};
</script>
<style scoped>
.noresult {
  text-align: center;
  margin-top: 50px;
}
</style>
