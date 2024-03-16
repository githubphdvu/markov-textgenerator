const { MarkovMachine } = require("./markov")

describe('', ()=> {
    test('', ()=> {
        expect(new MarkovMachine("the cat in the hat").chains).toEqual(new Map([["the",["cat","hat"]],["cat",["in"]],["in",["the"]],["hat",[null]]]))})
    test('generates semi-predictable text',()=>{
        const mm=new MarkovMachine("a b c")
        expect(["b","c",'b c','a b c']).toContain(mm.generateMarkovText())
    })

    test('generates valid text', ()=> {
        let bigrams = ["the cat", "cat in", "in the", "the hat", "hat "]
        let mm = new MarkovMachine("the cat in the hat")
        let output = mm.generateMarkovText()

        let outputWords = mm.generateMarkovText().split(/[ \r\n]+/)

        for (let i = 0; i < outputWords.length - 1; i++) {
            expect(bigrams).toContain(outputWords[i] + " " + outputWords[i + 1])
        }
    })

    test('cuts off at length', ()=> {
        let bigrams = ["the cat", "cat in", "in the", "the hat", "hat "]
        let mm = new MarkovMachine("the cat in the hat")
        let output = mm.generateMarkovText(2)

        let outputWords = output.split(/[ \r\n]+/)
        expect([1, 2]).toContain(outputWords.length)
    })
})
