-- CreateTable
CREATE TABLE "Week" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "earnings" DOUBLE PRECISION NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,
    "days" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Week_pkey" PRIMARY KEY ("id")
);
