'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/login', controller.admin.login.index)
  router.get('/admin/doLogin', controller.admin.login.doLogin)

  router.get('/admin/code', controller.admin.base.code)

  router.get('/manager', controller.admin.manager.index)
  router.get('/manager/add', controller.admin.manager.add)
  router.get('/manager/edit', controller.admin.manager.edit)
  router.get('/manager/delete', controller.admin.manager.delete)
};
