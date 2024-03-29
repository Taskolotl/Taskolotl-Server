"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentDateRetriever = void 0;
class CurrentDateRetriever {
    static getCurrentDate() {
        const currentDate = new Date();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Note: January is 0
        const day = String(currentDate.getDate()).padStart(2, '0');
        const year = String(currentDate.getFullYear());
        const formattedDate = `${month}-${day}-${year}`;
        return formattedDate;
    }
}
exports.CurrentDateRetriever = CurrentDateRetriever;
//# sourceMappingURL=CurrentDateRetriever.js.map