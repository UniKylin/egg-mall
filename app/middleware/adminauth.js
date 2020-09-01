const url = require('url')

module.exports = options => {
  return async function adminauth(ctx, next) {
    // set csrf token
    ctx.state.csrf = ctx.csrf
    console.log(`---> csrf: ${ctx.csrf}`)

    const { pathname } = url.parse(ctx.request.url)
    console.log(`---> ${pathname}`)

    if (ctx.session.userInfo) {
      ctx.state.userInfo = ctx.session.userInfo
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