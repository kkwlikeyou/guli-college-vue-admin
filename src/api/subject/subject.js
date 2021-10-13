import request from '@/utils/request'

export default {
    getSubjectList() {
        return request({
            url: '/eduService/edu-subject/getAllSubject',
            method: 'get'
        })
    },
}
