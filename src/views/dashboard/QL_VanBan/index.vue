<template>
  <PageHeader :title="title" :items="items" />
  <a-row>
    <a-col :span="24">
      <a-card title="Danh sách văn bản"> 
        <template #extra>
          <router-link :to="{ name: 'QL_VanBan_Create'}">
          <a-button @click="QL_VanBan_Create" type="primary">Thêm mới</a-button>
                      
                    </router-link>
        </template>
        <div>
            <a-row  style="margin-bottom: 20px;" :gutter="24">
            <a-col :span="10">
              <a-input v-model:value="formSearch.NameTextFilter"  placeholder="Tên Văn Bản">
                <template #prefix>
                  <i class="ri-search-line search-icon"></i>
                </template>
              </a-input>
            </a-col>
            <a-col :span="10">
              <a-input v-model:value="formSearch.NumberFilter" placeholder="Số hiệu văn bản">
                <template #prefix>  
                  <i class="ri-search-line search-icon"></i>
                </template>
              </a-input>
            </a-col>
            <a-col :span="4">
                      <div>
                        <a-button type="primary"  @click="SearchData">
                          <i class="ri-equalizer-fill me-2 align-bottom"></i>Tìm
                          kiếm
                        </a-button>
                      </div>
                    </a-col>
          </a-row>
            <div>
              <a-table
              :columns="tableColumns"
              :dataSource="lstChuyenMucTT"
              :pagination="false"
              :loading="loading">
                <template #bodyCell="{ column, record }">
                  <template v-if="column.key === 'action'">
                    <ul class="list-inline hstack gap-2 mb-0">
                      <li class="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Chi tiết">
                        <a :href="'/dashboard/van-ban/Detail/' + record.id" class="text-primary d-inline-block edit-item-btn">
                          <i class="ri-information-line fs-16"></i>
                        </a>
                      </li>
                      <li class="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Chỉnh sửa">
                        <a :href="'/dashboard/van-ban/Edit/' + record.id" class="text-primary d-inline-block edit-item-btn">
                          <i class="ri-pencil-fill fs-16"></i>
                        </a>
                      </li>
                      <li class="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top"
                    title="Remove">
                    <a-popconfirm class="text-danger" title="Xác nhận xóa ?" ok-text="Xóa" cancel-text="Hủy"
                      @confirm="deleteVanBan(record.id)" @cancel="cancel">
                      <i class="ri-delete-bin-5-fill fs-16"></i>
                    </a-popconfirm>
                  </li>
                    </ul>
                  </template>
                </template>
              </a-table>
              <Pagination :total="optionPage.totalCount" :current="optionPage.pageIndex" :per-page="optionPage.pageSize"
            :pageRange="optionPage.totalCount" @page-changed="handlePageChange" />
            </div>                        
        </div>
      </a-card>
    </a-col>
  </a-row>
  <!-- <ModalAddEditChuyenMucTT
    @addSuccess="LoadData(optionPage.pageIndex, optionPage.pageSize)"
    ref="modalAddEditChuyenMucTT"
  ></ModalAddEditChuyenMucTT>
  <ModalDetailChuyenMucTT ref="modalDetailChuyenMucTT"></ModalDetailChuyenMucTT> -->
</template>

<script>
import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";
import APIService from "@/helpers/ApiService";
import Pagination from "../../../components/widgets/Pagination.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Swal from "sweetalert2";
export default {
  components: {
    PageHeader,
    Pagination,
  },
  page: {
    title: "Quản lý văn bản",
    meta: [
      {
        name: "Quản lý văn bản",
        content: appConfig.description,
      },
    ],
  },
  mounted(){
    this.LoadData(this.optionPage.pageIndex, this.optionPage.pageSize);
  },
  data(){
    return{
        title: "Quản lý văn bản",
        items: [
            {
            text: "Dashboard",
            href: "/",
            },
            {
            text: "Quản lý văn bản",
            active: true,
            },
        ],
        lstChuyenMucTT:[],
        optionPage: {
          pageIndex: 1,
          pageSize: 10,
          totalCount: 0,
        },
        formSearch: {
          NameTextFilter: "",
          NumberFilter: "",
        },
        id: this.$route.params.id,
        tableColumns: [
       
        { title: "TT", dataIndex: "tt", key: "ThuTuHienThi", sorter: (a, b) => a.tt - b.tt}, // Sắp xếp theo ID },
        { title: "Tên văn bản ", dataIndex: "nameText", key: "nameText" },
        { title: "Số hiệu văn bản", dataIndex: "number", key: "sohieu" },
        { title: "Ngày có hiệu lực", dataIndex: "effectiveDate", key: "ngayhieuluc" },
        { title: "Cơ quan ban hành", dataIndex: "agencyIssued", key: "coquanbanhanh" },
        { title: "Ngày ban hành", dataIndex: "publicDate", key: "ngaybanhanh" },
        { title: "Trạng Thái", dataIndex: "status", key: "trangthai" },
        { title: "Loại văn bản", dataIndex: "documentType", key: "loaivanban" },
        { title: "Tài liệu", dataIndex: "document", key: "tailieu" },
        { title: "Thao tác", key: "action", width: 100},
        
      ],
      idDanhMuc: '03'
    }
  },
  methods:{
    async LoadData(pageIndex, pageSize, params){
        var searchParam = {
          pageIndex: pageIndex,
          pageSize: pageSize,
          MaDanhMuc: this.idDanhMuc
        };
        if (params) {
          searchParam = params;
        }
      var urlQuery = new URLSearchParams(searchParam).toString();
      var result = await APIService.get(`/VanBan/GetDataByPage?` + urlQuery);
      this.lstChuyenMucTT = result.data.data.items;
      if (result.data.data != null && result.data.data.items != null) {
        var res = result.data.data;
        this.lstChuyenMucTT = result.data.data.items;
        this.optionPage.pageIndex = res.pageIndex;
        this.optionPage.pageSize = res.pageSize;
        this.optionPage.totalCount = res.totalCount;
        console.log('chuyen muc', this.lstChuyenMucTT)
      }
    },
    openModalAdd() {
      this.$refs.modalAddEditChuyenMucTT.showModal();
    },
    // openModalDetail(id) {
    //   this.$refs.modalDetailChuyenMucTT.showModal(id);
    // },
    // openModalEdit(id) {
    //   this.$refs.modalAddEditChuyenMucTT.showModal(id);
    // },
    SearchData(){
      var searchParam = {
        pageIndex: this.optionPage.pageIndex,
        pageSize: this.optionPage.pageSize,
        NameTextFilter: this.formSearch.NameTextFilter,
        NumberFilter: this.formSearch.NumberFilter,
      };

      this.LoadData(1, 10, searchParam);
    },
    handlePageChange(page) {
        this.optionPage.pageIndex = page;
        this.LoadData(this.optionPage.pageIndex, this.optionPage.pageSize);
      },
    async deleteVanBan(id) {
      var res = await APIService.delete(`/VanBan/delete/${id}`);
      if (res.data.status !== "Success") {
        this.$message.error();
        this.LoadData(this.optionPage.pageIndex, this.optionPage.pageSize);
      }
      this.$message.success("Xóa văn bản thành công");
      this.LoadData(this.optionPage.pageIndex, this.optionPage.pageSize);
    },
  }
};
</script>

<style>
</style>