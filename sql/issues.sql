CREATE TABLE "Issues" (
  "ID" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "Title" VARCHAR(50),
  "ReportedByUserUUID" UUID NOT NULL,
  "Description" TEXT,
  "IssueLatitude" DECIMAL(9,15),
  "IssueLongitude" DECIMAL(9,15),
  "DateReported" TIMESTAMP,
  "Status" VARCHAR(36),
  FOREIGN KEY ("ReportedByUserUUID") REFERENCES "Users" ("ID")
);