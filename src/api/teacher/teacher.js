import request from '@/utils/request'

export default {
  getTeacherListPage(page, limit, teacherQuery) {
    return request({
      url: `/eduService/edu-teacher/pageTeacherCondition/${page}/${limit}`,
      method: 'post',
      data: teacherQuery
    })
  },
  deleteTeacherById(id) {
    return request({
      url: `eduService/edu-teacher/deleteTeacherById/${id}`,
      method: 'delete'
    })
  },
  addTeacher(teacher) {
    return request({
      url: `eduService/edu-teacher/save`,
      method: 'post',
      data: teacher
    })
  },
  getTeacherInfo(id) {
    return request({
      url: `eduService/edu-teacher/getById/${id}`,
      method: 'get',
    })
  },
  updateById(teacher) {
    return request({
      url: `eduService/edu-teacher/updateById`,
      method: 'post',
      data: teacher
    })
  }
}
