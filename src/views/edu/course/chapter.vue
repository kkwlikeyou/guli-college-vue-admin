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
    <el-button type="text" @click="openChapterDialog">添加章节</el-button>

    <ul class="chapterList">
      <li v-for="chapter in chapterVideoList" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button type="text" @click="openEditVideo(chapter.id)"
              >添加小节</el-button
            >
            <el-button type="text" @click="openEditChapter(chapter.id)"
              >编辑</el-button
            >
            <el-button type="text" @click="deleteChapter(chapter.id)"
              >删除</el-button
            >
          </span>
        </p>

        <ul>
          <li v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}
              <span class="acts">
                <el-button type="text" @click="openEditVideo(video.id)"
                  >编辑</el-button
                >
                <el-button type="text" @click="deleteVideo(video.id)"
                  >删除</el-button
                >
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <div>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
          >下一步</el-button
        >
      </div>
      <!-- 添加和修改章节表单 -->
      <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
        <el-form :model="chapter" label-width="120px">
          <el-form-item label="章节标题">
            <el-input v-model="chapter.title" />
          </el-form-item>
          <el-form-item label="章节排序">
            <el-input-number v-model="chapter.sort" :min="0" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <!-- 添加和修改课时表单 -->
      <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
        <el-form :model="video" label-width="120px">
          <el-form-item label="课时标题">
            <el-input v-model="video.title" />
          </el-form-item>
          <el-form-item label="课时排序">
            <el-input-number v-model="video.sort" :min="0" />
          </el-form-item>
          <el-form-item label="是否免费">
            <el-radio-group v-model="video.isFree">
              <el-radio :label="0">免费</el-radio>
              <el-radio :label="1">默认</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="上传视频">
            <!-- TODO -->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
          <el-button
            :disabled="saveVideoBtnDisabled"
            type="primary"
            @click="saveOrUpdateVideo"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import chapter from "@/api/chapter";
import video from "@/api/video";
export default {
  data() {
    return {
      saveVideoBtnDisabled: false,
      saveBtnDisabled: false,
      chapterVideoList: [],
      courseId: "",
      dialogChapterFormVisible: false,
      dialogVideoFormVisible: false,
      video: {
        // 课时对象
        title: "",
        sort: 0,
        isFree: 1,
        videoSourceId: "",
      },
      chapter: {
        title: "",
        sort: 0,
      },
    };
  },
  methods: {
    deleteVideo(videoId) {
      this.$confirm("此操作将永久删除小节记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        video.deleteVideo(videoId).then((resp) => {
          this.dialogVideoFormVisible = false;
          this.$message({
            type: "success",
            message: "删除小节成功",
          });
          this.getChapterVideo();
        });
      });
    },
    openEditVideo(videoId) {
      this.dialogVideoFormVisible = true;
      this.video.videoId = videoId;
      video.getVideo(videoId).then((resp) => {
        this.video = resp.data.videoInfo;
      });
    },

    saveOrUpdateVideo() {
      if (this.video.id) {
        this.updateVideo();
      } else {
        this.addVideo();
      }
    },
    updateVideo() {
      video.updateVideo(this.video).then((resp) => {
        this.dialogVideoFormVisible = false;
        this.$message({
          type: "success",
          message: "修改小节成功",
        });
        this.getChapterVideo();
      });
    },
    addVideo() {
      this.video.courseId = this.courseId;
      video.addVideo(this.video).then((resp) => {
        this.dialogVideoFormVisible = false;
        this.$message({
          type: "success",
          message: "添加章节成功",
        });
        this.getChapterVideo();
        this.video = "";
      });
    },

    deleteChapter(chapterId) {
      this.$confirm("此操作将永久删除章节记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        chapter.deleteChapter(chapterId).then((resp) => {
          this.dialogChapterFormVisible = false;
          this.$message({
            type: "success",
            message: "删除章节成功",
          });
          this.getChapterVideo();
        });
      });
    },
    updateChapter() {
      chapter.updateChapter(this.chapter).then((resp) => {
        this.dialogChapterFormVisible = false;
        this.$message({
          type: "success",
          message: "修改章节成功",
        });
        this.getChapterVideo();
      });
    },
    openEditChapter(chapterId) {
      this.dialogChapterFormVisible = true;
      chapter.getChapter(chapterId).then((resp) => {
        this.chapter = resp.data.chapter;
      });
    },
    addChapter() {
      this.chapter.courseId = this.courseId;
      chapter.addChapter(this.chapter).then((resp) => {
        this.dialogChapterFormVisible = false;
        this.$message({
          type: "success",
          message: "添加章节成功",
        });
        this.getChapterVideo();
      });
    },
    openChapterDialog() {
      this.dialogChapterFormVisible = true;
      this.chapter.title = "";
      this.chapter.sort = 0;
    },
    saveOrUpdate() {
      if (this.chapter.id) {
        this.updateChapter();
      } else {
        this.addChapter();
      }
    },
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
<style scoped>
.chapterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chapterList li {
  position: relative;
}
.chapterList p {
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chapterList .acts {
  float: right;
  font-size: 14px;
}
.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>