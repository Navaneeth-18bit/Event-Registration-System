-- CreateTable
CREATE TABLE "public"."Events" (
    "id" SERIAL NOT NULL,
    "eventName" TEXT NOT NULL,
    "organizerName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Registrations" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "participantName" TEXT NOT NULL,
    "participantEmail" TEXT NOT NULL,

    CONSTRAINT "Registrations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Registrations" ADD CONSTRAINT "Registrations_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
