<template>
  <PageHeader :title="title" :items="items" />
  <a-row>
    <a-col :span="24">
      <a-card title="Sửa mới sản phẩm">
        <template #extra>
          <a-button  type="primary">Quay lại</a-button>
        </template>
        <div>
          <a-form>
            <a-row :gutter="20">
              <a-col :span="12">
                <a-form-item >
                  <label for="tenSach">Tiêu đề:</label>
                  <a-input name="tenSach" size="large" id="tenSach" v-model:value="sanpham.tenSach" />
                </a-form-item>
                <!-- nhóm độ tuổi -->
                <a-form-item>
                <label for="idNhomDoTuoi">Nhóm độ tuổi:</label>
                  <a-select
                    v-model:value="sanpham.idNhomDoTuoi"
                    show-search
                    placeholder="Chọn nhóm độ tuổi"
                    style="width: 100%"
                    :options="lstNhomDoTuoi"
                    :filter-option="filterOption"
                    size="large"
                  ></a-select>
                </a-form-item>

                <a-form-item >
                  <label for="tenTacGia">Tên tác giả:</label>
                  <a-input name="tenTacGia" size="large" id="tenTacGia" v-model:value="sanpham.tenTacGia" />
                </a-form-item>

                <!-- nxb -->
                <a-form-item>
                <label for="NXB">Nhà xuất bản:</label>
                  <a-select
                    v-model:value="sanpham.idNhaXuatBan"
                    show-search
                    placeholder="Chọn nhà xuất bản"
                    style="width: 100%"
                    :options="lstNXB"
                    :filter-option="filterOption"
                    size="large"
                  ></a-select>
                </a-form-item>

                <a-form-item >
                  <label for="namXuatBan">Năm xuất bản:</label>
                  <a-input name="namXuatBan" size="large" id="namXuatBan" v-model:value="sanpham.namXuatBan" />
                </a-form-item>
                <a-form-item>
                  <a-checkbox v-model:checked="sanpham.noiBat">Nổi bật</a-checkbox>
                </a-form-item> 
                <a-form-item>
                  <a-checkbox v-model:checked="sanpham.sachKhuyenDoc">Sách khuyên đọc</a-checkbox>
                </a-form-item> 
              </a-col>
                
              <a-col :span="12">
                <a-form-item >
                  <label for="idDanhMuc">Danh mục:</label>
                  <!-- <a-input name="idDanhMuc" size="large" id="idDanhMuc" v-model:value="sanpham.idDanhMuc" /> -->
                  <a-select
                    v-model:value="sanpham.idDanhMuc"
                    show-search
                    placeholder="Chọn danh mucj"
                    style="width: 100%"
                    :options="lstDanhMuc"
                    :filter-option="filterOption"
                    size="large"
                  ></a-select>
                </a-form-item>

                <a-form-item >
                  <label for="soLuongTon">Số lượng:</label>
                  <a-input name="soLuongTon" size="large" id="soLuongTon" v-model:value="sanpham.soLuongTon" />
                </a-form-item>
                <a-form-item >
                  <label for="giaTien">Giá tiền:</label>
                  <a-input name="giaTien" size="large" id="giaTien" v-model:value="sanpham.giaTien" />
                </a-form-item>
                <a-form-item >
                  <label for="giamGia">Giảm giá:</label>
                  <a-input name="giamGia" size="large" id="giamGia" v-model:value="sanpham.giamGia" />
                </a-form-item>

              </a-col>
              <a-col :span="24">
                <a-form-item>
                  <label for="NoiDung">Nội dung bài viết:</label>
                  <QuillEditor
                    theme="snow"
                    :options="editorOptions"
                    v-model:content="sanpham.moTaSach"
                    contentType="html"
                    @change="quill"
                    
                  />
                </a-form-item>
              

                <a-form-item label="Chọn ảnh">
                  <FileManager
                    ref="childRef"
                    :SoLanHienThi="5"

                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <a-row style="margin: 50px 0px">
            <a-col :span="24">
              <a-flex justify="center">
                <a-button @click="onSubmit" size="large" type="success">Hoàn thành</a-button>
              </a-flex>
            </a-col>
          </a-row>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import FileManager from "../../../components/FileManager/FileManagerHienThi.vue";
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
        title: "Thêm mới sản phẩm",
        meta: [
          {
            name: "Thêm mới sản phẩm",
            content: appConfig.description,
          },
        ],
      },
      datetimeConfig: {
        //enableTime: false,
        dateFormat: "d/m/Y",
        //time_24hr: true,
      },
      sanpham:{
        tenSach: '',
        tenTacGia: '',
        idNhaXuatBan: '',
        namXuatBan: '',
        idDanhMuc: '',
        giaTien: '',
        soLuongTon: '',
        moTaSach: '',
        idNhomDoTuoi: '',
        noiBat: false,
        giamGia: '',
        sachKhuyenDoc: false
      },
      newProductId: '',
      lstNXB: [],
      nxb:[],
      lstDanhMuc:[],
      lstNhomDoTuoi:[],
      showFileManager: false,
      rules:{
       TieuDe:[
        {
          required: true,
          message: 'Please input Activity name',
          trigger: 'change',
        }
       ]
      },
      editorOptions: {
        modules: {
          toolbar: {
            
            container: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],

              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction

              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],
              ["link", "fileManager", "image"],
              ["clean"], // remove formatting button
            ],
            handlers: {
              fileManager: function (e) {
                console.log( 'sadsa',e)
                
              },
              
            },
          },
        },
        placeholder: "Nhập nội dung bài viết...",
        theme: "snow",
        formats: ['image'],
      },
    }
  },
  methods:{
    async onSubmit() {
      try {
        await APIService.put("SanPham/edit/" + this.sanpham.id, this.sanpham);
        this.$refs.childRef.handleUpload(this.sanpham.id);
        toast.success("Chỉnh sửa sản phẩm thành công.", {
          "theme": "colored",
          autoClose: 2000
        });

      } catch (e) {
        this.submitted = false;
        if(e.status == 401){
          toast.error("Bạn không có quyền truy cập.",{
            "theme": "colored",
            autoClose: 2000
          });
        }else {
          if(e.data && e.data.Message){
            this.errMessage = e.data.Message;
            toast.error(e.data.Message,{
              "theme": "colored",
              autoClose: 2000
            });
          }else{
            toast.error("Chỉnh sửa sản phẩm thất bại. Vui lòng thử lại sau.",{
              "theme": "colored",
              autoClose: 2000
            });
          }
        }
      }
      
    },
    async getNXB(){
      var result = await APIService.get(`/NhaXuatBan/`);
      this.nxb = result.data.data.items;
        
      for(var i=0; i<this.nxb.length; i++){
        var nxbItem ={
          value: this.nxb[i].maNXB,
          label: this.nxb[i].tenNXB
        };
        this.lstNXB.push(nxbItem);
      }
    },
    async getDanhMuc(){
      var result = await APIService.get(`DanhMuc/GetDataBypage`);
      var danhmuc = result.data.data.items;
      for(var i=0; i < danhmuc.length; i++){
        var danhMucItem ={
          value: danhmuc[i].maCategory,
          label: danhmuc[i].categoryName
        };
        this.lstDanhMuc.push(danhMucItem);
      }
    },
    async getNhomDoTuoi(){
      var result = await APIService.get(`/NhomDoTuoi`);
      var nhomdotuoi = result.data.data.items;
      for(var i=0; i < nhomdotuoi.length; i++){
        var nhomDoTuoiItem ={
          value: nhomdotuoi[i].maNhomDoTuoi,
          label: nhomdotuoi[i].tenNhom
        };
        this.lstNhomDoTuoi.push(nhomDoTuoiItem);
      }
    },
    async getSanPhamById(){
    var paramId = this.$route.params.id;
    console.log('id', paramId)
    APIService.get("SanPham/"+ paramId)
    .then(response => {
      console.log(response)
      this.sanpham = response.data.objInfo;
      console.log('sp', this.sanpham)
      console.log('sp', this.sanpham.tenSach)
      this.$refs.childRef.getFile(this.sanpham.id);
      this.lstAnh = response.data.anhSanPham;
      console.log('anh', this.lstAnh)
      })
    .catch(error=>{
      console.log(error)
    })
    },
  },
  watch:{
    newProductId: function(newVal, oldVal) {
      if (newVal) {
        // Gọi hàm uploadFiles của FileManager khi newProductId thay đổi
        this.$refs.childRef.handleUpload(newVal);
        console.log('đã ')
      }
    }
  },
  quill(){
    console.log('Nội dung mới:', this.post.content);
  },
  created(){
    this.getNXB();
    this.getDanhMuc();
    this.getNhomDoTuoi();
  },
  mounted(){
    this.getSanPhamById()
    }
  
  

}
</script>

<style>
.ql-editor{
    min-height:300px;
}
</style>