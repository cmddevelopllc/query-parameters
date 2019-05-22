# @cmddevelop/query-parameters

[![NPM version][npm-image]][npm-url]
[![Downloads][download-badge]][npm-url]

Converts URL query string into a Mongoose friendly object. Create and object with key values for Mongoose options and filtering. 

This library was build using this [mongoose-query-parser](https://github.com/leodinas-hao/mongoose-query-parser) as a starting point. Thank you for the good work. It was used as a starting point to develop this for a custom application.

## Features

- Supports the most of MongoDB operators (`$in`, `$regexp`, `$exists`) and features including skip, sort, limit, population
- Additionally, there is a key word of `page` that can be applied in order to work with [mongoose-paginate](https://www.npmjs.com/package/mongoose-paginate)
- Auto type casting of `Number`, `RegExp`, `Date`, `Boolean` and `null`
- String templates/predefined queries (i.e. `firstName=${my_vip_list}`)
- Allows customization of keys and options in query string

## Installation
```
npm i @cmddevelop/query-parameters
```

## Usage

### API
```
import { QueryParser } from '@cmddevelop/query-parameters';

const parser = new QueryParser(options?: ParserOptions)
parser.parse(query: string, predefined: any) : QueryOptions
```

##### Arguments
- `ParserOptions`: object for advanced options (See below) [optional]
- `query`: query string part of the requested API URL (ie, `firstName=John&limit=10`). Works with already parsed object too (ie, `{status: 'success'}`) [required]
- `predefined`: object for predefined queries/string templates [optional]

#### Returns
- `QueryOptions`: object contains the following properties:
    - `filter` which contains the query criteria
    - `populate` which contains the query population. Please see [Mongoose Populate](http://mongoosejs.com/docs/populate.html) for more details
    - `select` which contains the query projection
    - `sort`, `skip`, `limit` which contains the cursor modifiers for paging purpose

#### Filtering operators

| MongoDB | URI | Example | Result |
| ------- | --- | ------- | ------ |
| `$eq` | `key=val` | `type=public` | `{filter: {type: 'public'}}` |
| `$gt` | `key>val` | `count>5` | `{filter: {count: {$gt: 5}}}` |
| `$gte` | `key>=val` | `rating>=9.5` | `{filter: {rating: {$gte: 9.5}}}` |
| `$lt` | `key<val` | `createdAt<2017-10-01` | `{filter: {createdAt: {$lt: 2017-09-30T14:00:00.000Z}}}` |
| `$lte` | `key<=val` | `score<=-5` | `{filter: {score: {$lte: -5}}}` |
| `$ne` | `key!=val` | `status!=success` | `{filter: {status: {$ne: 'success'}}}` |
| `$in` | `key=val1,val2` | `country=GB,US` | `{filter: {country: {$in: ['GB', 'US']}}}` |
| `$nin` | `key!=val1,val2` | `lang!=fr,en` | `{filter: {lang: {$nin: ['fr', 'en']}}}` |
| `$exists` | `key` | `phone` | `{filter: {phone: {$exists: true}}}` |
| `$exists` | `!key` | `!email` | `{filter: {email: {$exists: false}}}` |
| `$regex` | `key=/value/<opts>` | `email=/@gmail\.com$/i` | `{filter: {email: /@gmail.com$/i}}` |
| `$regex` | `key!=/value/<opts>` | `phone!=/^06/` | `{filter: {phone: { $not: /^06/}}}` |

For more advanced usage (`$or`, `$type`, `$elemMatch`, etc.), pass any MongoDB query filter object as JSON string in the `filter` query parameter, ie:

#### Populate operators

- Useful to populate sub-document(s) in query. Works with `MongooseJS`. Please see [Mongoose Populate](http://mongoosejs.com/docs/populate.html) for more details
- Allows to populate only selected fields
- Default operator key is `populate`

#### Skip / Limit / Page operators

- Useful to limit the number of records returned
- Default operator keys are `skip` or `page`, and `limit`

[npm-url]: https://www.npmjs.com/package/@cmddevelop/query-parameters
[npm-image]: https://img.shields.io/npm/v/@cmddevelop/query-parameters.svg?style=flat-square
[download-badge]: https://img.shields.io/npm/dm/@cmddevelop/query-parameters.svg?style=flat-square
