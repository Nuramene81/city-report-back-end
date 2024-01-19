CREATE TABLE "Issues" (
  "ID" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "Title" VARCHAR(50),
  "ReportedByUserUUID" UUID NOT NULL,
  "Description" TEXT,
  "Area" VARCHAR(50),
  "Geolocation" TEXT,
  "DateReported" DATE,
  "Status" VARCHAR(36),
  FOREIGN KEY ("ReportedByUserUUID") REFERENCES "Users" ("ID")
);