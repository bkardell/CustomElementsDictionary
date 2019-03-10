// server.js
// where your node app starts

// init project
import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import cloudPage from './renderers/cloud.js'
import bubblePage from './renderers/bubble.js'
import DasherizedTopTabularPage from './renderers/dasherized/frequency/top.js'
import DasherizedFrequencyCloudPage from './renderers/dasherized/frequency/cloud.js'
import StandardFrequencyCloudPage from './renderers/standard/frequency/cloud.js'
import StandardURLsCloudPage from './renderers/standard/urls/cloud.js'


var app = express()
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

app.get('/bubble/standard/frequency', function (request, response) {
  // sort by freq
  stdElementsData.sort((a, b) => {
    if (a.frequency < b.frequency) return 1
    if (b.frequency < a.frequency) return -1
    return 0
  })
  let max = stdElementsData[0].frequency
  let simpleData = {}
  stdElementsData.forEach(data => {
    simpleData[data.tag] = 
        ((data.frequency/max) * 150)
  })
  response.send(
    bubblePage.render(stdElementsData, simpleData)
  )
})


// datasets passed to cloud render fns [{ tag, url, scaledValue }]
 
app.get('/cloud/dasherized/frequency', function (request, response)  {
  // it is inconvenient that we churn these into two diff forms, 
  // we should probably just normalize this upfront
  let dataset = allTags.map(tag => {
     return {
          tag, 
          url:  `/cloud/dasherized/frequency?zoom=${data[tag].total}`,
          total: data[tag].total 
     }
  })
  
  if (request.query.zoom) {
    dataset = dataset.filter(rec=> rec.total <= request.query.zoom)
  }
  
  let max = dataset[0].total
  
  dataset.forEach(rec => {
    rec.scaledValue = 
      Math.max(
        ((rec.total/max) * 150), 
        4
      )
  })
                     
  response.send(
    DasherizedFrequencyCloudPage.render({
      dataset,
      unfilteredDatasetSize: allTags.length
    })
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
  response.send(
    DasherizedTopTabularPage.render(
      data,
      allTags,
      parseInt(request.params.top, 10)
    )
  )
});

app.get('/tags/', (request, response) => {
  response.send(DasherizedTopTabularPage.render(
      data,
      allTags
    ))
})


function sortStandardElementsByFrequency() {
  stdElementsData.sort((a, b) => {
    if (a.frequency < b.frequency) return 1
    if (b.frequency < a.frequency) return -1
    return 0
  })
}

function sortStandardElementsByURLs() {
  stdElementsData.sort((a, b) => {
    if (a.urls < b.urls) return 1
    if (b.urls < a.urls) return -1
    return 0
  })
}

app.get('/cloud/standard/urls', function (request, response)  {
  // sort the data
  sortStandardElementsByURLs()

  // take a copy
  let dataset = [...stdElementsData]
  
  // use a subset if applicable
  if (request.query.zoom) {
    dataset = dataset.filter(rec=> rec.urls <= request.query.zoom)
  }
  let max = dataset[0].urls
  
  dataset = dataset.map(rec => {
      rec.url = `/cloud/standard/urls?zoom=${rec.urls}`
      rec.scaledValue = Math.max(
        (rec.urls/max * 150)
        ,
        4
      )
      return rec
  })
  
  response.send(
    StandardURLsCloudPage.render({
        dataset,
        unfilteredDatasetSize: stdElementsData.length
    })
  )
})
  

app.get('/cloud/standard/frequency', function (request, response)  {
  // sort the data
  sortStandardElementsByFrequency()

  // take a copy
  let dataset = [...stdElementsData]
  
  // use a subset if applicable
  if (request.query.zoom) {
    dataset = dataset.filter(rec=> rec.frequency <= request.query.zoom)
  }
  let max = dataset[0].frequency
  
  dataset = dataset.map(rec => {
      rec.url = `/cloud/standard/frequency?zoom=${rec.frequency}`
      rec.scaledValue = Math.max(
        (rec.frequency/max * 150)
        ,
        4
      )
      return rec
  })
  
  /* title and desc are markdown friendly */
  response.send(
    StandardFrequencyCloudPage.render({
        dataset,
        unfilteredDatasetSize: stdElementsData.length
    })
  )
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
