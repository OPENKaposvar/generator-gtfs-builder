# generator-gtfs-builder [![NPM version][npm-image]][npm-url] [![Build Status](https://travis-ci.org/OPENKaposvar/generator-gtfs-builder.svg?branch=devel)](https://travis-ci.org/OPENKaposvar/generator-gtfs-builder) [![Coverage Status](https://coveralls.io/repos/github/OPENKaposvar/generator-gtfs-builder/badge.svg?branch=devel)](https://coveralls.io/github/OPENKaposvar/generator-gtfs-builder?branch=devel) [![Dependency Status][daviddm-image]][daviddm-url]
> GTFS Feed Builder by OPEN Kaposvar

## About OPEN Kaposvár GTFS Feed Builder

With our GTFS Feed Builder you can generate valid [GTFS](https://developers.google.com/transit/gtfs/) feeds from various spatial data sources:

* GeoJSON files
* CSV files
* Partial GTFS text files
* [ESRI Shapefiles](https://en.wikipedia.org/wiki/Shapefile)

Furthermore you can export a GTFS feed into these formats, too. The Feed Builder tool is a [Yeoman Generator](http://yeoman.io/generators/) itself. 

## Installation

First, install [Yeoman](http://yeoman.io) and generator-gtfs-builder using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-gtfs-builder
```

Then generate your new project:

```bash
yo gtfs-builder
```


## License

MIT © [OPEN Kaposvár](https://openkaposvar.github.com)


[npm-image]: https://badge.fury.io/js/generator-gtfs-builder.svg
[npm-url]: https://npmjs.org/package/generator-gtfs-builder
[travis-image]: https://travis-ci.org/openkaposvar/generator-gtfs-builder.svg?branch=master
[travis-url]: https://travis-ci.org/openkaposvar/generator-gtfs-builder
[daviddm-image]: https://david-dm.org/openkaposvar/generator-gtfs-builder.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/openkaposvar/generator-gtfs-builder
