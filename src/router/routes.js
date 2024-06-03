import store from '@/state/store';
export default [
  {
    path: '/admin/login',
    name: 'login',
    component: () => import('../views/dashboard/account/login.vue'),
    meta: {
      title: 'Đăng nhập',
      beforeResolve(routeTo, routeFrom, next) {
        if (store.getters['auth/loggedIn']) {
          next({ name: 'default' });
        } else {
          next();
        }
      },
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/dashboard/account/register.vue'),
    meta: {
      title: 'Register',
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'default' });
        } else {
          // Continue to the login page
          next();
        }
      },
    },
  },
  {
    path: '/forgot-password',
    name: 'Forgot password',
    component: () => import('../views/dashboard/account/forgot-password.vue'),
    meta: {
      title: 'Forgot Password',
      beforeResolve(routeTo, routeFrom, next) {
        if (store.getters['auth/loggedIn']) {
          next({ name: 'default' });
        } else {
          next();
        }
      },
    },
  },

  //Client
  {
    path: '/tin-tuc/:id',
    name: 'ChiTietTinTucClient',
    meta: {
      title: 'Đinh Tị Books',
      authRequired: false,
    },
    component: () => import('@/views/client/ChiTietTinTuc'),
  },
  {
    path: '/tin-tuc',
    name: 'TinTucClient',
    meta: {
      title: 'Đinh Tị Books',
      authRequired: false,
    },
    component: () => import('@/views/client/TinTuc'),
  },
  {
    path: '/tat-ca-san-pham',
    name: 'TatCaSanPham',
    meta: {
      title: 'Đinh Tị Books',
      authRequired: false,
    },
    component: () => import('@/views/client/TrangChu/TatCaSanPham'),
  },
  {
    path: '/nhom-do-tuoi/:id',
    name: 'NhomDoTuoiSanPham',
    meta: {
      title: 'Đinh Tị Books',
      authRequired: false,
    },
    component: () => import('@/views/client/TrangChu/NhomDoTuoiSanPham'),
  },
  {
    path: '/danh-muc/:id',
    name: 'DanhMucSanPham',
    meta: {
      title: 'Đinh Tị Books',
      authRequired: false,
    },
    component: () => import('@/views/client/TrangChu/DanhMucSanPham'),
  },
  {
    path: '/tim-kiem/:filter?',
    name: 'TimKiem',
    meta: {
      title: 'Đinh Tị Books',
      authRequired: false,
    },
    component: () => import('@/views/client/TimKiem'),
  },
  //Detai san pham

  {
    path: '/sach/:id',
    name: 'DetailSanPham',
    meta: {
      title: 'Chi tiết sản phẩm',
      authRequired: false,
    },
    component: () => import('@/views/client/DetailSanPham'),
  },
  //Dang nhap
  {
    path: '/dang-nhap',
    name: 'DangNhap',
    meta: {
      title: 'Đăng nhập',
      authRequired: false,
    },
    component: () => import('@/views/client/DangNhap'),
  },

  //giỏ hàng
  {
    path: '/gio-hang',
    name: 'Giohang',
    meta: {
      title: 'Giỏ hàng',
      authRequired: false,
    },
    component: () => import('@/views/client/GioHang'),
  },

  {
    path: '/',
    name: 'TrangChu',
    meta: {
      title: 'Trang chủ',
      authRequired: false, // Thêm thuộc tính authRequired nếu cần thiết
    },
    component: () => import('../views/client/TrangChu/HomeView'),
  },
  {
    path: '/test',
    name: 'Test',
    meta: {
      title: 'Trang test',
      authRequired: false, // Thêm thuộc tính authRequired nếu cần thiết
    },
    component: () => import('../views/client/TrangChu/test'),
  },
  {
    path: '/thanh-toan',
    name: 'ThanhToan',
    meta: {
      title: 'Thanh toán',
      authRequired: false, // Thêm thuộc tính authRequired nếu cần thiết
    },
    component: () => import('../views/client/ThanhToan'),
  },

  //Admin

  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      title: 'Dashboard',
      authRequired: true,
    },
    component: () => import('@/layouts/main'),
    children: [
      {
        path: '/dashboard',
        name: 'default',
        meta: {
          title: 'Dashboard',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/index'),
      },

      {
        path: '/dashboard/chucNang',
        name: 'QL_ChucNang',
        meta: {
          title: 'Quản lý chức năng',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_ChucNang/ChucNang'),
      },
      {
        path: '/dashboard/chucNang/:chucNangId',
        name: 'QL_ThaoTac',
        meta: {
          title: 'Quản lý thao tác',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_ChucNang/QuanLiThaotac'),
      },
      {
        path: '/dashboard/tin-tuc',
        name: 'QL_TinTuc',
        meta: {
          title: 'Quản lý tin tức',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_TinTuc/index'),
      },
      {
        path: '/dashboard/tin-tuc/import',
        name: 'Import_TinTuc',
        meta: { title: 'Import tin tức', authRequired: true },
        component: () => import('../views/dashboard/QL_TinTuc/Import'),
      },
      // {
      //   path: "/dashboard/tin-tuc/create",
      //   name: "QL_TinTuc_Add",
      //   meta: {
      //     title: "Thêm mới tin tức",
      //     authRequired: true,
      //   },
      //   component: () => import("../views/dashboard/QL_TinTuc/CreateTinTuc"),
      // },
      {
        path: '/dashboard/tin-tuc/edit/:id',
        name: 'QL_TinTuc_Edit',
        meta: {
          title: 'Chỉnh sửa tin tức',
          authRequired: true,
        },
        component: () => import('../views/dashboard/QL_TinTuc/EditTinTuc'),
      },
      {
        path: '/dashboard/tin-tuc/detail/:id',
        name: 'QL_TinTuc_Detail',
        meta: {
          title: 'Thông tin bài viết',
          authRequired: true,
        },
        component: () => import('../views/dashboard/QL_TinTuc/Detail'),
      },
      {
        path: '/dashboard/van-ban/index',
        name: 'QL_VanBan_index',
        meta: {
          title: 'Quản lí văn bản',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_VanBan/index'),
      },
      {
        path: '/dashboard/van-ban/Create',
        name: 'QL_VanBan_Create',
        meta: {
          title: 'thêm mới văn bản',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_VanBan/CreateVanBan'),
      },
      {
        path: '/dashboard/van-ban/Detail/:id',
        name: 'QL_VanBan_Detail',
        meta: {
          title: 'Chi tiết văn bản',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_VanBan/Detail'),
      },
      // {
      //   path: '/dashboard/van-ban/Edit/:id',
      //   name: 'QL_VanBan_Edit',
      //   meta: {
      //     title: "Chỉnh sửa văn bản",
      //     authRequired: true,
      //   },
      //   component: () => import('@/views/dashboard/QL_VanBan/Edit')
      // },

      {
        path: '/dashboard/tinh',
        name: 'QL_Tinh',
        meta: {
          title: 'Quản lý hệ thống',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_Tinh/index'),
      },
      {
        path: '/dashboard/huyen',
        name: 'QL_Huyen',
        meta: {
          title: 'Quản lý huyện',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_Huyen/Huyen'),
      },

      // {
      //   path: "/dashboard/QL_MayChu",
      //   name: "QL_MayChu",
      //   meta: {
      //     title: "Quản lý Máy Chủ",
      //     authRequired: true
      //   },
      //   component: () => import("@/views/dashboard/QL_MayChu/MayChu"),
      // },
      {
        path: '/dashboard/thongbao',
        name: 'QL_ThongBao',
        meta: {
          title: 'Quản lý thông báo',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_ThongBao/index'),
      },
      {
        path: '/dashboard/nhatky',
        name: 'QL_NhatKy',
        meta: {
          title: 'Quản lý nhật ký tài khoản',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_NhatKy/NhatKy'),
      },
      {
        path: '/dashboard/hoidap',
        name: 'QL_HoiDap',
        meta: {
          title: 'Quản lý hỏi đáp',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_HoiDapGopY/HoiDapGopY'),
      },
      {
        path: '/dashboard/huyen/import',
        name: 'Import_Huyen',
        meta: {
          title: 'Import Huyện',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_Huyen/ModalImportHuyen'),
      },
      {
        path: '/dashboard/thon/:id',
        name: 'QL_Thon',
        meta: {
          title: 'Quản lý thôn',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_Thon/Thon'),
      },
      {
        path: '/dashboard/xa/:id',
        name: 'QL_Xa',
        meta: {
          title: 'Quản lý xã',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_Xa/Xa'),
      },
      {
        path: '/dashboard/QL_DanhMuc',
        name: 'QL_DanhMuc',
        meta: {
          title: 'Quản lý danh mục',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_DanhMuc/DanhMuc.vue'),
      },
      {
        path: '/dashboard/QL_DanhMuc',
        name: 'Import_DanhMuc',
        meta: {
          title: 'Import danh mục dùng chung',
          authRequired: true,
        },
        component: () =>
          import('@/views/dashboard/QL_DanhMuc/ModalImportDanhMuc.vue'),
      },
      {
        path: '/dashboard/QL_ThongTinDanhMuc/:maDM?',
        name: 'QL_ThongTinDanhMuc',
        meta: {
          title: 'Quản lý thông tin danh mục',
          authRequired: true,
        },
        component: () =>
          import('@/views/dashboard/QL_ThongTinDanhMuc/ThongTinDanhMuc.vue'),
      },
      {
        path: '/dashboard/QL_ThongTinDanhMuc',
        name: 'Import_ThongTinDanhMuc',
        meta: {
          title: 'Import Thông tin danh mục',
          authRequired: true,
        },
        component: () =>
          import('@/views/dashboard/QL_ThongTinDanhMuc/ModalImportTTDM.vue'),
      },
      // {
      //   path: '/dashboard/tinh/create',
      //   name: 'QL_Tinh_Add',
      //   meta: {
      //     title: "",
      //     authRequired: true,
      //   },
      //   component: () => import('../views/dashboard/QL_Tinh/AddEditTinh.vue')
      // },
      // QL User
      {
        path: '/users',
        name: 'QL_User',
        meta: {
          title: 'Quản lý thành viên',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_User/index'),
      },
      {
        path: '/dashboard/profile',
        name: 'account',
        meta: {
          title: 'Quản lý tài khoản',
          authRequired: true,
        },
        component: () => import('../views/dashboard/account/profile'),
      },
      {
        path: '/dashboard/QL_ChuyenMucTinTuc/ChuyenMucTinTuc',
        name: 'QL_ChuyenMucTinTuc',
        meta: {
          title: 'Quản lý chuyên mục tin tức',
          authRequired: true,
        },
        component: () =>
          import('@/views/dashboard/QL_ChuyenMucTinTuc/ChuyenMucTinTuc'),
      },
      {
        path: '/dashboard/QL_TinTuc/Create',
        name: 'QL_Create',
        meta: {
          title: 'Quản lý chuyên mục tin tức',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_TinTuc/Create'),
      },

      {
        path: '/dashboard/QL_HoGiaDinh',
        name: 'QL_HoGiaDinh',
        meta: {
          title: 'Quản lý hộ nghèo/cận nghèo',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_HoGiaDinh/HoGiaDinh.vue'),
      },
      {
        path: '/dashboard/QL_NhaXuatBan',
        name: 'QL_NXB',
        meta: {
          title: 'Quản lý nhà xuất bản',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_NXB/index'),
      },
      {
        path: '/dashboard/QL_SanPham/Create',
        name: 'Add_SanPham',
        meta: {
          title: 'Thêm sản phẩm',
          authRequired: true,
        },
        component: () =>
          import('@/views/dashboard/QL_SanPham/AddAndEditSanPham'),
      },
      {
        path: '/dashboard/QL_SanPham/Edit/:id',
        name: 'Edit_SanPham',
        meta: {
          title: 'Sửa sản phẩm',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_SanPham/EditSanPham'),
      },
      {
        path: '/dashboard/QL_SanPham',
        name: 'QL_SanPham',
        meta: {
          title: 'Quản lý sản phẩm',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_SanPham/SanPham'),
      },

      {
        path: '/dashboard/fileupload',
        name: 'QL_file',
        meta: {
          title: 'Quản lý sản phẩm',
          authRequired: true,
        },
        component: () => import('@/components/FileManager/FileManager'),
      },

      {
        path: '/dashboard/fileupload1',
        name: 'QL_file1',
        meta: {
          title: 'Quản lý sản phẩm',
          authRequired: true,
        },
        component: () => import('@/components/FileManager/File_Manager'),
      },
      {
        path: '/dashboard/danh-muc',
        name: 'QL_DanhMuc',
        meta: {
          title: 'Quản lý Danh mục',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_DanhMucSach/DanhMucSach'),
      },
      {
        path: '/dashboard/nhom-do-tuoi',
        name: 'QL_NhomDoTuoi',
        meta: {
          title: 'Quản lý nhóm độ tuổi',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_NhomDoTuoi/NhomDoTuoi'),
      },
      {
        path: '/dashboard/san-pham/:id',
        name: 'QL_DetailSanPham',
        meta: {
          title: 'Chi tiết sản phẩm',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_SanPham/DetailSanPham'),
      },
      {
        path: '/dashboard/don-hang/',
        name: 'QL_DonHang',
        meta: {
          title: 'Danh sách đơn hàng',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_DonHang/DanhSachDonHang'),
      },
      {
        path: '/dashboard/don-hang/:id',
        name: 'QL_DonHangDetail',
        meta: {
          title: 'Chi tiết đơn hàng',
          authRequired: true,
        },
        component: () => import('@/views/dashboard/QL_DonHang/ChiTietDonHang'),
      },
    ],
  },
  //Error view
  {
    path: '/:catchAll(.*)',
    name: '404',
    meta: {
      title: '404',
    },
    component: () => import('../views/error/404'),
  },
];
