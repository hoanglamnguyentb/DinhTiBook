<template>
  <div id="main">
    <div
      class="container vh-100 d-flex align-items-center justify-content-center"
    >
      <div class="form-login">
        <div class="left">
          <div class="top-left">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="30"
                cy="30"
                r="29.5"
                fill="white"
                stroke="#252525"
                stroke-dasharray="3 3"
              ></circle>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.3125 40C15.3125 35.3401 19.0901 31.5625 23.75 31.5625H36.25C40.9099 31.5625 44.6875 35.3401 44.6875 40V42.5C44.6875 43.7081 43.7081 44.6875 42.5 44.6875H17.5C16.2919 44.6875 15.3125 43.7081 15.3125 42.5V40ZM23.75 33.4375C20.1256 33.4375 17.1875 36.3756 17.1875 40V42.5C17.1875 42.6726 17.3274 42.8125 17.5 42.8125H42.5C42.6726 42.8125 42.8125 42.6726 42.8125 42.5V40C42.8125 36.3756 39.8744 33.4375 36.25 33.4375H23.75Z"
                fill="#252525"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M29.375 17.1875C26.0958 17.1875 23.4375 19.8458 23.4375 23.125C23.4375 26.4042 26.0958 29.0625 29.375 29.0625C32.6543 29.0625 35.3125 26.4042 35.3125 23.125C35.3125 19.8458 32.6543 17.1875 29.375 17.1875ZM21.5625 23.125C21.5625 18.8103 25.0603 15.3125 29.375 15.3125C33.6897 15.3125 37.1875 18.8103 37.1875 23.125C37.1875 27.4397 33.6897 30.9375 29.375 30.9375C25.0603 30.9375 21.5625 27.4397 21.5625 23.125Z"
                fill="#252525"
              ></path>
            </svg>
            <div class="text">
              <p class="title-text">Đăng nhập</p>
              <p class="summary-text">
                Bạn chưa có tài khoản?
                <a href="dang-ky.html">
                  <span class="register">Đăng ký </span>
                </a>
              </p>
            </div>
          </div>

          <ul class="nav-tabs" id="myTab">
            <li data-id="profile-0" class="active">
              <a href="#profile-0">Thành viên</a>
            </li>
          </ul>

          <div class="tab-content">
            <div class="tab-pane active" id="profile-0">
              <form
                class="info"
                action="#"
                method="post"
                id="signin-form-dealer"
              >
                <b-alert
                  v-model="authError"
                  variant="danger"
                  class="mt-3"
                  dismissible
                  >{{ authError }}</b-alert
                >
                <div class="password">
                  <div class="form-group2">
                    <input
                      type="text"
                      name="account"
                      v-model="TaiKhoan"
                      id="account"
                      class="form-control"
                      placeholder="Nhập email hoặc số điện thoại"
                    />
                  </div>
                  <div class="form-group2">
                    <input
                      type="password"
                      name="pass"
                      v-model="MatKhau"
                      id="pass"
                      class="form-control"
                      placeholder="Mật khẩu *"
                    />
                  </div>
                </div>
                <div class="clearfix"></div>
                <div class="function2">
                  <div class="">
                    <input
                      type="checkbox"
                      name="remember-me"
                      id="remember-me"
                      value="3"
                    />
                    <label for="remember-me">Lưu mật khẩu</label>
                  </div>
                  <a
                    href="index2818.html?module=members&amp;view=forgot"
                    class="forgot_pass"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.75 12.1875C8.75 12.3633 8.61328 12.5 8.4375 12.5H6.5625C6.38672 12.5 6.25 12.3633 6.25 12.1875V10.3125C6.25 10.1367 6.38672 10 6.5625 10H8.4375C8.61328 10 8.75 10.1367 8.75 10.3125V12.1875ZM11.25 5.625C11.25 7.10938 10.2344 7.67578 9.49219 8.0957C9.0332 8.35938 8.75 8.83789 8.75 9.0625C8.75 9.23828 8.61328 9.375 8.4375 9.375H6.5625C6.38672 9.375 6.25 9.23828 6.25 9.0625V8.71094C6.25 7.76367 7.19727 6.95313 7.89062 6.64063C8.48633 6.36719 8.75 6.11328 8.75 5.60547C8.75 5.17578 8.17383 4.77539 7.54883 4.77539C7.19727 4.77539 6.875 4.89258 6.70898 5.00977C6.52344 5.14648 6.32812 5.32227 5.86914 5.9082C5.81055 5.98633 5.71289 6.02539 5.625 6.02539C5.55664 6.02539 5.48828 6.00586 5.43945 5.9668L4.15039 4.99023C4.02344 4.89258 3.98437 4.7168 4.07227 4.58008C4.91211 3.18359 6.10352 2.5 7.69531 2.5C9.375 2.5 11.25 3.83789 11.25 5.625ZM15 7.5C15 3.35938 11.6406 0 7.5 0C3.35937 0 0 3.35938 0 7.5C0 11.6406 3.35937 15 7.5 15C11.6406 15 15 11.6406 15 7.5Z"
                        fill="#252525"
                      ></path>
                    </svg>

                    Quên mật khẩu?</a
                  >
                </div>
                <div class="btnsubmit">
                  <a-button
                    style="height: 50px"
                    size="large"
                    @click="Login"
                    id="signin-btn"
                  >
                    Đăng nhập
                  </a-button>
                </div>

                <input type="hidden" name="module" value="members" />
                <input type="hidden" name="view" value="signin" />
                <input type="hidden" name="task" value="do_login" />
                <input type="hidden" name="rurl" value="index.html" />
              </form>
            </div>
          </div>
        </div>
        <div class="right">
          <p class="title-login ps-5 fw-bold text-center">
            Quyền lợi và chính sách dành cho Đại lý
          </p>
          <hr />
          <p class="summary text-center">
            Bạn muốn kinh doanh sách của Đinh Tị Books, chúng tôi sẽ đồng hành
            với bạn.
          </p>
          <p class="icon-text text-center">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.03121 9.84374C6.96952 9.8441 6.90837 9.83228 6.85126 9.80895C6.79415 9.78562 6.7422 9.75125 6.6984 9.70781L4.8234 7.83281C4.73513 7.74454 4.68555 7.62482 4.68555 7.49999C4.68555 7.37517 4.73513 7.25545 4.8234 7.16718C4.91167 7.07892 5.03139 7.02933 5.15621 7.02933C5.28104 7.02933 5.40076 7.07892 5.48903 7.16718L7.03121 8.71406L9.97965 5.76093C10.0679 5.67267 10.1876 5.62308 10.3125 5.62308C10.4373 5.62308 10.557 5.67267 10.6453 5.76093C10.7335 5.8492 10.7831 5.96892 10.7831 6.09375C10.7831 6.21857 10.7335 6.33829 10.6453 6.42656L7.36403 9.70781C7.32023 9.75125 7.26828 9.78562 7.21117 9.80895C7.15406 9.83228 7.09291 9.8441 7.03121 9.84374Z"
                fill="#E9262A"
              ></path>
              <path
                d="M7.5 13.5938C6.29477 13.5938 5.11661 13.2364 4.1145 12.5668C3.11238 11.8972 2.33133 10.9455 1.87011 9.83198C1.40889 8.71849 1.28821 7.49324 1.52334 6.31117C1.75847 5.1291 2.33884 4.0433 3.19107 3.19107C4.0433 2.33884 5.1291 1.75847 6.31117 1.52334C7.49324 1.28821 8.71849 1.40889 9.83198 1.87011C10.9455 2.33133 11.8972 3.11238 12.5668 4.1145C13.2364 5.11661 13.5938 6.29477 13.5938 7.5C13.5938 9.11617 12.9517 10.6661 11.8089 11.8089C10.6661 12.9517 9.11617 13.5938 7.5 13.5938ZM7.5 2.34375C6.48019 2.34375 5.48328 2.64616 4.63534 3.21274C3.7874 3.77931 3.12651 4.58461 2.73625 5.52679C2.34598 6.46897 2.24387 7.50572 2.44283 8.50594C2.64178 9.50615 3.13287 10.4249 3.85398 11.146C4.5751 11.8671 5.49385 12.3582 6.49407 12.5572C7.49428 12.7561 8.53103 12.654 9.47321 12.2638C10.4154 11.8735 11.2207 11.2126 11.7873 10.3647C12.3538 9.51672 12.6563 8.51981 12.6563 7.5C12.6563 6.13248 12.113 4.82097 11.146 3.85398C10.179 2.887 8.86753 2.34375 7.5 2.34375Z"
                fill="#E9262A"
              ></path>
            </svg>

            Sách dễ bán nhất
          </p>
          <p class="icon-text text-center">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.03121 9.84374C6.96952 9.8441 6.90837 9.83228 6.85126 9.80895C6.79415 9.78562 6.7422 9.75125 6.6984 9.70781L4.8234 7.83281C4.73513 7.74454 4.68555 7.62482 4.68555 7.49999C4.68555 7.37517 4.73513 7.25545 4.8234 7.16718C4.91167 7.07892 5.03139 7.02933 5.15621 7.02933C5.28104 7.02933 5.40076 7.07892 5.48903 7.16718L7.03121 8.71406L9.97965 5.76093C10.0679 5.67267 10.1876 5.62308 10.3125 5.62308C10.4373 5.62308 10.557 5.67267 10.6453 5.76093C10.7335 5.8492 10.7831 5.96892 10.7831 6.09375C10.7831 6.21857 10.7335 6.33829 10.6453 6.42656L7.36403 9.70781C7.32023 9.75125 7.26828 9.78562 7.21117 9.80895C7.15406 9.83228 7.09291 9.8441 7.03121 9.84374Z"
                fill="#E9262A"
              ></path>
              <path
                d="M7.5 13.5938C6.29477 13.5938 5.11661 13.2364 4.1145 12.5668C3.11238 11.8972 2.33133 10.9455 1.87011 9.83198C1.40889 8.71849 1.28821 7.49324 1.52334 6.31117C1.75847 5.1291 2.33884 4.0433 3.19107 3.19107C4.0433 2.33884 5.1291 1.75847 6.31117 1.52334C7.49324 1.28821 8.71849 1.40889 9.83198 1.87011C10.9455 2.33133 11.8972 3.11238 12.5668 4.1145C13.2364 5.11661 13.5938 6.29477 13.5938 7.5C13.5938 9.11617 12.9517 10.6661 11.8089 11.8089C10.6661 12.9517 9.11617 13.5938 7.5 13.5938ZM7.5 2.34375C6.48019 2.34375 5.48328 2.64616 4.63534 3.21274C3.7874 3.77931 3.12651 4.58461 2.73625 5.52679C2.34598 6.46897 2.24387 7.50572 2.44283 8.50594C2.64178 9.50615 3.13287 10.4249 3.85398 11.146C4.5751 11.8671 5.49385 12.3582 6.49407 12.5572C7.49428 12.7561 8.53103 12.654 9.47321 12.2638C10.4154 11.8735 11.2207 11.2126 11.7873 10.3647C12.3538 9.51672 12.6563 8.51981 12.6563 7.5C12.6563 6.13248 12.113 4.82097 11.146 3.85398C10.179 2.887 8.86753 2.34375 7.5 2.34375Z"
                fill="#E9262A"
              ></path>
            </svg>

            Lợi nhuận cao nhất
          </p>
          <p class="icon-text text-center">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.03121 9.84374C6.96952 9.8441 6.90837 9.83228 6.85126 9.80895C6.79415 9.78562 6.7422 9.75125 6.6984 9.70781L4.8234 7.83281C4.73513 7.74454 4.68555 7.62482 4.68555 7.49999C4.68555 7.37517 4.73513 7.25545 4.8234 7.16718C4.91167 7.07892 5.03139 7.02933 5.15621 7.02933C5.28104 7.02933 5.40076 7.07892 5.48903 7.16718L7.03121 8.71406L9.97965 5.76093C10.0679 5.67267 10.1876 5.62308 10.3125 5.62308C10.4373 5.62308 10.557 5.67267 10.6453 5.76093C10.7335 5.8492 10.7831 5.96892 10.7831 6.09375C10.7831 6.21857 10.7335 6.33829 10.6453 6.42656L7.36403 9.70781C7.32023 9.75125 7.26828 9.78562 7.21117 9.80895C7.15406 9.83228 7.09291 9.8441 7.03121 9.84374Z"
                fill="#E9262A"
              ></path>
              <path
                d="M7.5 13.5938C6.29477 13.5938 5.11661 13.2364 4.1145 12.5668C3.11238 11.8972 2.33133 10.9455 1.87011 9.83198C1.40889 8.71849 1.28821 7.49324 1.52334 6.31117C1.75847 5.1291 2.33884 4.0433 3.19107 3.19107C4.0433 2.33884 5.1291 1.75847 6.31117 1.52334C7.49324 1.28821 8.71849 1.40889 9.83198 1.87011C10.9455 2.33133 11.8972 3.11238 12.5668 4.1145C13.2364 5.11661 13.5938 6.29477 13.5938 7.5C13.5938 9.11617 12.9517 10.6661 11.8089 11.8089C10.6661 12.9517 9.11617 13.5938 7.5 13.5938ZM7.5 2.34375C6.48019 2.34375 5.48328 2.64616 4.63534 3.21274C3.7874 3.77931 3.12651 4.58461 2.73625 5.52679C2.34598 6.46897 2.24387 7.50572 2.44283 8.50594C2.64178 9.50615 3.13287 10.4249 3.85398 11.146C4.5751 11.8671 5.49385 12.3582 6.49407 12.5572C7.49428 12.7561 8.53103 12.654 9.47321 12.2638C10.4154 11.8735 11.2207 11.2126 11.7873 10.3647C12.3538 9.51672 12.6563 8.51981 12.6563 7.5C12.6563 6.13248 12.113 4.82097 11.146 3.85398C10.179 2.887 8.86753 2.34375 7.5 2.34375Z"
                fill="#E9262A"
              ></path>
            </svg>

            Phục vụ nhanh nhất
          </p>
          <p class="last-text text-center">
            Chúng tôi nỗ lực hết mình mang lại những sản phẩm tốt nhất cho cộng
            đồng. Hãy đồng hành với chúng tôi nhằm lan tỏa văn hóa đọc và nâng
            tầm trí tuệ Việt Nam.
          </p>
          <div class="text-center">
            <a href="gioi-thieu-dang-ky-moi.html">Tìm hiểu và đăng ký</a>
          </div>
          <div class="img-right">
            <img src="../../assets/banner/banner-dangnhap.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import APIService from '@/helpers/ApiService';
