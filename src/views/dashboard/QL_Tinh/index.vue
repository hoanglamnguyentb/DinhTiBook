<template>
  <PageHeader :title="title" :items="items" />
  <b-row>
    <b-col lg="12">
      <b-card no-body id="lstBaiViet">
        <b-card-header class="border-bottom-dashed">
          <b-row class="g-4 align-items-center">
            <b-col sm>
              <div>
                <h5 class="card-title mb-0">Danh sách tỉnh</h5>
              </div>
            </b-col>
            <b-col sm="auto">
              <div class="d-flex flex-wrap align-items-start gap-2">

                <div class="add-btn me-1">
                  <router-link :to="{ name: 'QL_Tinh_Add' }" class="btn btn-success">
                    <i class="ri-add-line align-bottom me-1"></i> Thêm mới
                  </router-link>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card-header>
        <b-card-body>
        <div>
          <s-table :columns="tableColumns" :dataSource="lstBaiViet">
          </s-table>
          <Pagination v-if="optionPage.totalCount > 20" :total="optionPage.totalCount" :current="optionPage.pageIndex"
            :per-page="optionPage.pageSize" :pageRange="optionPage.totalCount" @page-changed="handlePageChange" />
        </div>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import "@vueform/multiselect/themes/default.css";
import "flatpickr/dist/flatpickr.css";

import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";
import Swal from "sweetalert2";
import animationData from "@/components/Animation/msoeawqm.json";
import animationData1 from "@/components/Animation/gsqxdxog.json";
import Pagination from "../../../components/widgets/Pagination.vue";
import APIService from "@/helpers/ApiService"

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import Common from "@/helpers/Common"


export default {
  page: {
    title: "Quản lý tỉnh",
    meta: [{
      name: "Quản lý tỉnh",
      content: appConfig.description,
    },],
  },
  data() {
    return {
      title: "Quản lý tỉnh",
      items: [{
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
        { title: "Mã tỉnh", dataIndex: "maTinh" }, 
        { title: "Tên tỉnh", dataIndex: "tenTinh" },
        { title: "Loại", dataIndex: "loai" },
        { title: "", dataIndex: "action" },
      ],
      rangeDateconfig: {
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: "M j, Y",
        altInput: true,
        dateFormat: "d M, Y",
        mode: "range",
      },
      config: {
        enableTime: false,
        dateFormat: "d M, Y",
      },
      searchQuery: null,
      defaultOptions: {
        animationData: animationData
      },
      defaultOptions2: {
        animationData: animationData1
      },
      value: 'All',
      value1: null,
      pages: [],
      lstBaiViet: [],
      optionPage: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0
      },
      formSearch: {
        titleFilter: '',
        publicDateFilter: '',
        isPublicFilter: ''
      }
    };
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
            //xóa trên database
            await APIService.delete("/tintuc/delete/" + event.id);
            toast.success("Xóa bài viết thành công.", {
              "theme": "colored",
              autoClose: 2000
            });

            //xóa trong list item. không phải call lại API

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
                toast.error("Xóa bài viết thất bại. Vui lòng thử lại sau.", {
                  "theme": "colored",
                  autoClose: 2000
                });
              }
            }
          }

        }
      });
    },
    deleteMultiple() {
      let ids_array = [];
      var items = document.getElementsByName("chk_child");
      items.forEach(function (ele) {
        if (ele.checked == true) {
          var trNode = ele.parentNode.parentNode.parentNode;
          var id = trNode.querySelector(".id a").innerHTML;
          ids_array.push(id);
        }
      });
      if (typeof ids_array !== "undefined" && ids_array.length > 0) {
        if (confirm("Are you sure you want to delete this?")) {
          var cusList = this.lstBaiViet;
          ids_array.forEach(function (id) {
            cusList = cusList.filter(function (customer) {
              return customer.customerId != id;
            });
          });
          this.lstBaiViet = cusList;
          document.getElementById("checkAll").checked = false;
          var itemss = document.getElementsByName("chk_child");
          itemss.forEach(function (ele) {
            if (ele.checked == true) {
              ele.checked = false;
              ele.closest("tr").classList.remove("table-active");
            }
          });
        } else {
          return false;
        }
      } else {
        Swal.fire({
          title: "Please select at least one checkbox",
          confirmButtonClass: "btn btn-info",
          buttonsStyling: false,
          showCloseButton: true,
        });
      }
    },
    SearchData() {
      // this.value = this.value1;
      var searchParam = {
        pageIndex: this.optionPage.pageIndex,
        pageSize: this.optionPage.pageSize,
        titleFilter: this.formSearch.titleFilter,
        publicDateFilter: this.formSearch.publicDateFilter,
        isPublicFilter: this.formSearch.isPublicFilter
      }

      this.loadData(1, 10, searchParam)

    },
    handlePageChange(page) {
      this.optionPage.pageIndex = page;
      this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize)
    },
    async loadData(pageIndex, pageSize, params) {
      var searchParam = {
        pageIndex: pageIndex,
        pageSize: pageSize
      }
      if (params) {
        searchParam = params;
      }

      var urlQuery = new URLSearchParams(searchParam).toString();
      var result = await APIService.get("/tinh/get?"+ urlQuery);
      this.lstBaiViet = result.data.data.items;
      if (result.data.data != null && result.data.data.items != null) {
        var res = result.data.data;
        this.lstBaiViet = result.data.data.items;
        this.optionPage.pageIndex = res.pageIndex;
        this.optionPage.pageSize = res.pageSize;
        this.optionPage.totalCount = res.totalCount;
      }
    },
    formatDate: Common.formatDate
  },
  created() {
  },
  mounted() {
    this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
  },
  components: {
    PageHeader,
    Pagination
  },
};
</script>
