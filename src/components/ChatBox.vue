<template>
  <div id="body">
    <div
      id="chat-circle"
      class="btn btn-raised d-flex justify-content-center align-items-center"
      v-on:click="chatBoxToggle"
    >
      <div id="chat-overlay"></div>
      <i style="font-size: 35px;" class="ri-message-2-line"></i>
    </div>

    <div class="chat-box">
      <div class="chat-box-header d-flex align-items-center py-3 px-2">
        <span class="msg-avatar me-2" style="width: 50px; height: 50px">
          <img
            class="w-100 h-100"
            src="https://lf16-alice-tos-sign.oceanapi-i18n.com/obj/ocean-cloud-tos-sg/FileBizType.BIZ_BOT_ICON/7371838831589868545_1716390117416036960.jpeg?lk3s=50ccb0c5&x-expires=1718037862&x-signature=4A0UbFnnSb4ExbMgN3j41zVU%2BgI%3D"
          />
        </span>
        Trợ lý nhà sách
        <span class="chat-box-toggle ms-auto" v-on:click="chatBoxToggle"
          ><i style="font-size: 30px;" class="ri-close-line" ></i>
        </span>
      </div>
      <div class="chat-box-body">
        <div class="chat-box-overlay"></div>
        <div class="chat-logs" id="chat-logs">
          <div
            id="cm-msg-1"
            :class="['chat-msg', item.type]"
            style=""
            v-for="(item, index) in chatLogs"
            :key="index"
          >
            <span class="msg-avatar">
              <img
                v-if="item.type == 'self'"
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
              />
              <img
                v-else
                src="https://lf16-alice-tos-sign.oceanapi-i18n.com/obj/ocean-cloud-tos-sg/FileBizType.BIZ_BOT_ICON/7371838831589868545_1716390117416036960.jpeg?lk3s=50ccb0c5&x-expires=1718037862&x-signature=4A0UbFnnSb4ExbMgN3j41zVU%2BgI%3D"
              />
            </span>
            <div class="cm-msg-text">{{ item.message }}</div>
          </div>
          <div id="cm-msg-1" class="chat-msg user" v-if="isLoading">
            <span class="msg-avatar"
              ><img
                src="https://lf16-alice-tos-sign.oceanapi-i18n.com/obj/ocean-cloud-tos-sg/FileBizType.BIZ_BOT_ICON/7371838831589868545_1716390117416036960.jpeg?lk3s=50ccb0c5&x-expires=1718037862&x-signature=4A0UbFnnSb4ExbMgN3j41zVU%2BgI%3D"
            /></span>
            <div class="cm-msg-text">
              <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <!--chat-log -->
      </div>
      <div class="chat-input">
        <form v-on:submit.prevent="sendMessage">
          <input
            type="text"
            id="chat-input"
            v-model="message"
            placeholder="Send a message..."
            ref="chatInput"
            autocomplete="off"
          />
          <button type="submit" class="chat-submit" id="chat-submit">
            <i style="font-size: 25px;" class="ri-send-plane-fill"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      message: '',
      isLoading: false,
      chatLogs: [
        {
          type: 'user',
          message:
            'Xin chào! Tôi là Ngọc Trinh đến từ Đinh Tị Book, tôi có thể giúp gì cho bạn?',
        },
      ],
      showForm: false,
    };
  },
  methods: {
    chatBoxToggle() {
      $('#chat-circle').toggle('scale');
      $('.chat-box').toggle('scale');
      this.showForm = !this.showForm;
      if (this.showForm) {
        // $('#chat-input').focus();
        this.$refs.chatInput.focus();
      }
    },
    async sendMessage() {
      if (!this.message) return;
      if (this.message == '/clear') {
        localStorage.removeItem('chatLogs');
        this.message = '';
        this.chatLogs = [];
        return;
      }
      this.isLoading = true;
      const userMessage = this.message;
      this.chatLogs.push({ type: 'self', message: userMessage });
      this.message = '';
      try {
        const response = await axios.post(
          // `https://api.docsbot.ai/teams/ZrbLG98bbxZ9EFqiPvyl/bots/oFFiXuQsakcqyEdpLvCB/ask`,
          `https://api.coze.com/open_api/v2/chat`,
          {
            // conversation_id: '123',
            bot_id: '7371838891596595217',
            user: '29032201862555',
            query: userMessage,
            stream: false,
          },
          {
            headers: {
              Authorization:
                'Bearer pat_SBfelSjRBVO8v0Qp8p9OedtkzunLLlUsLjqaxQmgn2ixklRyO7i1wg4PX8RrhugM',
              'Content-Type': 'application/json',
              Accept: '*/*',
              Host: 'api.coze.com',
              Connection: 'keep-alive',
            },
          }
        );

        var botMessage = "Không tìm thấy thông tin!"
        response.data.messages.forEach(item => {
          if(item.type == "answer") {
             botMessage = item.content;
          }
        });
        this.chatLogs.push({ type: 'user', message: botMessage });
        this.isLoading = false;
        localStorage.setItem('chatLogs', JSON.stringify(this.chatLogs));
      } catch (error) {
        console.log(error);
      }
      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        let scrollableDiv = document.getElementById('chat-logs');
        if (scrollableDiv) {
          scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
        }
      });
    },
  },
  created() {
    const savedChatLogs = localStorage.getItem('chatLogs');
    if (savedChatLogs) {
      const parsedChatLogs = JSON.parse(savedChatLogs);
      this.chatLogs = parsedChatLogs;
    }
  },
};
</script>

