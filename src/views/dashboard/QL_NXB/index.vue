<template>
  <PageHeader :title="title" :items="items" />
  <a-row>
    <a-col :span="24">
      <a-card title="Danh sách nhà xuất bản">
        <template #extra>
          <a-button @click="openModalAdd" type="primary">Thêm mới</a-button>
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
                :dataSource="lstNXB"
                :pagination="false"
                :loading="loading">
                <template #bodyCell="{ column, index, record }">
                    <template v-if="column.key === 'STT'">
                      <ul class="list-inline hstack gap-2 mb-0">
                        <li>{{ index+1 }}</li>
                      </ul>
                    </template>
                    <template v-if="column.key === 'action'">
                      <ul class="list-inline hstack gap-2 mb-0">
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
  <ModalAddEditNXB 
    @addSuccess="loadData(optionPage.pageIndex, optionPage.pageSize)"
    ref="modalAddEditNXB">
  </ModalAddEditNXB>
</template>

<script>
import Pagination from "../../../components/widgets/Pagination.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";
import APIService from "@/helpers/ApiService";
import ModalAddEditNXB from "./ModalAddEditNXB.vue";
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  page: {
    title: "Quản lý nhà xuất bản",
    meta: [
      {
        name: "Danh sách nhà xuất bản",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "Quản lý nhà xuất bản",
      items: [
        {
          text: "Dashboard",
          href: "/",
        },
        {
          text: "Quản lý nhà xuất bản",
          active: true,
        },
      ],
      tableColumns: [
        { title: "STT", width: 100, key: "STT" },
        { title: "Mã NXB", dataIndex: "maNXB", width:300},
        { title: "Tên NXB", dataIndex: "tenNXB" },
        { title: "Thao tác",key: "action", width: 200}
      ],
      pages: [],
      lstNXB: [],
      optionPage: {
        pageIndex: 1,
        pageSize: 20,
        totalCount: 0,
      },
      formSearch: {
        TenNXBFilter: "",
        
      },
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
            await APIService.delete("/NhaXuatBan/delete/" + event.id);
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
      var result = await APIService.get("/NhaXuatBan?" + urlQuery);
      this.lstNXB = result.data.data.items;
      if (result.data.data != null && result.data.data.items != null) {
        var res = result.data.data;
        this.lstNXB = result.data.data.items;
        this.optionPage.pageIndex = res.pageIndex;
        this.optionPage.pageSize = res.pageSize;
        this.optionPage.totalCount = res.totalCount;
      }
    },
    openModalAdd() {
      this.$refs.modalAddEditNXB.showModal();
    },
    openModalEdit(id){
      this.$refs.modalAddEditNXB.showModal(id);
    }
  },
  mounted() {
    this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
  },
  components: {
    PageHeader,
    ModalAddEditNXB,
    Pagination,
  },
};
</script>

<style>
</style>