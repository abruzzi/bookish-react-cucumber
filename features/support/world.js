import puppeteer from 'puppeteer'
import { setWorldConstructor } from 'cucumber'

import ListPage from '../pages/ListPage'
import DetailPage from '../pages/DetailPage'

class CustomWorld {
  constructor() {
    this.browser = null
    this.listPage = null
    this.detailPage = null
  }

  async start() {
    this.browser = await puppeteer.launch({})
  }

  async gotoListPage() {
    this.listPage = new ListPage(this.browser)
    await this.listPage.initialize()
  }

  async gotoDetailPage(order) {
    this.detailPage = new DetailPage(this.browser, order)
    await this.detailPage.initialize()
  }

  async getDetailPage() {
    return this.detailPage
  }

  async getListPage() {
    return this.listPage
  }

  async close() {
    await this.browser.close()
  }
}

setWorldConstructor(CustomWorld)