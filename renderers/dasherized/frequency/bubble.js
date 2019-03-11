
import BubblePage from '../../../renderers/bubble.js'
  
export default {
  render: ({dataset=[], graphData={}, unfilteredDatasetSize}) => {
    return BubblePage.render({
        dataset,
        graphData,
        unfilteredDatasetSize,
        desc: `
# Relative Frequency by Unique Instance (Dasherized Elements)
This page shows the relative frequency of unique occurences of each of the ${unfilteredDatasetSize} listed standard HTML elements from the HTTPArchive report. [
Learn More about the project](/).       
Click on a tag to zoom that tag to the max size.

${
    (unfilteredDatasetSize !== dataset.length) 
    ?
    `${unfilteredDatasetSize-dataset.length } elements occur more frequently than those shown, [see them all](/bubble/standard/frequency)`
    :
    ''
}`
    })
  }
}

