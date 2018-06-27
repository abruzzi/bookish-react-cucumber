export default class DetailPage {
  constructor(page) {
    this.listPage = page;
  }

  async getDescription() {
    await this.listPage.waitForSelector('.description')
    const result = await this.listPage.evaluate(() => {
      return document.querySelector('.description').innerText
    })
    return result
  }

  async getUrl() {
    return await this.listPage.evaluate('location.href')
  }

  async addReview(review) {

    await this.listPage.waitForSelector('input[name="name"]')
    await this.listPage.type('input[name="name"]', review.name, {delay: 20})

    await this.listPage.waitForSelector('textarea[name="content"]')
    await this.listPage.type('textarea[name="content"]', review.content, {delay: 20})

    await this.listPage.waitForSelector('button[name="submit"]')
    await this.listPage.click('button[name="submit"]');
  }

  async getReview(index) {
    await this.listPage.waitForSelector('.review')
    const reviews = await this.listPage.evaluate(() => {
      return [...document.querySelectorAll('.review p')].map(el => el.innerText)
    })
    return reviews[index]
  }

  async getBooks() {
    await this.listPage.waitForSelector('.books')
    const books = await this.listPage.evaluate(() => {
      return [...document.querySelectorAll('.book .title')].map(el => el.innerText)
    })
    return books;
  }

  async search(keyword) {
    const input = await this.listPage.waitForSelector('input.search')
    await this.listPage.type('input.search', keyword, {delay: 20})
    return await this.listPage.screenshot({path: 'search-for-design.png'});
  }
}