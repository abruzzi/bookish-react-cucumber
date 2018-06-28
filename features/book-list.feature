Feature: Book List
  As a reader
  I want to see books in trend
  So I can learn that what to read next

  Scenario: Heading
    Given I am a bookish user
    When I open the "list" page
    Then I can see the title "Bookish" is showing

  Scenario: Book List
    Given I am a bookish user
    When I open the "list" page
    Then I can see "3" books
    And there are
      | name                   |
      | Refactoring            |
      | Domain-driven design   |
      | Building Micro-service |

  Scenario: Search by keyword
    Given I am a bookish user
    When I open the "list" page
    And I typed "design" to perform a search
    Then I should see "1" book is matched
    And its name is "Domain-driven design"
