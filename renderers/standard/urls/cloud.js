
import CloudPage from '../../../renderers/cloud.js'
  
export default {
  render: ({dataset=[], unfilteredDatasetSize}) => {
    return CloudPage.render({
        data: dataset,
        desc: `
# Relative Frequency by Unique URL (Standard Elements)
This page shows the relative frequency of pages containing each of the ${unfilteredDatasetSize} listed standard HTML elements from the HTTPArchive report. [
Learn More about the project](/).       
Click on a tag to zoom that tag to the max size.

${
    (unfilteredDatasetSize !== dataset.length) 
    ?
    `${unfilteredDatasetSize-dataset.length} elements occur more frequently than those shown, [see them all](/cloud/x/frequency)`
    :
    ''
}`
    })
  }
}

