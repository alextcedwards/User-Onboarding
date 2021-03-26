describe("Form app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  const nameInput = () => cy.get("input[name=name]");
  const emailInput = () => cy.get("input[name=email");
  const pwInput = () => cy.get("input[name=password");
  const tosInput = () => cy.get("input[name=termsOfService");
  const submitBtn = () => cy.get("button[id=button]");

  it("sanity check to make sure our tests work", () => {
    //assertions
    expect(1 + 1).to.equal(2);
  });

  it("check", () => {
    nameInput().should("exist");
    nameInput().type("Alex");
    emailInput().type("tony@tony.com");
    pwInput().type("hello");
    tosInput().click();
    submitBtn().click();

    it("if input is empty", () => {
      nameInput()
        .should("have.value", "")
        .type("test")
        .should("have.value", "test");
    });
  });
});
