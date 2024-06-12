<script>
import { SimpleBar } from "simplebar-vue3";
import APIService from "@/helpers/ApiService";
/**
 * Nav-bar Component
 */
export default {
  data() {
    return {
      text: null,
      flag: null,
      value: null,
      myVar: 1,
      lstThongbao: [],
      optionPage: {
        pageIndex: 1,
        pageSize: 3,
        totalCount: 0,
      },
      UserProfile:{},
      idUser:'',
      name: 'Nguyen Van Anh', // Thay thế bằng tên bạn muốn sử dụng
      UserName: '',
      isUserProfileLoaded: false
    };
  },
  created() {
    // this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
    this.getUserProfile();

  },
 
  components: {
    SimpleBar,
  },
  watch: {
    // Theo dõi sự thay đổi của UserProfile
    UserProfile: {
      handler(newVal) {
        console.log('UserProfile đã thay đổi:', newVal);
        // Thực hiện các hành động tương ứng khi UserProfile thay đổi
      },
      deep: true // Theo dõi sâu (nếu UserProfile là một đối tượng hoặc một mảng)
    }
  },
  methods: {
    async getUserProfile(){
      const id = localStorage.getItem('user')
      try{
        const res = await APIService.get("User/" + id)
        console.log(res)
        this.UserProfile = res.data.data
        console.log('pôp',this.UserProfile)
        this.isUserProfileLoaded = true; // Cập nhật biến khi UserProfile đã được tải
      }
      catch(e ){
        console.log(e)
      }    
    },

    DangXuat() {
      console.log('dang xuaats');
      localStorage.removeItem('accessTokenClient');
      localStorage.removeItem('user');
      // router.push('/admin/login');

      window.location.reload();
    },
    getInitial(name) {
      if (this.isUserProfileLoaded && name) {
        console.log('okokok', name)
        return name.charAt(0).toUpperCase();
      } else {
        return ''; // hoặc giá trị mặc định khác nếu cần
      }

      // console.log('okokok', name)
      // return name.charAt(0).toUpperCase();
    },

    getBackgroundColor(name) {
      // Bạn có thể tùy chỉnh mã màu này để tạo màu ngẫu nhiên hoặc theo một quy tắc nhất định
      console.log('okokok1', name)
      const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
      const charCode = name.charCodeAt(0);
      const colorIndex = charCode % colors.length;
      return colors[colorIndex];
    },
    isCustomDropdown() {
      //Search bar
      var searchOptions = document.getElementById("search-close-options");
      var dropdown = document.getElementById("search-dropdown");
      // var searchInput = document.getElementById("search-options");

      // searchInput.addEventListener("focus", () => {
      //   var inputLength = searchInput.value.length;
      //   if (inputLength > 0) {
      //     dropdown.classList.add("show");
      //     searchOptions.classList.remove("d-none");
      //   } else {
      //     dropdown.classList.remove("show");
      //     searchOptions.classList.add("d-none");
      //   }
      // });

      // searchInput.addEventListener("keyup", () => {
      //   var inputLength = searchInput.value.length;
      //   if (inputLength > 0) {
      //     dropdown.classList.add("show");
      //     searchOptions.classList.remove("d-none");
      //   } else {
      //     dropdown.classList.remove("show");
      //     searchOptions.classList.add("d-none");
      //   }
      // });

      // searchOptions.addEventListener("click", () => {
      //   searchInput.value = "";
      //   dropdown.classList.remove("show");
      //   searchOptions.classList.add("d-none");
      // });

      // document.body.addEventListener("click", (e) => {
      //   if (e.target.getAttribute("id") !== "search-options") {
      //     dropdown.classList.remove("show");
      //     searchOptions.classList.add("d-none");
      //   }
      // });
    },
    formatDate(dateStr) {
      return (
        dateStr.slice(11, 16) +
        " ngày " +
        dateStr.slice(8, 10) +
        "-" +
        dateStr.slice(5, 7) +
        "-" +
        dateStr.slice(0, 4)
      );
    },
    toggleHamburgerMenu() {
      var windowSize = document.documentElement.clientWidth;

      if (windowSize > 767)
        document.querySelector(".hamburger-icon").classList.toggle("open");

      //For collapse horizontal menu
      if (document.documentElement.getAttribute("data-layout") === "horizontal") {
        document.body.classList.contains("menu")
          ? document.body.classList.remove("menu")
          : document.body.classList.add("menu");
      }

      //For collapse vertical menu
      if (document.documentElement.getAttribute("data-layout") === "vertical") {
        if (windowSize < 1025 && windowSize > 767) {
          document.body.classList.remove("vertical-sidebar-enable");
          document.documentElement.getAttribute("data-sidebar-size") == "sm"
            ? document.documentElement.setAttribute("data-sidebar-size", "")
            : document.documentElement.setAttribute("data-sidebar-size", "sm");
        } else if (windowSize > 1025) {
          document.body.classList.remove("vertical-sidebar-enable");
          document.documentElement.getAttribute("data-sidebar-size") == "lg"
            ? document.documentElement.setAttribute("data-sidebar-size", "sm")
            : document.documentElement.setAttribute("data-sidebar-size", "lg");
        } else if (windowSize <= 767) {
          document.body.classList.add("vertical-sidebar-enable");
          document.documentElement.setAttribute("data-sidebar-size", "lg");
        }
      }

      //Two column menu
      if (document.documentElement.getAttribute("data-layout") == "twocolumn") {
        document.body.classList.contains("twocolumn-panel")
          ? document.body.classList.remove("twocolumn-panel")
          : document.body.classList.add("twocolumn-panel");
      }
    },
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    setLanguage(locale, country, flag) {
      this.lan = locale;
      this.text = country;
      this.flag = flag;
      document.getElementById("header-lang-img").setAttribute("src", flag);
      i18n.global.locale = locale;
    },
    toggleDarkMode() {
      if (document.documentElement.getAttribute("data-layout-mode") == "dark") {
        document.documentElement.setAttribute("data-layout-mode", "light");
      } else {
        document.documentElement.setAttribute("data-layout-mode", "dark");
      }
    },
    initTopbarComponents() {
      function updateCartPrice() {
        var currencySign = "$";
        var subtotal = 0;
        Array.from(document.getElementsByClassName("cart-item-price")).forEach(function (
          e
        ) {
          subtotal += parseFloat(e.innerHTML);
        });
        if (document.getElementById("cart-item-total")) {
          document.getElementById("cart-item-total").innerHTML =
            currencySign + subtotal.toFixed(2);
        }
      }
      if (document.getElementsByClassName("dropdown-item-cart")) {
        var dropdownItemCart = document.querySelectorAll(".dropdown-item-cart").length;
        Array.from(
          document.querySelectorAll("#page-topbar .dropdown-menu-cart .remove-item-btn")
        ).forEach(function (item) {
          item.addEventListener("click", function () {
            dropdownItemCart--;
            this.closest(".dropdown-item-cart").remove();
            Array.from(document.getElementsByClassName("cartitem-badge")).forEach(
              function (e) {
                e.innerHTML = dropdownItemCart;
              }
            );
            updateCartPrice();
            if (document.getElementById("empty-cart")) {
              document.getElementById("empty-cart").style.display =
                dropdownItemCart == 0 ? "block" : "none";
            }
            if (document.getElementById("checkout-elem")) {
              document.getElementById("checkout-elem").style.display =
                dropdownItemCart == 0 ? "none" : "block";
            }
          });
        });
        Array.from(document.getElementsByClassName("cartitem-badge")).forEach(function (
          e
        ) {
          e.innerHTML = dropdownItemCart;
        });
        if (document.getElementById("empty-cart")) {
          document.getElementById("empty-cart").style.display = "none";
        }
        if (document.getElementById("checkout-elem")) {
          document.getElementById("checkout-elem").style.display = "block";
        }
        updateCartPrice();
      }

      // notification messages
      if (document.getElementsByClassName("notification-check")) {
        Array.from(document.querySelectorAll(".notification-check input")).forEach(
          function (element) {
            element.addEventListener("click", function (el) {
              el.target.closest(".notification-item").classList.toggle("active");
            });
          }
        );
      }
    },
  },
  computed: {
    displayedThongbao() {
      return this.lstThongbao.slice(0, 3); // Return the first 3 items
    },
    userProfileInitial() {
      if (this.UserProfile) {
        console.log('hehehe',this.UserProfile.fullName )
        return this.getInitial(this.UserProfile.fullName);

      } else {
        return '';
      }
    }
  },
  mounted() {
    
    
    document.addEventListener("scroll", function () {
      var pageTopbar = document.getElementById("page-topbar");
      if (pageTopbar) {
        document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50
          ? pageTopbar.classList.add("topbar-shadow")
          : pageTopbar.classList.remove("topbar-shadow");
      }
    });
    if (document.getElementById("topnav-hamburger-icon"))
      document
        .getElementById("topnav-hamburger-icon")
        .addEventListener("click", this.toggleHamburgerMenu);

    this.isCustomDropdown();
    this.initTopbarComponents();
  },
};
</script>

