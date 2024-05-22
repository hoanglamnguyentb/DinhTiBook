<template>
   <PageHeader :title="title" :items="items" />
    <a-row>
      <a-col span="24">
        <a-card no-body>
            <div class="d-flex align-items-center" style="margin-bottom: 20px;">
              <h5 class="card-title flex-grow-1 mb-0">{{ post.nameText }}</h5>
            </div>
          <a-card-body>
            <a-descriptions bordered  :labelStyle="{ width: '150px' }" >
              <a-descriptions-item :span="24" label="Tên văn bản">{{ post.nameText }}</a-descriptions-item>
              <a-descriptions-item :span="24" label="Số hiệu văn bản">{{ post.number }}</a-descriptions-item>
              <a-descriptions-item :span="24" label="Ngày có hiệu lực">{{ post.effectiveDate }}</a-descriptions-item>
              <a-descriptions-item :span="24" label="Cơ quan ban hành">{{ post.agencyIssued }}</a-descriptions-item>
              <a-descriptions-item :span="24" label="Ngày ban hành">{{ post.publicDate }}</a-descriptions-item>
              <a-descriptions-item :span="24" label="Trạng thái">{{ post.status }}</a-descriptions-item>
              <a-descriptions-item :span="24" label="Loại văn bản   ">{{ post.documentType }}</a-descriptions-item>
              <a-descriptions-item :span="24" label="Trích dẫn">{{ post.trichDan }}</a-descriptions-item>
              <!-- <a-descriptions-item  :span="24" label="Nội dung"><div style="overflow: hidden; max-width: 100%;"  v-html="post.content"></div></a-descriptions-item> -->
              <a-descriptions-item :span="24" label="Nội dung">
              <div style="overflow: hidden; max-width: 600px;">
                <div v-html="post.content" style="max-width: 100%;"></div>
              </div>
            </a-descriptions-item>
              <a-descriptions-item :span="24" label="File đính kèm"><a-button  @click="TaiFile">Tải xuống</a-button></a-descriptions-item>
            </a-descriptions>
          </a-card-body>
        </a-card>
        
      </a-col>
    </a-row>

</template>

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
      title: "Chi tiết văn bản",
      items: [
        {
          text: "Văn bản",
          href: "/",
        },
        {
          text: "Chi tiết văn bản",
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
        var dataPost = await APIService.get("VanBan/" + paramId);
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
    
}
</script>

<style>

</style>