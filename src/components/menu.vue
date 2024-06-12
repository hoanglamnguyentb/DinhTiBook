<template>
  <a-menu
    mode="inline"
    :default-open-keys="['sub1']"
    style="
    color: white;"
    theme="#405189"
  >
  <a-menu-item key="home">
    <span> <i style="font-size: 18px; margin-right: 10px;" class="ri-home-5-line"></i></span>
      <a href="/dashboard" style="color: white; font-size: 16px;">
        Trang chủ
      </a>
    </a-menu-item>
  

    <a-sub-menu key="sub1" >
      
    <template #title >
      <span>
        <i style="font-size: 18px; margin-right: 10px;" class="ri-book-3-line"></i>
        <span style="font-size: 16px;">Quản lý sản phẩm</span>
      </span>
    </template>
    <a-menu-item key="1" >
      <router-link style="color: white;" to="/dashboard/san-pham">Danh sách sản phẩm</router-link>
    </a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub4" >
    <template #title >
      <span>
        <i style="font-size: 18px; margin-right: 10px;" class="ri-bookmark-line"></i>
        <span  style="font-size: 16px;">Quản lý danh mục</span>
      </span>
    </template>
    <a-menu-item key="1" >
      <router-link style="color: white;" to="/dashboard/danh-muc">Danh mục đơn hàng</router-link>
    </a-menu-item>
  </a-sub-menu>

  <a-sub-menu key="sub5" >
    <template #title >
      <span>
        <i style="font-size: 18px; margin-right: 10px;" class="ri-hotel-line"></i>
        <span  style="font-size: 16px;">Quản lý nhà xuất bản</span>
      </span>
    </template>
    <a-menu-item key="1" >
      <router-link style="color: white;" to="/dashboard/nha-xuat-ban">Danh sách nhà xuất bản</router-link>
    </a-menu-item>
  </a-sub-menu>
  <a-sub-menu key="sub6" >
    <template #title >
      <span>
        <i style="font-size: 18px; margin-right: 10px;" class="ri-honour-line"></i>
        <span  style="font-size: 16px;">Quản lý nhóm độ tuổi</span>
      </span>
    </template>
    <a-menu-item key="1" >
      <router-link style="color: white;" to="/dashboard/nhom-do-tuoi">Danh sách nhóm độ tuổi</router-link>
    </a-menu-item>
  </a-sub-menu>
    
  <a-sub-menu key="sub2" >
      
    <template #title >
      <span>
        <i style="font-size: 18px; margin-right: 10px;" class="ri-newspaper-line"></i>
        <span  style="font-size: 16px;">Quản lý tin tức</span>
      </span>
    </template>
    <a-menu-item key="1" >
      <router-link style="color: white;" to="/dashboard/tin-tuc">Danh sách tin tức</router-link>
    </a-menu-item>
    <a-menu-item key="2" >
      <router-link style="color: white;" to="/dashboard/chuyen-muc-tin-tuc">Chuyên mục tin tức</router-link>
    </a-menu-item>
  </a-sub-menu>

  <a-sub-menu key="sub3" >
    <template #title >
      <span>
        <i style="font-size: 18px; margin-right: 10px;" class="ri-archive-line"></i>
        <span  style="font-size: 16px;">Quản lý đơn hàng</span>
      </span>
    </template>
    <a-menu-item key="1" >
      <router-link style="color: white;" to="/dashboard/don-hang">Danh sách đơn hàng</router-link>
    </a-menu-item>
  </a-sub-menu>
  <a-sub-menu key="sub7" >
    <template #title >
      <span>
        <i style="font-size: 18px; margin-right: 10px;" class="ri-archive-line"></i>
        <span  style="font-size: 16px;">Quản lý slide/banner</span>
      </span>
    </template>
    <a-menu-item key="1" >
      <router-link style="color: white;" to="/dashboard/slide-banner">Danh sách banner</router-link>
    </a-menu-item>
    <a-menu-item key="1" >
      <router-link style="color: white;" to="/dashboard/slide-tacgia">Danh sách slide tác giả</router-link>
    </a-menu-item>
    <a-menu-item key="1" >
      <router-link style="color: white;" to="/dashboard/slide-khachhang">Danh sách slide khách hàng</router-link>
    </a-menu-item>
  </a-sub-menu>

  
  </a-menu>
</template>

<script>


export default {
  
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>