import router from '@/router/index';
import * as jose from 'jose';
export default {
  data() {
    return {
      authError: null,
      TaiKhoan: '',
      MatKhau: '',
    };
  },
  methods: {
    async Login() {
      try {
        if (!this.TaiKhoan || !this.TaiKhoan) {
          alert('Vui lòng điền đầy đủ thông tin.');
          return;
        }

        let dataLogin = await APIService.post('user/login', {
          username: this.TaiKhoan,
          password: this.MatKhau,
        });

        if (dataLogin.data != null && dataLogin.data.accessToken) {
          localStorage.setItem(
            'userClient',
            JSON.stringify(dataLogin.data.userData)
          );
          localStorage.setItem('accessTokenClient', dataLogin.data.accessToken);

          var token = dataLogin.data.accessToken;

          const protectedHeader = jose.decodeJwt(token);

          const Role =
            protectedHeader[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ];

          await APIService.get('/AppRole/get/' + Role).then((response) => {
            console.log('rolecode', response.data.data.roleCode);
            const roleCode = response.data.data.roleCode;
            if (roleCode === 'CLIENT') {
              this.authError = null;

              alert('Thành công.');
              router.push('/');
            } else {
              alert('Thatas bai.');
              this.submitted = false;
              this.authError =
                'Đăng nhập thất bại. Tài khoản hoặc mật khẩu không đúng. haha';
            }
          });
        }
      } catch (e) {
        this.submitted = false;
        if (e.status == 401) {
          this.authError =
            'Đăng nhập thất bại. Tài khoản hoặc mật khẩu không đúng.';
        } else {
          if (e.data && e.data.Message) {
            this.authError = e.data.Message;
          } else {
            this.authError = 'Đăng nhập thất bại. Vui lòng thử lại sau.';
          }
        }
      }
    },
  },
};
</script>

