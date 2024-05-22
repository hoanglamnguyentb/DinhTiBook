<template>
  <div v-if="showButton" class="btn btn-success" @click="toggleDialog">Chọn tập tin</div>
  <div v-if="showPreview" class="item-preview">
      <div class="item-preview-content">
        <div class="item-preview-img" v-if="itemPreview.type == 'FILE'">
          <a-image :src="url + 'FileAndFolder/' + itemPreview.name" :alt="itemPreview.name"/>
          <div class="img-preview-name">{{ itemPreview.name }}</div>
        </div>
      </div>

      <div class="item-preview-content">
        <div class="item-preview-img" v-if="itemPreview.type == 'FILE'">
          <a-image :src="url + 'FileAndFolder/' + itemPreview.name" :alt="itemPreview.name"/>
          <div class="img-preview-name">{{ itemPreview.name }}</div>
        </div>
      </div>

      <div class="item-preview-content">
        <div class="item-preview-img" v-if="itemPreview.type == 'FILE'">
          <a-image :src="url + 'FileAndFolder/' + itemPreview.name" :alt="itemPreview.name"/>
          <div class="img-preview-name">{{ itemPreview.name }}</div>
        </div>
      </div>
  </div>

  <a-modal
  v-model:open="active" 
  :zIndex="9999"
  width="90%"
  cancel-text="Đóng"
  :closable="closable">
    <template #title>
      <div v-if="closable">
        <a-button key="back">Return</a-button>
        <a-button key="submit" type="primary">Submit</a-button>
      </div>
    </template>

    <template #footer>
      <a-button v-if="closable" key="back" @click="hideDialog">Đóng</a-button>
    </template>

    <div class="dialog-body">
      <div class="hinet-fmg-body">
        <div class="hinet-fmg-body-head d-none d-lg-flex">
          <div class="hinet-fmg-search">
            <em class="bx bx-search"></em>
            <input type="text" class="form-control border-transparent form-focus-none"
              placeholder="Tìm kiếm tập tin, thư mục">
          </div>
          <div class="hinet-fmg-actions">
            <ul class="hinet-block-tools g-3">
              <li>
                <a-button type="default" class="ant-btn-info">
                  <template #icon><i class="bx bx-folder-plus"></i></template>
                  Tạo thư mục
                </a-button>
              </li>
              <li>
                <a-button type="primary" @click="showModalUpload">
                  <template #icon><i class="bx bx-cloud-upload"></i></template>
                  Tải lên
                </a-button>
              </li>
            </ul>
          </div>
        </div>
        <div class="hinet-fmg-body-content">
          <div class="hinet-block-head hinet-block-head-sm">
            <div class="hinet-block-between position-relative">
              <div class="hinet-block-head-content">
                <!-- <h4 class="hinet-block-title page-title">Danh sách</h4> -->
                <a-button type="primary" class="ant-btn-success" @click="handleShowCheckBox">
                  <template #icon><i class="bx bx-check-square"></i></template>
                   Chọn
                </a-button>
              </div>
              <div class="hinet-block-head-content">
                <ul class="hinet-block-tools g-1">
                  <li class="d-lg-none">
                    <a href="#" class="btn btn-trigger btn-icon search-toggle toggle-search" data-target="search">
                      <em class="icon ni ni-search"></em>
                    </a>
                  </li>
                  <li class="d-lg-none">
                    <div class="dropdown">
                      <a href="#" class="btn btn-trigger btn-icon" data-bs-toggle="dropdown" aria-expanded="false">
                        <em class="icon ni ni-view-grid3-wd"></em>
                      </a>
                    
                      <div class="dropdown-menu dropdown-menu-end" style="">
                        <ul class="link-list-opt no-bdr">
                          <li>
                            <a href="/demo3/apps/files.html">
                              <em class="icon ni ni-view-grid3-wd"></em>
                              <span>Grid View</span>
                            </a>
                          </li>
                          <li>
                            <a href="/demo3/apps/files-group-view.html">
                              <em class="icon ni ni-view-group-wd"></em>
                              <span>Group View</span>
                            </a>
                          </li>
                          <li>
                            <a href="/demo3/apps/files-list-view.html">
                              <em class="icon ni ni-view-row-wd"></em>
                              <span>List View</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li class="d-lg-none">
                    <div class="dropdown">
                      <a href="#" class="btn btn-trigger btn-icon" data-bs-toggle="dropdown">
                        <em class="icon ni ni-plus"></em>
                      </a>
                      <div class="dropdown-menu dropdown-menu-end">
                        <ul class="link-list-opt no-bdr">
                          <li>
                            <a href="#file-upload" data-bs-toggle="modal">
                              <em class="icon ni ni-upload-cloud"></em>
                              <span>Upload File</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <em class="icon ni ni-file-plus"></em>
                              <span>Create File</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <em class="icon ni ni-folder-plus"></em>
                              <span>Create Folder</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li class="d-lg-none me-n1">
                    <a href="#" class="btn btn-trigger btn-icon toggle" data-target="files-aside">
                      <em class="icon ni ni-menu-alt-r"></em>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="search-wrap px-2 d-lg-none" data-search="search">
                <div class="search-content">
                  <a href="#" class="search-back btn btn-icon toggle-search" data-target="search">
                    <em class="icon ni ni-arrow-left"></em>
                  </a>
                  <input type="text" class="form-control border-transparent form-focus-none"
                    placeholder="Search by user or message">
                  <button class="search-submit btn btn-icon">
                    <em class="icon ni ni-search"></em>
                  </button>
                </div>
              </div>
              <div class="hinet-block-head-content d-none d-lg-block">
                <ul class="hinet-block-tools g-3">
                  <li @click="handleChangeLayout('grid')">
                    <a class="hinet-switch-icon" title="Hiển thị kiểu lưới" :class="layoutFmg == 'grid' ? 'active' : ''">
                      <i class="icon bx bx-grid-horizontal"></i>
                    </a>
                  </li>
                  <li @click="handleChangeLayout('group')">
                    <a class="hinet-switch-icon" title="Hiển thị kiểu chi tiết" :class="layoutFmg == 'group' ? 'active' : ''">
                      <i class="icon bx bx-columns"></i>
                    </a>
                  </li>
                  <li @click="handleChangeLayout('list')">
                    <a class="hinet-switch-icon" title="Hiển thị kiểu danh sách" :class="layoutFmg == 'list' ? 'active' : ''">
                      <i class="icon bx bx-list-ul"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="hinet-fmg-listing hinet-block">
            <div class="hinet-files" :class="styleLayoutFmg">
              <div class="hinet-files-head" v-if="layoutFmg == 'list'">
                <div class="hinet-file-item">
                  <div class="hinet-file-info">
                    <div class="tb-head">Tên</div>
                  </div>
                  <div class="hinet-file-members">
                    <div class="tb-head">Chia sẻ</div>
                  </div>
                  <div class="hinet-file-actions">
                    <div class="tb-head">Thao tác</div>
                  </div>
                </div>
              </div>
              <div class="hinet-files-scroll">
                <a-checkbox-group class="hinet-files-list" v-model:value="value">
                  <div 
                  class="hinet-file-item hinet-file"
                  v-for="(item, key) in ListFile">
                    <div class="hinet-check-file" v-if="showSelectFile">
                      <a-checkbox @change="handleSelectFile(item)" :value="item.id"></a-checkbox>
                    </div>
                    <div class="hinet-file-info">
                      <div class="hinet-file-title">
                        <div class="hinet-file-icon">
                          <a
                          v-if="item.type == 'FOLDER'"
                          class="hinet-file-icon-link" href="#">
                            <span class="hinet-file-icon-type">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><g><rect x="32" y="16" width="28" height="15" rx="2.5" ry="2.5" style="fill:#f29611"></rect><path d="M59.7778,61H12.2222A6.4215,6.4215,0,0,1,6,54.3962V17.6038A6.4215,6.4215,0,0,1,12.2222,11H30.6977a4.6714,4.6714,0,0,1,4.1128,2.5644L38,24H59.7778A5.91,5.91,0,0,1,66,30V54.3962A6.4215,6.4215,0,0,1,59.7778,61Z" style="fill:#ffb32c"></path><path d="M8.015,59c2.169,2.3827,4.6976,2.0161,6.195,2H58.7806a6.2768,6.2768,0,0,0,5.2061-2Z" style="fill:#f2a222"></path></g></svg>
                            </span>
                          </a>
                          <a
                          v-if="item.type == 'FILE'"
                          class="hinet-file-icon-link" href="#">
                            <span class="hinet-file-icon-type">
                              <svg 
                              v-if="item.mine == 'application/msword' || item.mine == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'"
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><g><path d="M50,61H22a6,6,0,0,1-6-6V22l9-11H50a6,6,0,0,1,6,6V55A6,6,0,0,1,50,61Z" style="fill:#599def"></path><path d="M25,20.556A1.444,1.444,0,0,1,23.556,22H16l9-11h0Z" style="fill:#c2e1ff"></path><rect x="27" y="31" width="18" height="2" rx="1" ry="1" style="fill:#fff"></rect><rect x="27" y="36" width="18" height="2" rx="1" ry="1" style="fill:#fff"></rect><rect x="27" y="41" width="18" height="2" rx="1" ry="1" style="fill:#fff"></rect><rect x="27" y="46" width="12" height="2" rx="1" ry="1" style="fill:#fff"></rect></g></svg>
                            
                              <svg 
                              v-if="item.mine == 'application/vnd.ms-excel' || item.mine == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M50,61H22a6,6,0,0,1-6-6V22l9-11H50a6,6,0,0,1,6,6V55A6,6,0,0,1,50,61Z" style="fill:#36c684"></path><path d="M25,20.556A1.444,1.444,0,0,1,23.556,22H16l9-11h0Z" style="fill:#95e5bd"></path><path d="M42,31H30a3.0033,3.0033,0,0,0-3,3V45a3.0033,3.0033,0,0,0,3,3H42a3.0033,3.0033,0,0,0,3-3V34A3.0033,3.0033,0,0,0,42,31ZM29,38h6v3H29Zm8,0h6v3H37Zm6-4v2H37V33h5A1.001,1.001,0,0,1,43,34ZM30,33h5v3H29V34A1.001,1.001,0,0,1,30,33ZM29,45V43h6v3H30A1.001,1.001,0,0,1,29,45Zm13,1H37V43h6v2A1.001,1.001,0,0,1,42,46Z" style="fill:#fff"></path></svg>
                            
                              <svg 
                              v-if="item.mine == 'application/pdf'"
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M50,61H22a6,6,0,0,1-6-6V22l9-11H50a6,6,0,0,1,6,6V55A6,6,0,0,1,50,61Z" style="fill:#f26b6b"></path><path d="M25,20.556A1.444,1.444,0,0,1,23.556,22H16l9-11h0Z" style="fill:#f4c9c9"></path><path d="M46.3342,44.5381a4.326,4.326,0,0,0-2.5278-1.4289,22.436,22.436,0,0,0-4.5619-.3828A19.3561,19.3561,0,0,1,35.82,37.9536a56.5075,56.5075,0,0,0,1.3745-6.0858,2.339,2.339,0,0,0-.4613-1.8444,1.9429,1.9429,0,0,0-1.5162-.753h-.0014a1.6846,1.6846,0,0,0-1.3893.6966c-1.1493,1.5257-.3638,5.219-.1941,5.9457a12.6118,12.6118,0,0,0,.7236,2.1477,33.3221,33.3221,0,0,1-2.49,6.1052,20.3467,20.3467,0,0,0-5.9787,3.4413,2.5681,2.5681,0,0,0-.8861,1.8265,1.8025,1.8025,0,0,0,.6345,1.3056,2.0613,2.0613,0,0,0,1.3942.5313,2.2436,2.2436,0,0,0,1.4592-.5459,20.0678,20.0678,0,0,0,4.2893-5.3578,20.8384,20.8384,0,0,1,5.939-1.1858A33.75,33.75,0,0,0,42.96,47.7858,2.6392,2.6392,0,0,0,46.376,47.55,2.08,2.08,0,0,0,46.3342,44.5381ZM27.6194,49.6234a.8344.8344,0,0,1-1.0847.0413.4208.4208,0,0,1-.1666-.2695c-.0018-.0657.0271-.3147.4408-.736a18.0382,18.0382,0,0,1,3.7608-2.368A17.26,17.26,0,0,1,27.6194,49.6234ZM34.9023,30.848a.343.343,0,0,1,.3144-.1514.6008.6008,0,0,1,.4649.2389.853.853,0,0,1,.1683.6722v0c-.1638.92-.4235,2.381-.8523,4.1168-.0125-.05-.0249-.1-.037-.1506C34.6053,34.0508,34.3523,31.5779,34.9023,30.848ZM33.7231,43.5507a34.9732,34.9732,0,0,0,1.52-3.7664,21.2484,21.2484,0,0,0,2.2242,3.05A21.8571,21.8571,0,0,0,33.7231,43.5507Zm11.7054,2.97a1.3085,1.3085,0,0,1-1.6943.0887,33.2027,33.2027,0,0,1-3.0038-2.43,20.9677,20.9677,0,0,1,2.8346.3335,2.97,2.97,0,0,1,1.7406.9647C45.8377,46.1115,45.6013,46.3483,45.4285,46.5212Z" style="fill:#fff"></path></svg>
                            
                              <svg 
                              v-if="item.mine == 'video/mp4' || item.mine == 'video/mpeg'"
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M50,61H22a6,6,0,0,1-6-6V22l9-11H50a6,6,0,0,1,6,6V55A6,6,0,0,1,50,61Z" style="fill:#f74141"></path><path d="M25,20.556A1.444,1.444,0,0,1,23.556,22H16l9-11h0Z" style="fill:#ffa9a9"></path><path d="M46,46.5v-13A3.5042,3.5042,0,0,0,42.5,30h-13A3.5042,3.5042,0,0,0,26,33.5v13A3.5042,3.5042,0,0,0,29.5,50h13A3.5042,3.5042,0,0,0,46,46.5ZM40,45v3H37V45Zm-3-2V37h7v6Zm0-8V32h3v3Zm-2-3v3H32V32Zm0,5v6H28V37Zm0,8v3H32V45Zm7.5,3H42V45h2v1.5A1.5016,1.5016,0,0,1,42.5,48ZM44,33.5V35H42V32h.5A1.5016,1.5016,0,0,1,44,33.5ZM29.5,32H30v3H28V33.5A1.5016,1.5016,0,0,1,29.5,32ZM28,46.5V45h2v3h-.5A1.5016,1.5016,0,0,1,28,46.5Z" style="fill:#fff"></path></svg>
                            
                              <svg 
                              v-if="item.mine == 'audio/mpeg'"
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M50,61H22a6,6,0,0,1-6-6V22l9-11H50a6,6,0,0,1,6,6V55A6,6,0,0,1,50,61Z" style="fill:#5a5aff"></path><path d="M25,20.556A1.444,1.444,0,0,1,23.556,22H16l9-11h0Z" style="fill:#b8b8ff"></path><path d="M44.6465,30.2373a1.006,1.006,0,0,0-.811-.2236l-12,2A1,1,0,0,0,31,33v9.5563A3.9543,3.9543,0,0,0,29,42a4,4,0,1,0,4,4V33.8467l10-1.666v8.3757A3.9543,3.9543,0,0,0,41,40a4,4,0,1,0,4,4V31A.999.999,0,0,0,44.6465,30.2373ZM29,48a2,2,0,1,1,2-2A2.0023,2.0023,0,0,1,29,48Zm12-2a2,2,0,1,1,2-2A2.0023,2.0023,0,0,1,41,46Z" style="fill:#f3f3f3"></path></svg>
                            
                              <svg 
                              v-if="item.mine == 'image/png' || item.mine == 'image/jpeg' || item.mine == 'image/jpg'"
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M50,61H22a6,6,0,0,1-6-6V22l9-11H50a6,6,0,0,1,6,6V55A6,6,0,0,1,50,61Z" style="fill:#755de0"></path><path d="M27.2223,43H44.7086s2.325-.2815.7357-1.897l-5.6034-5.4985s-1.5115-1.7913-3.3357.7933L33.56,40.4707a.6887.6887,0,0,1-1.0186.0486l-1.9-1.6393s-1.3291-1.5866-2.4758,0c-.6561.9079-2.0261,2.8489-2.0261,2.8489S25.4268,43,27.2223,43Z" style="fill:#fff"></path><path d="M25,20.556A1.444,1.444,0,0,1,23.556,22H16l9-11h0Z" style="fill:#b5b3ff"></path></svg>
                            </span>
                          </a>
                        </div>
                        <div class="hinet-file-name">
                          <div class="hinet-file-name-text">
                            <a v-if="item.type == 'FOLDER'" href="#" @click="handleGoToFolder(item)" :title="item.name" class="title">{{ item.name }}</a>
                            <a v-if="item.type == 'FILE'" href="#" @click="handlePreviewFile(item)" :title="item.name" class="title">{{ item.name }}</a>
                          </div>
                        </div>
                      </div>
                      <ul class="hinet-file-desc" v-if="layoutFmg == 'group'">
                        <li class="date">Today</li>
                        <li class="size">4.5 MB</li>
                        <li class="members">3 Members</li>
                      </ul>
                    </div>
                    <div class="hinet-file-members" v-if="layoutFmg == 'list'">
                      <div class="tb-lead">Only Me</div>
                    </div>
                    <div class="hinet-file-actions">
                      <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link " @click.prevent>
                          <i class="icon bx bx-dots-horizontal-rounded"></i>
                        </a>
                        <template #overlay>
                          <a-menu class="link-list-plain">
                            <a-menu-item key="0" @click="showModalDetail(item)">
                              <a href="#file-details">
                                <i class="icon bx bx-info-circle"></i>
                                <span> Chi tiết</span>
                              </a>
                            </a-menu-item>
                            <a-menu-item key="1">
                              <a href="#file-share">
                                <i class="icon bx bx-share-alt"></i>
                                <span> Chia sẻ</span>
                              </a>
                            </a-menu-item>
                            <a-menu-item key="2">
                              <a href="#file-move">
                                <i class="icon bx bx-move-horizontal"></i>
                                <span> Di chuyển</span>
                              </a>
                            </a-menu-item>
                            <a-menu-item key="3">
                              <a href="#" class="file-dl-toast">
                                <i class="icon bx bx-download"></i>
                                <span> Tải xuống</span>
                              </a>
                            </a-menu-item>
                            <a-menu-item key="4">
                              <a href="#">
                                <i class="icon bx bx-pencil"></i>
                                <span> Đổi tên</span>
                              </a>
                            </a-menu-item>
                            <a-menu-divider />
                            <a-menu-item key="5">
                              <a href="#" danger>
                                <i class="icon bx bx-trash"></i>
                                <span> Xóa</span>
                              </a>
                            </a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                    </div>
                  </div>
                </a-checkbox-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-modal>


  <a-modal
  v-model:open="visibleDetail" 
  title="Chi tiết" 
  :zIndex="9999">
    <div class="hinet-file-details">
      <div class="hinet-file-details-row">
        <div class="hinet-file-details-col">Loại</div>
        <div class="hinet-file-details-col">{{ ItemDetail.type }}</div>
      </div>
      <div class="hinet-file-details-row">
        <div class="hinet-file-details-col">Dung lượng</div>
        <div class="hinet-file-details-col">35.48 MB</div>
      </div>
      <div class="hinet-file-details-row">
        <div class="hinet-file-details-col">Vị trí</div>
        <div class="hinet-file-details-col">
          <ul class="breadcrumb breadcrumb-sm breadcrumb-alt breadcrumb-arrow">
            <li class="breadcrumb-item">ThemeForest</li>
            <li class="breadcrumb-item">Project</li>
          </ul>
        </div>
      </div>
      <div class="hinet-file-details-row">
        <div class="hinet-file-details-col">Chủ sở hữu</div>
        <div class="hinet-file-details-col">{{ ItemDetail.userUpload }}</div>
      </div>
      <div class="hinet-file-details-row"
      v-if="ItemDetail.listShare.length > 0">
        <div class="hinet-file-details-col">Chia sẻ với</div>
        <div class="hinet-file-details-col">
          <div class="user-avatar-group">
            <div class="user-avatar xs">
              <img src="/demo3/images/avatar/b-sm.jpg" alt="">
            </div>
            <div class="user-avatar xs bg-purple">
              <span>IH</span>
            </div>
            <div class="user-avatar xs bg-pink">
              <span>AB</span>
            </div>
            <div class="user-avatar xs bg-light">
              <span>+2</span>
            </div>
          </div>
        </div>
      </div>
      <div class="hinet-file-details-row">
        <div class="hinet-file-details-col">Ngày tải lên</div>
        <div class="hinet-file-details-col">{{ formatDate(ItemDetail.dateUpload) }}</div>
      </div>
    </div>
    <template #footer>
      <a-button key="back" @click="visibleDetail = !visibleDetail">Đóng</a-button>
    </template>
  </a-modal>

  <a-modal
  v-model:open="visibleUpload" 
  title="Tải lên tập tin" 
  width="60%"
  :zIndex="9999">
    <a-upload-dragger
      v-model:fileList="fileList"
      name="file"
      :multiple="multiple"
      :customRequest="handleUpload"
      :beforeUpload="beforeUpload"
      @remove="handleRemoveFile"
      :maxCount="maxCount"
    >
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text">Chọn hoặc kéo tệp vào đây để tải lên.</p>
      <p class="ant-upload-hint">
        Vui lòng không tải lên các tập tin độc hại.
      </p>
    </a-upload-dragger>
    <template #itemRender="{ file, actions }">
      <a-space>
        <span :style="file.status === 'error' ? 'color: red' : ''">{{ file.name }}</span>
        <a href="javascript:;" @click="actions.download">download</a>
        <a href="javascript:;" @click="actions.remove">delete</a>
      </a-space>
    </template>
    <template #footer>
      <a-button key="back" @click="handleCloseUpload">Đóng</a-button>
    </template>
  </a-modal>
