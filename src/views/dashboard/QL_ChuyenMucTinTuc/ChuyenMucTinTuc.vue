<template>
  <PageHeader :title="title" :items="items" />
  <a-row>
    <a-col :span="24">
      <a-card title="Danh sách chuyên mục tin tức"> 
        <template #extra>
          <a-button @click="openModalAdd" type="primary">Thêm mới</a-button>
          <a-button style="margin-left: 10px;" @click="exportExcel">Export Data</a-button>
          <a-button style="margin-left: 10px;" @click="importData">Import Data</a-button>
        </template>
        <div>
            <a-row  style="margin-bottom: 20px;" :gutter="24">
            <a-col :span="10">
              <a-input v-model:value="formSearch.maFilter" @keyup.enter="SearchData" placeholder="Mã chuyên mục">
                <template #prefix>
                  <i class="ri-search-line search-icon"></i>
                </template>
              </a-input>
            </a-col>
            <a-col :span="10">
              <a-input v-model:value="formSearch.tenFilter" @keyup.enter="SearchData" placeholder="Tên chuyên mục">
                <template #prefix>
                  <i class="ri-search-line search-icon"></i>
                </template>
              </a-input>
              
            </a-col>
            <a-col :span="4">
              <a-button type="primary"  @click="SearchData"><i class="ri-equalizer-fill me-2 align-bottom"></i>Tìm kiếm</a-button>
            </a-col>
          </a-row>
            <div>
              <a-table
              :columns="tableColumns"
              :dataSource="lstChuyenMucTT"
              :pagination="false"
              :loading="loading">
                <template #bodyCell="{ column, index, record }">
                  <template v-if="column.key === 'STT'">
                      <ul class="list-inline hstack gap-2 mb-0">
                        <li>{{ index+ 1 }}</li>
                      </ul>
                    </template>
                    <template v-if="column.key === 'HienThi'">
                    <td style="font-weight: 700;font-size: 18px; color: green" v-if="record.isHienThi == true">
                        
                        <i class="ri-check-line"></i>
                      </td>
                      <td v-if="record.isHienThi == false"></td>
                  </template>
                  <template v-if="column.key === 'action'">
                    <ul class="list-inline hstack gap-2 mb-0">
                      <li>
                        <a
                          href="#"
                          class="ant-btn ant-btn-primary d-inline-block edit-item-btn"
                          @click="openModalDetail(record.id)"
                        >
                          <i class="ri-information-line fs-16"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="ant-btn ant-btn-primary d-inline-block edit-item-btn"
                          @click="openModalEdit(record.id)"
                        >
                          <i class="ri-pencil-fill fs-16"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="text-danger d-inline-block remove-item-btn"
                          @click="deleteChuyenMuc(record.id)"
                        >
                          <i class="ri-delete-bin-5-fill fs-16"></i>
                        </a>
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
  <ModalAddEditChuyenMucTT
    @addSuccess="LoadData(optionPage.pageIndex, optionPage.pageSize)"
    ref="modalAddEditChuyenMucTT"
  ></ModalAddEditChuyenMucTT>
  <ModalDetailChuyenMucTT ref="modalDetailChuyenMucTT"></ModalDetailChuyenMucTT>
</template>

<script>
import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";
import APIService from "@/helpers/ApiService";
import ModalAddEditChuyenMucTT from "./ModalAddEditChuyenMucTT.vue";
import ModalDetailChuyenMucTT from "./ModalDetailChuyenMucTT.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Swal from "sweetalert2";
import Pagination from "../../../components/widgets/Pagination.vue";
export default {
  components: {
    PageHeader,
    ModalAddEditChuyenMucTT,
    ModalDetailChuyenMucTT,
    Pagination
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
  mounted(){
    this.LoadData(this.optionPage.pageIndex, this.optionPage.pageSize);
  },
  data(){
    return{
        title: "Quản lý chuyên mục tin tức",
        items: [
            {
            text: "Dashboard",
            href: "/",
            },
            {
            text: "Quản lý chuyên mục tin tức",
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
          maFilter: "",
          tenFilter: "",
        },
        id: this.$route.params.id,
        tableColumns: [
        { title: "TT", key: "STT" , width: 70},
        { title: "Mã danh mục", dataIndex: "maDanhMuc", key: "maDanhMuc"},
        { title: "Tên danh mục", dataIndex: "tenDanhMuc", key: "maDanhMuc" },
        { title: "Hiển thị", dataIndex: "isHienThi", key: "HienThi"},
        { title: "Thao tác", key: "action", width: 200 },
      ],
      idDanhMuc: 'DM_TINTUC'
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
      var result = await APIService.get(`/DanhMucTinTuc/GetDataByPage?` + urlQuery);
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
    openModalDetail(id) {
      this.$refs.modalDetailChuyenMucTT.showModal(id);
    },
    openModalEdit(id) {
      this.$refs.modalAddEditChuyenMucTT.showModal(id);
    },
    SearchData(){
      var searchParam = {
        pageIndex: this.optionPage.pageIndex,
        pageSize: this.optionPage.pageSize,
        maThongTin: this.formSearch.maFilter,
        GiaTri: this.formSearch.tenFilter,
      };

      this.LoadData(1, 10, searchParam);
    },
    async deleteChuyenMuc(id) {
      // var res = await APIService.delete(`/ThongTinDanhMuc/delete/${id}`);
      // if (res.data.status !== "Success") {
      //   this.$message.error();
      //   return;
      // }
      // this.$message.success("Xóa chuyên mục thành công");
      // this.LoadData(this.optionPage.pageIndex, this.optionPage.pageSize);

      Swal.fire({
        title: "Đồng ý xóa dữ liệu",
        text: "Sau khi xóa sẽ không thể khôi phục lại.",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Hủy",
        cancelButtonColor: "#f46a6a",
        confirmButtonColor: "#34c38f",
        confirmButtonText: "Đồng ý",
      }).then(async (result) => {
        if (result.value) {
          try {
            //xóa trên database
            await APIService.delete('/DanhMucTinTuc/delete/'+id);
            toast.success("Xóa chuyên mục thành công.", {
              "theme": "colored",
              autoClose: 2000
            });

          
            this.LoadData(this.optionPage.pageIndex, this.optionPage.pageSize);
          } catch (e) {
            if (e.status == 401) {
              toast.error("Bạn không có quyền truy cập.", {
                "theme": "colored",
                autoClose: 2000
              });
            } else {
              if (e.data && e.data.Message) {
                this.errMessage = e.data.Message;
                toast.error(e.data.Message, {
                  "theme": "colored",
                  autoClose: 2000
                });
              } else {
                toast.error("Xóa thất bại. Vui lòng thử lại sau.", {
                  "theme": "colored",
                  autoClose: 2000
                });
              }
            }
          }

        }
      });
    },
    handlePageChange(page) {
      this.optionPage.pageIndex = page;
      this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
    },
  }
};
</script>

<style>
</style>