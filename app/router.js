'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/admin/login', controller.admin.login.index)
  router.post('/admin/doLogin', controller.admin.login.doLogin)
  router.get('/admin/logout', controller.admin.login.logout)

  router.get('/admin/code', controller.admin.base.code)

  router.get('/admin/manager', controller.admin.manager.index)
  router.get('/admin/manager/add', controller.admin.manager.add)
  router.get('/admin/manager/edit', controller.admin.manager.edit)
  router.get('/admin/manager/delete', controller.admin.manager.delete)
};
