import {checkUrl} from "../src/client/js/checkUrl"

describe("Testing checking functionality", () => {
    test("Testing the checkurl() function", (url) => {
        expect(url).toMatch(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
})})