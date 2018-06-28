Feature: Book List
  As a reader
  I want to see detail for a particular book
  So I can make the decision whether to buy it more easily

  Scenario: Book Detail
    Given I am a bookish user
    When I open the book detail page with id "1"
    Then I can see the description "Refactoring" is showing

  Scenario: Write a review
    Given I am a bookish user
    When I open the book detail page with id "1"
    And I add a review to that book
      | name       | content          |
      | Juntao Qiu | Excellent works! |
    Then I can see it shows beneath the description section
    And the content is "Excellent works!"