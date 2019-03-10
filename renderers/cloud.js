

import marked from 'marked'
  
export default {
  render: ({desc="", data=[]}) => {
    return `
      <main>
        ${marked(desc)}
        <hr>
        ${
          data
            .map(rec => {
              return `<a href="${rec.url}" ><span style="margin: 2rem; font-size: ${rec.scaledValue}px;">${rec.tag}</span></a>` 
            })
            .join(' ')
        }
      </main>
    `
  }
}

