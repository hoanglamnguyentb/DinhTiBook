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
    };
  },
  created() {
    this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
  },
  mounted() {},
  components: {
    SimpleBar,
  },

  methods: {
    async loadData(pageIndex, pageSize, params) {
      var searchParam = {
        pageIndex: pageIndex,
        pageSize: pageSize,
      };
      if (params) {
        searchParam = params;
      }
      var result = await APIService.get(`/ThongBao/GetDataPage?DaXemFilter=false`);
      this.lstThongbao = result.data.data.items;
      if (result.data.data != null && result.data.data.items != null) {
        var res = result.data.data;
        this.lstThongbao = result.data.data.items;
        this.optionPage.totalCount = res.totalCount;
      }
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

          <button
            type="button"
            class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
            id="topnav-hamburger-icon"
          >
            <span class="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          <!-- App Search-->
          <!-- <form class="app-search d-none d-md-block">
            <div class="position-relative">
              <input type="text" class="form-control" placeholder="Search..." autocomplete="off" id="search-options"
                value="" />
              <span class="mdi mdi-magnify search-widget-icon"></span>
              <span class="
                  mdi mdi-close-circle
                  search-widget-icon search-widget-icon-close
                  d-none
                " id="search-close-options"></span>
            </div>
            <div class="dropdown-menu dropdown-menu-lg" id="search-dropdown">
              <SimpleBar data-simplebar style="max-height: 320px">
                <div class="dropdown-header">
                  <h6 class="text-overflow text-muted mb-0 text-uppercase">
                    Recent Searches
                  </h6>
                </div>

                <div class="dropdown-item bg-transparent text-wrap">
                  <router-link to="/" class="btn btn-soft-secondary btn-sm btn-rounded">how to setup <i
                      class="mdi mdi-magnify ms-1"></i></router-link>
                  <router-link to="/" class="btn btn-soft-secondary btn-sm btn-rounded">buttons <i
                      class="mdi mdi-magnify ms-1"></i></router-link>
                </div>
                <div class="dropdown-header mt-2">
                  <h6 class="text-overflow text-muted mb-1 text-uppercase">
                    Pages
                  </h6>
                </div>

                <b-link href="javascript:void(0);" class="dropdown-item notify-item">
                  <i class="
                      ri-bubble-chart-line
                      align-middle
                      fs-18
                      text-muted
                      me-2
                    "></i>
                  <span>Analytics Dashboard</span>
                </b-link>

                <b-link href="javascript:void(0);" class="dropdown-item notify-item">
                  <i class="ri-lifebuoy-line align-middle fs-18 text-muted me-2"></i>
                  <span>Help Center</span>
                </b-link>

                <b-link href="javascript:void(0);" class="dropdown-item notify-item">
                  <i class="
                      ri-user-settings-line
                      align-middle
                      fs-18
                      text-muted
                      me-2
                    "></i>
                  <span>My account settings</span>
                </b-link>

                <div class="dropdown-header mt-2">
                  <h6 class="text-overflow text-muted mb-2 text-uppercase">
                    Members
                  </h6>
                </div>

                <div class="notification-list">
                  <b-link href="javascript:void(0);" class="d-flex dropdown-item notify-item py-2">
                    <img src="@/assets/images/users/avatar-2.jpg" class="me-3 rounded-circle avatar-xs"
                      alt="user-pic" />
                    <div class="flex-1">
                      <h6 class="m-0">Angela Bernier</h6>
                      <span class="fs-11 mb-0 text-muted">Manager</span>
                    </div>
                  </b-link>
                  <b-link href="javascript:void(0);" class="d-flex dropdown-item notify-item py-2">
                    <img src="@/assets/images/users/avatar-3.jpg" class="me-3 rounded-circle avatar-xs"
                      alt="user-pic" />
                    <div class="flex-1">
                      <h6 class="m-0">David Grasso</h6>
                      <span class="fs-11 mb-0 text-muted">Web Designer</span>
                    </div>
                  </b-link>
                  <b-link href="javascript:void(0);" class="d-flex dropdown-item notify-item py-2">
                    <img src="@/assets/images/users/avatar-5.jpg" class="me-3 rounded-circle avatar-xs"
                      alt="user-pic" />
                    <div class="flex-1">
                      <h6 class="m-0">Mike Bunch</h6>
                      <span class="fs-11 mb-0 text-muted">React Developer</span>
                    </div>
                  </b-link>
                </div>
              </SimpleBar>

              <div class="text-center pt-3 pb-1">
                <router-link to="/pages/search-results" class="btn btn-primary btn-sm">View All Results <i
                    class="ri-arrow-right-line ms-1"></i></router-link>
              </div>
            </div>
          </form> -->
        </div>

        <div class="d-flex align-items-center">
          <div class="dropdown d-md-none topbar-head-dropdown header-item">
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
          </div>

          <div class="dropdown topbar-head-dropdown ms-1 header-item">
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
          </div>

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

          <div class="ms-1 header-item d-none d-sm-flex">
            <b-button
              type="button"
              variant="ghost-secondary"
              class="btn-icon btn-topbar rounded-circle light-dark-mode"
              @click="toggleDarkMode"
            >
              <i class="bx bx-moon fs-22"></i>
            </b-button>
          </div>

          <div class="dropdown topbar-head-dropdown ms-1 header-item">
            <button
              type="button"
              class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              id="page-header-notifications-dropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="bx bx-bell fs-22"></i>
              <span
                class="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger"
              >
                {{ optionPage.totalCount
                }}<span class="visually-hidden">unread messages</span></span
              >
            </button>
            <div
              class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
              aria-labelledby="page-header-notifications-dropdown"
            >
              <div class="dropdown-head bg-primary bg-pattern rounded-top">
                <div class="p-3">
                  <b-row class="align-items-center">
                    <b-col>
                      <h6 class="m-0 fs-16 fw-semibold text-white">Thông báo mới</h6>
                    </b-col>
                    <b-col cols="auto" class="dropdown-tabs">
                      <b-badge variant="soft-light" class="badge-soft-light fs-13">
                        {{ lstThongbao.length }} chưa đọc</b-badge
                      >
                    </b-col>
                  </b-row>
                </div>

                <div class="px-2 pt-2">
                  <ul
                    class="nav nav-tabs dropdown-tabs nav-tabs-custom"
                    data-dropdown-tabs="true"
                    id="notificationItemsTab"
                    role="tablist"
                  >
                    <li class="nav-item">
                      <b-link
                        class="nav-link active"
                        data-bs-toggle="tab"
                        href="#all-noti-tab"
                        role="tab"
                        aria-selected="false"
                        @click.capture.stop
                      >
                        Mới ({{ optionPage.totalCount }})
                      </b-link>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="tab-content" id="notificationItemsTabContent">
                <div
                  class="tab-pane fade py-2 ps-2 show active"
                  id="all-noti-tab"
                  role="tabpanel"
                >
                  <SimpleBar data-simplebar style="max-height: 300px" class="pe-2">
                    <div class="notification-container">
                      <div
                        v-for="(item, index) of displayedThongbao"
                        :key="index"
                        class="text-reset notification-item d-block dropdown-item position-relative"
                      >
                        <div class="d-flex">
                          <div class="avatar-xs me-3">
                            <span
                              class="avatar-title bg-soft-info text-info rounded-circle fs-16"
                            >
                              <i class="bx bx-badge-check"></i>
                            </span>
                          </div>
                          <div class="flex-1">
                            <b-link v-bind:href="item.link" class="stretched-link">
                              <h6 class="mt-0 mb-2 lh-base">
                                {{ item.noiDung }}
                              </h6>
                            </b-link>
                            <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                              <span
                                ><i class="mdi mdi-clock-outline"></i>
                                {{ formatDate(item.createdDate) }}</span
                              >
                            </p>
                          </div>
                          <div class="px-2 fs-15">
                            <input class="form-check-input" type="checkbox" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--                     
                    <div class="text-reset notification-item d-block dropdown-item position-relative">
                      <div class="d-flex">
                        <div class="avatar-xs me-3">
                          <span class="avatar-title bg-soft-info text-info rounded-circle fs-16">
                            <i class="bx bx-badge-check"></i>
                          </span>
                        </div>
                        <div class="flex-1">
                          <b-link href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-2 lh-base">
                              Your <b>Elite</b> author Graphic Optimization
                              <span class="text-secondary">reward</span> is
                              ready!
                            </h6>
                          </b-link>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> Just 30 sec ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div> -->
                    <!-- -->

                    <!-- <div class="text-reset notification-item d-block dropdown-item position-relative">
                      <div class="d-flex">
                        <img src="@/assets/images/users/avatar-2.jpg" class="me-3 rounded-circle avatar-xs"
                          alt="user-pic" />
                        <div class="flex-1">
                          <b-link href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                              Angela Bernier
                            </h6>
                          </b-link>
                          <div class="fs-13 text-muted">
                            <p class="mb-1">
                              Answered to your comment on the cash flow forecast's graph 🔔.
                            </p>
                          </div>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 48 min ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="text-reset notification-item d-block dropdown-item position-relative">
                      <div class="d-flex">
                        <div class="avatar-xs me-3">
                          <span class="avatar-title bg-soft-danger text-danger rounded-circle fs-16">
                            <i class="bx bx-message-square-dots"></i>
                          </span>
                        </div>
                        <div class="flex-1">
                          <b-link href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-2 fs-13 lh-base">
                              You have received <b class="text-success">20</b> new messages in the conversation
                            </h6>
                          </b-link>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 2 hrs
                              ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="text-reset notification-item d-block dropdown-item position-relative">
                      <div class="d-flex">
                        <img src="@/assets/images/users/avatar-8.jpg" class="me-3 rounded-circle avatar-xs"
                          alt="user-pic" />
                        <div class="flex-1">
                          <b-link href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                              Maureen Gibson
                            </h6>
                          </b-link>
                          <div class="fs-13 text-muted">
                            <p class="mb-1">
                              We talked about a project on linkedin.
                            </p>
                          </div>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 4 hrs
                              ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div> -->

                    <div class="my-3 text-center">
                      <b-button
                        href="/dashboard/thongbao"
                        type="button"
                        variant="soft-success"
                      >
                        Xem tất cả các thông báo
                        <i class="ri-arrow-right-line align-middle"></i>
                      </b-button>
                    </div>
                  </SimpleBar>
                </div>

                <div
                  class="tab-pane fade py-2 ps-2"
                  id="messages-tab"
                  role="tabpanel"
                  aria-labelledby="messages-tab"
                >
                  <SimpleBar data-simplebar style="max-height: 300px" class="pe-2">
                    <div class="text-reset notification-item d-block dropdown-item">
                      <div class="d-flex">
                        <img
                          src="@/assets/images/users/avatar-3.jpg"
                          class="me-3 rounded-circle avatar-xs"
                          alt="user-pic"
                        />
                        <div class="flex-1">
                          <b-link href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-1 fs-13 fw-semibold">James Lemire</h6>
                          </b-link>
                          <div class="fs-13 text-muted">
                            <p class="mb-1">We talked about a project on linkedin.</p>
                          </div>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 30 min ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="text-reset notification-item d-block dropdown-item">
                      <div class="d-flex">
                        <img
                          src="@/assets/images/users/avatar-2.jpg"
                          class="me-3 rounded-circle avatar-xs"
                          alt="user-pic"
                        />
                        <div class="flex-1">
                          <b-link href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6>
                          </b-link>
                          <div class="fs-13 text-muted">
                            <p class="mb-1">
                              Answered to your comment on the cash flow forecast's graph
                              🔔.
                            </p>
                          </div>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="text-reset notification-item d-block dropdown-item">
                      <div class="d-flex">
                        <img
                          src="@/assets/images/users/avatar-6.jpg"
                          class="me-3 rounded-circle avatar-xs"
                          alt="user-pic"
                        />
                        <div class="flex-1">
                          <b-link href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-1 fs-13 fw-semibold">Kenneth Brown</h6>
                          </b-link>
                          <div class="fs-13 text-muted">
                            <p class="mb-1">
                              Mentionned you in his comment on 📃 invoice #12501.
                            </p>
                          </div>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 10 hrs ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="text-reset notification-item d-block dropdown-item">
                      <div class="d-flex">
                        <img
                          src="@/assets/images/users/avatar-8.jpg"
                          class="me-3 rounded-circle avatar-xs"
                          alt="user-pic"
                        />
                        <div class="flex-1">
                          <b-link href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6>
                          </b-link>
                          <div class="fs-13 text-muted">
                            <p class="mb-1">We talked about a project on linkedin.</p>
                          </div>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 3 days ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="my-3 text-center">
                      <b-button type="button" variant="soft-success">
                        View All Messages
                        <i class="ri-arrow-right-line align-middle"></i>
                      </b-button>
                    </div>
                  </SimpleBar>
                </div>

                <div
                  class="tab-pane fade p-4"
                  id="alerts-tab"
                  role="tabpanel"
                  aria-labelledby="alerts-tab"
                >
                  <div class="w-25 w-sm-50 pt-3 mx-auto">
                    <img
                      src="@/assets/images/svg/bell.svg"
                      class="img-fluid"
                      alt="user-pic"
                    />
                  </div>
                  <div class="text-center pb-5 mt-2">
                    <h6 class="fs-18 fw-semibold lh-base">
                      Hey! You have no any notifications
                    </h6>
                  </div>
                </div>
              </div>
            </div>
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
              <span class="d-flex align-items-center">
                <img
                  class="rounded-circle header-profile-user"
                  src="@/assets/images/users/avatar-1.jpg"
                  alt="Header Avatar"
                />
                <span class="text-start ms-xl-2">
                  <span class="d-none d-xl-inline-block ms-1 fw-medium user-name-text"
                    >Anna Adame</span
                  >
                  <span class="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text"
                    >Founder</span
                  >
                </span>
              </span>
            </button>
            <div class="dropdown-menu dropdown-menu-end">
              <h6 class="dropdown-header">Welcome Anna!</h6>
              <router-link class="dropdown-item" to="/dashboard/profile"
                ><i class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">Profile</span>
              </router-link>
              <div class="dropdown-divider"></div>
              <b-link class="dropdown-item" href="/logout"
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
