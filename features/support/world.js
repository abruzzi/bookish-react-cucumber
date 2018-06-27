import puppeteer from 'puppeteer'
import { setWorldConstructor } from 'cucumber'

import ListPage from '../pages/ListPage'

class CustomWorld {
  constructor() {
    this.browser = null
    this.listPage = null
  }

  async start() {
    this.browser = await puppeteer.launch({})
  }

  async gotoListPage() {
    this.listPage = new ListPage(this.browser)
    await this.listPage.initialize()
  }

  async getListPage() {
    return this.listPage
  }

  async close() {
    await this.browser.close()
  }
}

setWorldConstructor(CustomWorld)