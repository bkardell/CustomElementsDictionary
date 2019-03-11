# Unabridged Markup Data
This is an experiment in thinking about how we can collect useful 'dictionary' information about markup and [their relation to standardization](https://bkardell.com/blog/Dropping-The-F-Bomb-On-Standards.html).  

The goal is to provide something like an unabridged dictionary with all of the standard words, and all of the slang words.  In the end, a lot like a dictionary, I hope that we can both turn to it to find that word we're looking for or as a source of data for discussing possible standardization.


# Where data comes from 
The actual 'index' of words would come from, ideally several sources, but currently it is based on the HTTPArchive dataset of the top 1.2 million sites or so.  This is not without well acknowledged biases but appearance in this dataset at least means it's found use that a lot of individuals are seeing.  So far, these are based on two reports generated from the HTTP Archive dataset: 
  * [One which reports on use of elements in the HTML Standard index](https://discuss.httparchive.org/t/use-of-html-elements/1438) (these include some defunct but once 'standard' elements).
  
  * [Another which is data about 'dasherized' elements](https://discuss.httparchive.org/t/use-of-custom-elements-with-attributes/1592) which contains csv data counting each dasherized element name that appears in the dataset and the attributes attributes attached to that.

Anyone anyone interested in helping this work can help research and contribute to useful metadata about these elements: Tagging them with keywords, possible sources, linking similar tags and so on.

# Exploring views
All of the URLS in this project are (currrently, tho this is entirely subject to change) follow a pattern of `[standard|dasherized|all]/[kind of data]/[kind of view]]` where kind of data is either "frequency" or "urls".  "frequency" is a meaure of the number of simple occurences whereas "urls" is a measure of urls containing that tag at least once.

# 'Top' tabular views 
You can explore simple tabular data and metadata about the 'top' tags via [https://brawny-force.glitch.me/tags](https://brawny-force.glitch.me/dasherized/tags) which also accepts a slash numeric to limit the results, for example the top 10  are [https://brawny-force.glitch.me/dasherized/tags/10](https://brawny-force.glitch.me/dasherized/tags/10).  

_TODO: Make this report available for standard elements too_

From there, you can click through to see a list of the individual uses/counts that it encountered in the dataset, as well as community contributed metadata (see How to Contribute).

# Tag Cloud with Relative Font Scaling
You can also view these where the tags are visually relatively scaled in relation to one another and 'zoom in' so that you can see the less popular tags (they get small fast).

* [https://brawny-force.glitch.me/cloud/standard/frequency](https://brawny-force.glitch.me/cloud/standard/frequency)
* [https://brawny-force.glitch.me/cloud/standard/urls](https://brawny-force.glitch.me/cloud/standard/urls)
* [https://brawny-force.glitch.me/cloud/dasherized/frequency](https://brawny-force.glitch.me/cloud/dasherized/frequency)

_TODO: Get urls data for dasherized and add that view_
_TODO: Add '/all/' views_

# Tag Bubbles
You can also view these as relatively scaled 'bubbles' which you can mouseover for actual frequency data or click through to zoom in

* [https://brawny-force.glitch.me/bubble/standard/frequency](https://brawny-force.glitch.me/bubble/standard/frequency)
* [https://brawny-force.glitch.me/bubble/dasherized/frequency](https://brawny-force.glitch.me/bubble/dasherized/frequency)

_see note on contributing views help_

_TODO: Add an 'all' view_
_TODO: Get data for dasherized urls/make these available for both urls views_


# What this is currently
This is currently an incredibly simplistic glitch which contains <a href="https://glitch.com/edit/#!/brawny-force?path=import-archive-csv.js">a script which imports the CSV files into something a little more useable</a> (though, currently different) and an Express server.js which currently just builds some very simple HTML strings right in the js, or serves the result of this README.  I'm trying to put it together so that we can get new versions of these files and regenerate new analysis pretty easily - ultimately I will probably make this a static generator and archive the results with each update of these so we can compare over time.



# How to Contribute
This glitch (https://glitch.com/edit/#!/brawny-force) is linked to [https://github.com/bkardell/CustomElementsDictionary](https://github.com/bkardell/CustomElementsDictionary).  If you want to make this better, in any way, feel free to remix, open an issue or send a pull request. For example, you could:

  * Offer visualization/view ideas.  I am very much an SVG amature and the bubble views are not great, and mostly are a poor attempt to adapt a pen that [https://twitter.com/girlie_mac](Tomomi Imura) posted a long time ago.
  * Help put what is currently a couple of hours thought into something a bit more manageable/well thought out
  * Open an issue/feature request about how to make it better
  * There is a folder in the project `/tags` which can include a `.json` file corresponding to whatever metadata we can attach to a tag.  You can create an issue listing some metadata to add if you can identify one of these, made it, have information about what it is, etc - or even better, send a pull request adding or modifying one!



