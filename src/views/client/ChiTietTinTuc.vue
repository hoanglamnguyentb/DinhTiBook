<template>
  <Header></Header>
  <div style="background-color: white; padding-top: 70px">
    <div class="container">
      <h3 style="margin-bottom: 50px">{{ TenNhomDoTuoi }}</h3>
      <div  class="description-content">
        <div v-html="TinTuc.noiDung"></div>
      </div>
    </div>
  </div>
  <FooterClient></FooterClient>
</template>

<script>
import APIService from '@/helpers/ApiService';
import Header from '@/components/Header';
import FooterClient from '@/components/FooterClient.vue';
export default {
  components:{
    Header,
    FooterClient
  },
  data(){
    return{
      TinTuc:{},
      TenNhomDoTuoi:'',
      TenTinTuc:''
    }
  },
  methods:{
    async getTinTuc(){
      
      var id = this.$route.params.id;
      await APIService.get('/TinTuc/' + id)
      .then(response =>{
        this.TinTuc = response.data.objInfo
        
       
        this.TenTinTuc = this.TinTuc.tieuDe
        console.log('tt',this.TenTinTuc)
        this.getNhomDoTuoi();
      })
      .catch(error =>{
        console.log(error)
      })  
    },
    async getNhomDoTuoi(){
      var paramId = this.TenTinTuc;
      console.log('ttee', paramId)
      await APIService.get('/NhomDoTuoi?MaNhomFilter=' + paramId)
      .then(response =>{
         this.TenNhomDoTuoi = response.data.data.items[0].tenNhom
        console.log('nhom', response)
      })
      .catch(error =>{
        console.log(error)
      })
    }
  },
  async  mounted(){
    await  this.getTinTuc()
    
  },
  created(){
    
  }
}
</script>

<style>

</style>