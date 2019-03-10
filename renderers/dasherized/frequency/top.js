import marked from 'marked'
  
export default {
  // todo: fix those names - they're based on pre-churned globals early on
  render: (data, allTags, limit) => {
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
}

