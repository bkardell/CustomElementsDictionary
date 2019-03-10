import fs from 'fs'
import marked from 'marked'
  
export default {
  // todo: fix those names - they're based on pre-churned globals early on
  render: ({name, rec}) => {
    const metaPath = `./tags/${name}.json`
    let hasMeta = fs.existsSync(metaPath)
    let meta = (!hasMeta) 
                ?
                '<p>none available</p>' 
                : 
                fs.readFileSync(metaPath, 'utf-8') 
    return `
    <style>main { width: 80%; margin: 1rem auto; }</style>
    <main>
      <h1>Detail Data For <code>&lt;${name}&gt;</code></h1>
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
    `
  }
}

