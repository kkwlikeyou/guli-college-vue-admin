import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default {
    //添加小节
    addVideo(video) {
        console.log(video)
        return request({
            url: `/eduService/edu-video/addVideo`,
            method: 'post',
            data: video
        })
    },
    //根据id查询章节
    getVideo(videoId) {
        return request({
            url: `/eduService/edu-video/getVideo/${videoId}`,
            method: 'get',
        })
    },
    //修改章节
    updateVideo(video) {
        return request({
            url: `/eduService/edu-video/updateVideo`,
            method: 'post',
            data: video
        })
    },
    //删除章节
    deleteVideo(videoId) {
        return request({
            url: `/eduService/edu-video/${videoId}`,
            method: 'delete',
        })
    }
}