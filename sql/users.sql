CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "Users" (
  "ID" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "FullName" VARCHAR(50),
  "Username" VARCHAR(50) UNIQUE NOT NULL,
  "Email" VARCHAR(50) NOT NULL,
  "Password" TEXT NOT NULL,
  "ProfileImageURL" TEXT
);