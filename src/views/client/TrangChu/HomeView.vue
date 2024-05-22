<template>
  <Header></Header>
  <div id="main" style="background-color: white;">
    <div class="slideshow">
      <a-carousel autoplay>
        <!-- <div v-for="item in 4" :key="item">
          <img :src="getImgUrl(item - 1)" />
        </div> -->
        <!-- <div v-for="item in banner" :key="item">
          <img :src= item.src  />
        </div> -->
        <img src="../../../assets/banner/banner1.webp" alt="">
        <img src="../../../assets/banner/banner2.webp" alt="">
      </a-carousel>
    </div>
    <div class="strengths" style="margin-top: 50px;">
      <div class="container">
        <p class="title-box">Giá trị thương hiệu</p>
        <div class="list-banner">
          <a-row>
            <a-col :span="8">
              <div class="item">
                <a class="a_img" href="#" title="Thương hiệu uy tín">
                  <img src="../../../assets/images/icon-3sao.webp" alt="">
                </a>
                <div class="banner-btn">
                  <div>
                    <p class="name">Thương hiệu uy tín</p>
                    <div class="summary">
                      <p>Đinh Tị Books được đánh giá là nhà xuất bản sách thiếu nhi uy tín, có tốc độ phát triển nhanh trong ngành sách Việt Nam</p>
                    </div>
                    
                  </div>
                </div>
              </div>
            </a-col>
            <a-col :span="8">
              <div class="item">
                <a class="a_img" href="#" title="Thương hiệu uy tín">
                  <img src="../../../assets/images/icon-traitim.webp" alt="">
                </a>
                <div class="banner-btn">
                  <div>
                    <p class="name">Sản phẩm chất lượng</p>
                    <div class="summary">
                      <p>Mỗi sản phẩm chất lượng đều được ra đời từ trái tim tâm huyết của đội ngũ Đinh Tị Books.</p>
                    </div>
                    
                  </div>
                </div>
              </div>
            </a-col>
            <a-col :span="8">
              <div class="item">
                <a class="a_img" href="#" title="Giá trị cộng đồng">
                  <img src="../../../assets/images/icon-traodoi.webp" alt="">
                </a>
                <div class="banner-btn">
                  <div>
                    <p class="name">Giá trị cộng đồng</p>
                    <div class="summary">
                      <p>Sách thiếu nhi Đinh Tị ngày càng nhận được nhiều tình cảm, niềm tin độc giả, khách hàng trên toàn quốc</p>
                    </div>
                    
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
    <div class="difference">
      <div class="bg-difference" style="background-color: #f2f2f2">
        <div class="top" style="padding-top: 40px;">
          <div class="container">
            <a-row>
              <a-col :span="8">
                <div class="item">
                  <span class="red2">+</span>
                  <span class="red bold">17</span>
                  <p></p>
                  <p>Năm kinh nghiệm</p>
                </div>
              </a-col>
              <a-col :span="8" style="border-left: 1px dashed #999999; border-right: 1px dashed #999999;">
                <div class="item">
                  <span class="red2">+</span>
                  <span class="red bold">30,000,000</span>
                  <p></p>
                  <p>Bản sách bán ra</p>
                </div>
              </a-col>
              <a-col :span="8">
                <div class="item">
                  <span class="red2">+</span>
                  <span class="red bold">1,500</span>
                  <p></p>
                  <p>Đại lý phân phối</p>
                </div>
              </a-col>
            </a-row>
          </div>
        </div>
        <div class="bottom">
          <img src="../../../assets/images/banner-cat.webp" alt="">
          <div class="text-box">
            <p style="font-size: 20px; line-height: 24px;">“Sự khác biệt của chúng tôi nằm ở tinh thần luôn cầu thị, sáng tạo và dám nghĩ dám làm, tạo ra những giá trị độc đáo và đầy cảm hứng cho mọi người.”</p>
            <p style="font-size: 20px; line-height: 24px;">Nguyễn Trung Sơn</p>
          </div>
        </div>
      </div>
    </div>
    <div class="book-by-type">
      <div class="bg-book-by-type">
        <div class="container">
          <p class="title-box">Sản phẩm</p>
          <!-- <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" href="">
                <img src="../../../assets/images/icon-sachbanchay.webp" alt="">
                Sách bán chạy
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="">
                <img src="../../../assets/images/icon-sachmoi.webp" alt="">
                Sách mới
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="">
                <img src="../../../assets/images/icon-sachhay.webp" alt="">
                Sách khuyên đọc
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="">
                <img src="../../../assets/images/icon-combosach.webp" alt="">
                Combo sách hot
              </a>
            </li>
          </ul> -->




          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1">
              <template #tab>
                <div class="tab-pane">
                  <img src="../../../assets/images/icon-sachbanchay.webp" alt="">
                  Sách bán chạy
                </div>
              </template>

              <div class="list-product">
                
                <div v-for="(item, index) in firstFiveItems" :key="index" class="item">
                  <a class="img_box" :href="`/detail/`+ item.id">
                    <img :src="URL + item.pathAnh" style="width: 198px; height: 216px;" alt="">
                  </a>
                  <a class="name" href="">{{ item.tenSach }}</a>
                  <p class="price">
                    Giá: <span class="red">{{ item.giaTien - (item.giaTien / 100)* item.giamGia }}</span>
                    <strike class="normal">{{ item.giaTien }} </strike>
                  </p>
                  <span class="discount"> -{{ item.giamGia }}%</span>
                </div>
                
              </div>
              <div  class="button-xemthem">
                <a href="">Xem thêm</a>
              </div>
              

            </a-tab-pane>

            <a-tab-pane key="2">
              <template #tab>
                <div class="tab-pane">
                  <img src="../../../assets/images/icon-sachmoi.webp" alt="">
                  Sách mới
                </div>
              </template>
              Tab 2
            </a-tab-pane>

            <a-tab-pane key="3">
              <template #tab>
                <div class="tab-pane">
                  <img src="../../../assets/images/icon-sachhay.webp" alt="">
                  Sách khuyên đọc
                </div>
                
                
              </template>
              Tab 3
            </a-tab-pane>

            <a-tab-pane key="4">
              <template #tab>
                <div class="tab-pane">
                  <img src="../../../assets/images/icon-combosach.webp" alt="">
                  Combo sách hot
                </div>
                
                
              </template>
              Tab 4
            </a-tab-pane>
          </a-tabs>


          <div class="tab-content"></div>
        </div>
      </div>
    </div>

    <div class="hot-cat">
      <div style="background-color: #f2f2f2;" class="bg-hot-cat">
        <div class="container">
          <p class="title-box">Tủ sách nổi bật</p>
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1">
              <template #tab>
                <div class="tab-pane">
                  <img src="../../../assets/images/icon-sachbanchay.webp" alt="">
                  Sách bán chạy
                </div>
              </template>

              <div class="list-product">
                
                <div v-for="(item, index) in firstFiveItems" :key="index" class="item">
                  
                    <a class="img_box" href="/detail">
                    <img :src="URL + item.pathAnh" style="width: 198px; height: 216px;" alt="">
                  </a>
         
                 
                  <a class="name" href="/detail">{{ item.tenSach }}</a>
                  <p class="price">
                    Giá: <span class="red">{{ item.giaTien - (item.giaTien / 100)* item.giamGia }}</span>
                    <strike class="normal">{{ item.giaTien }} </strike>
                  </p>
                  <span class="discount"> -{{ item.giamGia }}%</span>

                  
                </div>
                
              </div>
              <div  class="button-xemthem">
                <a href="/detail">Xem thêm</a>
                
              </div>
            </a-tab-pane>

            <a-tab-pane key="2">
              <template #tab>
                <div class="tab-pane">
                  <img src="../../../assets/images/icon-sachmoi.webp" alt="">
                  Sách mới
                </div>
              </template>
              Tab 2
            </a-tab-pane>

            <a-tab-pane key="3">
              <template #tab>
                <div class="tab-pane">
                  <img src="../../../assets/images/icon-sachhay.webp" alt="">
                  Sách khuyên đọc
                </div>
    
              </template>
              Tab 3
            </a-tab-pane>

            <a-tab-pane key="4">
              <template #tab>
                <div class="tab-pane">
                  <img src="../../../assets/images/icon-combosach.webp" alt="">
                  Combo sách hot
                </div>
                
              </template>
              Tab 4
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
      
    </div>
