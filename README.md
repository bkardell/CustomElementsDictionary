# CustomElementsData
Thinking about how we can collect and do useful things with information about custom elements

The idea here is to collect data and information about custom elements in the wild and their use.  There is a [report generated from the HTTPArchive](https://discuss.httparchive.org/t/use-of-custom-elements-with-attributes/1592) which contains csv data counting each dasherized element name that appears in the dataset and the attributes attributes attached to that.

The idea here is to create a space to collaboratively analyze that data and provide helpful or useful insights that link these to their possible or definitive sources, their licenses (if applicable) and attach other various metadata about them.  This could be useful to help drive future standardization, or just to help people find potentially useful custom elements and guage something about how reviewed they are and so on.

You can explore data via [/tags](https://brawny-force.glitch.me/tags) which also accepts a slash numeric to limit the results, for example the top 10  are [/tags/10](https://brawny-force.glitch.me/tags/10).  From there, you can click through to see a list of the individual uses/counts that it encountered in the dataset.

This is currently an incredibly simplistic glitch which contains <a href="https://glitch.com/edit/#!/brawny-force?path=import-archive-csv.js">a script which imports the CSV file into something a little more useable</a> and an Express server.js which currently just builds some very simple HTML strings right in the js, or serves the result of this README.



# Helping out
This glitch (https://glitch.com/edit/#!/brawny-force?path=README.md:15:27) is linked to [https://github.com/bkardell/CustomElementsDictionary](https://github.com/bkardell/CustomElementsDictionary), so if you want to make this better, or have information on the possible implementation details of one of these, you can create an issue there or just send a pull adding or modifying a json file there.



