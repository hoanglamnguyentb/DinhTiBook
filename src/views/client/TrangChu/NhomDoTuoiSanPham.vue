<template>
  <Header></Header>
  <div style="background-color: white; padding-top: 70px">
    <div class="container">
      <a-row>
        <a-col :span="16">
          <h1 class="title">Từ 0-3</h1>
          <div class="summary">
            <p style="text-align: justify">
              Ở lứa tuổi 0-3, trẻ vẫn còn rất nhỏ, nhận thức với thế giới xung
              quanh chưa nhiều. Trẻ chưa thể tự chủ và gần như không thể tách
              rời khỏi bố mẹ. Có thể chia thành hai giai đoạn nhỏ hơn để bố mẹ
              thấy rõ các đặc điểm khác biệt của trẻ.<br /><br />&nbsp;
            </p>
            <div class="see-more">
              <p style="text-align: justify">
                <a href="http://dinhtibooks.com.vn/tuoi-0--3--c63.html"
                  ><span style="color: #e74c3c">Xem thêm</span></a
                >
              </p>
            </div>
          </div>
        </a-col>
        <a-col :span="8"></a-col>
      </a-row>

      <div class="filter">
        <div class="filter-left"></div>
      </div>
      <div class="bottom">
        <span class="count_all">{{ this.optionPage.totalCount }} kết quả</span>
        <div class="grid">
          <div v-for="(item, index) in lstSanPham" :key="index" class="item">
            <a :href="`/detail/` + item.id" class="img_box">
              <img :src="URL + item.pathAnh" alt="" />
            </a>
            <div class="info-box">
              <a class="name" :href="`/detail/` + item.id">{{
                item.tenSach
              }}</a>
              <p class="price">
                Giá:
                <span class="price_new">{{
                  formatCurrency(
                    item.giaTien - (item.giaTien / 100) * item.giamGia
                  )
                }}</span>
                <span class="normal">{{ formatCurrency(item.giaTien) }}</span>
              </p>
              <span class="discount"> -{{ item.giamGia }}% </span>

              <div class="note-stick"></div>
            </div>
          </div>
        </div>
        <Pagination
          :total="optionPage.totalCount"
          :current="optionPage.pageIndex"
          :per-page="optionPage.pageSize"
          :pageRange="optionPage.totalCount"
          @page-changed="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/widgets/Pagination.vue';
import Header from '@/components/Header';
import FooterClient from '@/components/FooterClient.vue';
import APIService from '@/helpers/ApiService';
import Common from '@/helpers/Common';

export default {
  components: {
    Header,
    FooterClient,
    Pagination,
  },
  data() {
    return {
      lstSanPham: [],
      URL: 'http://localhost:44301/',
      optionPage: {
        pageIndex: 1,
        pageSize: 20,
        totalCount: 0,
      },
    };
  },
  methods: {
    handlePageChange(page) {
      this.optionPage.pageIndex = page;
      this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
    },
    async loadData(pageIndex, pageSize, params) {
      var paramId = this.$route.params.id;
      var searchParam = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        NhomDoTuoiFilter: paramId,
      };
      if (params) {
        searchParam = params;
      }

      var urlQuery = new URLSearchParams(searchParam).toString();
      var result = await APIService.get('/SanPham?' + urlQuery);
      this.lstSanPham = result.data.data.items;
      if (result.data.data != null && result.data.data.items != null) {
        var res = result.data.data;
        this.lstSanPham = result.data.data.items;
        this.optionPage.pageIndex = res.pageIndex;
        this.optionPage.pageSize = res.pageSize;
        this.optionPage.totalCount = res.totalCount;
      }
    },
    formatCurrency(x) {
      return Common.formatCurrency(x);
    },
  },
  mounted() {
    this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
  },
};
</script>

<style>
.top .title {
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 24px;
  color: #252525;
}
.top .img_box {
  margin-bottom: 20px;
  width: 100%;
  height: 70px;
  display: block;
  max-width: 100px;
  overflow: hidden;
}
.top .title {
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 24px;
  color: #252525;
}
.top .summary {
  line-height: 20px;
  position: relative;
}
.top .summary p {
  margin-bottom: 0px;
  font-size: 16px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  /* line-height: 25px; */
  -webkit-line-clamp: 3;
  /* height: 75px; */
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.see-more {
  border: 1px dashed #e9262a;
  border-radius: 30px;
  padding: 8px 13px 8px 16px;
  color: #e9262a;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  width: unset !important;
  height: unset !important;
}
.summary p {
  margin-bottom: 0px;
  font-size: 16px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  /* line-height: 25px; */
  -webkit-line-clamp: 3;
  /* height: 75px; */
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}
.bottom .count_all {
  border: 2px dashed #e9262a;
  border-radius: 50px;
  padding: 5px 40px;
  color: #e9262a;
  margin-bottom: 30px;
}
.bottom .grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 30px;
  padding-bottom: 20px;
}
.bottom .grid .item {
  position: relative;
  padding: 10px;
}
.bottom .grid .item .img_box {
  background-color: #f9f9f9;
  width: 100%;
  height: 216px;
  overflow: hidden;
  max-width: 216px;
  display: flex;
  justify-content: center;
}
.bottom .grid .item .img_box img {
  width: 100%;
  height: auto;
  object-fit: contain;
}
.bottom .grid .item .info-box .name {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin-top: 20px;
  line-height: 20px;
  text-decoration: none;
  font-weight: 700;
  height: 40px;
  color: #009fdb;
  padding: 0 10px;
}
.bottom .grid .item .info-box .price {
  margin: 15px 10px;
}
.bottom .grid .item .info-box .discount {
  position: absolute;
  top: -14px;
  right: 0px;
  border-radius: 3px;
  background-color: #e9262a;
  padding: 3px 3px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  display: table;
}
.bottom .grid .item .info-box .price .price_new {
  font-weight: 700;
  color: #e9262a;
  margin-right: 4px;
}
.bottom .grid .item .info-box .price .normal {
  text-decoration: line-through;
}
.bottom .grid .item:hover {
  background-color: #fff;
  transition: 0.4s;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translate3d(0, -2px, 0);
}
</style>
