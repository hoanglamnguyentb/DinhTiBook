<template>
<Header></Header>
  <div style="background-color: white;" id="main">
    <div
    style="padding-top: 80px; padding-bottom: 80px;"
      class="container d-flex align-items-center justify-content-center"
    >
      <div class="form-login">
        <div style="background-color: white;" class="left">
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
              <p class="title-text">Đăng ký thành viên</p>
              <p class="summary-text">
                Bạn đã có tài khoản?
                <a href="/dang-nhap">
                  <span class="register">Đăng nhập </span>
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
              <!-- <form
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
                  >{{ DangKy.authError }}</b-alert
                >
                <div class="password">
                  <div class="form-group2">
                    <input
                      type="text"
                      name="account"
                      v-model="DangKy.FullName"
                      id="account"
                      class="form-control"
                      placeholder="Nhập họ và tên"
                    />
                    
                  </div>
                  <div class="form-group2">
                    <input
                      type="text"
                      name="account"
                      v-model="DangKy.TaiKhoan"
                      id="account"
                      class="form-control"
                      placeholder="Nhập tài khoản"
                    />
                  </div>
                  <div class="form-group2">
                    <input
                      type="password"
                      name="account"
                      v-model="DangKy.MatKhau"
                      id="account"
                      class="form-control"
                      placeholder="Nhập mật khẩu"
                    />
                  </div>
                  <div class="form-group2">
                    <input
                      type="password"
                      name="account"
                      v-model="DangKy.NhapLaiMatKhau"
                      id="account"
                      class="form-control"
                      placeholder="Nhập lại mật khẩu"
                    />
                  </div>
                  <div class="form-group2">
                    <input
                      type="text"
                      name="pass"
                      v-model="DangKy.SoDienThoai"
                      id="pass"
                      class="form-control"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div class="form-group2">
                    <input
                      type="text"
                      name="pass"
                      v-model="DangKy.Email"
                      id="pass"
                      class="form-control"
                      placeholder="Nhập email"
                    />
                  </div>
                </div>
                <div class="clearfix"></div>
        
                <div  class="btnsubmit">
                  <a-button
                    style="height: 50px;"
                    size="large"
                    @click="Register"
                    id="signin-btn"
                  >
                    Đăng ký
                  </a-button>
                </div>

                <input type="hidden" name="module" value="members" />
                <input type="hidden" name="view" value="signin" />
                <input type="hidden" name="task" value="do_login" />
                <input type="hidden" name="rurl" value="index.html" />
              </form> -->
              <a-form 
              class="info"
              :model="DangKy"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
              ref="formRef"
              >
              <a-form-item
                name="FullName"
                :rules="[{ required: true, message: 'Họ và tên không được để trống!' }]"
                >
                  <label for="" style="font-size: 16px;">Họ và tên</label>
                  <a-input v-model:value="DangKy.FullName" size="large" placeholder="Nhập họ tên"/>
                </a-form-item>

                <a-form-item
                name="TaiKhoan"
                :rules="[{ required: true, message: 'Tài khoản không được để trống!' }]"
                >
                  <label for="" style="font-size: 16px;">Tài Khoản</label>
                  <a-input v-model:value="DangKy.TaiKhoan" size="large" placeholder="Nhập tài khoản"/>
                </a-form-item>

                <a-form-item
                name="MatKhau"
                :rules="[{ required: true, message: 'Mật khẩu không được để trống!' }]"
                >
                  <label for="" style="font-size: 16px;">Mật khẩu</label>
                  <a-input-password v-model:value="DangKy.MatKhau" size="large" placeholder="Nhập mật khẩu"/>
                </a-form-item>

                <a-form-item
                name="NhapLaiMatKhau"
                :rules="[{ required: true, message: 'Nhập lại mật khẩu không được để trống!' }]"
                >
                  <label for="" style="font-size: 16px;">Nhập lại Mật khẩu</label>
                  <a-input-password v-model:value="DangKy.NhapLaiMatKhau" size="large" placeholder="Nhập lại mật khẩu"/>
                </a-form-item>

                <a-form-item
                name="SoDienThoai"
                :rules="[{ required: true, message: 'Số điện thoại không được để trống!' }]"
                >
                  <label for="" style="font-size: 16px;">Nhập số điện thoại</label>
                  <a-input v-model:value="DangKy.SoDienThoai" size="large" placeholder="Nhập số điện thoại"/>
                </a-form-item>

                <a-form-item
                name="Email"
                 :rules="[{ required: true, message: 'Email không được để trống!' }]"
                >
                  <label for="" style="font-size: 16px;">Nhập email</label>
                  <a-input v-model:value="DangKy.Email" size="large" placeholder="Nhập Email"/>
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
                  <a-button  size="large" style="background-color: red; color: white;" html-type="submit">  Đăng ký</a-button>
                </a-form-item>
              </a-form>
              
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
<FooterClient></FooterClient>
</template>

