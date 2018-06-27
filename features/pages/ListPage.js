import { APP_BASE_URL } from './constants'

export default class ListPage {
	constructor(browser) {
		this.browser = browser
	}
    async initialize() {
      this.listPage = await this.browser.newPage()
      await this.listPage.goto(`${APP_BASE_URL}/`)
		}

		getPage() {
	    return this.listPage
    }

    async getHeading() {
    	await this.listPage.waitForSelector('h1')
      return await this.listPage.evaluate(() => {
        return document.querySelector('h1').innerText
      });
    }

    async getBooks() {
	    await this.listPage.waitForSelector('.books')
      return await this.listPage.evaluate(() => {
        const elements = document.querySelectorAll('.book .title')
        return Array.prototype.slice.call(elements).map(el => el.innerText)
      });
    }

    async search(keyword) {
	    const input = await this.listPage.waitForSelector('input.search')
	    await this.listPage.type('input.search', keyword, {delay: 20})
	    return await this.listPage.screenshot({path: 'search-for-design.png'});
    }

    async gotoDetail(index) {
      await this.listPage.waitForSelector('a.view-detail')

      const links = await this.listPage.evaluate(() => {
        return [...document.querySelectorAll('a.view-detail')].map(el => el.getAttribute('href'))
      })

      await Promise.all([
        this.listPage.waitForNavigation({waitUntil: 'networkidle2'}),
        this.listPage.goto(`${APP_BASE_URL}${links[index]}`)
      ])
    }
}