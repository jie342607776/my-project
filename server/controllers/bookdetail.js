const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const {id} = ctx.request.query
    const info = await mysql('books')
        .where('id', id)
        .select('books.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
        .first()
    const user = JSON.parse(info.user_info)
    ctx.state.data = Object.assign({}, info, {
        tags: info.tags.split(','),
        summary: info.summary.split('\n'),
        user_info: {
            name: user.nickName,
            image: user.avatarUrl
        }
    })
    await mysql('books')
        .where('id', id)
        .increment('count', 1)
}