</template>

<script>
import { ref, watch, onMounted, defineComponent } from 'vue';
import { useFmgStore } from '@/stores/fmg'
import APIService from '@/helpers/ApiService'
import { message } from 'ant-design-vue';
import { InboxOutlined } from '@ant-design/icons-vue';
import { useAuthStore } from '@/stores/auth'
import Common from "@/helpers/Common"

export default defineComponent({
  name: "FileManager",
  components:{
    InboxOutlined
  },
  emits: ['select-file'],
  props: {
    active: {
      type: Boolean,
      default: false
    },
    showButton: {
      type: Boolean,
      default: false
    },
    showPreview: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: false
    },
    accept: {
      type: Array,
      default: []
    },
    maxCount: {
      type: Number,
      default: 1
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const url = ref(process.env.VUE_APP_URL);
    const localActive = ref(props.active);
    const fmgStore = useFmgStore();
    const authStore = useAuthStore();
    const currentUser = authStore.getUser;
    const layoutFmg = ref(fmgStore.getLayoutType);
    const styleLayoutFmg = ref(fmgStore.getStyleType);
    const ListFile = ref([]);
    const ItemDetail = ref({
      id: "",
      name : "",
      dateUpload: new Date(),
      userUpload: "",
      mine: "",
      path: "",
      type: "",
      listShare : []
    })

    const itemPreview = ref([]);
    const value = ref([]);
    const showSelectFile = ref(false);
    const defaultMine = ['image/png', 'image/jpg', 'image/jpeg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'audio/mpeg', 'video/mp4', 'video/mpeg'];
    
    watch(() => fmgStore.layoutType, (newValue) => {
        layoutFmg.value = newValue;

        if(newValue == "grid"){
          styleLayoutFmg.value = "hinet-files-view-grid"
        }else if(newValue == "group"){
          styleLayoutFmg.value = "hinet-files-view-group"
        }else if(newValue == "list"){
          styleLayoutFmg.value = "hinet-files-view-list"
        }
      }, {deep: true}
    );

    watch(() => props.active, () => {
      localActive.value = props.active;
    });

    const toggleDialog = () => {
      localActive.value = !localActive.value;
      GetAllFileByUser();
    };

    const hideDialog = () => {
      localActive.value = false;
    };

    const handleChangeLayout = (layoutType) => {
      fmgStore.layoutType = layoutType;
      if(layoutType == "grid"){
        fmgStore.styleType = "hinet-files-view-grid"
      }else if(layoutType == "group"){
        fmgStore.styleType = "hinet-files-view-group"
      }else if(layoutType == "list"){
        fmgStore.styleType = "hinet-files-view-list"
      }
    };

    const visibleDetail = ref(false);
    const showModalDetail = (item) => {
      visibleDetail.value = true;
      ItemDetail.value.name = item.name;
      ItemDetail.value.type = item.type;
      ItemDetail.value.userUpload = currentUser != "" ? (currentUser.userName == item.CreatedBy ? "Tôi" : item.CreatedBy) : "Trống"
    }

    const handleOk = e => {
      console.log(e);
      visibleDetail.value = false;
    };

    const visibleUpload = ref(false);
    const showModalUpload = () => {
      visibleUpload.value = true;
    }

    //call API
    const GetAllFileByUser = async () => {
      try {
        var res = await APIService.get("/FileAndFolder/get");
        ListFile.value = res.data.data;
      } catch (error) {
        message.error("Lấy danh sách tập tin và thư mục thất bại.")
      }
    }

    //handle File
    const handleGoToFolder = async (item) => {

    }

    const handlePreviewFile = async (item) => {
      //const fileUrl = window.URL.createObjectURL(new Blob([response.data]));

    }

    //handle upload
    const fileList = ref([]);
    const uploading = ref(false);
    const handleDrop = e => {
      console.log(e);
    };

    const beforeUpload = file => {
      const isAccept = props.accept.includes(file.type);
        //nếu không truyền vào thì dùng mine mặc định
      if(props.accept.length == 0){
        isAccept = defaultMine.value.includes(file.type);
      }

      if (!isAccept) {
        file.status = 'error';
        file.response = 'Định dạng của tập tin không được hỗ trợ.';
        fileList.value.splice(fileList.value.indexOf(file), 1)
        message.error(`Định dạng của tập tin ${file.name} không được hỗ trợ.`);
      }
      const isLt25M = file.size / 1024 / 1024 < 25;
      if (!isLt25M) {
        file.status = 'error';
        file.response = `Tập tin có dung lượng lớn hơn 25MB.`;
        fileList.value.splice(fileList.value.indexOf(file), 1)
        message.error(`Tập tin ${file.name} có dung lượng lớn hơn 25MB`);
      }

      return isAccept && isLt25M;
    };

    const handleUpload = async ({ file, onSuccess, onError }) => {
      const formData = new FormData();
      formData.append('Files', file);
      try {
        var resUpload = await APIService.post("/FileAndFolder/Upload", formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: progressEvent => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          }
        });
        if(resUpload.data != null){
          file.status = "done"
          file.response = resUpload.data.message
          onSuccess(resUpload.data, file)
        }else{
          file.status = 'error'
          file.response = resUpload.data.message
          onError(resUpload.data)
        }
      } catch (error) {
        file.status = 'error'
        file.response = error.data.message
        onError(error)
      }
    }

    const handleRemoveFile = (file) =>{
      console.log(file)
    }
    
    const handleCloseUpload = () => {
      visibleUpload.value = false;
    };

    const handleShowCheckBox = () => {
      showSelectFile.value = !showSelectFile.value
    }

    const handleSelectFile = (item) => {
      itemPreview.value = item;
      context.emit("select-file", item)
    }

    onMounted(() => {
      
    });

    const formatDate = Common.formatDate

    return {
      url,
      active: localActive,
      toggleDialog,
      hideDialog,
      layoutFmg,
      handleChangeLayout,
      styleLayoutFmg,
      showModalDetail,
      ItemDetail,
      handleOk,
      visibleDetail,
      GetAllFileByUser,
      visibleUpload,
      showModalUpload,
      fileList,
      uploading,
      handleDrop,
      handleUpload,
      beforeUpload,
      handleCloseUpload,
      handleRemoveFile,
      ListFile,
      handlePreviewFile,
      handleGoToFolder,
      formatDate,
      value,
      handleShowCheckBox,
      showSelectFile,
      handleSelectFile,
      itemPreview
    };
  },
})
</script>
<style>
.ant-dropdown, .ant-message {
    z-index: 99999;
}
</style>
<style lang="css" scoped>
.hinet-check-file{
  float: left;
}
.item-preview-img{
  display: flex;
  align-items: center;
}
.link-list-plain a:hover {
    color: #6576ff !important;
    background: #f5f6fa;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.dialog-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.dialog-container {
  max-width: 90%;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px;
  background-color: #fff;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s;
}

