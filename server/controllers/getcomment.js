const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const {bookid, openid} = ctx.request.query
    const res = mysql('comments')
        .select('comments.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
    let comments
    if (bookid) {
        comments = await res.where('bookid', bookid)
    }
    if (openid) {
        comments = await res.where('openid', openid)
    }
    ctx.state.data = {
        list: comments.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                nickName: info.nickName,
                avatar: info.avatarUrl
            })
        })
    }
}
