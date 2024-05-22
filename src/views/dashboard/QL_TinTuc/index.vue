<script>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";
import Swal from "sweetalert2";
import Lottie from "@/components/widgets/lottie.vue";
import animationData from "@/components/Animation/msoeawqm.json";
import animationData1 from "@/components/Animation/gsqxdxog.json";
import Pagination from "../../../components/widgets/Pagination.vue";
import APIService from "@/helpers/ApiService";

import ModalTinChuaDang from "./ModalTinChuaDang.vue";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import Common from "@/helpers/Common"


export default {
  page: {
    title: "Quản lý tin tức",
    meta: [{
      name: "Quản lý tin tức",
      content: appConfig.description,
    },],
  },
  data() {
    return {
      title: "Quản lý tin tức",
      items: [{
        text: "Dashboard",
        href: "/",
      },
      {
        text: "Quản lý tin tức",
        active: true,
      },
      ],
      date1: null,
      date: null,
      addCustomerModal: false,
      editCustomerModal: false,
      tableColumns: [
        { title: "Hình ảnh",  dataIndex: "hinhAnh", width: 100,key:"hinhAnh1"  },
        { title: "Tiêu đề", dataIndex: "title", width:200 },
        { title: "Chuyên mục", dataIndex: "chuyenMuc", width:120 },
        { title: "Danh mục", dataIndex: "danhMuc", width:120 },
        { title: "Trạng thái", dataIndex: "trangThai", width:120  },
        { title: "Nổi bật", dataIndex: "noiBat", key:"NoiBat", width:100},
        { title: "Ngày hiển thị", dataIndex: "publicDate", align:'center' , key:"NgayHienThi", width:120},
        { title: "Ngày tạo", dataIndex: "createdDate", key:"NgayTao" , width:120},
        { title: "Hẹn ngày đăng", dataIndex: "henGioDang", key:"henGioDang" , width:120},
        { title: "Trạng thái đăng", dataIndex: "trangThaiDang", key:"trangThaiDang" , width:120},
        { title: "Thao tác", key: "action" },
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
        dateFormat: "d, M, Y",
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
        pageSize: 20,
        totalCount: 0
      },
      formSearch:{
        titleFilter:'',
        publicDateFilter:'',
        isPublicFilter:''
      }
    };
  },
  methods: {
    getToken(){
        return user = JSON.parse(localStorage.getItem("user"));
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
            await APIService.delete("/tintuc/delete/" + event.id);
            toast.success("Xóa bài viết thành công.", {
              "theme": "colored",
              autoClose: 2000
            });

            //xóa trong list item. không phải call lại API
            this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
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
        titleFilter:this.formSearch.titleFilter,
        publicDateFilter:this.formSearch.publicDateFilter,
        isPublicFilter: this.formSearch.isPublicFilter
      }
      
      this.loadData(1,10,searchParam)

    },
    handlePageChange(page) {
      this.optionPage.pageIndex = page;
      this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize)
    },
    async loadData(pageIndex, pageSize,params) {
      var searchParam = {
        pageIndex: pageIndex,
        pageSize: pageSize
      }
      if(params){
        searchParam=params;
      }

      var urlQuery = new URLSearchParams(searchParam).toString();
      var result = await APIService.get("/TinTuc/GetDataByPage?"+urlQuery);
      this.lstBaiViet = result.data.data.items;
      if(result.data.data != null && result.data.data.items != null){
        var res = result.data.data;
        this.lstBaiViet = result.data.data.items;
        this.optionPage.pageIndex = res.pageIndex;
        this.optionPage.pageSize = res.pageSize;
        this.optionPage.totalCount = res.totalCount;
      }
    },
    formatDate: Common.formatDate,
    openModalTinChuaDang(){
      this.$refs.modalTinChuaDang.showModal();
    }
  },
  created(){
  },
  mounted() {
    var checkAll = document.getElementById("checkAll");
    if (checkAll) {
      checkAll.onclick = function () {
        var checkboxes = document.querySelectorAll(
          '.form-check-all input[type="checkbox"]'
        );

        if (checkAll.checked == true) {
          checkboxes.forEach(function (checkbox) {
            checkbox.checked = true;
            checkbox.closest("tr").classList.add("table-active");
            document.getElementById('remove-actions').style.display = 'block';
          });
        } else {
          checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
            checkbox.closest("tr").classList.remove("table-active");
            document.getElementById('remove-actions').style.display = 'none';
          });
        }
      };
    }

    var checkboxes = document.querySelectorAll('#customerTable .form-check-input');
    Array.from(checkboxes).forEach(function (element) {
      element.addEventListener('change', function (event) {
        var checkedCount = document.querySelectorAll('#customerTable .form-check-input:checked').length;

        if (event.target.closest("tr").classList.contains("table-active")) {
          (checkedCount > 0) ? document.getElementById("remove-actions").style.display = 'block' : document.getElementById("remove-actions").style.display = 'none';
        } else {
          (checkedCount > 0) ? document.getElementById("remove-actions").style.display = 'block' : document.getElementById("remove-actions").style.display = 'none';
        }
      });
    });
    this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
  },
  components: {
    PageHeader,
    Multiselect,
    flatPickr,
    Pagination,
    Lottie,
    ModalTinChuaDang
  },
};
</script>

