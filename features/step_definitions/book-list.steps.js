import { Before, After, Given, When, Then } from 'cucumber'
import axios from 'axios'

import { expect } from 'chai'

import { APP_BASE_URL } from '../pages/constants'

Before(async function() {
  await this.start()
})

Before(async function() {
  const books = [
    {"name": "Refactoring", "id": 1, "description": "Refactoring"},
    {"name": "Domain-driven design", "id": 2, "description": "Domain-driven design"},
    {"name": "Building Micro-service", "id": 3, "description": "Building Micro-service"}
  ]

  await books.map(item => axios.post('http://localhost:8080/books', item, {headers: { 'Content-Type': 'application/json' }}))
})

After(async function() {
  await axios.delete('http://localhost:8080/books?_cleanup=true').catch(err => err)
})

Given(/^I am a bookish user$/, function () {
  // left empty for now
})

When(/^I open the "([^"]*)" page$/, async function (page) {
  await this.gotoListPage()
})

When(/^I open the book detail page with id "([^"]*)"$/, async function (order) {
  await this.gotoDetailPage(order)
})

Then(/^I can see the description "([^"]*)" is showing$/, async function (description) {
  const detailPage = await this.getDetailPage()
  const url = await detailPage.getUrl()
  expect(url).to.eql(`${APP_BASE_URL}/books/1`)

  const desc = await detailPage.getDescription()
  expect(desc).to.eql(description)
})

Then(/^I can see the title "([^"]*)" is showing$/, async function (title) {
  const page = await this.getListPage()
  const heading = await page.getHeading()
  expect(heading).to.eql(title);
})

When(/^I add a review to that book$/, async function (table) {
  const reviews = table.hashes()
  const detailPage = await this.getDetailPage()
  await detailPage.addReview(reviews[0])
})

Then(/^I can see it shows beneath the description section$/, function () {

})

Then(/^the content is "([^"]*)"$/, async function (content) {
  const detailPage = await this.getDetailPage()
  const result = await detailPage.getReview(0)
  expect(result).to.eql(content);
})

Then(/^I can see "([^"]*)" books$/, async function (number) {
  const page = await this.getListPage()
  const books = await page.getBooks()
  expect(books.length).to.eql(parseInt(number))
});

Then(/^there are$/, async function (table) {
  const page = await this.getListPage()
  const books = await page.getBooks()

  const actual = table.rows().map(x => x[0])

  expect(books).to.include.members(actual);
});

When(/^I typed "([^"]*)" to perform a search$/, async function (keyword) {
  const page = await this.getListPage()
  await page.search(keyword);
});

Then(/^I should see "([^"]*)" book is matched$/, async function (number) {
  const page = await this.getListPage()
  const books = await page.getBooks();
  expect(books.length).to.eql(parseInt(number))
});

Then(/^its name is "([^"]*)"$/, async function (name) {
  const page = await this.getListPage()
  const books = await page.getBooks();
  expect(books[0]).to.eql(name)
});

After(async function() {
  await this.close()
})