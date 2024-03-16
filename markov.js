const _ = require('lodash')

class MarkovMachine {
    constructor(text) {
        this.words=text.match(/\S+/g)//text.split(/[\r\n]+/).filter(c => c !== "")
        this.makeChains()
    }    
    makeChains() {
        let chains = new Map()
        for (let i = 0; i < this.words.length; i++) {
            let word = this.words[i]
            let nextWord = this.words[i + 1] || null
            chains.has(word) ? chains.get(word).push(nextWord)
                             : chains.set(word, [nextWord])
        }
        this.chains = chains
    } 
    // static choice(A) {//random array's element
    //     return _.sample(A)//return A[Math.floor(Math.random()*A.length)]
    // }  
    generateMarkovText(numWords = 10) {/** return random text from chains */
        let key=_.sample(Array.from(this.chains.keys()))//MarkovMachine.choice(Array.from(this.chains.keys()))
        let out = []
        while (out.length < numWords && key) {
            out.push(key)
            key = _.sample(this.chains.get(key))//MarkovMachine.choice(this.chains.get(key))
        }
        return out.join(" ")
    }
}
module.exports = {MarkovMachine}

// const mm = new MarkovMachine('the cat in the hat')
// console.log(mm.words)//['the','cat','in','the','hat']
// console.log(mm.chains)//{'the'=>['cat','hat'],'cat'=>['in'],'in'=>['the'],'hat'=>[null]}
// console.log(mm.generateMarkovText())

// const mm1 = new MarkovMachine('a b c')
// console.log(mm1.words)//['a','b','c']
// console.log(mm1.chains)//{'a'=>['b'],'b'=>['c'],'c'=>[null]}
// console.log(mm1.generateMarkovText())