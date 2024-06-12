<template>
  <PageHeader :title="title" :items="items" />
  <a-card>
    <a-row>
    <a-col :span="24">
      <table  v-if="SanPham" style="width: 100%;" class="border-detail">
        <tr><td style="width: 200px; padding: 20px;">Tên sản phẩm</td><td>{{ SanPham.tenSach }}</td></tr>
        <tr><td style="width: 200px; padding: 20px;">Tên tác giả</td><td>{{ SanPham.tenTacGia }}</td></tr>
        <tr><td style="width: 200px; padding: 20px;">Id nhà xuất bản</td><td>{{ SanPham.idNhaXuatBan }}</td></tr>
        <tr><td style="width: 200px; padding: 20px;">Năm xuất bản</td><td>{{ SanPham.namXuatBan }}</td></tr>
        <tr><td style="width: 200px; padding: 20px;">Tên tác giả</td><td>{{ SanPham.tenTacGia }}</td></tr>
       
        <tr>
          <td style="width: 200px;  padding: 20px;">Ảnh sản phẩm</td>
          <td style="height: 150px; display: flex;" >
            <div style="height: 100%;" v-for="(item, index) in lstAnh" :key="index">
                <img style="height: 100%; margin-right: 20px;" :src="'http://localhost:44301/'+item.path"/>         
            </div>
          </td>
        </tr>
        <!-- <tr><td style="width: 200px;">Mô tả</td><td>{{ SanPham.moTaSach }}</td></tr> -->
        <tr>
          <td style=" padding: 20px;">Mô tả</td>
          <td style=" padding: 20px;" class="td-mota">
            <div class="description" id="HELLO">
          
              <div class="description-content" v-html="SanPham.moTaSach"></div>
            </div>
          </td>
        </tr>
      </table>
    </a-col>
  </a-row>
  </a-card>
  
  
</template>

<script>
import FileManager from "../../../components/FileManager/FileManager.vue";
import appConfig from "../../../../app.config";
import APIService from "@/helpers/ApiService";
import PageHeader from "@/components/page-header";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
  components:{
    PageHeader,
    FileManager,
    QuillEditor,
  },
 
  data(){
    return{
      page: {
        title: "Chi tiết sản phẩm",
        meta: [
          {
            name: "Chi tiết sản phẩm",
            content: appConfig.description,
          },
        ],
      },
      datetimeConfig: {
        //enableTime: false,
        dateFormat: "d/m/Y",
        //time_24hr: true,
      },
      SanPham: '',
      lstAnh: [],
      
      
    }
  },
  methods:{
    async getSanPham(){
    var paramId = this.$route.params.id;
    console.log('id', paramId)
    APIService.get("SanPham/GetById/"+ paramId)
    .then(response => {
      console.log(response)
      this.SanPham = response.data.objInfo;
      console.log('sp', this.SanPham)
      console.log('sp', this.SanPham.tenSach)
      this.lstAnh = response.data.anhSanPham;
      console.log('anh', this.lstAnh)
      })
    },
    
  },
  mounted(){
    this.getSanPham();
    
   
  }
}
</script>


<style scoped>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}



</style>