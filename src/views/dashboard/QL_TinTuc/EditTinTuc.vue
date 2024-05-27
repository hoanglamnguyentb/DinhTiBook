<script>
import {
  ref,
  watch
} from "vue";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

import DropZone from "@/components/widgets/dropZone";
import useVuelidate from "@vuelidate/core";
import { 
  required, 
  helpers,
} from '@vuelidate/validators'

import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import Layout from "../../../layouts/main.vue";
import appConfig from "../../../../app.config";
import PageHeader from "@/components/page-header";


import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import FileManager from "../../../components/FileManager/FileManagerHienThi.vue";
import APIService from "@/helpers/ApiService"

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Common from "@/helpers/Common"

export default {
  page: {
    title: "Chỉnh sửa tin tức",
    meta: [{
      name: "Chỉnh sửa tin tức",
      content: appConfig.description,
    },],
  },
  setup() {
    let files = ref([]);
    let dropzoneFile = ref("");
    const drop = (e) => {
      dropzoneFile.value = e.dataTransfer.files[0];
      files.value.push(dropzoneFile.value);
    };
    const selectedFile = () => {
      dropzoneFile.value = document.querySelector(".dropzoneFile").files[0];
      files.value.push(dropzoneFile.value);
    };
    watch(
      () => [...files.value],
      (currentValue) => {
        return currentValue;
      }
    );
    return {
      dropzoneFile,
      drop,
      selectedFile,
      v$: useVuelidate(),
      files
    };
  },
  data() {
    return {
      title: "Chỉnh sửa tin tức",
      items: [{
        text: "Tin tức",
        href: "/tin-tuc",
      },
      {
        text: "Chỉnh sửa tin tức",
        active: true,
      },
      ],
      datetimeConfig: {
        //enableTime: false,
        dateFormat: "d/m/Y",
        //time_24hr: true,
      },
      editorOptions: {
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block'],

              [{ 'header': 1 }, { 'header': 2 }],               // custom button values
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],     // superscript/subscript
              [{ 'indent': '-1' }, { 'indent': '+1' }],         // outdent/indent
              [{ 'direction': 'rtl' }],                         // text direction

              [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

              [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['link', 'fileManager','image'],
              ['clean']                                         // remove formatting button
            ],
            handlers: {
              'fileManager': function(e) {
                console.log(e)
              }
            },
          }
        },
        placeholder: 'Nhập nội dung bài viết...',
        theme: 'snow'
      },
      post:{
        tieuDe : "",
        danhMuc : "",
        moTa : "",
        noiDung : "",
        isNoiBat : "",
        luotXem: 0,
        id: ""
      },
      idDanhMuc: "DM_TINTUC",
      submitted : false,
      showFileManager: false,
      errMessage: null,
      chuyenmuc:[],
      lstChuyenMuc:[],
    };
  },
  components: {
    DropZone,
    Layout,
    PageHeader,
    Multiselect,
    flatPickr,
    QuillEditor,
    FileManager
  },
  async created(){
    await this.GetById(),
    await this.getChuyenMuc()
  },
  methods: {
    deleteRecord(ele) {
      ele.target.parentElement.parentElement.parentElement.remove();
    },

    async GetById(){
      try {
        var paramId = this.$route.params.id;
        console.log('id', paramId)
        var dataPost = await APIService.get("/TinTuc/" + paramId);

        var res = dataPost.data.objInfo;
       

        
        if(res != null ){
          this.post = res
          this.$refs.childRef.getFile(this.post.id);
          console.log('aaa', this.post)
        }else{
          toast.error("Không tìm thấy thông tin bài viết.",{
            "theme": "colored",
            autoClose: 2000
          });
        }
      } catch (e) {
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
            toast.error("Không tìm thấy thông tin bài viết.",{
              "theme": "colored",
              autoClose: 2000
            });
          }
        }
      }
    },
    async getChuyenMuc(){
      var result = await APIService.get(`/ThongTinDanhMuc/GetDataByPage?MaDanhMuc=` + this.idDanhMuc);
      this.chuyenmuc = result.data.data.items;
      
      for(var i=0; i<this.chuyenmuc.length; i++){
        var chuyenmucItem ={
          value: this.chuyenmuc[i].giaTri,
          label: this.chuyenmuc[i].giaTri
        };
        this.lstChuyenMuc.push(chuyenmucItem);
      }
    },       

    async onSubmit(){
      this.submitted = true
      this.v$.$touch();
      try {
        await APIService.put("tintuc/edit/" + this.post.id, this.post);
        this.$refs.childRef.handleUpload(this.post.id);
        toast.success("Chỉnh sửa bài viết thành công.", {
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
            toast.error("Chỉnh sửa bài viết thất bại. Vui lòng thử lại sau.",{
              "theme": "colored",
              autoClose: 2000
            });
          }
        }
      }
    }
  },
  validations () {
    return {
      post:{
        title: {
          required: helpers.withMessage("Tiêu đề bài viết không được để trống", required),
        },
        loai: {
          required: helpers.withMessage("Vui lòng chọn danh mục bài viết", required),
        },
        content: {
          required: helpers.withMessage("Vui lòng nhập nội dung bài viết", required),
        },
        isPublic: {
          required: helpers.withMessage("Vui lòng chọn trạng thái bài viết", required),
        },
      }
    }
  }
};
</script>
<style>
.ql-container{
  min-height: 300px;
}
</style>
<template>

    <PageHeader :title="title" :items="items" />
    
    <a-form>
    <a-row >
      <a-col :span="24">
        <a-card>
          <template #title>
            <h5 class="custom-card-title mb-0">Thông tin bài viết</h5>
          </template>
          <div>

            <a-form-item>
              <label for="ChuyenMuc">Chuyên mục tin tức:</label>
                <a-select
                  v-model:value="post.chuyenMuc"
                  show-search
                  placeholder="Select a person"
                  style="width: 100%"
                  :options="lstChuyenMuc"
                  :filter-option="filterOption"
                  size="large"
                ></a-select>
            
            </a-form-item>
            <a-form-item>
              <label for="TieuDe">Tiêu đề:</label>
              <a-input name="TieuDe" size="large" id="TieuDe" v-model:value="post.tieuDe" />
            </a-form-item>
            <a-form-item label="Nổi bật">
            
              <a-checkbox v-model:checked="post.isNoiBat" ></a-checkbox>
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
                   
                    :SoLanHienThi="1"
                  />
            </a-form-item>
           
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