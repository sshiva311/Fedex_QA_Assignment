/// <reference types='cypress' />
import { staticTexts } from "../constants"

export class HomePage {

  //Page Objects
  get radioButtonPeople() {
    return cy.get(`[data-testid="people-radio-btn"]`)
  };
  get radioButtonPlanets() {
    return cy.get(`[data-testid="planets-radio-btn"]`)
  };
  get buttonSearch() {
    return cy.get(`[data-testid="search-btn"]`)
  };
  get inputQuery() {
    return cy.get(`[data-testid="input-query"]`)
  };
  get textHomePageTitle() {
    return cy.get(`[data-testid="home-page-title"]`)
  };
  get characterNames() {
    return cy.get(`[data-testid="character-names"]`)
  };
  get planetNames() {
    return cy.get(`[data-testid="planet-names"]`)
  };
  get resultsNotFound() {
    return cy.get(`[data-testid="results-not-found"]`)
  };
  //Character Results
  get characterResults() {
    return cy.get('[data-testid="character-results"]')
  };
  get textGender() {
    return cy.get(`[data-testid="gender"]`)
  };
  get characterGender() {
    return cy.get(`[data-testid="gender-character"]`)
  };
  get textBirthYear() {
    return cy.get(`[data-testid="birth-year"]`)
  };
  get characterBirth() {
    return cy.get(`[data-testid="birth-year-character"]`)
  };
  get textEyeColor() {
    return cy.get(`[data-testid="eye-color"]`)
  };
  get characterEyeColor() {
    return cy.get(`[data-testid="eye-color-character"]`)
  };
  get textSkinColor() {
    return cy.get(`[data-testid="skin-color"]`)
  };
  get characterSkinColor() {
    return cy.get('[data-testid="skin-color-character"]')
  };
  // Planet Results
  get planetResults() {
    return cy.get('[data-testid="planet-results"]')
  };
  get textPopulation() {
    return cy.get('[data-testid="population"]')
  };
  get planetPopulation() {
    return cy.get('[data-testid="planet-population"]')
  };
  get textClimate() {
    return cy.get('[data-testid="climate"]')
  };
  get planetClimate() {
    return cy.get(`[data-testid="planet-climate"]`)
  };
  get textGravity() {
    return cy.get(`[data-testid="gravity"]`)
  };
  get planetGravity() {
    return cy.get(`[data-testid="planet-gravity"]`)
  };

  //Page Actions
  //Verifying HomePage header elements

  verifyHomePageHeader() {
    this.radioButtonPeople
      .should("be.visible");
    this.radioButtonPlanets
      .should("be.visible");
    this.buttonSearch
      .should("be.visible");
    this.inputQuery
      .should("be.visible");
    this.textHomePageTitle
      .should("be.visible");
    this.textHomePageTitle.should("have.text", staticTexts.titleText);
  }

  //Verify Character Results
  verifyCharacterResults() {
    // TODO verify label have text and values not empty
    this.textGender.should("be.visible").and("have.text", staticTexts.labelGender);
    this.characterGender.should("not.be.empty");
    this.textBirthYear.should("be.visible").and("have.text", staticTexts.labelBirthYear);
    this.characterBirth.should("not.be.empty");
    this.textEyeColor.should("be.visible").and("have.text", staticTexts.labelEyeColor);
    this.characterEyeColor.should("not.be.empty");
  }

  //Verify Planets results
  verifyPlanetResults() {
    // TODO verify label have text and values not empty
    this.textPopulation.should("be.visible").and("have.text", staticTexts.labelPopulation);
    this.planetPopulation.should("not.be.empty");
    this.textClimate.should("be.visible").and("have.text", staticTexts.labelClimate);
    this.planetClimate.should("not.be.empty");
    this.textGravity.should("be.visible").and("have.text", staticTexts.labelGravity);
    this.planetGravity.should("not.be.empty");

  }
  verifyResultsNotFound() {
    this.resultsNotFound.should("be.visible").and("have.text", staticTexts.resultsNotFound);
  }

  enterTextAndSearch(text: string) {
    this.inputQuery.type(`${text}{enter}`);
  }




  //Verifying HomePage footer elements

  //Verify sidebar - popular tags section


}
