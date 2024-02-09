"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Issue = void 0;
class Issue {
    constructor(issueUUID, title, reportedBy, description, issueLatitude, issueLongitude, dateReported, status, issueImages) {
        this.issueUUID = issueUUID;
        this.title = title;
        this.reportedBy = reportedBy;
        this.description = description;
        this.issueLatitude = issueLatitude;
        this.issueLongitude = issueLongitude;
        this.dateReported = dateReported;
        this.status = status;
        this.issueImages = issueImages;
    }
}
exports.Issue = Issue;
