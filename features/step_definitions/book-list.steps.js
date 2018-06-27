import { Before, After, Given, When, Then } from 'cucumber'
import { expect } from 'chai'

Before(async function() {
  await this.start()
})

Given(/^I am a bookish user$/, function () {

})

When(/^I open the "([^"]*)" page$/, async function (page) {
  if(page === 'list') {
    await this.gotoListPage(page)
  }
});

Then(/^I can see the title "([^"]*)" is showing$/, async function (title) {
  const page = await this.getListPage()
  const heading = await page.getHeading()
  expect(heading).to.eql(title);
})

After(async function() {
  await this.close()
})