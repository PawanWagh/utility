const utility = {
    /* NODE JS ONLY */

    /*
     * [Decodes base64 into given file]
     * @param  {string}  base64str [base64 string]
     * @param  {string} file [fileName]
     *
     * base64_decode('wjdbjwj289HUYG=02......','decodedfile.jpg');
     * 
     */
    base64_decode(base64str, file){
    	if(!file || !base64str){
    		return;
    	}
        // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
        const bitmap = new Buffer(base64str, 'base64');
        // write buffer to image file
        fs.writeFileSync(file, bitmap);
    },


    /*
     * [function to encode file data to base64 encoded string]
     * @param  {string} file [fileName]
     *
     * base64_encode('decodedfile.jpg');
     * 
     */
    base64_encode(file) {
    	if(!file){
    		return;
    	}
        // read binary data
        const bitmap = fs.readFileSync(file);
        // convert binary data to base64 encoded string
        return new Buffer(bitmap).toString('base64');
    },

    /*
     * [function to read file]
     * @param  {string} fileName [fileName]
     *
     * const file = readFile('decodedfile.jpg');
     * 
     */
    readFile(fileName){
        //returns saved image from local directory
        return fs.readFileSync(fileName);
    },

    /*
     * [function to remove file]
     * @param  {string} fileName [fileName]
     *
     * removeFile('decodedfile.jpg');
     * 
     */
    removeFile(fileName){
        //removes stored image from local directory
        fs.unlinkSync(fileName);
    },

    /* NODE JS ONLY */

    /* Array functions */

    /*
     * [Remove Duplicates from provided array of objects]
     * @param  {array}  __arr [array of objects]
     * @param  {string} __param [object key for uniqueness constraint]
     * @return {array}    [source array with duplicates removed by provided uniqueness constraint]
     *
     * if __param is provided then array is treated as array of objects
     * eg.
     *   let arr = [{id:1,name:'p'},{id:1,name:'p'},{id:2,name:'p'},{id:3,name:'p'}];
     *   arr = removeDuplicates(arr,'id');
     *
     * 
     * if __param is not provided then array is treated as of primitive types array
     * eg.
     *   let arr = [1,1,1,3,4,5,2,2,4];
     *   arr = removeDuplicates(arr);
     * 
     */
    removeDuplicates(__arr,__param){
        if(__param){
            return __arr.filter((__iteratee, __iterator) => {
                let __index = __arr.findIndex(__o => __o[__param] === __iteratee[__param]);
                return __iterator === __index;
            });
        }else{
            return __arr.filter((__iteratee, __iterator) => __arr.indexOf(__iteratee) === __iterator);
        }
    },

    /**
     * [log functions logs the input text on console]
     * @param  {object, string, array, function} parameter [data to log]
     * @param  {Object} options [formatting options]
     * {
     *     json: true, //json stringifies text
     *     color: 'black' //color to display
     * }
     * log(`Hello`,{color: 'green'});
     * log({msg: 'hello', is},{color: 'green',json: true});
     */

    log(parameter,{ json = false, color = `black` } = {}){
        const colorCodes={
            reset: "\x1b[0m",
            bright: "\x1b[1m",
            dim: "\x1b[2m",
            underscore: "\x1b[4m",
            blink: "\x1b[5m",
            reverse: "\x1b[7m",
            hidden: "\x1b[8m",
            black: "\x1b[30m",
            red: "\x1b[31m",
            green: "\x1b[32m",
            yellow: "\x1b[33m",
            blue: "\x1b[34m",
            magenta: "\x1b[35m",
            cyan: "\x1b[36m",
            white: "\x1b[37m"
        }
        const __parameter = json ? JSON.stringify(parameter) : parameter;
        const colorCode = colorCodes[color];
        const resetColorCode = colorCodes[`reset`];
        console.log(`${colorCode}${__parameter}${resetColorCode}`);
    },

    
    //  * [function to get unix timestamp]
    //  * @return current timestamp
    //  * const ts = currentTimeStamp();
    //  * 
     
    // currentTimeStamp: () => Date.now || function() {
    //     return +new Date;
    // }

    isNull(value){ 
        return Object.prototype.toString.call(value) === '[object Null]';
    },
    isUnDefined(value){ 
        return Object.prototype.toString.call(value) === '[object Undefined]';
    },
    isString(value){ 
        return Object.prototype.toString.call(value) === '[object String]';
    },
    isObject(value){ 
        return Object.prototype.toString.call(value) === '[object Object]'
    },
    isLength(value,maxLength = 0){
        return !this.isUnDefined(value) && !this.isObject(value) && value.length;
    },
    isArray(value){ 
        return Object.prototype.toString.call(value) === '[object Array]';
    },
    isNumber(value){
        return Object.prototype.toString.call(value) === '[object Number]';
    },
    isMath(value){ 
        return Object.prototype.toString.call(value) === '[object Math]';
    },
    isFunction(value){
        return Object.prototype.toString.call(value) === '[object Function]';
    },
    isBoolean(value){
        return Object.prototype.toString.call(value) === '[object Boolean]';
    },
    isEmpty(value){
        if(this.isUnDefined(value)){
            throw new Error('value is undefined');
        }
        if(this.isNull(value)){
            return true;
        }
        if(this.isObject(value)){
            for(var key in value) {
                if(value.hasOwnProperty(key))
                    return false;
            }
            return true;
        }
        return false;
    },
    isValid(value){ 
        return !this.isUnDefined(value) && !this.isNull(value) && this.isLength(value);
    },
    trim(value){
        if(!this.isValid(value)){
            throw new Error('Invalid Value provided');
        }
        return value.trim();
    },
    strip(value){
        if(!this.isValid(value)){
            throw new Error('Invalid Value provided');
        }
        return value.replace(/\s/g, "");
    },
    validate(type = 'text',text = ''){
        let regexParser;
        let value;
        switch(type.toLowerCase()){
            case 'email':
                regexParser = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|in)\b/);
                return regexParser.test(text);
            case 'number':
                regexParser = new RegExp(/^\d+$/);
                return regexParser.test(text);
            case 'mobile':
                regexParser = new RegExp(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/);
                return regexParser.test(text);
            case 'year':
                regexParser = new RegExp(/^\d{4}$/);
                value = parseInt(text);
                if(isNaN(value)){
                    return false;
                }
                return regexParser.test(value);
            case 'month': 
                regexParser = new RegexExp(/^(\d+)$/);
                value = parseInt(text);
                if(isNaN(value)){
                    return false;
                }
                return regexParser.test(value) && ( value > 0 ) && (value < 13);
            case 'day': 
                regexParser = new RegexExp(/^(\d+)$/);
                value = parseInt(text);
                if(isNaN(value)){
                    return false;
                }
                return regexParser.test(value) && ( value > 0 ) && (value < 31);
        }
    }
}

module.exports = utility;
