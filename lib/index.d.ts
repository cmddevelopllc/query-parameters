export interface ParserOptions {
    dateFormat?: any;
    blacklist?: string[];
    casters?: {
        [key: string]: (val: string) => any;
    };
    castParams?: {
        [key: string]: string;
    };
    selectKey?: string;
    populateKey?: string;
    sortKey?: string;
    skipKey?: string;
    limitKey?: string;
    filterKey?: string;
}
export interface QueryOptions {
    filter: Object;
    sort?: string | Object;
    limit?: number;
    skip?: number;
    select?: string | Object;
    populate?: string | Object;
}
export declare class MongooseQueryParser {
    private options;
    private readonly defaultDateFormat;
    private readonly builtInCaster;
    private readonly operators;
    constructor(options?: ParserOptions);
    /**
     * parses query string/object to Mongoose friendly query object/QueryOptions
     * @param {string | Object} query
     * @param {Object} [context]
     * @return {QueryOptions}
     */
    parse(query: string | Object, context?: Object): QueryOptions;
    /**
     * parses string to typed values
     * This methods will apply auto type casting on Number, RegExp, Date, Boolean and null
     * Also, it will apply defined casters in given options of the instance
     * @param {string} value
     * @param {string} key
     * @return {any} typed value
     */
    parseValue(value: string, key?: string): any;
    private castFilter;
    private parseFilter;
    private parseOperator;
    /**
     * cast select query to object like:
     * select=a,b or select=-a,-b
     * =>
     * {select: { a: 1, b: 1 }} or {select: { a: 0, b: 0 }}
     * @param val
     */
    private castSelect;
    /**
     * cast populate query to object like:
     * populate=field1.p1,field1.p2,field2
     * =>
     * [{path: 'field1', select: 'p1 p2'}, {path: 'field2'}]
     * @param val
     */
    private castPopulate;
    /**
     * cast sort query to object like
     * sort=-a,b
     * =>
     * {sort: {a: -1, b: 1}}
     * @param sort
     */
    private castSort;
    /**
     * Map/reduce helper to transform list of unaries
     * like '+a,-b,c' to {a: 1, b: -1, c: 1}
     */
    private parseUnaries;
    /**
     * cast skip query to object like
     * skip=100
     * =>
     * {skip: 100}
     * @param skip
     */
    private castSkip;
    /**
     * cast limit query to object like
     * limit=10
     * =>
     * {limit: 10}
     * @param limit
     */
    private castLimit;
    /**
     * transform predefined query strings defined in query string to the actual query object out of the given context
     * @param query
     * @param context
     */
    private parsePredefinedQuery;
}