<template>
  <header id="page-topbar">
    <div class="layout-width">
      <div class="navbar-header">
        <div class="d-flex">
          <!-- LOGO -->
          <div class="navbar-brand-box horizontal-logo">
            <router-link to="/" class="logo logo-dark">
              <span class="logo-sm">
                <img src="@/assets/images/logo-sm.png" alt="" height="22" />
              </span>
              <span class="logo-lg">
                <img src="@/assets/images/logo-dark.png" alt="" height="17" />
              </span>
            </router-link>

            <router-link to="/" class="logo logo-light">
              <span class="logo-sm">
                <img src="@/assets/images/logo-sm.png" alt="" height="22" />
              </span>
              <span class="logo-lg">
                <img src="@/assets/images/logo-light.png" alt="" height="17" />
              </span>
            </router-link>
          </div>

         
        </div>

        <div class="d-flex align-items-center">
          <!-- <div class="dropdown d-md-none topbar-head-dropdown header-item">
            <button
              type="button"
              class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              id="page-header-search-dropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="bx bx-search fs-22"></i>
            </button>
            <div
              class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
              aria-labelledby="page-header-search-dropdown"
            >
              <form class="p-3">
                <div class="form-group m-0">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search ..."
                      aria-label="Recipient's username"
                    />
                    <b-button variant="primary" type="submit">
                      <i class="mdi mdi-magnify"></i>
                    </b-button>
                  </div>
                </div>
              </form>
            </div>
          </div> -->

          <!-- <div class="dropdown topbar-head-dropdown ms-1 header-item">
            <button
              type="button"
              class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="bx bx-category-alt fs-22"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
              <div
                class="p-3 border-top-0 border-start-0 border-end-0 border-dashed border"
              >
                <b-row class="align-items-center">
                  <b-col>
                    <h6 class="m-0 fw-semibold fs-15">Web Apps</h6>
                  </b-col>
                  <b-col cols="auto">
                    <b-link href="#!" class="btn btn-sm btn-soft-info">
                      View All Apps
                      <i class="ri-arrow-right-s-line align-middle"></i>
                    </b-link>
                  </b-col>
                </b-row>
              </div>

              <div class="p-2">
                <b-row class="g-0">
                  <b-col>
                    <b-link class="dropdown-icon-item" href="#!">
                      <img src="@/assets/images/brands/github.png" alt="Github" />
                      <span>GitHub</span>
                    </b-link>
                  </b-col>
                  <b-col>
                    <b-link class="dropdown-icon-item" href="#!">
                      <img src="@/assets/images/brands/bitbucket.png" alt="bitbucket" />
                      <span>Bitbucket</span>
                    </b-link>
                  </b-col>
                  <b-col>
                    <b-link class="dropdown-icon-item" href="#!">
                      <img src="@/assets/images/brands/dribbble.png" alt="dribbble" />
                      <span>Dribbble</span>
                    </b-link>
                  </b-col>
                </b-row>

                <b-row class="g-0">
                  <b-col>
                    <b-link class="dropdown-icon-item" href="#!">
                      <img src="@/assets/images/brands/dropbox.png" alt="dropbox" />
                      <span>Dropbox</span>
                    </b-link>
                  </b-col>
                  <b-col>
                    <b-link class="dropdown-icon-item" href="#!">
                      <img src="@/assets/images/brands/mail_chimp.png" alt="mail_chimp" />
                      <span>Mail Chimp</span>
                    </b-link>
                  </b-col>
                  <b-col>
                    <b-link class="dropdown-icon-item" href="#!">
                      <img src="@/assets/images/brands/slack.png" alt="slack" />
                      <span>Slack</span>
                    </b-link>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div> -->

          <div class="ms-1 header-item d-none d-sm-flex">
            <b-button
              type="button"
              variant="ghost-secondary"
              class="btn-icon btn-topbar rounded-circle"
              data-toggle="fullscreen"
              @click="initFullScreen"
            >
              <i class="bx bx-fullscreen fs-22"></i>
            </b-button>
          </div>

         
          

          <div class="dropdown ms-sm-3 header-item topbar-user">
            <button
              type="button"
              class="btn"
              id="page-header-user-dropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div v-if="UserProfile">
                <span class="d-flex align-items-center">
                
                <!-- <div class="avatar" :style="{ backgroundColor: getBackgroundColor(UserProfile.fullName) }">   -->
                  <div class="avatar" style="background-color: #f56a00;">
                  <!-- {{ getInitial(UserProfile.fullName) }} -->
                  {{ userProfileInitial }}
                </div>
                <span class="text-start ms-xl-2">
                  <span class="d-none d-xl-inline-block ms-1 fw-medium user-name-text"
                    >{{ UserProfile.fullName }}</span
                  >
                  
                </span>
              </span>
              </div>
              
            </button>
            <div class="dropdown-menu dropdown-menu-end">
              <h6 class="dropdown-header">Welcome {{ UserProfile.fullName }}</h6>
              <router-link class="dropdown-item" to="/dashboard/profile"
                ><i class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">Profile</span>
              </router-link>
              <div class="dropdown-divider"></div>
              <b-link class="dropdown-item" @click="DangXuat"
                ><i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle" data-key="t-logout">Đăng xuất</span>
              </b-link>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped>


.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  margin-right: 10px;
  text-transform: uppercase; /* Đảm bảo chữ cái đầu tiên luôn là chữ in hoa */
}
</style>