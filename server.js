// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs')
var data = JSON.parse(fs.readFileSync('./imported-data.json', 'utf8'))
var stdElementsData = JSON.parse(fs.readFileSync('./imported-standard-element-data.json', 'utf8'))

const allTags = Object.keys(data)
const allStdTags = stdElementsData.map(item => item.tag)

app.use(bodyParser.urlencoded({ extended: true }));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.send(`
      <style>
        body { width: 80%; margin: 1rem auto; }
      </style>
      ${
          require('marked')(
            fs.readFileSync('./README.md', 'utf8')
          )
        }
    `)
});

function listTags(limit) {
  let out = `
    <style>
      main { width: 500px; min-width: 50%; margin: 1rem auto; }
      table { width: 100%; }
      th, td { text-align: left; padding: 0.5rem; }
      tr:nth-child(even) { background-color: #cfcfcf; }
      .num { text-align: right; }
    </style>
    <main>
      <h1>${(limit) ? `Top ${limit}` : ''} Tags and Total Occurences</h1>
      <p>This page presents a view of information from 
          <a href="https://discuss.httparchive.org/t/use-of-custom-elements-with-attributes/1592">a report
          generated from the HTTPArchive</a> about the use of dasherized (custom) elements in 
          it's dataset of the 'most popular' 1.2 million or so sites. <a href="/">Learn more</a></p>
      <table>
        <tr>
          <th>Element</th>
          <th class="num">Occurences</th>
        </tr>
    `

  let tags = allTags
  if (limit) {
    tags = allTags.slice(0, limit)
  }
  tags.forEach((tag) => {
    out += `
      <tr>
        <td><code>&lt;<a href="/tags/details/${tag}">${tag}</a>&gt;</code></td>
        <td class="num">${data[tag].total}</td>
      </tr>
    `
  })
  out += '</table></main>'
  return out
}

function makeCloudPage(title, desc="", cloudData) {
  return `
    <main>
      <h1>${title}</h1>
      ${desc}
      <hr>
      ${cloudData}
    </main>
  `
}

app.get('/cloud/standard/frequency', function (request, response)  {
  stdElementsData.sort((a, b) => {
    if (a.frequency < b.frequency) return 1
    if (b.frequency < a.frequency) return -1
    return 0
  })

  let max = stdElementsData[0].frequency
  let cloud = stdElementsData.map(rec => {
     return `<span style="margin: 2rem; font-size: ${
       Math.max(
        ((rec.frequency/max) * 150), 
       4
       )}px;">${rec.tag}</span> ` 
  }).join('')
  
  response.send(
    makeCloudPage(
      'Relative frequency: Standard Elements',
      '<p>This page shows the relative frequency of HTML elements from the HTTPArchive report. <a href="/">Learn More about the project.</a>.</p>',
      cloud)
  )
})

app.get('/cloud/standard/urls', function (request, response)  {
  stdElementsData = stdElementsData.sort((a, b) => {
    if (a.urls < b.urls) return 1
    if (b.urls < a.urls) return -1
    return 0
  })

  let max = stdElementsData[0].urls
  let cloud = stdElementsData.map(rec => {
     return `<span style="margin: 2rem; font-size: ${
       Math.max(
        ((rec.urls/max) * 150), 
       4
       )}px;">${rec.tag}</span> ` 
  }).join('')
  
  response.send(
    makeCloudPage(
      'URL frequency: Standard Elements',
      '<p>This page shows the relative use of HTML elements on unique URLs from the HTTPArchive report. <a href="/">Learn More about the project.</a>.</p>',
      cloud)
  )
})


app.get('/cloud/dasherized/frequency', function (request, response)  {
  let max = data[allTags[0]].total
  
  let cloud = allTags.map(tag => {
     return `<span style="margin: 1rem; font-size: ${
        Math.max(
        ((data[tag].total/max) * 150), 
       4
       )}px;">${tag}</span>`
  }).join('')
  
  
  response.send(
    makeCloudPage(
      'Relative frequency: Dasherized Elements',
      '<p>This page shows the relative frequency of dasherized elements from the HTTPArchive report. <a href="/">Learn More about the project.</a>.</p>',
      cloud)
  )
})


app.get('/tags/details/:name', function(request, response) {
  let rec = data[request.params.name]
  const metaPath = `./tags/${request.params.name}.json`
  let hasMeta = fs.existsSync(metaPath)
  let meta = (!hasMeta) 
              ?
              '<p>none available</p>' 
              : 
              fs.readFileSync(metaPath, 'utf-8') 
  
  response.send(`
    <style>main { width: 80%; margin: 1rem auto; }</style>
    <main>
      <h1>Detail Data For <code>&lt;${request.params.name}&gt;</code></h1>
      <p>This page presents a view of information from 
        <a href="https://discuss.httparchive.org/t/use-of-custom-elements-with-attributes/1592">a report
        generated from the HTTPArchive</a> about the use of dasherized (custom) elements in 
        it's dataset of the 'most popular' 1.2 million or so sites. See also <a href="/tags">the complete list 
        with totals.</a></p>
        <section>
          <h1>Meta Info</h1>
          <pre>${meta}</pre>
          <p>Learn how you can <a href="/#helping-out">submit some and help out</a>.</p>
        </section>
      <section>
        <h1>Individual Data from Report</h1>
        <pre>${
            JSON.stringify(rec, null, 4)
              .replace(/[\<]/gi, '&lt;')
              .replace(/[\>]/gi, '&gt;')
              .replace(/\\n /gi, ' ')
            }</pre>
    </main>
    `)
});

app.get('/tags/:top', function(request, response) {
  console.log('params', request.params.top)
  response.send(listTags(parseInt(request.params.top, 10)))
});

app.get('/tags/', (request, response) => {
  response.send(listTags())
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
