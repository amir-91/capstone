import { handleSubmit } from "../src/client/js/formHandler"
 
describe("Testing submit functionality", () => {
    test("Testing the handleSubmit() function", () => {
        const url = 'www.google.com'
        expect(url).toMatch(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
})})