.dialog-enter,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-active .dialog-container,
.dialog-leave-active .dialog-container {
  transition: transform 0.4s;
}

.dialog-enter .dialog-container,
.dialog-leave-to .dialog-container {
  transform: scale(0.9);
}
.ant-dropdown-link{
  cursor: pointer;
}
.hinet-file-actions .icon{
  font-size:  1.5rem
}

.link-list-opt a {
    display: flex;
    align-items: center;
    padding: .625rem 1.25rem;
    font-size: 12px;
    font-weight: 500;
    color: #526484;
    transition: all .4s;
    line-height: 1.3rem;
    position: relative;
}
.link-list-opt a:hover {
    color: #6576ff;
    background: #f5f6fa;
}
.link-list-opt a .icon {
    font-size: 1.125rem;
    width: 1.75rem;
    opacity: .8;
}
.icon+span, span+.icon {
    margin-left: .25rem;
}
.hinet-switch-icon{
  cursor: pointer;
}
.hinet-switch-icon .icon {
    font-size: 1.5rem;
}
.hinet-switch-icon.active {
    color: #6576ff;
}
.form-control {
    min-height: calc(2.125rem + 2px);
}
.border-transparent {
    border-color: transparent;
}
ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.g-3:not(.row) {
  margin: -.5rem;
}

