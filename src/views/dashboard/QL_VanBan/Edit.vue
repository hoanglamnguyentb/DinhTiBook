<template>
  <pageheader :title="title" :items="items"/>
  <a-card>
    <a-form
    layout="vertical"
      :model="post"
      name="basic"
      ref="formRef">
        <h3>1.THÔNG TIN VĂN BẢN</h3>
          <a-row :gutter="[24]">
            <a-col :span="12">
              <a-form-item ref="title" label="Thứ tự văn bản" name="thutu">
                <a-input v-model:value="post.tt"></a-input>
              </a-form-item>
              <a-form-item ref="title" label="Tên văn bản" name="tenvanban">
                <a-input v-model:value="post.nameText"></a-input>
              </a-form-item>
              <a-form-item ref="title" label="Số hiệu văn bản" name="sohieu">
                <a-input v-model:value="post.number"></a-input>
              </a-form-item>
              <div>
                <label for="datepicker-publish-input" class="form-label">Ngày có hiệu lực</label>
                <flat-pickr v-model="post.effectiveDate" :config="datetimeConfig" placeholder="Chọn ngày có hiệu lực" class="form-control"></flat-pickr>
              </div>
              <a-form-item style="margin-top: 20px;" ref="title" label="Ban hanh bởi" name="banhanh">
                <a-input v-model:value="post.agencyIssued"></a-input>
              </a-form-item>  
            </a-col>
            <a-col :span="12">
              <a-form-item name="trangthai">
              <label for="TieuDe">Trạng thái:</label>
              <a-select
                
              v-model:value="post.status"
                placeholder="Chọn trạng thái"

                :options="[
                { value: 'Bản nháp', label: 'Bản nháp' },
                { value: 'Xuất bản', label: 'Xuất bản' },
                { value: 'Gỡ bỏ', label: 'Gỡ bỏ' },
              ]"
              >
              </a-select>
            </a-form-item>
              <a-form-item name="loaivanban">
              <label for="TieuDe">Loại văn bản:</label>
              <a-select
              v-model:value="post.documentType"
                placeholder="Chọn loại văn bản"
                :options="[
                { value: 'Nghị quyết', label: 'Nghị quyết' },
                { value: 'Thông tư', label: 'Thông tư' },
                { value: 'Công điện', label: 'Công điện' },
                { value: 'Quyết định', label: 'Quyết định' },
                { value: 'Nghị định', label: 'Nghị định' },
              ]"
              >
              </a-select>
            </a-form-item>
              <div style="margin-top: 15px;">
              <label for="datepicker-publish-input" class="form-label">Ngày ban hành</label>
              <flat-pickr v-model:value="post.publicDate" :config="datetimeConfig" placeholder="Chọn ngày có hiệu lực" class="form-control"></flat-pickr>
            </div>
            <a-form-item label="Tài liệu" style="margin-top: 20px;">
              <FileManager
                :active="showFileManager"
                :showButton="true"
                :showPreview="true"
                :closable="false"
                :maxCount="1"
                :multiple="false"
                :accept="acceptType"
                @select-file="handleSelectFile_DinhKem"
              />
            </a-form-item>
              
            </a-col>
          </a-row>
       
        <h3 style="margin-top: 30px">2.NỘI DUNG & TRÍCH DẪN VĂN BẢN</h3>
        <a-card-body>
          <a-col>
            <div class="mt-2">
              <label>Trích dẫn</label>
              <a-textarea class="form-control" v-model:value="post.trichDan" placeholder="" rows="3"></a-textarea>
            </div>
            <a-form-item >
              <label>Nội dung văn bản</label>
              <QuillEditor 
                style="height: 300px;"
                theme="snow" 
                :options="editorOptions"
                v-model:content="post.content"
                content-type="html" />
              </a-form-item>
          </a-col>
        </a-card-body>
    </a-form>
    <a-row style="margin: 50px 0px">
    <a-col :span="24">
      <a-flex justify="center">
        <a-button @click="handleOk" size="large" type="success">Hoàn thành</a-button>
      </a-flex>
    </a-col>
  </a-row>
  </a-card>
</template>

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

import FileManager from "@/components/FileManager"
import APIService from "@/helpers/ApiService"

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Common from "@/helpers/Common"
export default {
    page: {
    title: "Chỉnh sửa văn bản",
    meta: [{
      name: "Chỉnh sửa văn bản",
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
      title: "Chỉnh sửa văn bản",
      items: [{
        text: "Văn bản",
        href: "/van-ban",
      },
      
      {
        text: "Chỉnh sửa văn bản",
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
              ['link', 'fileManager'],
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
        nameText: "",
          number: "",
          effectiveDate: new Date(),
          agencyIssued: "",
          publicDate: new Date(),
          status: undefined,
          documentType: "",
          document: "",
          content: "",
          description:"",
          trichDan: "",
          fileDinhKem:"",
      },
      submitted : false,
      showFileManager: false,
      errMessage: null
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
    await this.GetById()
  },
  methods: {
    deleteRecord(ele) {
      ele.target.parentElement.parentElement.parentElement.remove();
    },
    handleOk(){
        this.$refs.formRef.validate().then(async () => {
          try {
        await APIService.put("vanban/edit/" + this.post.id, this.post);
          toast.success("Sửa văn bản thành công", { theme: "colored", autoClose: 2000 });
        } catch (e) {
            console.log(e)
          this.submitted = false;
          this.isLoading = false;
          if (e.status == 401) {
            toast.error("Bạn không có quyền truy cập.", { theme: "colored", autoClose: 2000 });
          } else {
            if (e.data && e.data.Message) {
              this.errMessage = e.data.Message;
              toast.error(e.data.Message, { theme: "colored", autoClose: 2000 });
            } else {
              toast.error("Sửa mới văn bản thất bại. Vui lòng thử lại sau.", { theme: "colored", autoClose: 2000 });
            }
          }
        }
      });
    },

    async GetById(){
      try {
        var paramId = this.$route.params.id;
        var dataPost = await APIService.get("vanban/" + paramId);
        var res = dataPost.data;
        if(res != null && res.data != null){
          this.post = res.data
        }else{
          toast.error("Không tìm thấy thông tin văn bản.",{
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
            toast.error("Không tìm thấy thông tin văn bản.",{
              "theme": "colored",
              autoClose: 2000
            });
          }
        }
      }
    },
  },
  validations () {
    return {
        nameText: {
            required: helpers.withMessage("Tên văn bản không được để trống", required),
          },
          number: {
            required: helpers.withMessage("Số hiệu không được để trống", required),
          },
          effectiveDate: {
            required: helpers.withMessage("Ngày có hiệu lực không được để trống", required),
          },
          agencyIssued: {
            required: helpers.withMessage("cơ quan ban hành không được để trống", required),
          },
          publicDate: {
            required: helpers.withMessage("vui lòng chọn ngày ban hành", required),
          },
          status: {
            required: helpers.withMessage("vui lòng chọn trạng thái", required),
          },
          documentType:{
            required: helpers.withMessage("vui lòng chọn loại tài liệu", required),
          },
          Document:{
            required: helpers.withMessage("không để trống tài liệu", required),
          },
          content:{
            required: helpers.withMessage("không để trống nội dung", required),
          },
          description:{
            required: helpers.withMessage("không để trống mô tả", required),
          },
          trichDan:{
            required: helpers.withMessage("không để trống trích dẫn", required),
          },
          fileDinhKem:{
            required: helpers.withMessage("không để trống file", required),
          },
    }
  }
};
</script>

<style>
h3{
    margin-bottom: revert;
}
</style>