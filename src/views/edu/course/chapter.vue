<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="2"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <ul>
      <li v-for="chapter in chapterVideoList" :key="chapter.id">
        {{ chapter.title }}
        <ul>
          <li v-for="video in chapter.children" :key="video.id">
            {{ video.title }}
          </li>
        </ul>
      </li>
    </ul>

    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
          >下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import chapter from "@/api/chapter";
export default {
  data() {
    return {
      saveBtnDisabled: false,
      chapterVideoList: [],
      courseId: "",
    };
  },
  methods: {
    //跳转到上一步
    previous() {
      this.$router.push({ path: "/course/info/" + this.courseId });
    },
    next() {
      //跳转到第三步
      this.$router.push({ path: "/course/publish/" + this.courseId });
    },
    getChapterVideo() {
      chapter.getAllChapterVideo(this.courseId).then((resp) => {
        this.chapterVideoList = resp.data.allChapterVideo;
      });
    },
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      this.getChapterVideo();
    }
  },
};
</script>
