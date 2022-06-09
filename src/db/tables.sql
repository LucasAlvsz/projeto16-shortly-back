CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(256) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE urls(
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "shortUrls"(
    id SERIAL PRIMARY KEY,
    "shortUrl" TEXT NOT NULL UNIQUE,
    views BIGINT NOT NULL,
    "userId" INTEGER REFERENCES users(id),
    "urlId" INTEGER REFERENCES urls(id),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE sessions(
    id SERIAL PRIMARY KEY,
    "loggedInAt" TIMESTAMP NOT NULL,
    "loggedOutAt" TIMESTAMP,
    "userId" INTEGER REFERENCES users(id),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);