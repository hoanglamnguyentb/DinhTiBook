<script>
import { ref, watch } from "vue";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import appConfig from "../../../../app.config";
import PageHeader from "@/components/page-header";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import FileManager from "../../../components/FileManager/FileManager.vue";
import APIService from "@/helpers/ApiService";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";



export default {
  page: {
    title: "Thêm mới tin tức",
    meta: [
      {
        name: "Thêm mới tin tức",
        content: appConfig.description,
      },
    ],
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      title: "Thêm mới tin tức",
      items: [
        {
          text: "Tin tức",
          href: "/tin-tuc",
        },
        {
          text: "Thêm mới tin tức",
          active: true,
        },
      ],
      datetimeConfig: {
        //enableTime: false,
        dateFormat: "d/m/Y",
        //time_24hr: true,
      },
      datetimeConfig_HenNgayDang: {
        enableTime: true,
        dateFormat: "d/m/Y H:i",
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
      },
      post: {
        title: "",
        chuyenMuc: "",
        content: "",
        trangThai: "",    
        description: "",
        isNoiBat: 0,
        hinhAnh: "",
        danhMuc: "",
        fileDinhKem:"",
      },
      newPostId: '',
      chuyenmuc: [],
      lstChuyenMuc: [],
      submitted: false,
      showFileManager: false,
      errMessage: null,
      isLoading: false,
      acceptType: ["image/png", "image/jpg", "image/jpeg"],
      acceptType_File :["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
      selected: "false",
      options: [
        { text: "Không", value: 0 },
        { text: "Có", value: 1 },
      ],

      rules:{
       TieuDe:[
        {
            required: true,
            message: 'Please input Activity name',
            trigger: 'change',
        }
       ]
  },
  checked: false,
  open: false
    };
  },
  components: {
    PageHeader,
    Multiselect,
    flatPickr,
    QuillEditor,
    FileManager,
  },
  methods: {
    deleteRecord(ele) {
      ele.target.parentElement.parentElement.parentElement.remove();
    },
    
    async onSubmit() {
  try {
    // this.post.henGioDang.setHours(0,0,0,0);
    console.log('post', this.post)
    await APIService.post("Tintuc/Create", this.post)
    .then(response => {
      this.newPostId = response.data.data.id;
 
     // Đặt lại tất cả thuộc tính của this.post trừ isNoiBat
    for (const key in this.post) {
        if (key !== 'isNoiBat') {
            this.post[key] = '';
        }
    }
    this.post.noiDung = '';
      this.post.isNoiBat = false;
    })
    toast.success("Thêm bài viết thành công", {
      theme: "colored",
      autoClose: 2000,
    });
  } catch (e) {
    this.submitted = false;
    this.isLoading = false;
    if (e.response && e.response.status === 400 && e.response.data.errors) {
      const { errors } = e.response.data;
      // Xử lý lỗi cụ thể
      if (errors.noiBat) {
        toast.error(errors.noiBat[0], {
          theme: "colored",
          autoClose: 2000,
        });
      }
      if (errors.tintuc) {
        toast.error(errors.tintuc[0], {
          theme: "colored",
          autoClose: 2000,
        });
      }
    } else {
      console.error('Lỗi không xác định:', e);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.", {
        theme: "colored",
        autoClose: 2000,
      });
    }
    
  }
 
}

,

    handleCheckboxChange() {
      // Kiểm tra nếu checkbox được chọn
      if (this.checked) {
        this.post.isNoiBat = 1; // Thiết lập post.noiBat = 1
      } else {
        this.post.isNoiBat = 0; // Thiết lập post.noiBat = 0
      }
    },
    async getChuyenMuc(){
      var result = await APIService.get(`/DanhMucTinTuc/GetDataByPage`);
      this.chuyenmuc = result.data.data.items;
        
      for(var i=0; i<this.chuyenmuc.length; i++){
            var chuyenmucItem ={
                value: this.chuyenmuc[i].maDanhMuc,
                label: this.chuyenmuc[i].tenDanhMuc
            };
            this.lstChuyenMuc.push(chuyenmucItem);
        }
    },                     

    handleSelectFile(data) {
      console.log('ewww',data.name);
      this.post.hinhAnh = data.name;
      console.log('sss',this.post.hinhAnh);
    },
    
    async submit(){
        this.$refs.formRef.validate(valid => {
        if (valid) {
          console.log('values', this.formState);
        } else {
          console.log('error');
        }
      });
    }
  },
  quill(){
    console.log('Nội dung mới:', this.post.content);
  },
  
  validations() {
    return {
      post: {
        title: {
          required: helpers.withMessage(
            "Tiêu đề bài viết không được để trống",
            required
          ),
        },
        chuyenMuc: {
          required: helpers.withMessage(
            "Vui lòng chọn danh mục bài viết",
            required
          ),
        },
        content: {
          required: helpers.withMessage(
            "Vui lòng nhập nội dung bài viết",
            required
          ),
        },
        trangThai: {
          required: helpers.withMessage(
            "Vui lòng chọn trạng thái bài viết",
            required
          ),
        },
      },
    };
  },
  watch:{
    newPostId: function(newVal, oldVal) {
      if (newVal) {
        // Gọi hàm uploadFiles của FileManager khi newProductId thay đổi
        this.$refs.childRef.handleUpload(newVal);
        console.log('đã ')
      }
    }
  },
  mounted() {
    this.getChuyenMuc()
  },
};
</script>
<style>
.ql-container {
  min-height: 300px;
}
</style>
<template>
  <PageHeader :title="title" :items="items" />
  <a-form
  >
    <a-row :gutter="20">
      <a-col :span="24">
        <a-card>
          <template #title>
            <h5 class="custom-card-title mb-0">Thông tin bài viết</h5>
          </template>
          <div>
            

            <a-form-item>
              <div>
              <label class="form-label" for="title">Chuyên mục tin tức</label>
              <Multiselect class="form-control"
              :class="{
                  'is-invalid': submitted && v$.post.chuyenMuc.$error,
                }"
              v-model="post.danhMuc" value="0" :close-on-select="true" :searchable="true"
                :create-option="true" :options="lstChuyenMuc" />
             
            </div>
            </a-form-item>
            
            <a-form-item>
              <label for="TieuDe">Tiêu đề:</label>
              <a-input name="TieuDe" size="large" id="TieuDe" v-model:value="post.tieuDe" />
            </a-form-item>
            <a-form-item label="Nổi bật">
            
              <a-checkbox v-model:checked="checked" @change="handleCheckboxChange"></a-checkbox>
            </a-form-item>
            <a-form-item>
              <label for="NoiDung">Nội dung bài viết:</label>
              <QuillEditor
                theme="snow"
                :options="editorOptions"
                v-model:content="post.noiDung"
                contentType="html"
                @change="quill"
              />
            </a-form-item>
            <a-form-item>
              <label for="MoTa">Mô tả bài biết:</label>
              <a-textarea
                v-model:value="post.moTa"
                placeholder="Nhập mô tả bài viết"
                allow-clear
                :rows="5"
              />
            </a-form-item>
            <a-form-item label="Ảnh đại diện">
              <FileManager
                    ref="childRef"
                    :parentId="newPostId"
                    :SoLanHienThi="1"
                  />
            </a-form-item>
            <!-- <a-form-item label="Tải file đính kèm">
              <FileManager
                    ref="childRef"
                    :parentId="newProductId"
                  />
            </a-form-item> -->
          </div>
        </a-card>
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



</template>