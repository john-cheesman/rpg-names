# RPG Names

A simple command line interface for getting RPG charachter names from [genr8rs.com](http://genr8rs.com/Generator/Rpg/NameGenerator).

## Installation

    $ npm install rpg-names -g

## Usage

    $ rpg-names [options]

## Options

### Version

    $ rpg-names -V
    $ rpg-names --version

Output the version number

### Quantity

    $ rpg-names -q [number]
    $ rpg-names --quantity=[number]

The number of names to get, defaults to 10

### Output

    $ rpg-names -o [file]
    $ rpg-names --output=[file]

The file to output names to, defaults to names.txt

### Genre 

    $ rpg-names -g [genre]
    $ rpg-names --genre=[genre]

Either `fantasy` or `scifi`, defaults to `fantasy`

### Race

    $ rpg-names -r [race]
    $ rpg-names --race=[race]

Which race e.g. `human`, defaults to `any`. Only applies to `fantasy` genre. Must be one of:
- `any`
- `dragonborn`
- `dwarf`
- `elf`
- `gnome`
- `half_elf`
- `half_orc`
- `halfling`
- `human`
- `tiefling`

### Gender 

    $ rpg-names -G [gender]
    $ rpg-names --gender=[gender]

Either male or female, defaults to female

### First name only 

    $ rpg-names -f
    $ rpg-names --first-name-only

Just get first names and ommit second names, defaults to false

### Help 

    $ rpg-names -h
    $ rpg-names --help
 
Output usage information 
