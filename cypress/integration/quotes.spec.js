//Describe block takes 2 params, app + callback
describe("Quotes App", () =>
{
    //Code to run before tests run
    beforeEach(() =>
    {
        //Load the localhost
        cy.visit("http://localhost:1234");

    });

    //Declare functions to test the inputs and buttons
    const textInput = () =>  cy.get('input[name = "text"]');
    const authorInput = () =>  cy.get('input[name = "author"]');
    const submitBtn = () => cy.get('button[id = "submitBtn"]');
    const cancelBtn = () => cy.get('button[id = "cancelBtn"]');


     //"IT" has two parameters, a string and a callback
    //Sanity test
    it("Sanity tests", () => 
    {
        //Expect is an assertion, there can be many
        //per test inside the "it". Group together
        expect(1 + 2).to.equal(3);
        expect(2 * 3).to.equal(6);

        //Not equal assertion
        expect(2 + 2).not.to.equal(6);

        //Object literal
        expect({}).not.to.equal({}); // ==  not strict equality
        expect({}).to.eql({});       //===  strict equality
    });

    //"IT" has two parameters, a string and a callback
    //Test DOM elements
    it("testing DOM elements", () =>
    {
        //Get input from DOM with name "text"
        //Pay attention to single vs double quotes here vv
        //Can use any valid css selector
        
        /**Look inside the JSX element breakdown for homework */
        
        //Should exist
        textInput().should("exist");
        authorInput().should("exist");
        submitBtn().should("exist");
        cancelBtn().should("exist");
        
        //Should not exist
        cy.get('input[name = "fubar"]').should("not.exist");

        //Contains, searches for a string
        //can use /string/ +i instead of "". add i for case insensitive
        cy.contains("Submit Quote");
        cy.contains(/submit quote/i); 

    });

    /**Input field testing */
    it("can type in the inputs", () =>
    {
        //Get inputs, assert that they are empty,
        //type them in, assert typed chars present

        //Tests any input name text field. Should start with " " value
         //Chain the functions
        textInput()
          //Should have empty string
          .should("have.value", "")
          //Tests by inserting a string
          .type("Testing Cypress Inputs")
          //Tests that our test string is present
          .should("have.value", "Testing Cypress Inputs");

          //Author field testing
        authorInput()
          //Should have empty string
          .should("have.value", "")
          //Tests by inserting a string
          .type("Michael Crichton")
          //Tests that our test string is present
          .should("have.value", "Michael Crichton");
    });

    //Test submit button disabled
    it("submit button disabled until form filled", () =>
    {
        //1. Set up sanity checks: are initial states expected?
        //2. Act: type or click
        //3. Assert: test the action that has the desired effect

        /* Flow for the text field */
        //Button should be = disabled
        submitBtn().should("be.disabled");
        //Attempt to type in TEXT field 
        textInput().type("TEXT INPUT");
        //Should still be disabled
        submitBtn().should("be.disabled");
        //Clear the field
        textInput().clear();
        //Attempt to type in AUTHOR field 
        authorInput().type("AUTHOR INPUT");
        //Should still be disabled
        submitBtn().should("be.disabled");
        //Attempt to type in TEXT field again
        textInput().type("TEXT INPUT");
        //Should no longer be disabled
        submitBtn().should("not.be.disabled");

    });

    /* Cancel Button*/
    it("can cancel a quote", () =>
    {
        //Test typing in fields
        textInput().type("TEXT INPUT");
        authorInput().type("AUTHOR INPUT");

        //When the cancel button is clicked..
        cancelBtn().click();
        //...the fields should be empty
        authorInput().should("have.value", "");
        textInput().should("have.value", "");
    });

    /* Submit Button*/
    it("can cancel a quote", () =>
    {
        //1.Test string is NOT in the DOM
        //2. Create a test string
        //3. Assert that the test string IS in the DOM

        //Test string should not exist
        cy.contains("This is a (test String).").should("not.exist");
        //Test typing in fields
        textInput().type("This is a");
        authorInput().type("test String");

        //When the submit button is clicked...
        submitBtn().click();
        //...test string DOES exist
        cy.contains("This is a (test String).").should("exist");
        
    });

});
