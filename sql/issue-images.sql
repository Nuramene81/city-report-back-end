CREATE TABLE "IssueImages" (
  "ID" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "IssueUUID" UUID NOT NULL,
  "ImageURL" TEXT NOT NULL,
  FOREIGN KEY ("IssueUUID") REFERENCES "Issues" ("ID")
);