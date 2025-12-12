Feature: Motor Vehicle Stamp Duty Calculator

  Scenario: Calculate stamp duty for a business vehicle
    Given I am on the Service NSW Stamp Duty page
    When I click the Check online button
    Then I should be redirected to the Revenue NSW motor vehicle calculator page
    When I complete the stamp duty form with valid business data
    And I submit the calculation
    Then the stamp duty result popup should display correct details


