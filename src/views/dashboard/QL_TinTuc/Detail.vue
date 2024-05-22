<script>
import Layout from "../../../layouts/main.vue";
import appConfig from "../../../../app.config";
import PageHeader from "@/components/page-header";

import animationData from "@/components/Animation/uetqnvvg.json";
import Lottie from "@/components/widgets/lottie.vue";

import APIService from "@/helpers/ApiService"

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Common from "@/helpers/Common"

export default {
  page: {
    title: "Order Details",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "Chi tiết bài viết",
      items: [
        {
          text: "Tin tức",
          href: "/",
        },
        {
          text: "Chi tiết bài viết",
          active: true,
        },
      ],
      defaultOptions: { animationData: animationData },
      post:{},
    };
  },
  created(){
    this.GetById();
  },  
  methods:{
    formatDate: Common.formatDate,
    async GetById(){
      try {
        var paramId = this.$route.params.id;
        var dataPost = await APIService.get("TinTuc/" + paramId);
        var res = dataPost.data;
        if(res != null && res.data != null){
          this.post = res.data
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
    async TaiFile(){
      try{
        const fileName = this.post.fileDinhKem;
        await APIService.get("TinTuc/download?fileName=" + fileName, { responseType: 'blob' });
        //const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = process.env.VUE_APP_URL + "TinTuc/download?fileName=" + fileName;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      }     
      catch(e){
        console.error('Error:', e);
      };
      
    }
  },
  components: {
    Layout,
    PageHeader,
    lottie: Lottie
  },
};
</script>

<template>
  
    <PageHeader :title="title" :items="items" />
    <b-row>
      <b-col xl="9">
        <b-card no-body>
          <b-card-header>
            <div class="d-flex align-items-center">
              <h5 class="card-title flex-grow-1 mb-0">{{ post.title }}</h5>
            </div>
          </b-card-header>
          <b-card-body>
            <a-descriptions bordered  :labelStyle="{ width: '150px' }" >
              <a-descriptions-item :span="24" label="Tiêu đề">{{ post.title }}</a-descriptions-item>
              <a-descriptions-item :span="24" label="Hình ảnh"><img style="height: 100px;" :src="'http://localhost:44301/api/FileAndFolder/'+ post.hinhAnh"/></a-descriptions-item>
              <a-descriptions-item :span="24" label="Danh mục">{{ post.danhMuc }}</a-descriptions-item>
              <a-descriptions-item :span="24" label="Chuyên mục">{{ post.chuyenMuc }}</a-descriptions-item>
              <a-descriptions-item :span="24" label="Trạng thái">{{ post.trangThai }}</a-descriptions-item>
              <a-descriptions-item :span="24" label="Nổi bật">{{ post.noiBat == true ? "Có" : "Không" }}</a-descriptions-item>
              <a-descriptions-item :span="24" label="Mô tả">{{ post.description }}</a-descriptions-item>
              <!-- <a-descriptions-item  :span="24" label="Nội dung"><div style="overflow: hidden; max-width: 100%;"  v-html="post.content"></div></a-descriptions-item> -->
              <a-descriptions-item :span="24" label="Nội dung">
  <div style="overflow: hidden; max-width: 600px;">
    <div v-html="post.content" style="max-width: 100%;"></div>
  </div>
</a-descriptions-item>
              <a-descriptions-item :span="24" label="File đính kèm"><a-button  @click="TaiFile">Tải xuống</a-button></a-descriptions-item>
            </a-descriptions>
          </b-card-body>
        </b-card>
        
      </b-col>
      <b-col xl="3">
        <b-card no-body>
          <b-card-header>
            <h5 class="card-title mb-0">
              <i class="ri-map-pin-line align-middle me-1 text-muted"></i>
              Thông tin công khai
            </h5>
          </b-card-header>
          <b-card-body>
            <ul class="list-unstyled vstack gap-2 fs-13 mb-0">
              <li class="fw-medium fs-14">Trạng thái: {{ post.trangThai }}</li>
                <!-- <span class="badge text-uppercase" :class="{
                          'badge-soft-success': post.isPublic == true,
                          'badge-soft-danger': post.isPublic == false,
                        }">{{ post.isPublic === 0 ? "Bản nháp" : "Đã xuất bản" }}</span></li> -->

              <li>Ngày xuất bản: {{ formatDate(post.publicDate) }}</li>
              <li>Hẹn ngày đăng: {{ formatDate(post.henGioDang) }}</li>
              <li>Trạng thái đăng: {{ post.trangThaiDang == true? "Đã đăng" : "Chưa đăng" }}</li>
              <li>Danh mục: {{ post.danhMuc }}</li>
            </ul>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

</template>