.g-3:not(.row)>div,
.g-3:not(.row)>li {
  padding: .5rem;
}

.hinet-block-tools {
  display: flex;
  align-items: center;
}

.hinet-block-tools>* {
  display: inline-flex;
}

.toggle-expand.active>.inactive-text,
.toggle-opt.active>.inactive-text {
  display: none;
}

.toggle-expand.active>.active-text,
.toggle-opt.active>.active-text {
  display: block;
}

.hinet-block-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.hinet-fmg-body {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  flex-grow: 1;
  flex-shrink: 0
}

.hinet-fmg-body-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: .75rem 1.25rem;
  border-bottom: 1px solid #dbdfea;
  background-color: #fff;
  position: sticky;
  z-index: 9
}

.hinet-fmg-body-content {
  padding: 1.125rem 1.25rem;
  height: 100%;
  max-height: 100%;
  overflow: auto
}

.hinet-fmg-body .simplebar-content {
  min-height: 470px
}

.hinet-fmg-search {
  display: flex;
  align-items: center;
  flex-grow: 1
}

.hinet-fmg-filter {
  margin-bottom: 1.25rem
}

.hinet-fmg-filter .form-label {
  font-weight: 500;
  font-size: 13px;
  color: #8094ae
}

.hinet-fmg-filter .form-group {
  margin-bottom: 1rem
}