<script>
import Header from '@/components/Header';
import FooterClient from '@/components/FooterClient.vue';
import APIService from '@/helpers/ApiService';
import { Modal } from 'ant-design-vue';

export default {
  components:{
    Header,
    FooterClient
  },
  data() {
    return {
      DangKy:[
        {
          authError: null,
          TaiKhoan: '',
          MatKhau: '',
          NhapLaiMatKhau: '',
          FullName: '',
          Email: '',
          SoDienThoai:''
        }
        
      ],
      newId:'',
      
    };
  },
  methods: {
 
  async Register(){
      
      const info={
        username : this.DangKy.TaiKhoan,
        password : this.DangKy.MatKhau,
        email : this.DangKy.Email,
        fullName: this.DangKy.FullName,
        phoneNumber: this.DangKy.SoDienThoai
      }
      try{
        await APIService.post("User/register", info)
        .then(response =>{
          this.DangKy.authError = null
          console.log(response.data.data.id)
          this.newId = response.data.data.id
          toast.success("Đăng ký thành viên thành công", {
            theme: "colored",
            autoClose: 2000,
          });
        })
        .catch(e=>{
          console.log('loidangky', e.response.data.errors)
          if(e.response.data.errors == 'FullName'){
            this.DangKy.authError = e.response.data.errors.FullName;
          }
        })
      }catch(e){
          
        this.submitted = false;
        this.isLoading = false;
        if (e.response && e.response.status === 400 && e.response.data.errors) {
          const { errors } = e.response.data;
          // Xử lý lỗi cụ thể
          
          if (errors.noiBat) {
            toast.error(errors.noiBat[0], {
              theme: "colored",
              autoClose: 2000,
            });
          }
          if (errors.tintuc) {
            toast.error(errors.tintuc[0], {
              theme: "colored",
              autoClose: 2000,
            });
          }
        } else {
          console.error('Lỗi không xác định:', e);
          toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.", {
            theme: "colored",
            autoClose: 2000,
          });
        }
      }
    },
    countDown() {
      let secondsToGo = 5;
      const modal = Modal.success({
        title: 'Tạo tài khoản thành công!',
        content: `Chuyển sang trang đăng nhập sau ${secondsToGo} giây.`,
        onOk: () => {
          this.$router.push('/dang-nhap');
        }
      });
      const interval = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: `Chuyển sang trang đăng nhập chủ sau ${secondsToGo} giây.`,
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        modal.destroy();
        this.$router.push('/dang-nhap');
      }, secondsToGo * 1000);
    },
    async onFinish () {
      this.$refs.formRef.validate().then(async () => {
        const info={
          username : this.DangKy.TaiKhoan,
          password : this.DangKy.MatKhau,
          email : this.DangKy.Email,
          fullName: this.DangKy.FullName,
          phoneNumber: this.DangKy.SoDienThoai
        }
        if (this.DangKy.MatKhau != this.DangKy.NhapLaiMatKhau) {
          this.$message.error("Mật khẩu nhập lại không trùng khớp!");
          this.DangKy =''
        } 
       
        else{
          await APIService.post("User/registerForClient", info)
        .then(response =>{
          console.log('sadas', response)
          console.log(response.data.data.id)
          this.newId = response.data.data.id
          this.AddRole(this.newId);
        })
        .catch(e=>{
          // if(e.response.data.errors == 'FullName'){
          //   this.DangKy.authError = e.response.data.errors.FullName;
          // }
          this.$message.error(e.response.data.message)
        })
        }
        
     
      });
    },
    AddRole(id){
      const data = {
        userId : id,
        roleId : 'cba1a1b9-48f4-4704-0526-08dc6ea08003'
      }
      APIService.post("AppUserRole/create", data)
      .then(response =>{
          console.log(response)
       
          
          this.countDown()
        })
        .catch(e=>{
          console.log('loidangky', e)
          
        })
    }
  },
  
};
</script>

<style scoped>
#main .form-login {
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.16);
  border-radius: 30px;
  grid-template-columns: 50% 50%;
  display: grid;
  margin: auto;
}
#main .form-login .left {
  padding: 40px 30px 40px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
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
.label_error {
    color: red;
    margin-bottom: 10px;
    text-align: start;
}
</style>
