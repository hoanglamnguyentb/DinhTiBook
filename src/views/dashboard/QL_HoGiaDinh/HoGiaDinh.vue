<template>
    <PageHeader :title="title" :items="items" />
    <a-row>
      <a-col :span="24">
        <a-card title="Danh mục dùng chung">
          <template #extra>
            <a-button @click="openModalAdd" type="primary">Thêm mới</a-button>
            <a-button style="margin-left: 10px" @click="exportExcel">Export Data</a-button>
            <a-button style="margin-left: 10px" @click="importData">Import Data</a-button>
  
          </template>
          <div>
            <b-card-body class="border-bottom-dashed border-bottom mb-4">
              <b-form>
                <b-row class="g-3">
                  <b-col xl="3">
                    <div class="search-box">
                      <input type="text" class="form-control search" placeholder="Mã danh mục"
                        v-model="formSearch.maFilter" />
                      <i class="ri-search-line search-icon"></i>
                    </div>
                  </b-col>
                  <b-col xl="3">
                    <div class="search-box">
                      <input type="text" class="form-control search" placeholder="Tên danh mục"
                        v-model="formSearch.tenFilter" />
                      <i class="ri-search-line search-icon"></i>
                    </div>
                  </b-col>
                  <b-col xl="6">
                    <b-row class="g-3">
                      <b-col sm="8">
                        <div class="">
                          <input v-model="formSearch.ghiChuFilter" placeholder="Ghi chú" class="form-control" />
  
                        </div>
                      </b-col>
                      <b-col sm="4">
                        <div>
                          <a-button type="button" variant="primary" class="w-100" @click="SearchData">
                            <i class="ri-equalizer-fill me-2 align-bottom"></i>Tìm
                            kiếm
                          </a-button>
                        </div>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-form>
            </b-card-body>
            <a-table :columns="tableColumns" :dataSource="lstDanhMuc" :pagination="false"  :loading="loadingTable">
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                  <ul class="list-inline hstack gap-2 mb-0">
                    <li class="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top"
                      title="Chi tiết">
                      <b-link variant="text-info" class="d-inline-block edit-item-btn"
                        @click="openModalDetail(record.id)">
                        <i class="ri-information-line fs-16"></i>
                      </b-link>
                    </li>
                    <li class="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover"
                      data-bs-placement="top" title="Chỉnh sửa">
                      <b-link variant="text-primary" class="d-inline-block edit-item-btn"
                        @click="openModalEdit(record.id)">
                        <i class="ri-pencil-fill fs-16"></i>
                      </b-link>
                    </li>
                    <li class="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top"
                      title="Remove">
                      <a-popconfirm class="text-danger" title="Xác nhận xóa ?" ok-text="Xóa" cancel-text="Hủy"
                        @confirm="deleteDanhMuc(record.id)" @cancel="cancel">
                        <i class="ri-delete-bin-5-fill fs-16"></i>
                      </a-popconfirm>
                    </li>
  
  
                    <li class="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover"
                      data-bs-placement="top" title="Dữ liệu chi tiết">
                      <router-link :to="{ name: 'QL_ThongTinDanhMuc', params: { maDM: record.maDM } }">
                        <i class="ri-equalizer-line fs-16"></i>
                      </router-link>
                    </li>
                  </ul>
                </template>
              </template>
            </a-table>
            <Pagination :total="optionPage.totalCount" :current="optionPage.pageIndex" :per-page="optionPage.pageSize"
              :pageRange="optionPage.totalCount" @page-changed="handlePageChange" />
          </div>
        </a-card>
      </a-col>
    </a-row>
  

    
  </template>
  <script>
  import PageHeader from "@/components/page-header";
  import appConfig from "../../../../app.config";
  import Pagination from "../../../components/widgets/Pagination.vue";
  import APIService from "@/helpers/ApiService";
  import { SearchOutlined } from "@ant-design/icons-vue";
  import Common from "@/helpers/Common";


  
  export default {
    setup() {
  
    },
    mounted() {
      this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
  
    },
    components: {
      PageHeader,
      Pagination,
     
      SearchOutlined,
  
    },
    page: {
      title: "Danh mục",
      meta: [
        {
          name: "Quản lý danh mục",
          content: appConfig.description,
        },
      ],
    },
    data() {
      return {
        loadingTable: false,
        title: "Quản lý danh mục",
        items: [
          {
            text: "Dashboard",
            href: "/",
          },
          {
            text: "Quản lý danh mục",
            active: true,
          },
        ],
        date1: null,
        date: null,
        addCustomerModal: false,
        editCustomerModal: false,
        tableColumns: [
           { title: "Số định danh hộ", dataIndex: "soDinhDanhHoGD", key: "SoDinhDanhHoGD", sorter: (a, b) => a.soDinhDanhHoGD - b.soDinhDanhHoGD}, // Sắp xếp theo ID },
          { title: "Số định danh chủ hộ", dataIndex: "soDinhDanhChuHo", key: "soDinhDanhChuHo" },
          { title: "Địa chỉ", dataIndex: "thuongTru", key: "thuongTru" },
          { title: "Số nhân khẩu", dataIndex: "soNhanKhau", key: "soNhanKhau" },
          { title: "Thao tác", key: "action", width: 80 },
        ],
        searchQuery: null,
        pages: [],
        lstDanhMuc: [],
        optionPage: {
          pageIndex: 1,
          pageSize: 10,
          totalCount: 0,
        },
        formSearch: {
          maFilter: '',
          tenFilter: '',
          ghiChuFilter: '',
        },
      };
    },
    methods: {
      handlePageChange() {
        this.optionPage.pageIndex = page;
        this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
      },
      SearchData() {
  
        var searchParam = {};
  
        // Kiểm tra và thêm MaDM vào searchParam nếu có giá trị
        if (this.formSearch.maFilter) {
          searchParam.MaDM = this.formSearch.maFilter.toLowerCase();
        }
  
        // Kiểm tra và thêm TenDanhMuc vào searchParam nếu có giá trị
        if (this.formSearch.tenFilter) {
          searchParam.TenDanhMuc = this.formSearch.tenFilter.toLowerCase();
        }
  
        // Kiểm tra và thêm GhiChu vào searchParam nếu có giá trị
        if (this.formSearch.ghiChuFilter) {
          searchParam.GhiChu = this.formSearch.ghiChuFilter.toLowerCase();
        }
  
        this.loadData(1, 10, searchParam);
      },
      async loadData(pageIndex, pageSize, params) {
        this.loadingTable= true
        var searchParam = {
          pageIndex: pageIndex,
          pageSize: pageSize,
        };
        if (params) {
          searchParam = params;
        }
        var urlQuery = new URLSearchParams(searchParam).toString();
        var result = await APIService.get(
          `/HoGiaDinh/GetDataByPage?` + urlQuery
        );
        this.lstDanhMuc = result.data.data.items;
        if (result.data.data != null && result.data.data.items != null) {
          var res = result.data.data;
          this.lstDanhMuc = result.data.data.items;
          this.optionPage.pageIndex = res.pageIndex;
          this.optionPage.pageSize = res.pageSize;
          this.optionPage.totalCount = res.totalCount;
        }
        this.loadingTable = false
      },
      openModalAdd() {
        this.$refs.modalAddEditDanhMuc.showModal();
      },
      openModalDetail(id) {
        this.$refs.modalDetailDanhMuc.showModal(id);
      },
      openModalEdit(id) {
        this.$refs.modalAddEditDanhMuc.showModal(id);
      },
      async deleteDanhMuc(id) {
        var res = await APIService.delete(`/DanhMuc/delete/${id}`);
        if (res.data.status !== "Success") {
          this.$message.error();
          this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
        }
        this.$message.success("Xóa danh mục thành công");
        this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
      },
    //   exportExcel () {
    //     const data = this.lstDanhMuc
    //     const workbook = new ExcelJS.Workbook()
    //     const sheet = workbook.addWorksheet('Sheet1')
    //     sheet.columns = [
    //       { key: 'maDM', header: 'Mã danh mục', width: 25 },
    //       { key: 'thuTuHienThi', header: 'Thứ tự hiển thị', width: 25 },
    //       { key: 'tenDanhMuc', header: 'Tên Danh mục', width: 50 },
    //       { key: 'ghiChu', header: 'Ghi chú', width: 70 },
    //     ]
    //     sheet.addRows(data)
    //     sheet.eachRow({ includeEmpty: true }, function (row) {
    //       row.border = {
    //         top: { style: 'thin' },
    //         left: { style: 'thin' },
    //         bottom: { style: 'thin' },
    //         right: { style: 'thin' }
    //       }
    //     })
    //     workbook.xlsx
    //       .writeBuffer({
    //         base64: true
    //       })
    //       .then(function (xls64) {
    //         // build anchor tag and attach file (works in chrome)
    //         var a = document.createElement('a')
    //         var data = new Blob([xls64], {
    //           type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    //         })
    //         var url = URL.createObjectURL(data)
    //         a.href = url
    //         a.download = 'DanhMuc_Export.xlsx'
    //         document.body.appendChild(a)
    //         a.click()
    //         setTimeout(function () {
    //           document.body.removeChild(a)
    //           window.URL.revokeObjectURL(url)
    //         }, 0)
    //       })
    //       .catch(function (error) {
    //         this.$message.error(error.message)
    //       })
    //   },
    //   importData(){
    //     this.$router.push({ name: 'Import_DanhMuc' })
    //   },

    }
  };
  </script>
  