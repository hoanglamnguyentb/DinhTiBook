<script>
import {
  required,
  helpers
} from "@vuelidate/validators";
import appConfig from "../../../../app.config";
import useVuelidate from "@vuelidate/core";

import {
  authMethods,
  notificationMethods,
} from "@/state/helpers";

import APIService from '@/helpers/ApiService';
import router from '@/router/index'

import * as jose from 'jose'

export default {
  setup() {
    return {
      v$: useVuelidate()
    };
  },
  page: {
    title: "Đăng nhập",
    meta: [{
      name: "description",
      content: appConfig.description,
    },],
  },
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
      authSuccess : null,
      dismissSecs: 2,
      dismissCountDown: 0,
      tenHeThong: appConfig.title
    };
  },
  validations: {
    username: {
      required: helpers.withMessage("Tài khoản không được để trống", required),
    },
    password: {
      required: helpers.withMessage("Mật khẩu không được để trống", required),
    },
  },
  computed: {

  },
  methods: {
    ...authMethods,
    ...notificationMethods,
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    async submitLogin() {
      this.submitted = true;
      this.v$.$touch();
      try {
        let dataLogin = await APIService.post("user/login", {
          username: this.username,
          password: this.password,
        })

        if(dataLogin.data != null && dataLogin.data.accessToken){
          
          localStorage.setItem("user", JSON.stringify(dataLogin.data.userData));
          localStorage.setItem("accessToken", dataLogin.data.accessToken);

  
          var token = dataLogin.data.accessToken;

          const protectedHeader = jose.decodeJwt(token)

          const Role = protectedHeader["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          
          APIService.get("/AppRole/get/"+Role)
          .then(response =>{
            console.log('rolecode', response.data.data.roleCode);
            const roleCode = response.data.data.roleCode;
            if(roleCode === "ADMIN"){
              this.authError = null;
              this.dismissCountDown = this.dismissSecs

              setTimeout(() => {
                var redirectUrl = this.$route.params.redirectFrom
                if(redirectUrl){
                  router.push(redirectUrl);
                }else{
                  router.push('/dashboard');
                }
              }, 2000);
            }
            else{
              this.submitted = false;
              this.authError = "Đăng nhập thất bại. Tài khoản hoặc mật khẩu không đúng. haha";
            }
          })
          

        }
      } catch (e) {
        this.submitted = false;
        if(e.status == 401){
          this.authError = "Đăng nhập thất bại. Tài khoản hoặc mật khẩu không đúng.";
        }else {
          if(e.data && e.data.Message){
            this.authError = e.data.Message;
          }else{
            this.authError = "Đăng nhập thất bại. Vui lòng thử lại sau.";
          }
          
        }
      }
    },
  },
};
</script>

<template>
  <div class="auth-page-wrapper pt-5">
    <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
      <div class="bg-overlay"></div>

      <div class="shape">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
          <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
        </svg>
      </div>
      <Particles id="tsparticles" :options="{
        particles: {
          number: {
            value: 90,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: '#ffffff',
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000',
            },
            polygon: {
              nb_sides: 5,
            },
            image: {
              src: 'img/github.svg',
              width: 100,
              height: 100,
            },
          },
          opacity: {
            value: 0.8,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0,
              sync: false,
            },
          },
          size: {
            value: 4,
            random: true,
            anim: {
              enable: false,
              speed: 4,
              size_min: 0.2,
              sync: false,
            },
          },
          line_linked: {
            enable: false,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'bubble',
            },
            onclick: {
              enable: true,
              mode: 'repulse',
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 4,
              duration: 2,
              opacity: 0.8,
              speed: 3,
            },
            repulse: {
              distance: 200,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
        config_demo: {
          hide_card: false,
          background_color: '#b61924',
          background_image: '',
          background_position: '50% 50%',
          background_repeat: 'no-repeat',
          background_size: 'cover',
        },
      }" />
    </div>

    <div class="auth-page-content">
      <b-container>
        <b-row>
          <b-col lg="12">
            <div class="text-center mt-sm-5 mb-4 text-white-50">
              <div>
                <router-link to="/" class="d-inline-block auth-logo">
                  <img src="@/assets/images/logo_dinhti.png" alt="" height="70" />
                </router-link>
              </div>
              <!-- <p class="mt-3 fs-15 fw-medium">
                {{ tenHeThong }}
              </p> -->
            </div>
          </b-col>
        </b-row>

        <b-row class="justify-content-center">
          <b-col md="8" lg="6" xl="5">
            <b-card no-body class="mt-4">
              <b-card-body class="p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Đăng nhập</h5>
                </div>
                <div class="p-2 mt-4">
                  <b-alert 
                  v-model="dismissCountDown"
                  @dismissed="dismissCountDown=0"
                  @dismiss-count-down="countDownChanged" 
                  dismissible
                  variant="success" 
                  class="mt-3">
                    Đăng nhập thành công. Trình duyệt tự động chuyển hướng sau <b color="red">{{ dismissCountDown }}</b> giây.
                  </b-alert>
                  <b-alert v-model="authError" variant="danger" class="mt-3" dismissible>{{ authError }}</b-alert>
                  <div>
                  </div>
                  <form @submit.prevent="submitLogin">
                    <div class="mb-3">
                      <label for="username" class="form-label">Tài khoản</label>
                      <input type="text" class="form-control" id="username" placeholder="Nhập tài khoản" v-model="username" />
                      <div class="invalid-feedback">
                        <span></span>
                      </div>
                    </div>

                    <div class="mb-3">
                      <div class="float-end">
                        <router-link to="/forgot-password" class="text-muted">Quên mật khẩu?</router-link>
                      </div>
                      <label class="form-label" for="password-input">Mật khẩu</label>
                      <div class="position-relative auth-pass-inputgroup mb-3">
                        <input type="password" v-model="password" class="form-control pe-5" placeholder="Nhập mật khẩu" id="password-input" />
                        <b-button variant="link" class="position-absolute end-0 top-0 text-decoration-none text-muted"
                          type="button" id="password-addon">
                          <i class="ri-eye-fill align-middle"></i>
                        </b-button>
                        <div class="invalid-feedback">
                          <span></span>
                        </div>
                      </div>
                    </div>

                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                      <label class="form-check-label" for="auth-remember-check">Ghi nhớ đăng nhập</label>
                    </div>

                    <div class="mt-4">
                      <b-button variant="success" class="w-100" type="submit" :disable="submitted">
                        <span v-if="submitted"><b-spinner small></b-spinner>
                          Đang xử lý...
                        </span>
                        <span v-if="!submitted">Đăng nhập</span>
                      </b-button>
                    </div>
                  </form>
                </div>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <footer class="footer">
      <b-container>
        <b-row>
          <b-col lg="12">
            <div class="text-center">
              <p class="mb-0 text-muted">
                &copy; {{ new Date().getFullYear() }} {{ tenHeThong }}
              </p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>