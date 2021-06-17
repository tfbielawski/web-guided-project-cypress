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
})