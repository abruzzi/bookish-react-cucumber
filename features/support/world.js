import puppeteer from 'puppeteer'
import { setWorldConstructor } from 'cucumber'

import ListPage from '../pages/ListPage'

class CustomWorld {
  constructor() {
    this.browser = null
    this.page = null
  }

  async start() {
    this.browser = await puppeteer.launch({})
  }

  async gotoPage(page) {
    if(page === 'list') {
      this.page = new ListPage(this.browser)
      await this.page.initialize()
    }
  }

  async currentPage() {
    return this.page
  }

  async close() {
    await this.browser.close()
  }
}

setWorldConstructor(CustomWorld)