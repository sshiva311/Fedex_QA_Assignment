/// <reference types='cypress' />
import { HomePage } from "../support/page-objects/HomePage";

const homePage = new HomePage();


describe('Home Page Test', () => {
  beforeEach("Verify HomePage Elements", () => {
    cy.visit('/');
    homePage.verifyHomePageHeader();
  })
  it('Verify Search by Full character name and Results', () => {
    homePage.radioButtonPeople.should("be.checked");
    cy.fixture('SearchData').then((data) => {
      for (let people of data.persons) {
        homePage.inputQuery.clear();
        homePage.inputQuery.type(people);
        homePage.buttonSearch.click();
        homePage.characterNames.should("have.length", 1).invoke("text").then((characterNames) => {
          expect(characterNames.trim()).equal(people);
        });
        homePage.verifyCharacterResults();
      }
    });

  })
  it('Verify Search by Full planet name and results', () => {
    homePage.radioButtonPlanets.click();
    cy.fixture('SearchData').then((data) => {
      for (let planet of data.planets) {
        homePage.inputQuery.clear()
        homePage.enterTextAndSearch(planet);
        homePage.planetNames.should("have.length", 1).invoke("text").then((planetNames) => {
          expect(planetNames.trim()).equal(planet)
        });
        homePage.verifyPlanetResults();
      }

    })

  })
  it('Verify Search by character and no results found', () => {
    homePage.radioButtonPeople.should("be.checked");
    cy.fixture('SearchData').then((data) => {
      homePage.enterTextAndSearch(data.invalidTextSearch);
    });
    homePage.verifyResultsNotFound();
  })
  it('Verify Search by planets and no results found', () => {
    homePage.radioButtonPlanets.click();
    cy.fixture('SearchData').then((data) => {
      homePage.enterTextAndSearch(data.invalidTextSearch);
    });
    homePage.verifyResultsNotFound();
  })

  //Additional flows
  it('Verify Search by character with results and switch to planet with results', () => {
    cy.fixture('SearchData').then((data) => {
      for (let people of data.persons) {
        homePage.inputQuery.clear();
        homePage.radioButtonPeople.click();
        homePage.enterTextAndSearch(people);
        homePage.verifyCharacterResults();
        homePage.radioButtonPlanets.click();
        homePage.buttonSearch.click();
        homePage.verifyResultsNotFound();
      }
    });
  })

  it('Verify Search by planet with results and switch to character with results', () => {
    cy.fixture('SearchData').then((data) => {
      for (let planet of data.planets) {
        homePage.inputQuery.clear();
        homePage.radioButtonPlanets.click();
        homePage.enterTextAndSearch(planet);
        homePage.verifyPlanetResults();
        homePage.radioButtonPeople.click();
        homePage.buttonSearch.click();
        homePage.verifyResultsNotFound();
      }
    });
  })

  it('Verify Search by characters and check for result count', () => {
    cy.fixture('SearchData').then((data) => {
      for (let person of data.personsMultiple) {
        homePage.inputQuery.clear();
        homePage.enterTextAndSearch(person);
        homePage.characterResults.should("have.length.gte", 1);
      }
    });

  })
  it('Verify Search by characters and partial match with multiple results', () => {
    cy.fixture('SearchData').then((data) => {
      for (let person of data.personsMultiple) {
        homePage.inputQuery.clear();
        homePage.enterTextAndSearch(person);
        homePage.characterNames.each((item) => {
          cy.wrap(item).contains(person, { matchCase: false })
        });
      }
    });
  })
  it('Verify Search by planets and check for result count', () => {
    cy.fixture('SearchData').then((data) => {
      for (let planet of data.planetsMultiple) {
        homePage.inputQuery.clear();
        homePage.radioButtonPlanets.click();
        homePage.enterTextAndSearch(planet);
        homePage.planetResults.should("have.length.gte", 1);
      }
    });

  })
  it('Verify Search by planets and partial match with multiple results', () => {
    cy.fixture('SearchData').then((data) => {
      for (let planet of data.planetsMultiple) {
        homePage.inputQuery.clear();
        homePage.radioButtonPlanets.click();
        homePage.enterTextAndSearch(planet);
        homePage.planetNames.each((item) => {
          cy.wrap(item).contains(planet, { matchCase: false })
        });
      }
    });
  })
  it('Verify Search by characters, clear and check for empty result', () => {
    cy.fixture('SearchData').then((data) => {
      homePage.inputQuery.clear();
      homePage.enterTextAndSearch(data.personsMultiple[0]);
      homePage.characterNames.each((item) => {
        cy.wrap(item).contains(data.personsMultiple[0], { matchCase: false })
      });
      homePage.inputQuery.clear();
      homePage.buttonSearch.click();
      homePage.characterNames.should('not.visible');
      homePage.planetNames.should('not.visible');

    });
  })
  it('Verify Search by planet, clear and check for empty result', () => {
    cy.fixture('SearchData').then((data) => {
      homePage.inputQuery.clear();
      homePage.radioButtonPlanets.click();
      homePage.enterTextAndSearch(data.planetsMultiple[0]);
      homePage.planetNames.each((item) => {
        cy.wrap(item).contains(data.planetsMultiple[0], { matchCase: false })
      });
      homePage.inputQuery.clear();
      homePage.buttonSearch.click();
      homePage.characterNames.should('not.visible');
      homePage.planetNames.should('not.visible');

    });
  })
})
