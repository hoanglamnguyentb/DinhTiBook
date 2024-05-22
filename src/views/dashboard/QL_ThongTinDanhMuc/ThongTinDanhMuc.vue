<template>
    <PageHeader :title="title" :items="items" :backRoute="backRoute" />
    <a-row>
      <a-col :span="24">
        <a-card :title="titleDanhMucCha">
          <template #extra>
            <a-button @click="openModalAdd" type="primary">Thêm mới</a-button>
            <a-button style="margin-left: 10px" @click="exportExcel">Export Data</a-button>
            <a-button style="margin-left: 10px" @click="importData">Import Data</a-button>
  
          </template>
          <div>
            <b-card-body class="border-bottom-dashed border-bottom">
              <b-form>
                <b-row class="g-3">
                  <b-col xl="3">
                    <div class="search-box">
                      <input type="text" class="form-control search" placeholder="Mã thông tin"
                        v-model="formSearch.maFilter" />
                      <i class="ri-search-line search-icon"></i>
                    </div>
                  </b-col>
                  <b-col xl="3">
                    <div class="search-box">
                      <input type="text" class="form-control search" placeholder="Giá trị"
                        v-model="formSearch.giaTriFilter" />
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
                          <b-button type="button" variant="primary" class="w-100" @click="SearchData">
                            <i class="ri-equalizer-fill me-2 align-bottom"></i>Tìm
                            kiếm
                          </b-button>
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
                        @confirm="deleteTTDanhMuc(record.id)" @cancel="cancel">
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
        </a-card>
      </a-col>
    </a-row>
    <ModalDetailTTDM ref="ModalDetailTTDM"></ModalDetailTTDM>
    <modalAddEditTTDM @addSuccess="loadData(optionPage.pageIndex, optionPage.pageSize)" ref="modalAddEditTTDM">
    </modalAddEditTTDM>
  </template>
  <script>
  import PageHeader from "@/components/page-header";
  import appConfig from "../../../../app.config";
  import Pagination from "../../../components/widgets/Pagination.vue";
  import APIService from "@/helpers/ApiService";
  import { SearchOutlined } from "@ant-design/icons-vue";
  import Common from "@/helpers/Common";
  import modalAddEditTTDM from "./ModalAddEditTTDM.vue";
  import ModalDetailTTDM from "./ModalDetailTTDM.vue";
  const ExcelJS = require("exceljs");
  
  export default {
    
   async mounted() {
     var initParam = {
      MaDanhMuc: this.$route.params.maDM
     }
      this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize,initParam);
      this.currentDM = this.$route.params.maDM
      var searchParam = {
        
          MaDM: this.currentDM
        };
        var urlQuery = new URLSearchParams(searchParam).toString();
        var result = await APIService.get(
          `/DanhMuc/GetDataByPage?` + urlQuery
        );
        this.titleDanhMucCha = result.data.data.items[0]['tenDanhMuc']
      
      
  
    },  
    components: {
      PageHeader,
      Pagination,
      modalAddEditTTDM,
      ModalDetailTTDM,
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
        backRoute: ' ',
        titleDanhMucCha:'',
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
        //{ title: "Tên danh mục cha", dataIndex: "tenDanhMuc", key: "tenDanhMuc",sorter: (a, b) => a.tenDanhMuc - b.tenDanhMuc},
        { title: "TT", dataIndex: "thuTuHienThi", key: "thuTuHienThi", sorter: (a, b) => a.thuTuHienThi - b.thuTuHienThi}, 
        { title: "Giá trị", dataIndex: "giaTri", key: "giaTri" },
        { title: "Mã thông tin", dataIndex: "maThongTin", key: "MaThongTin" },
    
        { title: "Ghi chú", dataIndex: "ghiChu", key: "ghiChu" },
        { title: "Thao tác", key: "action", width: 60 },
        ],
        searchQuery: null,
        pages: [],
        lstDanhMuc: [],
        optionPage: {
          pageIndex: 1,
          pageSize: 10,
          totalCount: 0,
        },
        lstTTDM_Export :[],
        formSearch: {
          maFilter: '',
          giaTriFilter: '',
          ghiChuFilter: '',
        },
        currentDM:''
      };
    },
    methods: {
      handlePageChange() {
        this.optionPage.pageIndex = page;
        this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
      },
      SearchData() {
        var searchParam = {MaDanhMuc :this.currentDM};

      // Kiểm tra và thêm Mã thông tin vào searchParam nếu có giá trị
      if (this.formSearch.maFilter) {
        searchParam.MaThongTin = this.formSearch.maFilter.toLowerCase();
      }

      // Kiểm tra và thêm Giá trị vào searchParam nếu có giá trị
      if (this.formSearch.giaTriFilter) {
        searchParam.GiaTri = this.formSearch.giaTriFilter.toLowerCase();
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
          MaDanhMuc: this.currentDM
        };
        if (params) {
          searchParam = params;
        }
        var urlQuery = new URLSearchParams(searchParam).toString();
        var result = await APIService.get(
          `/ThongTinDanhMuc/GetDataByPage?` + urlQuery
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
        console.log('Loading: currentDM', this.currentDM)
        this.lstTTDM_Export = result.data.data.items;
      },
      openModalAdd() {
        this.$refs.modalAddEditTTDM.showModal(this.currentDM);
      },
      openModalDetail(id) {
        this.$refs.ModalDetailTTDM.showModal(id);
      },
      openModalEdit(id) {
        this.$refs.modalAddEditTTDM.showModal(this.currentDM,id);
      },
      async deleteTTDanhMuc(id) {
        var res = await APIService.delete(`/ThongTinDanhMuc/delete/${id}`);
        if (res.data.status !== "Success") {
    
          this.$message.error();
          this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
        }
        console.log(res.data.status)
        this.$message.success("Xóa thành công");
        this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
      },
      exportExcel () {
      const data = this.lstTTDM_Export
      const workbook = new ExcelJS.Workbook()
      const sheet = workbook.addWorksheet('Sheet1')
      sheet.columns = [
        { key: 'maThongTin', header: 'Mã thông tin', width: 25 },
        { key: 'tenDanhMuc', header: 'Tên Danh mục', width: 50 },
        { key: 'thuTuHienThi', header: 'Thứ tự hiển thị', width: 25 },
        { key: 'giaTri', header: 'Giá trị', width: 25 },
        { key: 'ghiChu', header: 'Ghi chú', width: 70 },
      ]
      sheet.addRows(data)
      sheet.eachRow({ includeEmpty: true }, function (row) {
        row.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      })
      workbook.xlsx
        .writeBuffer({
          base64: true
        })
        .then(function (xls64) {
          // build anchor tag and attach file (works in chrome)
          var a = document.createElement('a')
          var data = new Blob([xls64], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          })
          var url = URL.createObjectURL(data)
          a.href = url
          a.download = 'TTDM_Export.xlsx'
          document.body.appendChild(a)
          a.click()
          setTimeout(function () {
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
          }, 0)
        })
        .catch(function (error) {
          this.$message.error(error.message)
        })
    },
      importData(){
        this.$router.push({ name: 'Import_ThongTinDanhMuc' })
      },
     
    }

  };
  </script>
  