<!-- Tác giả nổi tiếng -->
    <div class="author">
      <div style="margin-top: 50px" class="container">
        <p class="title-box">Tác giả</p>
        <h4 class="text-center mt-0 mb-5">Dưới đây là các Tác giả - Dịch giả - Họa sĩ đã xuất bản sách tại Đinh Tị Books</h4>
        <div class="owl-carousel slide-tacgia owl-theme">
          <div class="item ">
            <div class="img_box">
              <img src="https://dinhtibooks.com.vn/images/products/author/2022/08/resized/tac-gia-carol-vorderman_1660017784.webp" alt="">
            </div>
            <div class="text">
              <p class="name">TÁC GIẢ CAROL VORDERMAN</p>
              <div class="summary">
                <p style="text-align: justify;">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat eveniet repellat, ratione expedita perferendis autem. Debitis, dolor rem? Vitae optio quia asperiores alias unde molestiae mollitia laboriosam doloremque repudiandae eum aspernatur laudantium facilis ipsum fugit esse repellendus fuga modi perferendis quam magnam repellat, odio itaque? Expedita rem officia nisi magnam?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

<!--Khách hàng nói về chúng tôi  -->
    <div style="margin-top: 50px" class="partner">
      <div style="background-color: #f2f2f2; padding-bottom: 42px;" class="customer">
        <div class="container">
          <div class="top">
            <p class="title_why_2">Khách hàng nói về chúng tôi</p>
            <p class="summary">Dưới đây là tình cảm của Đối tác / Nhà phân phối / Khách hàng nói về chúng tôi</p>
          </div>
          <div  class="owl-carousel slide-khachhang owl-theme">
            <div style="margin-right: 20px" class="item">
              <div class="content">
                <p>
                  <span style="font-size: 16px;">“Là đại lý bán lẻ lâu năm trên phố sách Đinh Lễ nên chúng tôi thật sự cần những cuốn sách mới, chất lượng khác biệt với mặt bằng chung. Thật may mắn, Đinh Tị Books là đơn vị luôn đáp ứng những tiêu chí đó. Chúng tôi rất hài lòng về sản phẩm của Đinh Tị trong hơn 10 năm hợp tác”.</span>
                </p>
              </div>
              <div class="bottom">
                <a href="#" class="a_img left">
                  <!-- <img width="100%" height="232px" src="images/customer/2022/06/17/resized/vlcsnap-2022-06-17-15h57m11s818_1655457497.webp" alt=""> -->
                  <img src="https://dinhtibooks.com.vn/images/customer/2022/06/17/resized/vlcsnap-2022-06-17-15h57m11s818_1655457497.webp" alt="">
                </a>
                <div style="margin-left: 20px; display: block;" class="right">
                  <p class="name">Chủ nhà sách Ngân Nga</p>
                  <p class="summary">Chia sẻ của Chị Sâm - Chủ nhà sách Ngân Nga, số 7 Đinh Lễ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