.hinet-fmg-switch {
  background-color: #e5e9f2;
  border-top: 1px solid #e5e9f2
}

.hinet-fmg-switch>div {
  width: 100%
}

.hinet-fmg-switch .dropdown-toggle {
  padding: 1.25rem 1.75rem;
  width: 100%;
  flex-direction: column;
  align-items: flex-start
}

.hinet-fmg-switch .dropdown-toggle:after {
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: #526484
}

.hinet-fmg-listing {
  min-height: 380px
}

.hinet-fmg-listing.is-scrollable {
  min-height: auto;
  max-height: 298px
}

@media (min-width: 576px) {
  .hinet-fmg-body-content {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem
  }
}

@media (min-width: 992px) {
  .hinet-fmg {
    padding-left: 260px
  }

  .hinet-fmg-aside {
    transform: none;
    transition: none;
    width: 260px;
    left: 80px
  }

  .hinet-fmg-aside-top {
    flex-grow: 1
  }

  .hinet-fmg-body-head {
    padding: .75rem 1.75rem;
    z-index: 9
  }

  .hinet-fmg-body-content {
    padding: 1.75rem
  }
}

@media (min-width: 1200px) {
  .hinet-fmg-filter.toggle-expand-content {
    display: block !important
  }
}

@media (min-width: 992px) and (max-width:1360px) {
  .hinet-fmg {
    padding-left: 220px
  }

  .hinet-fmg-aside {
    width: 220px
  }
}

