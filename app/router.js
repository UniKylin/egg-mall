'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);


  router.get('/manager', controller.admin.manager.index)
  router.get('/manager/add', controller.admin.manager.add)
  router.get('/manager/edit', controller.admin.manager.edit)
  router.get('/manager/delete', controller.admin.manager.delete)
};