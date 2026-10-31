-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationProduct" (
    "productId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "LocationProduct_pkey" PRIMARY KEY ("locationId","productId")
);

-- AddForeignKey
ALTER TABLE "LocationProduct" ADD CONSTRAINT "LocationProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationProduct" ADD CONSTRAINT "LocationProduct_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