@media (min-width: 576px) and (max-width:991.98px) {
  .hinet-fmg-aside {
    width: 320px
  }

  .hinet-fmg-body-content,
  .hinet-fmg-body-head,
  .hinet-fmg-status,
  .hinet-fmg-switch .dropdown-toggle {
    padding-left: 2.25rem;
    padding-right: 2.25rem
  }

  .hinet-fmg-menu {
    padding: 1rem 1.75rem
  }
}

.hinet-file .tb-sub {
  font-size: 12px;
  color: #8094ae
}

.hinet-file .tb-head {
  font-weight: 500;
  font-size: 13px;
  color: #8094ae
}

.hinet-file-info .hinet-file-name .asterisk a.active,
.hinet-file-info:hover .hinet-file-name .asterisk a {
  opacity: 1
}

.hinet-file-icon {
  margin-right: 8px;
  flex-shrink: 0
}

.hinet-file-icon-link {
  display: block;
  text-decoration: none;
  color: inherit
}

.hinet-file-icon-type {
  width: 32px;
  display: inline-block;
  text-decoration: none;
  color: inherit;
  margin: auto
}

.hinet-file-title {
  display: flex;
  align-items: center
}

.hinet-file-title .breadcrumb {
  padding-top: .25rem;
  padding-bottom: 0
}

.hinet-file-name {
  font-weight: 500;
  color: #364a63;
  position: relative;
  line-height: 1.4
}

.hinet-file-name-text {
  padding-right: 1.5rem;
  display: inline-block
}

.hinet-file-name-text .title {
  transition: color .3s;
  display: inline-block;
  text-decoration: none;
  word-break: break-word
}

.hinet-file-name-text a.title {
  color: #364a63
}

.hinet-file-name-text a.title:hover {
  color: #6576ff
}

.hinet-file-name-sub {
  font-size: 12px;
  color: #8094ae
}

.hinet-file-name .asterisk {
  position: absolute;
  display: inline-flex;
  margin-left: .5rem;
  transition: .3s opacity;
  margin-top: -1px;
  top: 50%;
  transform: translateY(-50%)
}

.hinet-file-name .asterisk a {
  opacity: 0
}

.hinet-file-name .asterisk .icon {
  font-size: 1.125rem;
  color: #6576ff
}

.hinet-file-desc {
  display: flex;
  align-items: center;
  margin: 0 -.375rem
}

.hinet-file-desc li {
  position: relative;
  padding: 0 .375rem;
  font-size: 12px;
  color: #8094ae
}

.hinet-file-desc li:not(:first-child):before {
  content: "\eca1";
  font-family: Nioicon;
  position: absolute;
  top: 50%;
  font-size: 11px;
  line-height: 10px;
  left: 0;
  transform: translate(-50%, -50%);
  opacity: .8
}

.hinet-file-link {
  text-decoration: none;
  color: inherit;
  display: block
}

.hinet-file-link:hover .title {
  color: #6576ff
}

.hinet-file-info>.hinet-file-link {
  padding: .75rem 0
}

.is-compact .hinet-file-info>.hinet-file-link {
  padding: .375rem 0
}

.hinet-file-share-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
  border-bottom: 1px solid #e5e9f2
}

.hinet-file-share-field {
  padding: .5rem 1.25rem
}

.hinet-file-share-field:not(:last-child) {
  border-bottom: 1px solid #e5e9f2
}

.dual-listbox .hinet-file-share-field .dual-listbox__search,
.hinet-file-share-field .dual-listbox .dual-listbox__search,
.hinet-file-share-field .form-control,
.hinet-file-share-field div.dataTables_wrapper div.dataTables_filter input,
div.dataTables_wrapper div.dataTables_filter .hinet-file-share-field input {
  font-size: .875rem
}

.dual-listbox .hinet-file-share-field textarea.dual-listbox__search,
.hinet-file-share-field .dual-listbox textarea.dual-listbox__search,
.hinet-file-share-field textarea.form-control {
  min-height: 78px
}

