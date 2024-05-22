<template>
  <div class="block banner-footer">
    <div class="container">
      <a-row>
        <a-col :span="6">
          <div class="item">
            <a class="a_img" href="">
              <img src="https://dinhtibooks.com.vn/images/banners/original/icon-08_1653387700.webp" alt="">
            </a>
            <div class="banner-btn">
              <a href="">
                <p class="name">
                  Ý tưởng <br/> tặng quà cho con
                </p>
              </a>
            </div>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="item">
            <a class="a_img" href="">
              <img src="https://dinhtibooks.com.vn/images/banners/original/icon-06_1653387748.webp" alt="">
            </a>
            <div class="banner-btn">
              <a href="">
                <p class="name">
                  Tuyển dụng <br/> tìm kiếm nhân tài
                </p>
              </a>
            </div>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="item">
            <a class="a_img" href="">
              <img src="https://dinhtibooks.com.vn/images/banners/original/icon-07_1653387764.webp" alt="">
            </a>
            <div class="banner-btn">
              <a href="">
                <p class="name">
                  Câu hỏi <br/> thường gặp
                </p>
              </a>
            </div>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="item">
            <a class="a_img" href="">
              <img src="../assets/images/LienHe.png" alt="">
            </a>
            <div class="banner-btn">
              <a href="">
                <p class="name">
                 Liên hệ <br/> với chúng tôi
                </p>
              </a>
            </div>
          </div>
        </a-col>
      </a-row>

      
    </div>
  </div>
  <footer id="footer" class="row-content clearfixt">
        <div class="container">
          <a-row>
            <a-col :span="8">
              <div class="menu-footer">
                <a href="">Giới thiệu về Đinh Tị Books</a>
                  <ul class="ul_0">
                    <li class="level1 sub-item">
                      <a href="">Về Đinh Tị</a>
                    </li>
                    <li class="level1 sub-item">
                      <a href="">Tin tức và sự kiên</a>
                    </li>
                    <li class="level1 sub-item">
                      <a href="">Hệ thống phân phối</a>
                    </li>
                  </ul>
              </div>
            </a-col>
            <a-col :span="8">
              <div class="menu-footer">
                <a href="">Chăm sóc khách hàng</a>
                  <ul class="ul_0">
                    <li class="level1 sub-item">
                      <a href="">Chính sách vận chuyển và giao hàng </a>
                    </li>
                    <li class="level1 sub-item">
                      <a href="">Hình thức thanh toán</a>
                    </li>
                    <li class="level1 sub-item">
                      <a href="">Chính sách bảo mật thông tin</a>
                    </li>
                    <li class="level1 sub-item">
                      <a href="">Chính sách đổi trả hàng hóa</a>
                    </li>
                  </ul>
              </div>
            </a-col>
            <a-col :span="8">
              <div class="menu-footer">
                <a href="">Thông tin thành viên</a>
                  <ul class="ul_0">
                    <li class="level1 sub-item">
                      <a href="">Đăng ký</a>
                    </li>
                    <li class="level1 sub-item">
                      <a href="">Đăng nhập</a>
                    </li>
                    
                  </ul>
              </div>
            </a-col>
          </a-row>
          <a-row style="margin-top: 40px;">
            <a-col :span="6">
              <img src="../assets/images/logo_footer.png" alt="">
            </a-col>
            <a-col style="border-left: 2px solid #a5a0a0;" :span="12">
              <div style="padding-left: 20px;">
                <p style="font-size:18px; font-weight:bold;text-transform: uppercase;">Công ty TNHH TM &amp; DV&nbsp;văn hóa đinh tị</p>
                <p>
                  <span style="font-size:14px;">VPMB: NV22 khu 12 ngõ 13 đường Lĩnh Nam, phường Mai Động, quận Hoàng Mai, Thành Phố Hà Nội</span><br>
                  <span style="font-size:14px;">VPMN:&nbsp;Số 78 - Đường số 1 - P. 4 - Q. Gò Vấp, TP. Hồ Chí Minh</span><br>
                  <span style="font-size:14px;">Điện thoại: 0247.309.3388 - Email: contacts@dinhtibooks.vn - Mst: 0101884041</span><br>
                  <span style="font-size:14px;">© 2022. Bản quyền website thuộc về Công ty TNHH TM &amp; DV Văn Hóa Đinh Tị</span><br>
                </p>
              </div>
              
            </a-col>
            <a-col :span="6">
              <div style="padding-top: 55px; padding-left: 60px;">
                <img src="../assets/images/bocongthuong.png" alt="">
              </div>
              
            </a-col>
          </a-row>
        </div>
      </footer>
</template>

<script>
export default {

}
</script>

<style scoped>
.container{
  max-width: 1200px;
}
.banner-footer{
  background-color: #e9262a;

  padding: 20px 0px;
}
.item{
  display: flex;
  align-items: center;
  column-gap: 14px;
}
.item .a_img{
  width: 100%;
  max-width: 80px;
  height: 80px;
  max-height: 80px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item .a_img img{
  width: 50px;
    height: 50px;
    object-fit: cover;
    margin: 0 !important;
}
.item .banner-btn .name{
  font-weight: 600;
    font-size: 17px;
    line-height: 21.6px;
    color: #ffffff;
    margin: 0;
}
#footer{
  background: url(../assets/banner/banner-footer.webp) center center no-repeat, #ffffff9e;
  background-size: cover;
  background-blend-mode: overlay;
  padding: 25px 0px;
}
.menu-footer > a{
  font-size: 18px;
  color: #000;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
}
.menu-footer > a:hover{
  color: #e9262a;
}
.menu-footer .ul_0{
  padding-left: 20px;
    margin-top: 12px;
    margin-bottom: 0;
}
.menu-footer .ul_0 .level1{
  margin-bottom: 10px;
}
.menu-footer .ul_0 .level1 a{
  font-size: 15px;
  font-weight: 400;
  text-transform: unset;
  color: #000;
  cursor: pointer;
}
</style>