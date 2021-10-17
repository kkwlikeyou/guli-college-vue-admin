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

    //课程确认信息的显示
    getPublishCourseInfo(courseId) {
        return request({
            url: `/eduService/edu-course/getPublishCourseInfo/${courseId}`,
            method: 'get',
        })
    },

    publishCourse(courseId) {
        return request({
            url: `/eduService/edu-course/publishCourse/${courseId}`,
            method: 'put',
        })
    },
    //课程列表多条件分页查询
    //page：当前页，limit：每页记录数，teacherQuery：条件对象
    getCourseListPage(page, limit, courseQuery) {
        return request({
            url: `/eduService/edu-course/pageCoursePageCondition/${page}/${limit}`,
            method: 'post',
            //teacherQuery条件对象，如果后端使用RequestBody获取数据
            //data表示把对象转换成json对象进行传递到接口里
            data: courseQuery
        })
    },

    //课程列表数据查询
    getCourseList() {
        return request({
            url: `/eduService/edu-course/coursePageList`,
            method: 'get',
        })
    },

    removeCourse(courseId) {
        return request({
            url: `/eduService/edu-course/${courseId}`,
            method: 'delete',
        })
    }

}