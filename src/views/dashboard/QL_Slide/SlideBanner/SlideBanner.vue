<template>
  <PageHeader :title="title" :items="items" />
  <a-row>
    <a-col :span="24">
      <a-card title="Danh sách banner">
        <template #extra>
          <a-button @click="openModalAdd" type="primary">Thêm mới</a-button>
        </template>
        <div>
          <!-- <a-row style="margin-bottom: 20px" :gutter="24">
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
          </a-row> -->
          <div>
            <a-table
                :columns="tableColumns"
                :dataSource="lstBanner"
                :pagination="false"
                :loading="loading">
                <template #bodyCell="{ column, index, record }">
                    <template v-if="column.key === 'STT'">
                      <ul class="list-inline hstack gap-2 mb-0">
                        <li>{{ index+1 }}</li>
                      </ul>
                    </template>
                    <template v-if="column.key === 'hinhAnh'">
                      <!-- <a :href="this.URL+ record.path" target="_blank">Xem hình ảnh</a> -->
                      <a :href="this.URL+ record.path" target="_blank">
                        <img :src="this.URL+ record.path" alt="Hình ảnh" style="height:100px; ">
                      </a>
                      
                    </template>
                    <template v-if="column.key === 'action'">
                      <ul class="list-inline hstack gap-2 mb-0">
                     
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
                </template>
            </a-table>
            <Pagination :total="optionPage.totalCount" :current="optionPage.pageIndex" :per-page="optionPage.pageSize"
            :pageRange="optionPage.totalCount" @page-changed="handlePageChange" />
          </div>
        </div>
      </a-card>
    </a-col>
  </a-row>

  <ModalAddBanner
    @addSuccess="loadData()"
    ref="modalAddBanner">
  </ModalAddBanner>
</template>

<script>
import Pagination from "../../../../components/widgets/Pagination.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../../../app.config";
import APIService from "@/helpers/ApiService";
import ModalAddBanner from "./ModalAddBanner.vue";
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  page: {
    title: "Quản lý banner",
    meta: [
      {
        name: "Danh sách banner",
        content: appConfig.description,
      },
    ],
    
  },
  data() {
    return {
      title: "Quản lý banner",
      items: [
        {
          text: "Dashboard",
          href: "/",
        },
        {
          text: "Quản lý banner",
          active: true,
        },
      ],
      tableColumns: [
        { title: "STT", width: 100, key: "STT" },
        { title: "Tên banner", dataIndex: "tenBanner", width:300},
        { title: "Hình ảnh", key: "hinhAnh" },
        { title: "Thao tác",key: "action", width: 200}
      ],
      pages: [],
      lstBanner: [],
      optionPage: {
        pageIndex: 1,
        pageSize: 20,
        totalCount: 0,
      },
      formSearch: {
        TenNXBFilter: "",
        
      },
      URL: 'http://localhost:44301/',
    };
  },
  methods: {
    getToken() {
      return (user = JSON.parse(localStorage.getItem("user")));
    },
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
          
            //xóa trên database
            await APIService.delete("/QLSlide/delete?IDItem="+ event.id);
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
    async loadData() {
      
      var result = await APIService.get("/QLSlide/GetByType?Type=BANNER");
     
      this.lstBanner = result.data.data;
      
    },
    openModalAdd() {
      this.$refs.modalAddBanner.showModal();
    },
    // openModalEdit(id){
    //   this.$refs.modalAddEditNXB.showModal(id);
    // }
  },
  mounted() {
    this.loadData();
    
  },
  components: {
    PageHeader,
    ModalAddBanner,
    Pagination,
  },
};
</script>

<style>
</style>