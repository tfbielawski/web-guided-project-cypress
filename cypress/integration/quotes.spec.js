// write tests here
describe('Quotes App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:61293')
    })

    const textInput = () => cy.get('input[name=text]')
    const authorInput = () => cy.get('input[name=author]')
    const foobarInput = () => cy.get('input[name=foobar]')
    const submitBtn = () => cy.get('button[id=submitBtn]')
    const cancelBtn = () => cy.get('button[id=cancelBtn]')

    it('sanity check to make sure tests work', () => {
        expect(1+2).to.equal(3)
        expect(2 + 2).not.to.equal(5)
        /**
         * const obj = {}
         * const obj2 = {}
         * obj === obj2
         * obj == obj2 
         */
        expect({}).not.to.equal({}) // {} === {}
        expect({}).to.eql({}) // {} == {}
    })

    it('the proper elements are showing', () => {
        textInput().should('exist')
        authorInput().should('exist')
        foobarInput().should('not.exist')
        submitBtn().should('exist')
        cancelBtn().should('exist')

        cy.contains('Submit Quote').should('exist')
        cy.contains(/submit quote/i).should('exist')
    })

    describe('Filling out the inputs and cancelling', () => {
        it('can navigate to the site', () => {
            cy.url().should('include', 'localhost')
        })

        it('submit button starts out disabled', () => {
            submitBtn().should('be.disabled')
        })

        it('can type in the inputs', () => {
            textInput()
                .should('have.value', '')
                .type('Be nice to the CSS expert')
                .should('have.value', 'Be nice to the CSS expert')
            authorInput()
                .should('have.value', '')
                .type('Steve')
                .should('have.value', 'Steve')
        })

        it('the submit button enables when both inputs are filled out', () => {
            authorInput().type('Steve')
            textInput().type('Have fun!')
            submitBtn().should('not.be.disabled')
        })

        it('the cancel button can reset the inputs and disable the submit button', () => {
            authorInput().type('Steve')
            textInput().type('Have fun!')
            cancelBtn().click()
            textInput().should('have.value', '')
            authorInput().should('have.value', '')
            submitBtn().should('be.disabled')
        })
    })

    describe('Adding a new quote', () => {
        it('can submit and delete a new quote', () => {
            textInput().type('Have fun!')
            authorInput().type('Steve')
            submitBtn().click()

            // cy.contains('Have fun!').siblings('button:nth-of-type(2)').click()
            cy.contains('Have fun!').next().next().click()
            cy.contains('Have fun!').should('not.exist')
        })
    })

    describe('Editing an existing quote', () => {
        it('can edit a quote', () => {
            typeStuff()
            submitBtn().click()
            cy.contains('Use Postman').next().click()
            // cy.contains('Use Postman').siblings('button:nth-of-type(1').click()
            textInput().type(' all the time')
            authorInput().type(' McSteve')
            submitBtn().click()

            cy.contains('Use Postman all the time')

            cy.contains('Use Postman all the time').next().next().click()
            // cy.contains('Use Postman all the time').siblings('button:nth-of-type(2)').click()
            cy.contains('Use Postman all the time').should('not.exist')
        })
    })
})