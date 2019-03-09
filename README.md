# Unabridged Markup Data
This is an experiment in thinking about how we can collect useful information about custom elements and their relation to standardization.

The idea here is to collect data and information about custom elements in the wild and their use, and also their comparative use with standard elements.  There are two reports generated from the HTTP Archive dataset: 
  * [One which reports on use of elements in the HTML Standard index](https://discuss.httparchive.org/t/use-of-html-elements/1438) (these include some defunct but once 'standard' elements).
  
  * [Another which is data about 'dasherized' elements](https://discuss.httparchive.org/t/use-of-custom-elements-with-attributes/1592) which contains csv data counting each dasherized element name that appears in the dataset and the attributes attributes attached to that.

The idea here is to create a space to collaboratively analyze that data and provide helpful or useful insights that link these to their possible or definitive sources, their licenses (if applicable) and attach other various metadata about them.  This could be useful on both ends of things:  To help increase adoption/discovery of things already in the top million and give them useful metadata about it (popularize the slang), or drive future standardization decisions.

# Exploring tags
_All of these URLs are subject to change._

You can explore data via [/tags](https://brawny-force.glitch.me/tags) which also accepts a slash numeric to limit the results, for example the top 10  are [/tags/10](https://brawny-force.glitch.me/tags/10).  From there, you can click through to see a list of the individual uses/counts that it encountered in the dataset.

I'm also toying with a few visualization of these on some urls that will probably change.  These ones currently scale a sorted list of the standard elements by either frequency (count of all occurences) or URLs (percentage of urls with those tags)

* [https://brawny-force.glitch.me/cloud/standard/frequency](https://brawny-force.glitch.me/cloud/standard/frequency)
* [https://brawny-force.glitch.me/cloud/standard/urls](https://brawny-force.glitch.me/cloud/standard/urls)
* [https://brawny-force.glitch.me/bubble/standard/frequency](https://brawny-force.glitch.me/bubble/standard/frequency)

This one does the same for the one datapoint we currently have for dasherized elements
* [https://brawny-force.glitch.me/cloud/dasherized/frequency](https://brawny-force.glitch.me/cloud/dasherized/frequency)
* There isn't one for URLs (yet) as we don't have that data

I'd love to get a similar dataset run for both and be able to come up with good ways to look at the combined set, for example...

* /cloud/all/urls would be an excellent dataset to have, I'm not sure visualizing will be tremendously helpful, but a similar tabular form would be 

# What this is currently
This is currently an incredibly simplistic glitch which contains <a href="https://glitch.com/edit/#!/brawny-force?path=import-archive-csv.js">a script which imports the CSV files into something a little more useable</a> (though, currently different) and an Express server.js which currently just builds some very simple HTML strings right in the js, or serves the result of this README.  I'm trying to put it together so that we can get new versions of these files and regenerate new analysis pretty easily - ultimately I will probably make this a static generator and archive the results with each update of these so we can compare over time.



# Helping out
This glitch (https://glitch.com/edit/#!/brawny-force?path=README.md:15:27) is linked to [https://github.com/bkardell/CustomElementsDictionary](https://github.com/bkardell/CustomElementsDictionary), so if you want to make this better, in any way, feel free to remix, open an issue or send a pull request. For example, you could:

  * Offer visualization/view ideas
  * Help put what is currently a couple of hours thought into something a bit more manageable/well thought out
  * Open an issue/feature request about how to make it better
  * There is a folder in the project `/tags` which can include a `.json` file corresponding to whatever metadata we can attach to a tag.  You can create an issue listing some metadata to add if you can identify one of these, made it, have information about what it is, etc - or even better, send a pull request adding or modifying one!



