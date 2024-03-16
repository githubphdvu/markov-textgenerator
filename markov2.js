const _ = require('lodash')

class MarkovMachine {//Textual markov chain generator using bigrams
    constructor(text) {
        this.words=text.match(/\S+/g)//text.split(/[\r\n]+/).filter(c => c !== "")
        this.makeChains()
    }    
    makeChains() {
        let chains = new Map()
        for (let i = 0; i < this.words.length - 1; i++) {
            let bigram = this.words[i] + " " + this.words[i + 1]
            let nextWord = this.words[i + 2] || null;
            chains.has(bigram) ? chains.get(bigram).push(nextWord)
                             : chains.set(bigram, [nextWord])
        }
        this.chains = chains
    }
    // static choice(A) {//random array's element
    //     return _.sample(A)//return A[Math.floor(Math.random()*A.length)]
    // } 
    generateMarkovText(numWords = 10) {
        let key =_.sample(Array.from(this.chains.keys()))//this.choice(Array.from(this.chains.keys()))
        let out = []
        while (out.length <= numWords && key) {
            let [w1, w2] = key.split(" ")
            out.push(w1)
            key = w2 + " " + _.sample(this.chains.get(key))//MarkovMachine.choice(this.chains.get(key))
        }
        return out.join(" ")
    }
}
module.exports = {MarkovMachine}