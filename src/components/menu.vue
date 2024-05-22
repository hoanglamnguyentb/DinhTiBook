<template>
  <b-container fluid>
    <div id="two-column-menu"></div>

    <template v-if="layoutType === 'twocolumn'">
      <SimpleBar class="navbar-nav" id="navbar-nav">
        <li class="nav-item">
          <b-link class="nav-link menu-link" href="#QLTINTUC" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="QLTINTUC">
            <i class="ri-dashboard-2-line"></i>
            <span data-key="t-dashboards"> Quản lý tin tức</span>
          </b-link>
          <div class="collapse menu-dropdown" id="QLTINTUC">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/dashboard/tin-tuc" class="nav-link custom-abc">
                  Danh sách tin
                </router-link>
              </li>
            </ul>
          </div>
          
          <b-link class="nav-link menu-link" href="#QLTINH" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="QLTINH">
            <i class="ri-dashboard-2-line"></i>
            <span data-key="t-dashboards"> Quản lý </span>
          </b-link>
          <div class="collapse menu-dropdown" id="QLTINH">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/dashboard/tin-tuc" class="nav-link custom-abc">
                  Danh sách tỉnh
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </SimpleBar>
    </template>

    <template v-else>
      <!-- <ul class="navbar-nav h-100" id="navbar-nav">
        <li class="nav-item" v-for="chucNang in lstChucNang" :key="chucNang.id">
          <b-link class="nav-link menu-link" :href="'#' + chucNang.maChucNang" data-bs-toggle="collapse" role="button"
            aria-expanded="false" :aria-controls="chucNang.maChucNang">
            <i class="ri-dashboard-2-line"></i>
            <span> {{ chucNang.tenChucNang }}</span>
          </b-link>
          <div class="collapse menu-dropdown" :id="chucNang.maChucNang" >
            <ul class="nav nav-sm flex-column">
              <li class="nav-item" v-for="thaoTac in chucNang.thaoTacs" :key="thaoTac.id">
                <router-link :to="thaoTac.duongDan" class="nav-link custom-abc">
                  {{ thaoTac.tenThaoTac }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul> -->

      <SimpleBar class="navbar-nav" id="navbar-nav">
        <li class="nav-item">
          <b-link class="nav-link menu-link" href="#QLTINTUC" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="QLTINTUC">
            <i class="ri-dashboard-2-line"></i>
            <span data-key="t-dashboards"> Quản lý tin tức</span>
          </b-link>
          <div class="collapse menu-dropdown" id="QLTINTUC">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/dashboard/tin-tuc" class="nav-link custom-abc">
                  Danh sách tin
                </router-link>
              </li>
            </ul>
          </div>
          
          <b-link class="nav-link menu-link" href="#QLTINH" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="QLTINH">
            <i class="ri-dashboard-2-line"></i>
            <span data-key="t-dashboards"> Quản lý </span>
          </b-link>
          <div class="collapse menu-dropdown" id="QLTINH">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/dashboard/tin-tuc" class="nav-link custom-abc">
                  Danh sách tỉnh
                </router-link>
              </li>
            </ul>
          </div>

<!-- nhà xuất bản -->
          <b-link class="nav-link menu-link" href="#QLNXB" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="QLNXB">
            <i class="ri-dashboard-2-line"></i>
            <span data-key="t-dashboards"> Quản lý nhà xuất bản</span>
          </b-link>
          <div class="collapse menu-dropdown" id="QLNXB">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/dashboard/QL_NhaXuatBan" class="nav-link custom-abc">
                  Danh sách nhà xuất bản
                </router-link>
              </li>
            </ul>
          </div>

<!-- sản phẩm -->
          <b-link class="nav-link menu-link" href="#QLSP" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="QLSP">
            <i class="ri-dashboard-2-line"></i>
            <span data-key="t-dashboards"> Quản lý sản phẩm</span>
          </b-link>
          <div class="collapse menu-dropdown" id="QLSP">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/dashboard/QL_SanPham" class="nav-link custom-abc">
                  Danh sách sản phẩm
                </router-link>
              </li>
            </ul>
          </div>


          <b-link class="nav-link menu-link" href="#QLFILE" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="QLFILE">
            <i class="ri-dashboard-2-line"></i>
            <span data-key="t-dashboards"> Quản lý file</span>
          </b-link>
          <div class="collapse menu-dropdown" id="QLFILE">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/dashboard/fileupload" class="nav-link custom-abc">
                  File
                </router-link>
              </li>
            </ul>
          </div>
<!-- nhóm độ tuổi -->
          <b-link class="nav-link menu-link" href="#QLNDT" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="QLSP">
            <i class="ri-dashboard-2-line"></i>
            <span data-key="t-dashboards"> Quản lý nhóm độ tuổi</span>
          </b-link>
          <div class="collapse menu-dropdown" id="QLNDT">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/dashboard/nhom-do-tuoi" class="nav-link custom-abc">
                  Danh sách nhóm độ tuổi
                </router-link>
              </li>
            </ul>
          </div>
<!-- DAnh mục -->
          <b-link class="nav-link menu-link" href="#DM" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="DM">
            <i class="ri-dashboard-2-line"></i>
            <span data-key="t-dashboards"> Quản lý danh mục</span>
          </b-link>
          <div class="collapse menu-dropdown" id="DM">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/dashboard/danh-muc" class="nav-link custom-abc">
                  Danh sách danh mục
                </router-link>
              </li>
            </ul>
          </div>

<!-- DAnh mục tin tức-->
          <b-link class="nav-link menu-link" href="#DMTT" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="DM">
            <i class="ri-dashboard-2-line"></i>
            <span data-key="t-dashboards"> Quản lý danh mục tin tức</span>
          </b-link>
          <div class="collapse menu-dropdown" id="DMTT">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/dashboard/QL_ChuyenMucTinTuc/ChuyenMucTinTuc" class="nav-link custom-abc">
                  Danh sách danh mục tin tức
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </SimpleBar>

    </template>
  </b-container>
</template>
<script>
import {
  layoutComputed
} from "@/state/helpers";
import {
  SimpleBar
} from "simplebar-vue3";
import APIService from "@/helpers/ApiService"

export default {
  components: {
    SimpleBar
  },
  created() {
    this.getListChucNang(1,-1)
  },
  data() {
    return {
      settings: {
        minScrollbarLength: 60,
        pageIndex: 1,
        pageSize: -1,
      },
      lstChucNang: []
    };
  },
  computed: {
    ...layoutComputed,
    layoutType: {
      get() {
        return this.$store ? this.$store.state.layout.layoutType : {} || {};
      },
    },
  },

  watch: {
    $route: {
      handler: "onRoutechange",
      immediate: true,
      deep: true,
    },
  },

  mounted() {
    if (document.querySelectorAll(".navbar-nav .collapse")) {
      let collapses = document.querySelectorAll(".navbar-nav .collapse");

      collapses.forEach((collapse) => {
        // Hide sibling collapses on `show.bs.collapse`
        collapse.addEventListener("show.bs.collapse", (e) => {
          e.stopPropagation();
          let closestCollapse = collapse.parentElement.closest(".collapse");
          if (closestCollapse) {
            let siblingCollapses =
              closestCollapse.querySelectorAll(".collapse");
            siblingCollapses.forEach((siblingCollapse) => {
              if (siblingCollapse.classList.contains("show")) {
                siblingCollapse.classList.remove("show");
              }
            });
          } else {
            let getSiblings = (elem) => {
              // Setup siblings array and get the first sibling
              let siblings = [];
              let sibling = elem.parentNode.firstChild;
              // Loop through each sibling and push to the array
              while (sibling) {
                if (sibling.nodeType === 1 && sibling !== elem) {
                  siblings.push(sibling);
                }
                sibling = sibling.nextSibling;
              }
              return siblings;
            };
            let siblings = getSiblings(collapse.parentElement);
            siblings.forEach((item) => {
              if (item.childNodes.length > 2)
                item.firstElementChild.setAttribute("aria-expanded", "false");
              let ids = item.querySelectorAll("*[id]");
              ids.forEach((item1) => {
                item1.classList.remove("show");
                if (item1.childNodes.length > 2) {
                  let val = item1.querySelectorAll("ul li a");

                  val.forEach((subitem) => {
                    if (subitem.hasAttribute("aria-expanded"))
                      subitem.setAttribute("aria-expanded", "false");
                  });
                }
              });
            });
          }
        });

        // Hide nested collapses on `hide.bs.collapse`
        collapse.addEventListener("hide.bs.collapse", (e) => {
          e.stopPropagation();
          let childCollapses = collapse.querySelectorAll(".collapse");
          childCollapses.forEach((childCollapse) => {
            let childCollapseInstance = childCollapse;
            childCollapseInstance.style.display = "none";
          });
        });
      });
    }
  },

  methods: {
    onRoutechange(ele) {
      this.initActiveMenu(ele.path);
      if (document.getElementsByClassName("mm-active").length > 0) {
        const currentPosition = document.getElementsByClassName("mm-active")[0].offsetTop;
        if (currentPosition > 500)
          if (this.$refs.isSimplebar)
            this.$refs.isSimplebar.value.getScrollElement().scrollTop = currentPosition + 300;
      }
    },

    initActiveMenu(ele) {
      setTimeout(() => {
        if (document.querySelector("#navbar-nav")) {
          let a = document.querySelector("#navbar-nav").querySelector('[href="' + ele + '"]');
          if (a) {
            a.classList.add("active");
            let parentCollapseDiv = a.closest(".collapse.menu-dropdown");
            if (parentCollapseDiv) {
              parentCollapseDiv.classList.add("show");
              parentCollapseDiv.parentElement.children[0].classList.add("active");
              parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
              if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
                parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
                if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
                  parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
                const grandparent = parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.parentElement.closest(".collapse");
                if (grandparent && grandparent && grandparent.previousElementSibling) {
                  grandparent.previousElementSibling.classList.add("active");
                  grandparent.classList.add("show");
                }
              }
            }
          }
        }
      }, 0);
    },
    async getListChucNang(pageIndex,pageSize){
      var searchParam = {
        pageIndex: pageIndex,
        pageSize: pageSize,
      };
      var urlQuery = new URLSearchParams(searchParam).toString();
      var res = (await APIService.get(
        `/ChucNang/GetListChucNang?` + urlQuery
      )).data;
      this.lstChucNang = res.data.items
    }
  },
};
</script>