.dual-listbox .hinet-file-share-field textarea.ex-large.dual-listbox__search,
.hinet-file-share-field .dual-listbox textarea.ex-large.dual-listbox__search,
.hinet-file-share-field textarea.form-control.ex-large {
  min-height: 160px
}

.hinet-file-share-input {
  display: flex
}

.hinet-file-share-input .label {
  margin: .3rem .5rem .3rem 0;
  width: 1.25rem;
  color: #8094ae
}

.hinet-file-share-input-group {
  width: 100%
}

.hinet-file-share-group {
  position: relative;
  padding: 1rem 0;
  flex-grow: 1;
  display: flex;
  align-items: center
}

.hinet-file-share-nav {
  flex-shrink: 0
}

.hinet-file-details-row {
  display: flex;
  flex-wrap: wrap;
  padding: .25rem 0
}

.hinet-file-details-col {
  font-size: 13px
}

.hinet-file-details-col:first-child {
  color: #8094ae;
  width: 100%
}

.hinet-file-details-col:last-child {
  color: #526484
}

.hinet-file-details-col .breadcrumb {
  padding: 0
}

@media (min-width: 420px) {
  .hinet-file-details-row {
    flex-wrap: nowrap;
    padding: .375rem 0
  }

  .hinet-file-details-col:first-child {
    width: 100px;
    flex-shrink: 0
  }
}

@media (min-width: 576px) {

  .dual-listbox .hinet-file-share-field textarea.ex-large.dual-listbox__search,
  .hinet-file-share-field .dual-listbox textarea.ex-large.dual-listbox__search,
  .hinet-file-share-field textarea.form-control.ex-large {
    min-height: 278px
  }
}

.hinet-files .hinet-file .hideable {
  opacity: 0;
  transition: opacity .3s
}

.hinet-files .hinet-file:hover .hideable {
  opacity: 1
}

.hinet-files .hinet-file-item {
  display: table-row
}

.hinet-files .hinet-file-item>div {
  position: relative;
  display: table-cell;
  padding: .5rem;
  vertical-align: middle
}

.hinet-files .hinet-file-actions {
  width: 80px;
  text-align: center
}

.hinet-files-head {
  display: table-header-group
}

.hinet-files-head .hinet-file-item>div {
  font-weight: 500;
  font-size: .8125rem;
  padding: .25rem
}

.hinet-files-head .hinet-file-item>div:first-child {
  padding-left: 0
}

.hinet-files-head .hinet-file-item>div:last-child {
  padding-right: .5rem
}

.hinet-files-head .dropdown-menu-xs {
  min-width: 140px;
  max-width: 140px
}

.hinet-files-list {
  display: table-row-group
}

.hinet-files-view-list {
  display: table;
  width: 100%;
  table-layout: fixed;
}

.hinet-files-view-list .hinet-file {
  display: table-row
}

.hinet-files-view-list .hinet-file.selected {
  background: #e3e7fe
}

.hinet-files-view-list .hinet-file.selected>div {
  background: 0 0
}

.hinet-files-view-list .hinet-file>div {
  padding: .5rem .375rem;
  border-bottom: 1px solid #dbdfea;
  height: 4rem;
  background-color: #fff
}

.hinet-files-view-list .hinet-file>div:first-child {
  border-left: 1px solid #dbdfea;
  padding-left: 1.25rem
}

.hinet-files-view-list .hinet-file>div:last-child {
  border-right: 1px solid #dbdfea
}

.hinet-files-view-list .hinet-file>div.hinet-file-info {
  padding-top: .125rem;
  padding-bottom: .125rem
}

.hinet-files-view-list .hinet-file:first-child>div {
  border-top: 1px solid #dbdfea
}

.hinet-files-view-list .hinet-file:first-child>div:first-child {
  border-top-left-radius: 4px
}

.hinet-files-view-list .hinet-file:first-child>div:last-child {
  border-top-right-radius: 4px
}

.hinet-files-view-list .hinet-file:last-child>div:first-child {
  border-bottom-left-radius: 4px
}

.hinet-files-view-list .hinet-file:last-child>div:last-child {
  border-bottom-right-radius: 4px
}

.hinet-files-view-list .hinet-file .custom-checkbox {
  margin-right: 1rem
}

.hinet-files-view-list .hinet-file-members .tb-shared {
  position: absolute;
  left: -1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem
}

.hinet-files-view-list .hinet-file-name-text a.title {
  padding: 1rem 0 .875rem
}

.hinet-files-view-list .hinet-file-icon+.hinet-file-name a.title {
  padding-left: 40px;
  margin-left: -40px
}

.hinet-files-view-list.is-compact .hinet-file>div {
  height: 3rem
}

.hinet-files-view-grid .hinet-files-head,
.hinet-files-view-group .hinet-files-head {
  margin-bottom: .25rem;
  width: 100%;
  display: flex
}

.hinet-files-view-grid .hinet-files-head .hinet-file-item,
.hinet-files-view-group .hinet-files-head .hinet-file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0
}

.hinet-files-view-grid .hinet-files-head .hinet-file-item>div:not(.hinet-file-info):not(.hinet-file-actions),
.hinet-files-view-group .hinet-files-head .hinet-file-item>div:not(.hinet-file-info):not(.hinet-file-actions) {
  display: none
}

.hinet-files-view-grid .hinet-files-head .hinet-file-actions,
.hinet-files-view-group .hinet-files-head .hinet-file-actions {
  width: 30px;
  padding: 0 !important;
  margin-right: -4px
}

.hinet-files-scroll{
  max-height: 60vh;
  overflow-y: scroll;
}

.hinet-files-view-grid .hinet-files-list,
.hinet-files-view-group .hinet-files-list {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
  column-gap: 0px;
  white-space: unset;
}

.hinet-files-view-grid .hinet-files-list .hinet-file-actions,
.hinet-files-view-group .hinet-files-list .hinet-file-actions {
  position: absolute;
  border: 0 none;
  background: 0 0;
  width: 46px;
  right: 4px;
  top: 10px
}

.hinet-files-view-grid .hinet-files-list .custom-control,
.hinet-files-view-group .hinet-files-list .custom-control {
  position: absolute
}