<style scoped>
#main .form-login {
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.16);
  border-radius: 30px;
  grid-template-columns: 40% 60%;
  display: grid;
  margin: auto;
}
#main .form-login .left {
  padding: 40px 30px 40px;
}
#main .form-login .left .top-left {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 30px;
}
#main .form-login .left .top-left .text {
  margin-left: 20px;
}
#main .form-login .left .top-left .text .title-text {
  font-size: 18px;
  line-height: 22px;
  font-weight: 700;
  color: #252525;
  text-transform: uppercase;
  margin-bottom: 6px;
}
#main .form-login .left .top-left .text .summary-text {
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  color: #252525;
  margin: 0;
}
#main .form-login .left .top-left .text .summary-text span {
  color: #e9262a;
  margin-left: 5px;
}
#main .form-login .left .nav-tabs {
  display: flex;
  -webkit-box-pack: space-evenly;
  -ms-flex-pack: space-evenly;
  justify-content: space-evenly;
  list-style-type: none;
  padding: 0px;
  margin-bottom: 0px;
}
.nav-tabs {
  border-bottom: 1px solid #dee2e6;
}
#main .form-login .left .nav-tabs li {
  padding: 7px 30px;
}
#main .form-login .left .nav-tabs li a {
  color: #252525;
  font-size: 18px;
  line-height: 22px;
  font-weight: 700;
}
#main .form-login .left .nav-tabs .active {
  border-bottom: 3px solid #e9262a;
}
.tab-content > .active {
  display: block;
}
.info {
  margin-top: 25px;
}
.form-group2 {
  position: relative;
  margin-bottom: 20px;
}
.info .password input {
  margin-bottom: 10px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #dddddd;
  color: #252525;
  font-size: 15px;
}
.form-group2 {
  position: relative;
  margin-bottom: 20px;
}
.info .btnsubmit {
  background: #e9262a;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 4px;
  display: table;
  margin: 0 auto;
  margin-top: 20px !important;
}
.info .btnsubmit #signin-btn {
  background: none;
  display: block;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 80px;
  width: auto;
  text-align: center;
  margin-bottom: 0px;
}
#main .form-login .right {
  background: #f6deb9;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  padding-top: 40px;
}
</style>
