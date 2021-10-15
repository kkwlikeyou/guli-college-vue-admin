import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default {
    //添加课程信息功能
    addCourseInfo(courseInfo) {
        return request({
            url: "/eduService/edu-course/addCourseInfo",
            method: 'post',
            data: courseInfo,
        })
    },
    //查询所有讲师
    getListTeacher() {
        return request({
            url: "/eduService/edu-teacher/findAll",
            method: 'get',
        })
    },
   
 
    //根据课程id查询课程基本信息
    getCourseInfo(id) {
        return request({
            url: `/eduService/edu-course/getCourseInfo/${id}`,
            method: 'get',
        })
    },
       //修改课程信息
    updateCourseInfo(courseInfo) {
        return request({
            url: `/eduService/edu-course/updateCourseInfo`,
            method: 'post',
            data: courseInfo,
        })
    },

}