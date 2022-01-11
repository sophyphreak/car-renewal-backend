-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "store" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);
