class Utilities {
    /**
     * To get date in format dd/MM/yyyy
     * @param now Date or undefind
     * @returns string
     */
    static getDateNow(now) {
        if (!now)
            now = new Date();
        return this.formatDate(now, false);
    }
    /**
     * To get time in format HH:mm:ss
     * @param now Date or undefined
     * @returns string
     */
    static getTimeNow(now) {
        if (!now)
            now = new Date();
        let hh = now.getHours();
        let mm = now.getMinutes();
        let ss = now.getSeconds();
        let result = ((hh < 10) ? "0" : "") + hh;
        result += ((mm < 10) ? ":0" : ":") + mm;
        result += ((ss < 10) ? ":0" : ":") + ss;
        return result;
    }
    /**
     * To get datetime in format dd/MM/yyyy HH:mm:ss
     * @param now Date or undefined
     * @returns string
     */
    static getDateTimeNow(now) {
        if (!now)
            now = new Date();
        return this.getDateNow(now) + " " + this.getTimeNow(now);
    }
    /**
     * To get date in format yyyy-MM-dd
     * @param now Date or undefined
     * @returns string
     */
    static getYMD(now) {
        return this.formatDate(now, true);
    }
    /**
     * To get date in format dd/MM/yyyy
     * @param now Date or undefined
     * @returns string
     */
    static getDMY(now) {
        return this.formatDate(now, false);
    }
    /**
     * To format Date to dd/MM/yyyy or yyyy-MM-dd
     * @param now Date or undefined
     * @param ymd boolean default false
     * @returns string
     */
    static formatDate(now, ymd = false) {
        if (!now)
            return "";
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yy = now.getFullYear();
        let result = "";
        if (ymd) {
            result = "" + yy;
            result += ((mm < 10) ? "-0" : "-") + mm;
            result += ((dd < 10) ? "-0" : "-") + dd;
        }
        else {
            result = ((dd < 10) ? "0" : "") + dd;
            result += ((mm < 10) ? "/0" : "/") + mm;
            result += "/" + yy;
        }
        return result;
    }
    /**
     * To format time HH:mm:ss
     * @param now Date or undefined
     * @returns string
     */
    static formatTime(now) {
        if (!now)
            return "";
        return this.getTimeNow(now);
    }
    /**
     * To format date into dd/MM/yyyy HH:mm:ss or yyyy-MM-dd HH:mm:ss
     * @param now Date or undefined
     * @param ymd boolean default false
     * @returns string
     */
    static formatDateTime(now, ymd = false) {
        if (!now)
            return "";
        return this.formatDate(now, ymd) + " " + this.getTimeNow(now);
    }
    /**
     * To format time HH:mm:ss
     * @param now Date or undefined
     * @returns string
     */
    static getHMS(now) {
        if (!now)
            return "";
        return "" + now;
    }
    /**
     * To format Date to yyyy-MM-dd
     * @param now Date or undefined
     * @returns string
     */
    static currentDate(now) {
        if (!now)
            now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yy = now.getFullYear();
        let result = "" + yy;
        result += ((mm < 10) ? "-0" : "-") + mm;
        result += ((dd < 10) ? "-0" : "-") + dd;
        return result;
    }
    /**
     * To format time to HH:mm:ss
     * @param now Date or undefined
     * @returns string
     */
    static currentTime(now) {
        if (!now)
            now = new Date();
        let hh = now.getHours();
        let mm = now.getMinutes();
        let ss = now.getSeconds();
        let result = ((hh < 10) ? "0" : "") + hh;
        result += ((mm < 10) ? ":0" : ":") + mm;
        result += ((ss < 10) ? ":0" : ":") + ss;
        return result;
    }
    /**
     * To format Date to yyyy-MM-dd HH:mm:ss
     * @param now Date or undefined
     * @returns string
     */
    static currentDateTime(now) {
        if (!now)
            now = new Date();
        return this.currentDate(now) + " " + this.currentTime(now);
    }
    /**
     * To get current time in milli seconds
     * @param now Date or undefined
     * @returns number
     */
    static currentTimeMillis(now) {
        if (!now)
            now = new Date();
        return now.getTime();
    }
    /**
     * To add number of days into Date
     * @param days number
     * @param date Date or undefined
     * @returns Date
     */
    static addDays(days, date) {
        if (!date)
            date = new Date();
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    /**
     * To compare between date
     * @param adate Date or undefined
     * @param bdate Date or undefined
     * @returns number, -1 = lesser than, 0 = equal , 1 = greater than
     */
    static compareDate(adate, bdate) {
        if (!adate && !bdate)
            return 0;
        let astr = this.formatDate(adate, true);
        let bstr = this.formatDate(bdate, true);
        return this.compareString(astr, bstr);
    }
    /**
     * To compare between time
     * @param adate Date or undefined
     * @param bdate Date or undefined
     * @returns number, -1 = lesser than, 0 = equal , 1 = greater than
     */
    static compareTime(adate, bdate) {
        if (!adate && !bdate)
            return 0;
        let astr = this.formatTime(adate);
        let bstr = this.formatTime(bdate);
        return this.compareString(astr, bstr);
    }
    /**
     * To compare between datetime
     * @param adate Date or undefined
     * @param bdate Date or undefined
     * @returns number, -1 = lesser than, 0 = equal , 1 = greater than
     */
    static compareDateTime(adate, bdate) {
        if (!adate && !bdate)
            return 0;
        let astr = this.formatDateTime(adate, true);
        let bstr = this.formatDateTime(bdate, true);
        return this.compareString(astr, bstr);
    }
    /**
     * To compare string value
     * @param astr string
     * @param bstr string
     * @returns number, -1 = lesser than, 0 = equal , 1 = greater than
     */
    static compareString(astr, bstr) {
        if (!astr && !bstr)
            return 0;
        if (!astr && bstr)
            return -1;
        if (astr && !bstr)
            return 1;
        let text = "" + astr;
        return text.localeCompare(bstr, undefined, { sensitivity: 'accent' });
    }
    /**
     * To check string equals with ignore case
     * @param astr string
     * @param bstr string
     * @returns boolean
     */
    static equalsIgnoreCase(astr, bstr) {
        return this.compareString(astr, bstr) == 0;
    }
    /**
     * To check data is string or not
     * @param value any
     * @returns boolean
     */
    static isString(value) {
        return typeof value === 'string' || value instanceof String;
    }
    /**
     * To parse integer (especially from string)
     * @param dataValue any
     * @param defaultValue number
     * @returns number
     */
    static parseInteger(dataValue, defaultValue) {
        if (dataValue) {
            if (this.isString(dataValue)) {
                return parseInt(dataValue.replaceAll(',', ''));
            }
            else {
                if (typeof dataValue === "number") {
                    return dataValue;
                }
            }
        }
        return defaultValue;
    }
    /**
     * To parse float (especially from string)
     * @param dataValue any
     * @param defaultValue number
     * @returns number
     */
    static parseFloat(dataValue, defaultValue) {
        if (dataValue) {
            if (this.isString(dataValue)) {
                return parseFloat(dataValue.replaceAll(',', ''));
            }
            else {
                if (typeof dataValue === "number") {
                    return dataValue;
                }
            }
        }
        return defaultValue;
    }
    /**
     * To parse boolean (especially from string)
     * @param dataValue any
     * @param defaultValue boolean
     * @returns boolean
     */
    static parseBoolean(dataValue, defaultValue) {
        if (dataValue !== undefined && dataValue !== null) {
            if (this.isString(dataValue)) {
                let pr = ("" + dataValue).toLowerCase();
                if (pr === "true")
                    return true;
                if (pr === "false")
                    return false;
                return Boolean(pr);
            }
            else {
                if (typeof dataValue === "boolean") {
                    return dataValue;
                }
            }
        }
        return defaultValue;
    }
    /**
     * To parse Date with data value string in format dd/MM/yyyy, yyyy-MM-dd, dd/MM/yyyy HH:mm:ss, yyyy-MM-dd HH:mm:ss
     * @param dataValue
     * @param defaultValue
     * @returns Date
     */
    static parseDate(dataValue, defaultValue) {
        if (dataValue) {
            if (this.isString(dataValue)) {
                let datestr = ("" + dataValue).trim();
                if (datestr != "") {
                    if (datestr.indexOf("T") > 0 && datestr.indexOf("Z") > 0) {
                        try { const dateInstance = new Date(datestr); if(dateInstance) return dateInstance; } catch(ex) { console.error(ex); }
                    }
                    let result = undefined;
                    let separator = " ";
                    if (datestr.indexOf("T") > 0)
                        separator = "T";
                    let [date, time] = datestr.split(separator);
                    if (date.indexOf(":") > 0) {
                        time = date;
                        date = "";
                    }
                    if (date) {
                        if (date.indexOf("/") > 0) {
                            let [day, month, year] = date.split('/');
                            result = new Date(Number(year), Number(month) - 1, Number(day));
                        }
                        else if (date.indexOf("-") > 0) {
                            let [year, month, day] = date.split('-');
                            result = new Date(Number(year), Number(month) - 1, Number(day));
                        }
                    }
                    if (time) {
                        if (!result)
                            result = new Date();
                        let [hours, minutes, seconds] = time.split(':');
                        if (hours !== undefined)
                            result.setHours(Number(hours));
                        if (minutes !== undefined)
                            result.setMinutes(Number(minutes));
                        if (seconds !== undefined) {
                            if (seconds.indexOf(".") > 0) {
                                let [sec, msec] = seconds.split(".");
                                result.setSeconds(Number(sec));
                                let idx = msec.indexOf("Z");
                                if (idx > 0) {
                                    msec = msec.substring(0, idx);
                                }
                                result.setMilliseconds(Number(msec));
                            }
                            else {
                                result.setSeconds(Number(seconds));
                            }
                        }
                        else {
                            result.setSeconds(0);
                        }
                    }
                    return result;
                }
            }
            else {
                if (dataValue instanceof Date) {
                    return dataValue;
                }
            }
        }
        return defaultValue;
    }
    /**
     * To parse time with data value string in format HH:mm:ss
     * @param dataValue
     * @param defaultValue
     * @returns Date
     */
    static parseTime(dataValue, defaultValue) {
        if (dataValue && dataValue.trim().length > 0) {
            let [hours, minutes, seconds] = dataValue.split(":");
            let result = new Date();
            if (hours !== undefined)
                result.setHours(Number(hours));
            if (minutes !== undefined)
                result.setMinutes(Number(minutes));
            if (seconds !== undefined)
                result.setSeconds(Number(seconds));
            else
                result.setSeconds(0);
            return result;
        }
        return defaultValue;
    }
    /**
     * get current date/time now
     * @returns Date
     */
    static now() {
        return new Date();
    }
    /**
     * try to translate variables in template with foramt ${key} with value in variables
     * @returns string
     */
    static translateVariables(template, variables) {
        let data = variables;
        if (variables instanceof Map) {
            data = Object.fromEntries(variables);
        }
        for (let key in data) {
            template = template.replaceAll("${" + key + "}", data[key]);
        }
        return template;
    }
    /**
     * serialize timestamp into string format yyyyMMddHHmmssSSS
     * @returns string
     */
    static serializeTimestamp(now, delimiter, includeMillis = true) {
        let dd = now.getDate();
        let mo = now.getMonth() + 1;
        let year = now.getFullYear();
        let month = ((mo < 10) ? "0" : "") + mo;
        let day = ((dd < 10) ? "0" : "") + dd;
        let hh = now.getHours();
        let mm = now.getMinutes();
        let ss = now.getSeconds();
        let hour = ((hh < 10) ? "0" : "") + hh;
        let minute = ((mm < 10) ? "0" : "") + mm;
        let second = ((ss < 10) ? "0" : "") + ss;
        let ml = now.getMilliseconds();
        let millis = ((ml < 100) ? "0" : "") + ml;
        if (includeMillis) {
            return [year, month, day, hour, minute, second, millis].join(delimiter ? delimiter : '');
        }
        return [year, month, day, hour, minute, second].join(delimiter ? delimiter : '');
    }
    /**
     * To get date format with short or long month
     * @returns string
     */
    static getFormatDate(date = new Date(), fortype = this.SHORT, delimiter = " ", forstyle = this.NORMAL, separater = ",") {
        var dd = date.getDate();
        var mm = date.getMonth();
        var yy = date.getFullYear();
        var mstr = "";
        if (fortype == this.SHORT) { //short month
            mstr = this.SHORT_MONTH_ARRAY[mm];
        }
        else { //long month
            mstr = this.LONG_MONTH_ARRAY[mm];
        }
        if (forstyle == this.INTER) {
            return mstr + delimiter + dd + separater + delimiter + yy;
        }
        return dd + delimiter + mstr + delimiter + yy;
    }
    /**
     * To get date format with short month
     * @returns string
     */
    static getShortDate(date = new Date(), delimiter = " ", forstyle = this.NORMAL) {
        return this.getFormatDate(date, this.SHORT, delimiter, forstyle);
    }
    /**
     * To get date format with long month
     * @returns string
     */
    static getLongDate(date = new Date(), delimiter = " ", forstyle = this.NORMAL) {
        return this.getFormatDate(date, this.LONG, delimiter, forstyle);
    }
    /**
     * To get week day with short or long format
     * @returns string
     */
    static getWeekDay(date = new Date(), fortype = this.LONG) {
        if (fortype == this.SHORT) {
            return this.SHORT_WEEK_DAY[date.getDay()];
        }
        return this.LONG_WEEK_DAY[date.getDay()];
    }
    /**
     * To get short week day
     * @returns string
     */
    static getShortWeekDay(date = new Date()) {
        return this.getWeekDay(date, this.SHORT);
    }
    /**
     * To get long week day
     * @returns string
     */
    static getLongWeekDay(date = new Date()) {
        return this.getWeekDay(date, this.LONG);
    }
    /**
     * To get week day format
     * @returns string
     */
    static getFormatWeekDate(date = new Date(), fortype = this.LONG, delimiter = " ", forstyle = this.NORMAL, separater = ",") {
        let weekday = this.getWeekDay(date, fortype);
        let result = this.getFormatDate(date, fortype, delimiter, forstyle, separater);
        return weekday + separater + delimiter + result;
    }
}
exports.Utilities = Utilities;
Utilities.NORMAL = 0;
Utilities.INTER = 1;
Utilities.SHORT = 0;
Utilities.LONG = 1;
Utilities.SHORT_MONTH_ARRAY = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
Utilities.LONG_MONTH_ARRAY = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
Utilities.SHORT_WEEK_DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
Utilities.LONG_WEEK_DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
/**
 * To check attributes is in object element
 * @param element unknown
 * @param attributes string array
 * @returns boolean
 */
Utilities.hasAttributes = (element, attributes) => {
    if (element === undefined || element === null)
        return false;
    return attributes.every((attribute) => {
        return Object.prototype.hasOwnProperty.call(element, attribute);
    });
};
