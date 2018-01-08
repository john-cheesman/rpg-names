#! /usr/bin/env node

const program = require('commander')
const https = require('https')
const fs = require('fs')
const endpoint = 'https://api.genr8rs.com/Generator/Rpg/NameGenerator'

program
    .version('1.0.0')
    .option('-q, --quantity [number]', 'The number of names to get, defaults to 10')
    .option('-o, --output [file]', 'The file to output names to, defaults to names.txt')
    .option('-g, --genre [genre]', 'Either fantasy or scifi, defaults to fantasy')
    .option('-r, --race [race]', 'Which race e.g. human, defaults to any')
    .option('-G, --gender [gender]', 'Either male or female, defaults to female')
    .option('-f, --first-name-only', 'Just get first names and ommit second names, defaults to false')
    .parse(process.argv)

const quantity = parseInt(program.quantity, 10) || 10
const output = program.output || 'names.txt'
const genre = program.genre || 'fantasy'
const race = program.race || 'any'
const gender = program.gender || 'female'
const firstNameOnly = program.firstNameOnly || false

function getName(genre, race, gender, names) {
    let data = '',
        name = ''

    https.get(`${endpoint}?_sGenre=${genre}&_sRace=${race}&_sGender=${gender}`, (resp) => {
        resp.on('data', (chunk) => {
            data += chunk
        })

        resp.on('end', () => {
            name = JSON.parse(data)._sResult

            if (firstNameOnly) {
                name = name.split(' ')[0]
            }

            getNames(names, name)
        })
    }).on("error", (err) => {
        console.err("Error: " + err.message)
    })

    return data
}

let names = []

function getNames(names, name) {
    if (name && names.indexOf(name) < 0) {
        names.push(name)
    }

    if (names.length < (program.quantity || 10)) {
        getName(genre, race, gender, names)
    }
    else {
        writeNames(names.join(','))
    }
}

function writeNames(names) {
    fs.writeFile(output, names, (err) => {
        if (err) throw err
        console.log(`${quantity} ${quantity === 1 ? 'name was' : 'names were'} writen to ${output}`)
    })
}

getNames(names)