.hinet-files-view-grid .hinet-file,
.hinet-files-view-group .hinet-file {
  display: flex;
  position: relative;
  margin: 8px;
  background: #fff;
  border: 1px solid #dbdfea;
  border-radius: 4px
}

.hinet-files-view-grid .hinet-file .hinet-file-members,
.hinet-files-view-group .hinet-file .hinet-file-members {
  display: none
}

.hinet-files-view-grid .hinet-file {
  display: block;
  position: relative;
  width: calc(50% - 16px);
  text-align: center;
  padding: .5rem .25rem
}

.hinet-files-view-grid .hinet-file>div {
  display: block;
  padding: 0
}

.hinet-files-view-grid .hinet-file-title {
  display: flex;
  flex-direction: column
}

.hinet-files-view-grid .hinet-file-icon {
  display: block;
  margin: 0;
  width: 100%
}

.hinet-files-view-grid .hinet-file-icon-type {
  width: 72px;
  padding: .5rem 0
}

.hinet-files-view-grid .hinet-file-name .title {
  padding: .5rem .125rem .5rem
}

.hinet-files-view-grid .hinet-file-name-text {
  padding-left: 1.5rem;
  padding-right: 1.5rem
}

.hinet-files-view-grid .hinet-file-desc {
  padding: 0 .25rem .75rem;
  margin-top: -.125rem;
  justify-content: center
}

.hinet-files-view-grid .hinet-file-desc .members {
  display: none
}

.hinet-files-view-grid .hinet-file-info>.hinet-file-link {
  padding: .5rem 0
}

.hinet-files-view-grid .hinet-file .hinet-file-members {
  display: none
}

.hinet-files-view-grid .hinet-file .hinet-file-meta {
  padding-bottom: .5rem
}

.hinet-files-view-grid .hinet-file .custom-control {
  top: .75rem;
  left: 1rem
}

.hinet-files-view-group .hinet-file {
  position: relative;
  padding: .5rem .5rem;
  width: 100%
}

.hinet-files-view-group .hinet-file>div {
  display: block;
  width: 100%;
  padding-right: 2.5rem
}

.hinet-files-view-group .hinet-file-desc {
  padding: .25rem .125rem 0
}

.hinet-files-view-group .hinet-file-name-text a.title {
  padding: .125rem 0
}

.hinet-files-view-group .hinet-file-icon+.hinet-file-name a.title {
  padding-left: 40px;
  margin-left: -40px
}

.hinet-files-view-group .hinet-file .hinet-file-actions {
  right: 2px;
  top: 4px
}

.hinet-files-view-group .hinet-file .custom-control {
  right: .5rem;
  bottom: .5rem
}

.hinet-files-view-group .hinet-file .hinet-file-meta {
  display: none
}

.hinet-files-group>.title {
  border-top: 1px solid #e5e9f2;
  font-size: 12px;
  letter-spacing: .04em;
  text-transform: uppercase;
  padding: 1rem 0;
  margin: 0
}

.hinet-files-group+.hinet-files-group {
  margin-top: 3rem
}

@media (max-width: 767.98px) {
  .hinet-file-name-text {
    font-size: 13px
  }

  .hinet-files-view-grid .hinet-file-name-text {
    font-size: 12px
  }
}

@media (max-width: 991.98px) {

  .dt-buttons .hinet-fmg-body .hinet-block-tools .btn-trigger.btn-secondary .icon,
  .hinet-fmg-body .hinet-block-tools .btn-icon.btn-trigger .icon,
  .hinet-fmg-body .hinet-block-tools .dt-buttons .btn-trigger.btn-secondary .icon {
    font-size: 1.25rem
  }
}

@media (min-width: 576px) {
  .hinet-files-view-grid .hinet-file {
    width: calc(33.33% - 16px)
  }

  .hinet-files-view-group .hinet-file {
    width: calc(50% - 16px)
  }
}

@media (min-width: 1200px) {
  .hinet-files-view-grid .hinet-file {
    width: calc(25% - 16px)
  }

  .hinet-files-view-group .hinet-file {
    width: calc(33.33% - 16px)
  }
}

@media (min-width: 1540px) {
  .hinet-files-view-grid .hinet-file {
    width: calc(20% - 16px)
  }

  .hinet-files-view-group .hinet-file {
    width: calc(25% - 16px)
  }
}

@media (min-width: 1800px) {
  .hinet-files-view-grid .hinet-file {
    width: calc(16.66% - 16px)
  }

  .hinet-files-view-group .hinet-file {
    width: calc(20% - 16px)
  }
}

@media (max-width: 1199px) and (min-width:992px),
(max-width:767px) {

  .hinet-files-view-list .hinet-file-members,
  .hinet-files-view-list .hinet-file-size {
    display: none !important
  }
}

@media (max-width: 599px) {
  .hinet-files-view-list .hinet-file-icon-type {
    width: 24px
  }

  .hinet-files-view-list .hinet-file-date,
  .hinet-files-view-list .hinet-file-meta,
  .hinet-files-view-list .hinet-file-size {
    display: none !important
  }

  .hinet-files-view-list .hinet-file .custom-checkbox {
    margin-right: .75rem
  }
}

.hinet-upload-form {
  margin-bottom: 2.25rem
}

.hinet-upload-list>.title {
  font-size: .875rem;
  padding-bottom: 1rem
}

.hinet-upload-item {
  display: flex;
  align-items: center;
  padding: .5rem;
  border-radius: 4px;
  border: 1px solid #e5e9f2;
  margin: .5rem 0
}

.hinet-upload-icon {
  width: 48px;
  margin-right: .25rem;
  flex-shrink: 0
}

.hinet-upload-info {
  font-weight: 500;
  color: #364a63;
  flex-grow: 1;
  padding-right: .75rem
}

.hinet-upload-title {
  display: flex;
  align-items: flex-end
}

.hinet-upload-title .title {
  font-size: .875rem
}

.hinet-upload-title .meta {
  font-size: 12px;
  margin-left: auto;
  color: #8094ae;
  font-weight: 400
}

.hinet-upload-size {
  font-size: 12px;
  color: #8094ae;
  font-weight: 400
}

.hinet-upload-progress {
  margin: .375rem 0 .25rem
}

.hinet-upload-action {
  margin-left: auto
}
</style>