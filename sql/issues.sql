CREATE TABLE "Issues" (
  "ID" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "Title" VARCHAR(50),
  "ReportedByUserUUID" UUID NOT NULL,
  "Description" TEXT,
  "IssueLatitude" TEXT,
  "IssueLongitude" TEXT,
  "DateReported" TIMESTAMP,
  "Status" VARCHAR(36),
  FOREIGN KEY ("ReportedByUserUUID") REFERENCES "Users" ("ID")
);