<template>
  <div>
    <div class="main_container">
      <div class="main_content">
        <div class="header">
          <div class="search">
            <img class="header_img" src="../assets/search.png" />
            <input type="text" placeholder="搜索" />
          </div>
        </div>
        <div class="main_tab">
          <mt-navbar v-model="selected">
            <mt-tab-item id="0">全部</mt-tab-item>
            <mt-tab-item
              v-for="(items, i) in categories"
              :key="i"
              :id="items.ty1id"
              >{{ items.type_name }}</mt-tab-item
            >
          </mt-navbar>

          <!-- tab-container -->
          <mt-tab-container>
            <mt-tab-container-item>
              <div
                class="container_border"
                v-for="(items, i) in partTickets"
                :key="i"
                :id="items.tkid"
                @click="selectPartTicket(items.tkid)"
              >
              <router-link :to="`/ticketDetails?tkid=${items.tkid}`">
                <div class="container_content">
                  <div class="container_border_left">
                    <img class="container_img" src="../assets/1.jpg" />
                  </div>
                  <div class="container_border_right">
                    <div class="content_title">{{ items.title }}</div>
                    <div class="content_time">2021.3.22-2021.3-31</div>
                    <div class="content_position">{{ items.position }}</div>
                    <div class="content_ticket">
                      <div class="sellTickets">
                        <span v-if="items.tk_state == 1">售票中</span>
                        <span v-else>已售空</span>
                        <span>{{ items.tk_price }}元</span>
                      </div>
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </router-link>
              </div>
            </mt-tab-container-item>
          </mt-tab-container>
        </div>
      </div>
    </div>
    <mt-tabbar v-model="selected1" fixed>
      <mt-tab-item id="shouye">
        <img
          v-if="selected1 == 'shouye'"
          slot="icon"
          src="../assets/common/index_0.png"
          alt=""
        />
        <img v-else slot="icon" src="../assets/common/index_1.png" alt="" />
        首页
      </mt-tab-item>
      <mt-tab-item id="dingpiao">
        <img
          v-if="selected1 == 'dingpiao'"
          slot="icon"
          src="../assets/common/ticket_0.png"
          alt=""
        />
        <img v-else slot="icon" src="../assets/common/ticket_1.png" alt="" />
        订票</mt-tab-item
      >
      <mt-tab-item id="me">
        <img
          v-if="selected1 == 'me'"
          slot="icon"
          src="../assets/common/me_0.png"
          alt=""
        />
        <img v-else slot="icon" src="../assets/common/me_1.png" alt="" />
        我的</mt-tab-item
      >
    </mt-tabbar>
  </div>
</template>
 
<script>
export default {
  name: "home",
  data() {
    return {
      selected: "0",
      selected1: "dingpiao",
      categories: [],
      tickets: [],
      partTickets: [],
    };
  },
  mounted() {
    this.loadTypesItems();
    this.loadTicketsItems();
    this.axios.get("/allTickets").then((res) => {
      console.log(res);
      this.partTickets = res.data.results;
    });
    //this.selectPart()
  },
  methods: {
    loadTypesItems() {
      this.axios.get("/category").then((res) => {
        console.log(res);
        this.categories = res.data.results;
      });
    },

    /** 加载文章列表   */
    loadTicketsItems() {
      // 通过axios  发送ajax请求，访问类别列表
      this.axios.get("/allTickets").then((res) => {
        console.log(res);
        this.tickets = res.data.results;
      });
    }
  },

  watch: {
    //监听器
    selected1(newvalue) {
      //newvalue是selected的新值
      if (newvalue == "shouye") {
        this.$router.push("/index");
      } else if (newvalue == "dingpiao") {
        this.$router.push("/order");
      } else if (newvalue == "me") {
        this.$router.push("/me");
      }
    },

    //监听器
    selected(newvalue) {
      console.log(newvalue);
      //newvalue是selected的新值
      if (newvalue == 0) {
        this.axios.get("/allTickets").then((res) => {
          console.log(res);
          this.partTickets = res.data.results;
        });
      } else {
        this.axios
          .post("/allTicketsByTypeId", `typeId=${newvalue}`)
          .then((res) => {
            console.log(res);
            this.partTickets = res.data.results;
          });
      }
      console.log(`typeId=${newvalue}`);
    },
  },
};
</script>
 
<style lang="css" scoped>
@media (min-width: 320px) {
  .main_container{
    margin: 0 0 60px;
  }
  .header {
    height: 40px;
    background-color: #a80000;
    position: relative;
  }

  .search {
    height: 100%;
    position: relative;
    line-height: 40px;
    width: 80%;
    margin-left: 15%;
  }
  .search input {
    position: absolute;
    height: 60%;
    top: 14%;
    width: 70%;
    padding-left: 10%;
    border: 1px solid #faad00;
    border-radius: 5px;
  }

  .header_img {
    position: absolute;
    z-index: 10;
    left: 0%;
    top: 8%;
    width: 2rem;
    height: 2rem;
  }

  .search input {
    position: absolute;
    height: 60%;
    top: 14%;
    width: 70%;
    padding-left: 10%;
    border: 1px solid #faad00;
    border-radius: 5px;
  }

  .item {
    display: inline-block;
  }

  .nav {
    padding: 10px;
  }

  .link {
    color: inherit;
    padding: 20px;
    display: block;
  }
  .container_border {
    border: 1px solid rgb(136, 133, 133);
    padding: 2%;
    margin: 4% 0;
  }
  .container_content {
    width: 100%;
    display: flex;
  }
  .container_border_left {
    height: 100%;
    width: 30%;
    margin: auto auto;
  }
  .container_border_right {
    margin-left: 2%;
    width: 70%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  .container_img {
    width: 100%;
  }
  .content_title {
    font-weight: bolder;
    font-size: 120%;
    margin-bottom: 2%;
  }
  .content_time {
    font-size: 80%;
    margin-bottom: 2%;
  }
  .content_position {
    font-size: 80%;
    margin-bottom: 2%;
  }
  .content_ticket {
    width: 100%;
    height: 100%;
    margin: auto auto;
    display: flex;
    margin-bottom: 2%;
  }
  .sellTickets {
    width: 100%;
    height: 25%;
    line-height: 170%;
  }
  .sellTickets span:first-child {
    color: #a80000;
    border: 1px solid red;
    border-radius: 10px;
    margin-right: 2%;
  }
  .container_border a{
    color: #000;
  }
}
@media (min-width: 375px) {
}
@media (min-width: 768px) {
  .container_border {
    font-size: 160%;
  }
  .header_img {
    width: 4rem;
    height: 4rem;
    top: 4%;
  }

  .search input {
    font-size: 140%;
  }
}

@media (min-width: 1000px) {
  .container_border {
    font-size: 210%;
  }
}
</style>