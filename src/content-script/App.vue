<template>
  <div class="fixed ">
    <div v-if="config" class="side-bar-wrapper " :class="{ active: show }">
      <!--monkey btn-->
      <div class="left-btns">
        <el-tooltip
                content="Hi~I'm Dance Monkey🎵!"
                effect="light"
                placement="top"
        >
          <div
                  class="monkey"
                  :class="{ active: show }"
                  @click="show = !show"
          ></div>
        </el-tooltip>
        <template v-if="video">
          <div>
            <el-button
              type="primary"
              plain
              round
              @click="
                $store.commit('SET_SHOW_TYPE', 'video');
                show = true;
              "
              >扒舞
            </el-button>
          </div>
          <div v-if="showSpeedBtns" style="margin-left: 10px;">
            <el-button
              :plain="!playing"
              @click="$store.commit('SET_PLAYING', !playing)"
              type="primary"
              size="small"
              round
              >{{ playing ? "暂停" : "播放" }}
            </el-button>
          </div>
          <!--speed btns-->
          <div v-if="showSpeedBtns" v-for="i in speedList" style="margin-left: 10px;">
            <el-button
              @click="$store.commit('SET_SPEED', i)"
              size="small"
              :plain="$store.state.speed != i"
              round
              type="primary"
              >x {{ i | speed }}
            </el-button>
          </div>
        </template>

        <div>
          <el-button
            type="primary"
            plain
            round
            @click="
              $store.commit('SET_SHOW_TYPE', 'list');
              show = true;
            "
            >历史
          </el-button>
        </div>
        <div>
          <el-button
            type="primary"
            plain
            round
            @click="
              $store.commit('SET_SHOW_TYPE', 'info');
              show = true;
            "
            >信息
          </el-button>
        </div>
      </div>

      <!--			<el-tooltip :content="show?'点我关闭哟~':'点我扒舞吧~'" placement="top" effect="light">-->
      <!--			</el-tooltip>-->
      <el-card
        class="box-card panel"
        :body-style="{
          padding: '0 15px 100px 30px',
          height: `calc(100% - 100px)`,
          overflowY: 'scroll'
        }"
      >
        <div v-if="showType === 'list'">
          <list></list>
        </div>
        <div v-else-if="showType === 'video'">
          <control></control>
        </div>
        <div v-else-if="showType === 'info'">
          <error class="info">
            <p>
              Hi~ 这里是
            </p>
            <p>
              <b
                ><a href="https://space.bilibili.com/14759305"
                  >vita2333_瓶子</a
                ></b
              >
            </p>
            <p style="margin-top: 30px;">
              如果你对这个插件有任何问题, 欢迎给我提
              <a
                href="https://github.com/vita2333/Chrome-extension-dance-monkey"
                >issue</a
              >, 或者在B站私信我~
            </p>
            <p style="margin-top: 30px;">感谢支持~ :)</p>
          </error>
          <error>
            <h3>
              快捷键一览:
            </h3>
            <p>全屏播放时此插件不再显示,可以通过键盘快捷键使用这些功能~</p>
            <div style="margin-top: 20px;">
              <p>windows:</p>
              <p><b> ctrl+shift+↑</b> <span>加速</span></p>
              <p><b> ctrl+shift+↓</b> <span>减速</span></p>
              <p><b> alt+shift+↑</b> <span>跳转上个片段</span></p>
              <p><b> alt+shift+↓</b> <span>跳转下个片段</span></p>
              <p style="margin-top: 20px;">mac</p>
              <p><b> command+shift+↑</b> <span>加速</span></p>
              <p><b> command+shift+↓</b> <span>减速</span></p>
              <p><b> option+shift+↑</b> <span>跳转上个片段</span></p>
              <p><b> option+shift+↓</b> <span>跳转下个片段</span></p>
            </div>
          </error>
        </div>
      </el-card>
    </div>
    <div v-else>
      配置加载失败...
    </div>
  </div>
</template>

<script>
  import Control from './components/Control';
  import { mapGetters, mapState } from 'vuex';
  import ElementUI from 'element-ui';
  import Vue from 'vue';
  // import 'element-ui/lib/theme-chalk/index.css';
  import '../element/index.css';
  import './main.less';
  import List from './components/List';
  import { speedList } from '../utils/types';
  import { getVideoDom } from '../utils/bilibili';
  
  Vue.use(ElementUI);

export default {
  name: "App",
  components: { Control, List },
  data() {
    return {
      show: false,
      video: false
    };
  },
  computed: {
    ...mapState(["config", "list", "showType", "playing"]),
    ...mapGetters(['vid', 'showSpeedBtns']),
    speedList() {
      return speedList;
    }
  },
  mounted() {
    this.video = getVideoDom();
  },
  methods: {}
};
</script>

<style scoped lang="less">
.fixed {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1001;
  height: 100vh;
}

.side-bar-wrapper {
  transition: all 0.5s linear;
  position: absolute;
  right: -320px;
  top: 0;
  width: 320px;
  height: 100%;
  
  &.active {
    transition: all 0.5s linear;
    transform: translate(-320px, 0);
  }
}

.left-btns {
  position: absolute;
  left: -40px;
  z-index: 1002;
  padding-top: 30px;
  
  > div {
    margin-top: 15px;
  }
}

.monkey {
  padding: 30px;
  background-image: url("chrome-extension://__MSG_@@extension_id__/assets/monkey.png");
  background-size: 60px 100%;
  background-repeat: no-repeat;

  &:hover {
    background-image: url("chrome-extension://__MSG_@@extension_id__/assets/monkey-wu.png");
  }
}

.panel {
  position: relative;
  width: 320px;
  height: 100vh;
}

.el-button {
  margin-left: -15px;
}
</style>

<style>
/*[class*=" el-icon-"], [class^="el-icon-"] {*/
/*	font-size: 30px;*/
/*}*/
</style>
