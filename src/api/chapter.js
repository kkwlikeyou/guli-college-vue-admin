import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default {
    //根据课程id获取章节和小节数据列表
    getAllChapterVideo(courseId) {
        return request({
            url: `/eduService/edu-chapter/getChapterVideo/${courseId}`,
            method: 'get',
        })
    },
    //添加章节
    addChapter(chapter) {
        console.log(chapter)
        return request({
            url: `/eduService/edu-chapter/addChapter`,
            method: 'post',
            data: chapter
        })
    },
    //根据id查询章节
    getChapter(chapterId) {
        return request({
            url: `/eduService/edu-chapter/getChapterInfo/${chapterId}`,
            method: 'get',
        })
    },
    //修改章节
    updateChapter(chapter) {
        return request({
            url: `/eduService/edu-chapter/updateChapter`,
            method: 'post',
            data: chapter
        })
    },
    //删除章节
    deleteChapter(chapterId) {
        return request({
            url: `/eduService/edu-chapter/${chapterId}`,
            method: 'delete',
        })
    }
}