<!-- Tin tức -->
    <div class="block block_new">
      <div style="margin-top: 50px;" class="bg_new_home">
        <div class="container">
          <p class="title-box">Tin tức</p>
          <div class="list_new">
            <div v-for="(item, index) in TinTuc" :key="index"  class="new_list">
              <div class="img">
                <a href="">
                  <img :src="item.pathAnh" alt="">
                </a>
              </div>
              <div class="content">
                <a href="">{{ item.title }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

<!-- Đối tác -->
    <div style="margin-top: 50px; padding-bottom: 50px;" class="block foreign-partner">
      <div class="container">
        <div class="doi-tac-tieu-bieu">
          <p class="title-box">Đối tác</p>
          <div  class="owl-carousel slide-doitac owl-theme">
            <div v-for="(item, index) in DoiTac" :key="index" class="item">
              <a class="a_img" href="">
                <img :src="item.src"/>
              </a>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <FooterClient></FooterClient>
</template>

<script>

import Header from "@/components/Header";
import FooterClient from '@/components/FooterClient.vue';
import APIService from "@/helpers/ApiService";
export default {
  components:{
    Header,
    FooterClient
  },
  data(){
    return{
      banner:[
        {
          name: 'banner1',
          src: '@/assets/images/logoheader.png',
          url: '#'
        },
        {
          name: 'banner2',
          src: '../../../assets/banner/banner2.webp',
          url: '#'
        },
      ],
      activeKey: '1',
      URL: 'http://localhost:44301/',
      
      SanPham:[
        {
          pathAnh: "Uploads/FileManager\\bachkhoathu_20240503231520712.webp",
          tenSach: "sách 1",
          giaTien: 350000,
          giamGia: 20
        },
        {
          pathAnh: "Uploads/FileManager\\bachkhoathu_20240503231520712.webp",
          tenSach: "sách 2",
          giaTien: 350000,
          giamGia: 20
        },
        {
          pathAnh: "Uploads/FileManager\\bachkhoathu_20240503231520712.webp",
          tenSach: "sách 3fh ",
          giaTien: 350000,
          giamGia: 20
        },
        {
          pathAnh: "Uploads/FileManager\\bachkhoathu_20240503231520712.webp",
          tenSach: "sách 4 dfgdfg",
          giaTien: 350000,
          giamGia: 20
        },
        {
          pathAnh: "Uploads/FileManager\\bachkhoathu_20240503231520712.webp",
          tenSach: "sách 5",
          giaTien: 350000,
          giamGia: 20
        },
        {
          pathAnh: "Uploads/FileManager\\bachkhoathu_20240503231520712.webp",
          tenSach: "sách 6",
          giaTien: 350000,
          giamGia: 20
        },
        {
          pathAnh: "Uploads/FileManager\\bachkhoathu_20240503231520712.webp",
          tenSach: "sách 7",
          giaTien: 350000,
          giamGia: 20
        },
        {
          pathAnh: "Uploads/FileManager\\bachkhoathu_20240503231520712.webp",
          tenSach: "sách 8",
          giaTien: 350000,
          giamGia: 20
        },
      ],
      lstSanPham:[],
      TinTuc:[
        {
          pathAnh: "https://dinhtibooks.com.vn/images/news/2024/05/large/baiviet-1_1715247137.webp",
          title: "TẶNG DEAL YÊU THƯƠNG - MỪNG NGÀY CỦA MẸ ",
        },
        {
          pathAnh: "https://dinhtibooks.com.vn/images/news/2024/05/large/baiviet-1_1715247137.webp",
          title: "SALE TƯNG BỪNG MỪNG THÁNG ĐỌC SÁCH ",
        },
        {
          pathAnh: "https://dinhtibooks.com.vn/images/news/2024/05/large/baiviet-1_1715247137.webp",
          title: "TẶNG DEAL YÊU THƯƠNG - MỪNG NGÀY CỦA MẸ ",
        },
        {
          pathAnh: "https://dinhtibooks.com.vn/images/news/2024/05/large/baiviet-1_1715247137.webp",
          title: "TẶNG DEAL YÊU THƯƠNG - MỪNG NGÀY CỦA MẸ ",
        },
        {
          pathAnh: "https://dinhtibooks.com.vn/images/news/2024/05/large/baiviet-1_1715247137.webp",
          title: "TẶNG DEAL YÊU THƯƠNG - MỪNG NGÀY CỦA MẸ ",
        },
      ],
      DoiTac:[
        {
          src: "https://dinhtibooks.com.vn/images/partner/2022/05/09/resized/nuoc-ngoai-3_1652069117.webp"
        },
        {
          src: "https://dinhtibooks.com.vn/images/partner/2022/05/09/resized/nuoc-ngoai-2_1652069106.webp"
        },
        {
          src: "https://dinhtibooks.com.vn/images/partner/2022/05/09/resized/nuoc-ngoai-1_1652069090.webp"
        },
        {
          src: "https://dinhtibooks.com.vn/images/partner/2022/05/09/resized/nuoc-ngoai-1_1652069090.webp"
        },
        {
          src: "https://dinhtibooks.com.vn/images/partner/2023/02/14/resized/logo-cac-nxb-dua-1len-web-04_1676350829.webp"
        },
        {
          src: "https://dinhtibooks.com.vn/images/partner/2023/02/14/resized/logo-cac-nxb-dua-1len-web-03_1676350839.webp"
        },
        {
          src: "https://dinhtibooks.com.vn/images/partner/2022/05/09/resized/nuoc-ngoai-1_1652069090.webp"
        }
      ]
      
    }
  },
  methods:{
    getImgUrl(i){
      return `${this.baseUrl}abstract0${i + 1}.jpg`;
    },
    async getSanPham(){
      var result = await APIService.get("/SanPham");
      if (result.data.data != null && result.data.data.items != null) {
        this.lstSanPham = result.data.data.items;

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
  },
  mounted(){
    $('.slide-tacgia').owlCarousel({
      loop:true,
      margin:10,
      nav:false,
      dots: false,
      autoplay: true,
      responsive:{
        0:{
          items:1
        },
        600:{
          items:1
        },
        1000:{
          items:2
        }
      }
    });
    $('.slide-khachhang').owlCarousel({
      loop:true,
      margin:10,
      nav:false,
      dots: false,
      autoplay: true,
      responsive:{
        0:{
          items:1
        },
        600:{
          items:1
        },
        1000:{
          items:2
        }
      }
    });
    $('.slide-doitac').owlCarousel({
      loop:true,
      margin:10,
      nav:false,
      dots: false,
      autoplay: false,
      responsive:{
        0:{
          items:1
        },
        600:{
          items:3
        },
        1000:{
          items:6
        }
      }
    });
    this.getImgUrl(),
    this.getSanPham()
  },
  computed:{
    firstFiveItems() {
      return this.lstSanPham.slice(0, 5);
    }
  }
}
</script>

<style scoped>
*{
  box-sizing: border-box;
  font-family: Omnes, sans-serif !important;
}
.title-box{
  font-family: rocoiLinotte, sans-serif !important;
  display: table;
  text-align: center;
  border: 2px dashed #e9262a;
  border-radius: 50px;
  margin: auto;
  padding: 15px 47px;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  text-transform: uppercase;
  color: #e9262a;
  margin-bottom: 30px;
}
.strengths .list-banner .item{
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border: 1px solid #eeeeee;
  border-radius: 30px;
  margin: 20px;
}
.strengths .list-banner .item:hover{
  opacity: 0.7;
  transition: opacity 0.2s ease-out;
  animation-duration: 200s;
  transition: 0.4s;
  cursor: pointer;
  border: 1px solid #e9262a;
  box-shadow: 2px 1px 7px 1px rgba(0, 0, 0, 0.08);
}
.strengths .list-banner .item .a_img{
  display: block;
  margin-top: 40px !important;
  margin: 0 auto;
  width: 90px;
  height: 90px;
  overflow: hidden;
}
.strengths .list-banner .item .a_img img {
  width: 100%;
  height: 100%;
}
.strengths .list-banner .item .banner-btn .name{
  font-weight: 700;
  text-transform: uppercase;
  padding-top: 30px;
  margin-bottom: 10px;
}
.strengths .list-banner .item .banner-btn p{
  padding-left: 30px;
  padding-right: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin-bottom: 18px;
}
.difference{
  margin-top: 30px;
}
.difference::before{
  width: 100%;
  clip-path: polygon(50% 0%, 0 100%, 100% 100%);
  content: "";
  height: 51px;
  display: block;
  background: #f2f2f2;
}
.difference .bg-difference .top .item{
  text-align: center;
}
.difference .bg-difference .top .item span{
  font-family: r0c0i_Linotte_Bold, sans-serif !important;
}
.difference .bg-difference .top .item .red2{
  font-size: 40px;
  font-weight: 700;
  line-height: 20px;
  color: #e9262a;
}
.difference .bg-difference .top .item .red{
  font-size: 40px;
  font-weight: 700;
  line-height: 32px;
  color: #e9262a;
}
.difference .bg-difference .top .item p{
  margin-top: 30px !important;
  font-size: 20px;
  font-weight: 300;
  line-height: 24px;
  text-transform: uppercase;
}
.difference .bg-difference .bottom{
  margin-top: 40px;
  position: relative;
  width: 100%;
  overflow: hidden;
}
.difference .bg-difference .bottom img{
  width: 100%;
  clip-path: polygon(50% 0, 100% 10%, 100% 90%, 50% 100%, 0 90%, 0 10%);
  height: auto;
  object-fit: contain;
}
.difference .bg-difference .bottom .text-box{
  position: absolute;
  top: 0%;
  text-align: center;
  font-size: 24px;
  line-height: 34px;
  font-weight: 700;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
  height: 100%;
  clip-path: polygon(50% 0, 100% 10%, 100% 90%, 50% 100%, 0 90%, 0 10%);
  padding: 10% 12% 0px 12%;
  width: 100%;
  font-family: Omnes, sans-serif !important;
}
.book-by-type{
  position: relative;
}
.book-by-type::before{
  clip-path: polygon(50% 100%, 100% 0%, 100% 100%, 50% 100%, 0 100%, 0 0%);
  width: 100%;
  height: 50px;
  content: '';
  display: block;
  background: #ffffff;
  top: -50px;
  position: absolute;
}
.book-by-type .bg-book-by-type{
  background: #fff;
  padding-bottom: 30px;
  padding-top: 50px;
}
.book-by-type .bg-book-by-type .container{
  max-width: 1200px;
  padding-right: 15px;
  padding-left: 15px;
  margin-left: auto;
  margin-right: auto;
}
.book-by-type .nav-tabs{
  display: flex;
  list-style: none;
  justify-content: space-evenly;
  margin-top: 40px;
  border: none;
}
.nav-tabs .nav-item{
  margin-bottom: -1px;
}
.book-by-type  .nav-tabs .nav-link{
  border: 1px solid transparent;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem
}
.book-by-type .nav-tabs .nav-link:hover{
  border: 0px solid transparent;
  color: #e9262a;
}
.book-by-type .nav-tabs a{
  display: grid;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  text-decoration: none;
}
.book-by-type .nav-tabs .active{
  border-bottom: 3px solid #e9262a !important;
  background: none !important;
  border: none;
}
.book-by-type .nav-tabs a img{
  margin: 0 auto;
  height: 50px;
  margin-bottom: 10px;
}
.book-by-type .tab-content{
  display: block !important;
  padding-top: 20px;
  border-top: 1px solid #dddddd;
}
.book-by-type .tab-pane {
  display: grid;
}
.button-xemthem {
  display: flex;
  justify-content: center;
  margin: 30px 0px;
}
.button-xemthem a{
  display: -webkit-flex;
  align-items: center;
  color: #e9262a;
  background-color: #fff;
  border: 2px solid #e9262a;
  font-size: 14px;
  font-weight: 700;
  width: 210px;
  max-width: 100%;
  height: 40px;
  max-height: 100%;
  border-radius: 8px;
  cursor: pointer;
  justify-content: center;
}
.button-xemthem a:hover{
  transform: 0.4s;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translate3d(0, -2px, 0);

}
.list-product{
  margin-top: 30px;
  display: flex;
} 
.list-product .item{
  position: relative;
  padding: 10px;
  width: 218px;
  margin-right: 20px;
}
.list-product .item:hover{
  background-color: #fff;
  transition: 0.4s;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translate3d(0, -2px, 0);
}
.list-product .item .img_box{
  background-color: #f9f9f9;
  width: 100%;
  height: 216px;
  overflow: hidden;
  display: flex;
  justify-content: center;
}
.list-product .item .name{
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  color: #009fdb;
  margin-top: 20px;
  height: 40px;
  padding: 0 10px;
}
.list-product .item .price{
  margin-top: 15px;
  padding-bottom: 15px !important;
  margin-left: 10px;
}
.list-product .item .price .red{
  font-weight: 700;
  color: #e9262a;
  margin-right: 12px;
}
.list-product .item  .discount{
  font-size: 12px;
  padding: 3px;
  top: -14px;
  right: 0px;
  position: absolute;
  margin: auto;
  left: 0px;
  border-radius: 3px;
  background-color: #e9262a;
  color: #fff;
  text-align: center;
  display: table;
}
.hot-cat::before{
  width: 100%;
  clip-path: polygon(50% 0%, 0 100%, 100% 100%);
  content: "";
  height: 51px;
  display: block;
  background: #f2f2f2;
}
.author::before{
  clip-path: polygon(50% 100%, 0 0%, 100% 0%);
  height: 50px;
  content: "";
  display: block;
  background: #f2f2f2;
  border: 1px solid #f2f2f2;
}
.container{
  max-width: 1200px;
  padding-right: 15px;
  padding-left: 15px;
  margin-left: auto;
  margin-right: auto;
}
.author .item{
  column-gap: 30px;
  border: 1px dashed #ed1c24;
  border-radius: 30px 0px;
  padding: 40px 0px;
  position: relative;
  margin-left: 30px;
}
.author .item .img_box{
  position: absolute;
  left: -30px;
  width: 100%;
  max-width: 220px;
  height: 220px;
  overflow: hidden;
  border-radius: 5px;
}
.author .item .img_box img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.author .item .text{
  padding-left: 220px;
}
.author .item .text .name{
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  text-transform: uppercase;
  color: #000000;
  margin-bottom: 18px !important;
  margin-top: 5px;
}
.author .item .text .summary{
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #333333;
  margin-bottom: 40px;
  margin-right: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  height: 100px;
}
.partner::before{
  width: 100%;
  clip-path: polygon(50% 0%, 0 100%, 100% 100%);
  content: "";
  height: 51px;
  display: block;
  background: #f2f2f2;
}
.customer .item{
  background: #ffffff;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0px;
  padding: 30px 25px 30px 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 316px;
}
.customer .item .content{
  position: relative;
}
.customer .item .content p{
  margin: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: unset;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-align: justify;
  padding-right: 25px;
}
.customer .bottom{
  display: flex;
    margin-top: 20px;
    align-items: center;
}
.customer .bottom .left{
  width: 100%;
  height: 100px;
  max-width: 100px;
  overflow: hidden;
  display: block;
  border-radius: 50%;
}
.customer .bottom .left img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.customer .bottom .right .name{
  margin-bottom: 6px;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
}
.customer .bottom .right .summary{
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
}
.customer .title_why_2{
  display: table;
    margin: 0 auto;
    font-weight: 700;
    color: #252525;
    text-transform: uppercase;
    font-size: 24px;
    line-height: 29px;
    margin-bottom: 10px;
    text-align: center;
}
.customer .summary{
  text-align: center;
    margin-bottom: 14px;
}
.block_new::before{
  clip-path: polygon(50% 100%, 0 0%, 100% 0%);
    height: 50px;
    content: "";
    display: block;
    background: #f2f2f2;
    border: 1px solid #f2f2f2;
}
.block_new .bg_new_home .list_new{
  display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-gap: 0 30px; 
}
.block_new .bg_new_home .list_new .new_list:nth-child(1){
  grid-row-start: 1;
    grid-row-end: 5;
    grid-column-start: 1;
    grid-column-end: 1;
    padding-top: 0;
    border: none;
    display: block;
}
.block_new .bg_new_home .list_new .new_list:nth-child(1) .img{
  width: 100%;
    height: auto;
    max-height: 338px;
    overflow: hidden;
}
.block_new .bg_new_home .list_new .new_list:nth-child(1) .img img{
  width: 100%;
    height: 338px;
    object-fit: cover;
}
.block_new .bg_new_home .list_new .new_list:nth-child(1) .content{
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
}
.block_new .bg_new_home .list_new .new_list:nth-child(1) .content .title{
  font-weight: 700;
    font-size: 18px;
    color: #252525;
    line-height: 21.6px;
}
.block_new .bg_new_home .list_new .new_list .content .title{
  text-decoration: none;
    margin-bottom: 15px;
}
.block_new .bg_new_home .list_new .new_list:nth-child(n + 2) .img{
  width: 100%;
    height: auto;
    max-height: 152px;
    overflow: hidden;
}
.block_new .bg_new_home .list_new .new_list:nth-child(n + 2) .img img{
  width: 100%;
    height: 152px;
    object-fit: cover;
}
.foreign-partner .doi-tac-tieu-bieu .item{
  border: 1px solid #eeeeee;
  border-radius: 5px;
  height: 90px;
}
.foreign-partner .doi-tac-tieu-bieu .item .a_img{
  width: 100%;
    max-width: 175px;
    display: block;
    overflow: hidden;
    height: auto;
    max-height: 100px;
}
.foreign-partner .doi-tac-tieu-bieu .item .a_img img{
  width: 100%;
    height: auto;
    object-fit: contain;
    max-height: 100px;
}
</style>

