
export class Paging {
    constructor(setting = { }) {
        let defaultOptions = { page: 1, rowsPerPage: 10, totalRows: 0, totalPages: 1, limit: 10, offset: 10, rows: 0 };
        this.setting = Object.assign(defaultOptions,setting);
    }

    reset(setting) {
        if (setting) {
            this.setting = Object.assign(this.setting,setting);
        }
    }

    hasPaging(rows) {
        if(!rows) rows = this.setting.totalRows;
        let chapter = this.setting.rowsPerPage;
        return (chapter > 0) && (rows > chapter);
    }

    recordsOffset() {
        let page = this.setting.page - 1;
        let chapter = this.setting.rowsPerPage;
        if(page>0) return page*chapter;
        return 0;
    }

    recordsNumber(seqno) {
        return seqno + this.recordsOffset();
    }

    buildPagingModel(options = {totalRows: 0 }) {
        let results = [];
        let fsRows = options.totalRows;
        if (!fsRows) {
            fsRows = this.setting.totalRows;
        }
        let fsPageNumber = 0;
        let fsPageNo = 0;
        let fsTotalPage = 0;
        let fsPages = this.setting.page;
        let fsChapters = this.setting.rowsPerPage;
        for (let i = 0; i < fsRows; i += fsChapters) {
            fsTotalPage++;
        }
        let fsCounter = 0;
        let fsStartIdx = fsPages;
        let fsLimit = this.setting.limit;
        if (fsLimit <= 0) {
            fsLimit = fsChapters;
        }
        while (fsStartIdx > fsLimit) {
            fsCounter++;
            fsStartIdx -= fsLimit;
        }
        let fsPreviousPage = fsCounter * fsLimit;
        if (fsLimit > 0 && (fsPages > fsLimit)) {
            let first = {page: 1, text: "|&lt;", css: ""};
            let previous = {page: fsPreviousPage, text: "&lt;&lt;", css: ""};
            results.push(first);
            results.push(previous);
        }
        for (let i = 0; i < fsRows; i += fsChapters) {
            fsPageNumber++;
            if (fsLimit > 0) {
                if (fsPageNumber <= fsPreviousPage) {
                    continue;
                }
                fsPageNo++;
                if (fsLimit < fsPageNo) {
                    fsPageNumber = fsPageNumber + fsLimit - 1;
                    if (fsPageNumber > fsTotalPage) {
                        fsPageNumber = fsTotalPage;
                    }
                    let next = {page: fsPageNumber, text: "&gt;&gt;", css: ""};
                    results.push(next);
                    break;
                }
            }
            let fsSelected = "";
            if (fsPages == fsPageNumber || (fsPageNumber == 1 && fsPages == 0)) {
                fsSelected = "pageselectedclass active";
            }
            let current = {page: fsPageNumber, text: ""+fsPageNumber, css: fsSelected};
            results.push(current);
        }
        if (fsLimit < fsPageNo) {
            fsPageNumber = 0;
            for (let i = 0; i < fsRows; i += fsChapters) {
                fsPageNumber++;
            }
            let last = {page: fsPageNumber, text: "&gt;|", css: ""};
            results.push(last);
        }
        return results;
    }

}
