<template>
  <div>
    <a-modal v-model:open="open" title="Danh sách tin chưa đăng" width="800px" :footer="null">
      <div>
        <a-table
          :columns="tableColumns"
          :dataSource="tintuc">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'hinhAnh1'">
              <img :src="'http://localhost:44301/api/FileAndFolder/'+ record.hinhAnh" alt="Hình ảnh" style="width: 50px; height: auto;">
            </template>
          </template>
          
        </a-table>
      </div>
      <a-button @click="DangTin">Đăng tin đến hạn</a-button>
      <a-button @click="closeModal">Đóng</a-button>
    </a-modal>
  </div>
</template>

<script>
import APIService from "@/helpers/ApiService";
export default {
  data(){
    return{
      open: false,
      tintuc: [],
      tableColumns: [
        { title: "Hình ảnh",  dataIndex: "hinhAnh", width: 100,key:"hinhAnh1"  },
        { title: "Tiêu đề", dataIndex: "title", width:200 },
        { title: "Chuyên mục", dataIndex: "chuyenMuc", width:120 },
        { title: "Danh mục", dataIndex: "danhMuc", width:120 },
        
      
        { title: "Hẹn ngày đăng", dataIndex: "henGioDang", key:"henGioDang" , width:120},
        { title: "Trạng thái đăng", dataIndex: "trangThaiDang", key:"trangThaiDang" , width:120},
        
      ],
    }
  },
  methods:{
    async showModal() {
      this.open = true;
      this.getTinChuaDang()
    },
    closeModal() {
      this.open = false;
    },
    async getTinChuaDang(){
      var res = await APIService.get(`TinTuc/GetDataByPage?TrangThaiDangFilter=false`);
      this.tintuc = res.data.data.items;
    
    },
    async DangTin(){
      await APIService.get(`TinTuc/KiemTraNgayDang`);
      
      this.getTinChuaDang()
    }
  }
};
</script>

<style>
</style>