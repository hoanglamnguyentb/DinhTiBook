<template>
  <Header></Header>
  <div style="background-color: white; padding-top: 70px;">
    <div class="container">
      <h1 class="h1_title"><span >{{ TenTheLoai }}</span></h1>
      <div class="grid-list">
        <div v-for="(item, index) in lstTinTuc" :key="index" class="item">
          <a :href="`/tin-tuc/chi-tiet/`+ item.id" class="">
            <img :src="URL + item.hinhAnh"  class="img-responsive">
          </a>
          <div class="news-content">
            <p class="created-time">
              <i class="ri-calendar-line"></i>
              {{ formatDate(item.ngayTao) }}
            </p>
            <a :href="`/tin-tuc/chi-tiet/`+ item.id" class="a_title">
              {{ item.tieuDe }}                    
            </a>
            <p class="describe"></p>
            
            <a class="see-more" :href="`/tin-tuc/`+ item.id" v-if="index !== 2 && index !== 1 && index !== 3">Xem thêm </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterClient></FooterClient>
</template>

<script>
import APIService from "@/helpers/ApiService";
import Common from "@/helpers/Common";
import Header from '@/components/Header';
import FooterClient from '@/components/FooterClient.vue';
export default {
  components:{
    Header,
    FooterClient
  },
  data(){
    return{
      lstTinTuc:[],
      pages: [],
      optionPage: {
        pageIndex: 1,
        pageSize: 20,
        totalCount: 0,
      },
      URL: 'http://localhost:44301/',
      Type:[
        {
          id: "TINTUC",
          value: "TIN TỨC"
        },
        {
          id: "LAMCHAME",
          value: "LÀM CHA MẸ"
        },
        {
          id: "TIENICH",
          value: "TIỆN ÍCH"
        },
        {
          id: "REVIEW",
          value: "REVIEW SÁCH"
        },
      ],
      TenTheLoai: ""
    }
  },
  methods:{
    formatDate: Common.formatDate,
    type() {
      var paramType = this.$route.params.type;
      const type = this.Type.find(x => x.id === paramType);
      if (type) {
        this.TenTheLoai = type.value;
      } else {
        this.TenTheLoai = "";
      }
      
    },
    async loadData(pageIndex, pageSize) {
      var paramType = this.$route.params.type;
      var searchParam = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        TypeFilter: paramType
      };
      

      var urlQuery = new URLSearchParams(searchParam).toString();
      var result = await APIService.get("/TinTuc?" + urlQuery);
      if (result.data.data != null && result.data.data.items != null) {
        var res = result.data.data;
        this.lstTinTuc = result.data.data.items;
        this.optionPage.pageIndex = res.pageIndex;
        this.optionPage.pageSize = res.pageSize;
        this.optionPage.totalCount = res.totalCount;

        console.log(this.lstTinTuc)
      }
    },
  },
  mounted(){
    this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
    this.type();

  }
}
</script>

<style>
.h1_title span {
    border: 2px dashed #e9262a;
    border-radius: 50px;
    font-size: 24px;
    text-transform: uppercase;
    padding: 16px 40px;
    color: #e9262a;
}
.h1_title {
    margin: 0px;
    text-align: center;
}
.grid-list {
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0 40px;
    padding-top: 55px;
}
.grid-list .item:nth-child(1) {
    -ms-grid-row: 1;
    grid-row-start: 1;
    grid-row-end: 5;
    -ms-grid-column: 1;
    grid-column-start: 1;
    grid-column-end: 1;
    padding-top: 0;
    border: none;
    display: block;
}