<style scoped>
#center-text {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
#chat-circle {
  position: fixed;
  bottom: 50px;
  right: 50px;
  background: #e9262a;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  color: white;
  padding: 28px;
  cursor: pointer;
  box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.6),
    0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.btn#my-btn {
  background: white;
  padding-top: 13px;
  padding-bottom: 12px;
  border-radius: 45px;
  padding-right: 40px;
  padding-left: 40px;
  color: #e9262a;
}
#chat-overlay {
  background: rgba(255, 255, 255, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: none;
}

.chat-box {
  display: none;
  background: #efefef;
  position: fixed;
  right: 30px;
  bottom: 50px;
  width: 350px;
  max-width: 85vw;
  max-height: 100vh;
  border-radius: 5px;
  /*   box-shadow: 0px 5px 35px 9px #464a92; */
  box-shadow: 0px 5px 35px 9px #ccc;
  z-index: 99999;
}
.chat-box-toggle {
  float: right;
  margin-right: 15px;
  cursor: pointer;
}
.chat-box-header {
  background: #e9262a;
  height: 70px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: white;
  text-align: center;
  font-size: 20px;
  padding-top: 17px;
}
.chat-box-body {
  position: relative;
  height: 370px;
  height: auto;
  border: 1px solid #ccc;
  overflow: hidden;
}
.chat-box-body:after {
  content: '';
  background-color: #fff;
  opacity: 0.1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  position: absolute;
  z-index: -1;
}
#chat-input {
  background: #f4f7f9;
  width: 100%;
  position: relative;
  height: 47px;
  padding-top: 10px;
  padding-right: 50px;
  padding-bottom: 10px;
  padding-left: 15px;
  border: none;
  resize: none;
  outline: none;
  border: 1px solid #ccc;
  color: #888;
  border-top: none;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  overflow: hidden;
}
.chat-input > form {
  margin-bottom: 0;
}
#chat-input::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #ccc;
}
#chat-input::-moz-placeholder {
  /* Firefox 19+ */
  color: #ccc;
}
#chat-input:-ms-input-placeholder {
  /* IE 10+ */
  color: #ccc;
}
#chat-input:-moz-placeholder {
  /* Firefox 18- */
  color: #ccc;
}
.chat-submit {
  position: absolute;
  bottom: 3px;
  right: 10px;
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: 50%;
  color: #e9262a;
  width: 35px;
  height: 35px;
}
.chat-logs {
  padding: 15px;
  height: 370px;
  overflow-y: scroll;
}

.chat-logs::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

.chat-logs::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}

.chat-logs::-webkit-scrollbar-thumb {
  background-color: #e9262a;
}

@media only screen and (max-width: 500px) {
  .chat-logs {
    height: 40vh;
  }
}

.msg-avatar {
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  display: unset;
}

.msg-avatar img {
  object-fit: cover;
}

.msg-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

.chat-msg.user > .msg-avatar img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  float: left;
  width: 15%;
}
.chat-msg.self > .msg-avatar img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  float: right;
  width: 15%;
}
.cm-msg-text {
  background: white;
  padding: 10px 15px 10px 15px;
  color: #666;
  max-width: 75%;
  float: left;
  margin-left: 10px;
  position: relative;
  margin-bottom: 20px;
  border-radius: 30px;
}
.chat-msg {
  clear: both;
}
.chat-msg.self > .cm-msg-text {
  float: right;
  margin-right: 10px;
  background: #e9262a;
  color: white;
}
.cm-msg-button > ul > li {
  list-style: none;
  float: left;
  width: 50%;
}
.cm-msg-button {
  clear: both;
  margin-bottom: 70px;
}
</style>