<template>
  <PageHeader :title="title" :items="items" />
 
  <a-row>
    <a-col :span="24">
      <a-card title="Danh sách tin bài">
        <template #extra>
          
         <router-link :to="{ name: 'QL_Create'}"> <a-button style="margin-left: 10px;" >Thêm mới</a-button></router-link> 
         <a-button style="margin-left: 10px;" @click="openModalTinChuaDang">Danh sách tin chưa đăng</a-button>
          <a-button style="margin-left: 10px;" >Import Data</a-button>
        </template>
        <div>
          <a-row style="margin-bottom: 20px;" :gutter="24">
            <a-col :span="12">
              <a-input v-model:value="formSearch.titleFilter" @keyup.enter="SearchData" placeholder="Tiêu đề">
                <template #prefix>
                  <i class="ri-search-line search-icon"></i>
                </template>
              </a-input>
            </a-col>
            <a-col :span="4">
              <a-select
                ref="select"
                v-model:value="formSearch.TrangThai"
                style="width: 100%"
                placeholder="Trạng thái"
              >
                <a-select-option value="BAN_NHAP">Bản nháp</a-select-option>
                <a-select-option value="XUAT_BAN">Xuất bản</a-select-option>
                <a-select-option value="GO_BO">Gỡ bỏ</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="4">
              <a-select
                ref="select"
                v-model:value="formSearch.DanhMuc"
                style="width: 100%"
                placeholder="Thông báo"
              >
                <a-select-option value="TIN_TUC">Tin tức</a-select-option>
                <a-select-option value="THONG_BAO">Thông báo</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="4">
              <a-button type="primary"  @click="SearchData"><i class="ri-equalizer-fill me-2 align-bottom"></i>Tìm kiếm</a-button>
            </a-col>
          </a-row>
          <div>
              <a-table
              :columns="tableColumns"
              :dataSource="lstBaiViet"
              :pagination="false"
              :loading="loading"
              :scroll="{ x: 1200}">
                <template #bodyCell="{ column, record }">
                  <template v-if="column.key === 'hinhAnh1'">
                    <img :src="'http://localhost:44301/api/FileAndFolder/'+ record.hinhAnh" alt="Hình ảnh" style="width: 50px; height: auto;">
                  </template>
                  <template v-if="column.key === 'action'">
                    <ul class="list-inline hstack gap-2 mb-0">
                      <li>
                        <router-link :to="{ name: 'QL_TinTuc_Detail', params: { id: record.id } }">
                          <i class="ri-information-line fs-16"></i>
                        </router-link>
                      </li>
                      <li>
                        <router-link :to="{ name: 'QL_TinTuc_Edit', params: { id: record.id } }">
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
                  <template v-if="column.key === 'NgayTao'">
                    {{ formatDate(record.createdDate) }}
                  </template>
                  <template v-if="column.key === 'NgayHienThi'">
                    {{ formatDate(record.publicDate) }}
                  </template>
                  <template v-if="column.key === 'henGioDang'">
                    {{ formatDate(record.henGioDang) }}
                  </template>
                  <template v-if="column.key === 'NoiBat'">
                    <td style="font-weight: 700;font-size: 18px; color: green" v-if="record.noiBat == true">
                        
                        <i class="ri-check-line"></i>
                      </td>
                      <td v-if="record.noiBat == false"></td>
                  </template>
                  <template v-if="column.key === 'trangThaiDang'">
                    <td style="font-weight: 700;font-size: 18px; color: green" v-if="record.trangThaiDang == true">
                        
                        <i class="ri-check-line"></i>
                      </td>
                      <td v-if="record.trangThaiDang == false"></td>
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
  <modal-tin-chua-dang ref="modalTinChuaDang"></modal-tin-chua-dang>
</template>