.grid-list .item {
    padding: 20px 0 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: start;
    -ms-grid-column: 1;
    grid-column-start: 1;
    grid-column-end: 3;
}
.grid-list .item:nth-child(1) a {
    width: 100%;
    height: auto;
    max-width: 580px;
    max-height: 326px;
    overflow: hidden;
}
.grid-list .item img {
    height: auto;
    width: 100%;
    -o-object-fit: cover;
    object-fit: cover;
}
.grid-list .item:nth-child(1) a img {
    width: 100%;
    height: 326px;
    -o-object-fit: cover;
    object-fit: cover;
}
.grid-list .item:nth-child(1) .news-content {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 35px;
}
.grid-list .item .news-content {
    padding-left: 20px;
    padding-right: 10px;
    border-bottom: 1px solid #f2f2f2;
    border-top: 1px solid #f2f2f2;
    border-right: 1px solid #f2f2f2;
    width: 100%;
}
.grid-list .item .created-time {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    line-height: normal;
    margin-top: 20px;
    margin-bottom: 20px;
    color: #777777;
}
.grid-list .item:nth-child(1) .a_title {
    font-size: 18px;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
.grid-list .item .a_title {
    font-size: 16px;
    color: #252525;
    margin-bottom: 15px;
    display: inline-block;
    text-decoration: none;
    font-weight: 700;
}
.grid-list .item:nth-child(1) .describe {
    margin-bottom: 40px;
    -webkit-line-clamp: 3;
}

.grid-list .item .describe {
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-height: 19px;
}
.grid-list .item:nth-child(1) a {
    width: 100%;
    height: auto;
    max-width: 580px;
    max-height: 326px;
    overflow: hidden;
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

.grid-list .item:nth-child(2), .grid-list .item:nth-child(3), .grid-list .item:nth-child(4) {
    -ms-grid-column: 2;
    grid-column-start: 2;
    grid-column-end: 2;
    border-top: 1px solid #DDDDDD;
    padding: 29px 0px 29px;
}
.grid-list .item:nth-child(2) a, .grid-list .item:nth-child(3) a, .grid-list .item:nth-child(4) a {
    width: 100%;
    height: auto;
    max-width: 270px;
    max-height: 152px;
    overflow: hidden;
    display: block;
}
.grid-list .item:nth-child(2) a img, .grid-list .item:nth-child(3) a img, .grid-list .item:nth-child(4) a img {
    width: 100%;
    height: auto;
    -o-object-fit: cover;
    object-fit: cover;
}
.grid-list .item:nth-child(2) .news-content, .grid-list .item:nth-child(3) .news-content, .grid-list .item:nth-child(4) .news-content {
    height: 152px;
    width: 100%;
}
.grid-list .item:nth-child(2) .news-content .a_title, .grid-list .item:nth-child(3) .news-content .a_title, .grid-list .item:nth-child(4) .news-content .a_title {
    line-height: 20px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

.grid-list .item:nth-child(2) a, .grid-list .item:nth-child(3) a, .grid-list .item:nth-child(4) a {
    width: 100%;
    height: auto;
    max-width: 270px;
    max-height: 152px;
    overflow: hidden;
    display: block;
}
.grid-list .item:nth-child(5) a, .grid-list .item:nth-child(6) a, .grid-list .item:nth-child(7) a, .grid-list .item:nth-child(8) a, .grid-list .item:nth-child(9) a {
    width: 100%;
    height: auto;
    max-width: 370px;
    max-height: 208px;
    overflow: hidden;
}
.grid-list .item:nth-child(5) a img, .grid-list .item:nth-child(6) a img, .grid-list .item:nth-child(7) a img, .grid-list .item:nth-child(8) a img, .grid-list .item:nth-child(9) a img {
    width: 100%;
    height: auto;
    -o-object-fit: cover;
    object-fit: cover;
}
.grid-list .item:nth-child(5) .news-content, .grid-list .item:nth-child(6) .news-content, .grid-list .item:nth-child(7) .news-content, .grid-list .item:nth-child(8) .news-content, .grid-list .item:nth-child(9) .news-content {
    height: 208px;
}
.grid-list .item .news-content {
    padding-left: 20px;
    padding-right: 10px;
    border-bottom: 1px solid #f2f2f2;
    border-top: 1px solid #f2f2f2;
    border-right: 1px solid #f2f2f2;
    width: 100%;
}
.grid-list .item:nth-child(5) .a_title, .grid-list .item:nth-child(6) .a_title, .grid-list .item:nth-child(7) .a_title, .grid-list .item:nth-child(8) .a_title, .grid-list .item:nth-child(9) .a_title {
    line-height: 20px;
    margin-bottom: 15px;
    width: 100%;
    max-width: 100%;
}
.grid-list .item:nth-child(5) a, .grid-list .item:nth-child(6) a, .grid-list .item:nth-child(7) a, .grid-list .item:nth-child(8) a, .grid-list .item:nth-child(9) a {
    width: 100%;
    height: auto;
    max-width: 370px;
    max-height: 208px;
    overflow: hidden;
}
.grid-list .item:nth-child(5) .see-more, .grid-list .item:nth-child(6) .see-more, .grid-list .item:nth-child(7) .see-more, .grid-list .item:nth-child(8) .see-more, .grid-list .item:nth-child(9) .see-more {
    color: #e9262a;
    text-transform: uppercase;
}
.grid-list .item:nth-child(5) a, .grid-list .item:nth-child(6) a, .grid-list .item:nth-child(7) a, .grid-list .item:nth-child(8) a, .grid-list .item:nth-child(9) a {
    width: 100%;
    height: auto;
    max-width: 370px;
    max-height: 208px;
    overflow: hidden;
}
</style>