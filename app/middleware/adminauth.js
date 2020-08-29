const url = require('url')

module.exports = options => {
  return async function adminauth(ctx, next) {
    const { pathname } = url.parse(ctx.request.url)

    console.log(`---> ${pathname}`)

    if (ctx.session.userInfo) {
      // todo validate user privilege
      await next()
    } else {
      // exclude not validate privilege page
      if (
        pathname === '/admin/code' ||
        pathname === '/admin/login' ||
        pathname === '/admin/doLogin'
      ) {
        await next()
      } else {
        ctx.redirect('/admin/login')
      }
    }
  }
}