<template>
  <PageHeader :title="title" :items="items" />
  <a-row>
    <a-col :span="24">
      <a-card title="Danh sách câu hỏi">
        <template #extra>
          <a-button @click="openModalAdd" type="primary">Thêm mới</a-button>
        </template>

        <b-card-body class="border-bottom-dashed border-bottom">
          <b-form>
            <b-row class="g-3">
              <b-col xl="6">
                <div class="search-box">
                  <input
                    type="text"
                    class="form-control search"
                    placeholder="Câu hỏi"
                    v-model="formSearch.cauHoiFilter"
                  />
                  <i class="ri-search-line search-icon"></i>
                </div>
              </b-col>
              <b-col xl="6">
                <b-row class="g-3">
                  <b-col sm="4">
                    <div class="">
                      <input
                        v-model="formSearch.cauTraLoiFilter"
                        placeholder="Câu trả lời"
                        class="form-control"
                      />
                    </div>
                  </b-col>
                  <b-col sm="4">
                    <!-- <input
                            v-model="formSearch.daXemFilter"
                            placeholder="Trạng thái"
                            class="form-control"
                          /> -->
                    <b-form-select v-model="formSearch.trangThaiFilter" class="mb-3">
                      <b-form-select-option value="">-- Tất cả --</b-form-select-option>
                      <b-form-select-option value="Chưa trả lời"
                        >Chưa trả lời</b-form-select-option
                      >
                      <b-form-select-option value="Đã trả lời"
                        >Đã trả lời</b-form-select-option
                      >
                      <b-form-select-option value="Đã xuất bản"
                        >Đã xuất bản</b-form-select-option
                      >
                    </b-form-select>
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
            :dataSource="lstCauHoi"
            :pagination="false"
            :loading="loading"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'trangThai'">
                <a-tag
                  style="width: 90px; text-align: center"
                  :color="getColor(record.trangThai)"
                >
                  <template #icon>
                    <check-circle-outlined v-if="record.trangThai === 'Đã trả lời'" />
                    <close-circle-outlined v-if="record.trangThai === 'Chưa trả lời'" />
                  </template>
                  {{ record.trangThai }}
                </a-tag>
              </template>
              <template v-if="column.key === 'ngayPhatHanh'">
                <span>
                  {{ record.ngayPhatHanh ? formatDate(record.ngayPhatHanh) : "" }}
                </span>
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
                      @click="deleteHoiDap(record.id)"
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
  <ModalAddEdit
    @addSuccess="loadData(optionPage.pageIndex, optionPage.pageSize)"
    ref="ModalAddEdit"
  ></ModalAddEdit>
  <ModalAddEditHoiDap
    @addSuccess="loadData(optionPage.pageIndex, optionPage.pageSize)"
    ref="ModalAddEditHoiDap"
  ></ModalAddEditHoiDap>
  <ModalDetailCauHoi ref="ModalDetailCauHoi"></ModalDetailCauHoi>
</template>
<script>
import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";
import Pagination from "../../../components/widgets/Pagination.vue";
import APIService from "@/helpers/ApiService";

import Common from "@/helpers/Common";
import ModalAddEdit from "./ModalAddEdit.vue";
import ModalAddEditHoiDap from "./ModalAddEditHoiDap.vue";
import ModalDetailCauHoi from "./ModalDetailCauHoi.vue";
import { Empty } from "ant-design-vue";
export default {
  created() {},
  mounted() {
    this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
  },
  components: {
    PageHeader,
    Pagination,
    ModalAddEdit,
    ModalDetailCauHoi,
    ModalAddEditHoiDap,
    AEmpty: Empty,
  },
  page: {
    title: "Quản lý hỏi đáp",
    meta: [
      {
        name: "Quản lý hỏi đáp",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      image: "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg", // Thay đổi hình ảnh tùy theo nhu cầu của bạn
      description: "Hiện tại chưa có dữ liệu để hiển thị. Vui lòng thêm mới dữ liệu.",
      title: "Quản lý hỏi đáp",
      items: [
        {
          text: "Dashboard",
          href: "/",
        },
        {
          text: "",
          active: true,
        },
      ],

      //formatDate: Common.formatDate,
      date1: null,
      date: null,
      // addCustomerModal: false,
      // editCustomerModal: false,
      tableColumns: [
        { title: "Câu hỏi", dataIndex: "cauHoi", key: "cauHoi" },
        { title: "Câu trả lời", dataIndex: "cauTraLoi", key: "cauTraLoi" },
        { title: "Trạng thái", dataIndex: "trangThai", key: "trangThai" },
        { title: "Ngày phát hành", dataIndex: "ngayPhatHanh", key: "ngayPhatHanh" },
        { title: "Thao tác", key: "action", width: 200 },
      ],
      notifi: {
        nguoiGui: "",
        nguoiNhan: "",
        noiDung: "",
        daXem: false,
        link: this.$route.path,
      },
      searchQuery: null,
      value: "All",
      value1: null,
      pages: [],
      lstCauHoi: [],
      optionPage: {
        pageIndex: 1,
        pageSize: 20,
        totalCount: 0,
      },
      formSearch: {
        cauHoiFilter: "",
        cauTraLoiFilter: "",
        trangThaiFilter: "",
        ngayPhatHanhFilter: "",
      },
    };
  },
  methods: {
    formatDate(dateStr) {
      return (
        dateStr.slice(8, 10) +
        "-" +
        dateStr.slice(5, 7) +
        "-" +
        dateStr.slice(0, 4) +
        " " +
        dateStr.slice(11, 19)
      );
    },
    getColor(trangThai) {
      switch (trangThai) {
        case "Chưa trả lời":
          return "red";
        case "Đã trả lời":
          return "blue";
        default:
          return "green"; // Or any default color
      }
    },
    openModalAdd() {
      this.$refs.ModalAddEdit.showModal();
    },
    openModalDetail(id) {
      this.$refs.ModalDetailCauHoi.showModal(id);
    },
    openModalEdit(id) {
      this.$refs.ModalAddEditHoiDap.showModal(id);
    },
    handlePageChange(page) {
      this.optionPage.pageIndex = page;
      this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
    },
    SearchData() {
      var searchParam = {
        pageIndex: this.optionPage.pageIndex,
        pageSize: this.optionPage.pageSize,
        cauHoiFilter: this.formSearch.cauHoiFilter,
        cauTraLoiFilter: this.formSearch.cauTraLoiFilter,
        trangThaiFilter: this.formSearch.trangThaiFilter,
        ngayPhatHanhFilter: this.formSearch.ngayPhatHanhFilter,
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
      var result = await APIService.get(`/HoiDapGopY/GetDataPage?` + urlQuery);
      this.lstCauHoi = result.data.data.items;
      if (result.data.data != null && result.data.data.items != null) {
        var res = result.data.data;
        this.lstCauHoi = result.data.data.items;
        this.optionPage.pageIndex = res.pageIndex;
        this.optionPage.pageSize = res.pageSize;
        this.optionPage.totalCount = res.totalCount;
      }
    },
    async deleteHoiDap(id) {
      var res = await APIService.delete(`/HoiDapGopY/delete/${id}`);

      // this.notifi.nguoiGui = 'Thông báo hệ thống';
      // this.notifi.nguoiNhan = 'hieua4';
      // this.notifi.noiDung = 'Câu hỏi của bạn đã bị gỡ bỏ!';

      //   await APIService.post(`/ThongBao/create`, this.notifi);

      if (res.data.status !== "Success") {
        this.$message.error("Xóa thất bại!");
        return;
      }
      this.$message.success("Xóa câu hỏi thành công!");
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
