#! /usr/bin/env node

const program = require('commander')
const axios = require('axios')
const fs = require('fs')
const endpoint = 'https://api.genr8rs.com/Content/Rpg/NameGenerator'

program
    .version('1.1.0')
    .option('-q, --quantity [number]', 'The number of names to get, defaults to 10')
    .option('-o, --output [file]', 'The file to output names to, defaults to names.txt')
    .option('-g, --genre [genre]', 'Either fantasy or scifi, defaults to fantasy')
    .option('-r, --race [race]', 'Which race e.g. human, defaults to any')
    .option('-G, --gender [gender]', 'Either male or female, defaults to female')
    .option('-f, --first-name-only', 'Just get first names and omit second names, defaults to false')
    .parse(process.argv)

const quantity = parseInt(program.quantity, 10) || 10
const output = program.output || 'names.txt'
const genre = program.genre || 'fantasy'
const race = program.race || 'any'
const gender = program.gender || 'female'
const firstNameOnly = program.firstNameOnly || false

async function getName(genre, race, gender) {
    let name = ''

    try {
        name = await axios.get(`${endpoint}?_sGenre=${genre}&_sRace=${race}&_sGender=${gender}`)
    }
    catch(err) {
        console.err("Error: " + err.message)
    }

    return name
}

async function getNames() {
    let promises = []
    let names = []

    for (let i = 0; i < quantity; i++) {
        promises.push(getName(genre, race, gender))
    }
    
    let responses = await Promise.all(promises)

    responses.forEach(response => {
        let name = response.data._sResult

        if (firstNameOnly) {
            name = name.split(' ')[0]
        }

        names.push(name)
    })

    writeNames(names.join(','))
}

function writeNames(names) {
    fs.writeFile(output, names, (err) => {
        if (err) throw err
        console.log(`${quantity} ${quantity === 1 ? 'name was' : 'names were'} writen to ${output}`)
    })
}

getNames()
