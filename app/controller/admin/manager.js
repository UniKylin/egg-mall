'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = '<h1>manager index</h1>';
  }

  async add() {
    this.ctx.body = `<h1>manager add....</h1>`
  }

  async edit() {
    this.ctx.body = `<h1>manager edit....</h1>`
  }

  async delete() {
    this.ctx.body = `<h1>manager delete....</h1>`
  }
}

module.exports = ManagerController;
