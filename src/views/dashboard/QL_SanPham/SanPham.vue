<template>
  <PageHeader :title="title" :items="items" />
  <a-row>
    <a-col :span="24">
      <a-card title="Danh sách nhà xuất bản">
        <template #extra>
          <router-link :to="{ name: 'Add_SanPham'}"> <a-button style="margin-left: 10px;" >Thêm mới</a-button></router-link>
        </template>
        <div>
          <a-row style="margin-bottom: 20px" :gutter="24">
            <a-col :span="12">
              <a-input
                v-model:value="formSearch.TenNXBFilter"
                @keyup.enter="SearchData"
                placeholder="Tiêu đề"
              >
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
              :dataSource="lstSanPham"
              :pagination="false"
              :loading="loading"
              :scroll="{ x: 2000 }">
              <template #bodyCell="{ column, index, record }">
                <template v-if="column.key === 'STT'">
                  <ul class="list-inline hstack gap-2 mb-0">
                    <li>{{ index+1 }}</li>
                  </ul>
                </template>
                <template v-if="column.key === 'noiBat'">
                    <td style="font-weight: 700;font-size: 18px; color: green" v-if="record.noiBat == true">
                        
                        <i class="ri-check-line"></i>
                      </td>
                      <td v-if="record.noiBat == false"></td>
                  </template>
                  <template v-if="column.key === 'giamGia'">
                    <td style="font-size: 18px;">
                        
                        {{record.giamGia}} %
                      </td>
                      <td v-if="record.noiBat == false"></td>
                  </template>
                <template v-if="column.key === 'action'">
                  <ul class="list-inline hstack gap-2 mb-0">
                    <li
                    >
                      <router-link :to="{ name: 'QL_DetailSanPham', params: { id: record.id } }">
                         <i class="ri-information-line fs-16"></i>
                      </router-link>
                    </li>
                    <li>
                    
                    <router-link :to="{ name: 'Edit_SanPham', params: { id: record.id } }">
                         <i class="ri-pencil-fill fs-16"></i>
                      </router-link>
                    </li>
                    <li>
                        <a
                          href="#"
                          class="text-danger d-inline-block remove-item-btn"
                          @click="deletedata(record)"
                        >
                          <i class="ri-delete-bin-5-fill fs-16"></i>
                        </a>
                      </li>
                  </ul>
                </template>
                <template v-if="column.key === 'pathAnh'">
                  <img :src="'http://localhost:44301/'+ record.pathAnh" alt="Hình ảnh" style="width: 50px; height: auto;">
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
  <ModalAddEditSanPham
    @addSuccess="loadData(optionPage.pageIndex, optionPage.pageSize)"
    ref="modalAddEditSanPham">
  </ModalAddEditSanPham>
</template>

<script>
import Pagination from "../../../components/widgets/Pagination.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";
import APIService from "@/helpers/ApiService";
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import ModalAddEditSanPham from './ModalAddEditSanPham.vue';

export default {
  components:{
    PageHeader,
    Pagination,
    ModalAddEditSanPham
  },
  page: {
    title: "Quản lý sản phẩm",
    meta: [
      {
        name: "Danh sách sản phẩm",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "Quản lý sản phẩm",
      items: [
        {
          text: "Dashboard",
          href: "/",
        },
        {
          text: "Quản lý sản phẩm",
          active: true,
        },
      ],
      tableColumns: [
        { title: "STT", width: 100, key: "STT" },
        { title: "Hình ảnh", dataIndex: "pathAnh", key:"pathAnh",width: 150},
        { title: "Tên sách", dataIndex: "tenSach", width:300},
        { title: "Tên tác giả", dataIndex: "tenTacGia", width:300 },
        { title: "Nhà xuất bản",dataIndex: "tenNXB",  width:300 },
        { title: "Năm xuất bản",dataIndex: "namXuatBan",  width:150},
        { title: "Danh mục", dataIndex: "tenDanhMuc",  width:300 },
        { title: "Giá tiền", dataIndex: "giaTien",  width:130 },
        { title: "Số lượng tồn", dataIndex: "soLuongTon", width: 130},
        
        { title: "Nhóm độ tuổi", dataIndex: "tenNhomDoTuoi",  width:300  },
        { title: "Nổi bật", key: "noiBat" },
        { title: "Giảm giá", key: "giamGia", width: 130 },
        { title: "Thao tác", key: "action"}
      ],
      pages: [],
      lstSanPham: [],
      optionPage: {
        pageIndex: 1,
        pageSize: 20,
        totalCount: 0,
      },
      formSearch: {
        TenNXBFilter: "",
      },
    }
  },
  methods: {
    deletedata(event) {
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
            await APIService.delete("/SanPham/delete/" + event.id);
            toast.success("Xóa thành công.", {
              theme: "colored",
              autoClose: 2000,
            });
              
            this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
          } catch (e) {
            if (e.status == 401) {
              toast.error("Bạn không có quyền truy cập.", {
                theme: "colored",
                autoClose: 2000,
              });
            } else {
              if (e.data && e.data.Message) {
                this.errMessage = e.data.Message;
                toast.error(e.data.Message, {
                  theme: "colored",
                  autoClose: 2000,
                });
              } else {
                toast.error("Xóa thất bại. Vui lòng thử lại sau.", {
                  theme: "colored",
                  autoClose: 2000,
                });
              }
            }
          }
        }
      });
    },
    SearchData() {
      // this.value = this.value1;
      var searchParam = {
        pageIndex: this.optionPage.pageIndex,
        pageSize: this.optionPage.pageSize,
        TenNXBFilter: this.formSearch.TenNXBFilter,
       
      };

      this.loadData(1, 10, searchParam);
    },
    handlePageChange(page) {
      this.optionPage.pageIndex = page;
      this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
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
      var result = await APIService.get("/SanPham?" + urlQuery);
      this.lstSanPham = result.data.data.items;
      if (result.data.data != null && result.data.data.items != null) {
        var res = result.data.data;
        this.lstSanPham = result.data.data.items;
        this.optionPage.pageIndex = res.pageIndex;
        this.optionPage.pageSize = res.pageSize;
        this.optionPage.totalCount = res.totalCount;
      }
    },
    openModalAdd() {
      this.$refs.modalAddEditSanPham.showModal();
    },
    openModalEdit(id){
      
    },
    OpenDetai(id){
      
    }
  },
  mounted() {
    this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
    
  },
};
</script>

<style>
</style>