const parse = require('csv-parse/lib/sync')
const fs = require('fs')
const crypto = require('crypto')


const output = []

let input = fs.readFileSync('./http-archive-result.csv', 'utf8')

let csvRecords = parse(input, {
    columns: true,
    skip_empty_lines: true
  })
 
let data = {}

// We'll build this into a graph in which the object key
// is the tag name and the value is an object containing the 
// .total and .matches and .id properties
// The HTTPArchive csv itself records each use of tags+attribtues
// as unique, for purposes here we will group them together
// and include all in that tag's .total
// They may or may not be unique, so .matches contains the
// individual entries for further insights, and .id 
// contains a md5 hash of the contents for referencing
// thus it should be possible to talk about or reference 
// things both by tag name, or by specific instance
csvRecords.forEach(rec => {
    let match = rec.match
    let name = match.match(/[a-z]+-[a-z0-9_-]*\s+/i)[0].trim()
    rec.id = crypto.createHash('md5').update(JSON.stringify(rec)).digest('hex')
    data[name] = data[name] || { total: 0, matches: [] }
    data[name].total += parseInt(rec.num, 10)
    data[name].matches.push(rec)
}) 

// now that we have them all totaled, we actually want this in 
// a sorted order so, sort the keys
let keys = Object.keys(data)
keys.sort((a,b) => {
  console.log(data[a].total)
  if (data[a].total<data[b].total) return 1
  if (data[b].total<data[a].total) return -1
  return 0
})

// and build a new object adding them (inserted order)
let sortedData = {}
keys.forEach((key) => {
  sortedData[key] = data[key]
})

// write out the nice clean file
fs.writeFileSync('./imported-data.json', JSON.stringify(sortedData, null, 2), 'utf8')
