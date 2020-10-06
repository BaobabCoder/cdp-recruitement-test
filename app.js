const data = require('./data').data;

const filterArgument = '--filter';
const filter = process.argv.find(arg => arg.startsWith(filterArgument));

let results = data;
if(!!filter) {
    const filterValue = filter.split('=')[1].toLowerCase();
    let duplicatedData = JSON.parse(JSON.stringify(data));
    results = duplicatedData.map(country => {
        country.people = country.people.map(person => {
            person.animals = person.animals.filter(
                animal => animal.name.toLowerCase().indexOf(filterValue) > -1
            );
            person.name = person.name + ' [' + person.animals.length + ']';
            return person;       
        }).filter(person => person.animals.length > 0);
        country.name = country.name + ' [' + country.people.length + ']';
        return country;
    }).filter(country => country.people.length > 0);
}
console.dir(results, {depth: null, colors: true});