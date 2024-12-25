-- CreateTable
CREATE TABLE "apartments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "apartment_size" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "postal_code" TEXT NOT NULL,
    "post_office" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "street_address" TEXT NOT NULL,
    "title" TEXT,

    CONSTRAINT "apartments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenants" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "apartment_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deposit" INTEGER NOT NULL,
    "deposit_paid" BOOLEAN NOT NULL,
    "deposit_returned" BOOLEAN NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "person_id" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "tenant_from" TIMESTAMP(3) NOT NULL,
    "tenant_to" TIMESTAMP(3),

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "apartments_slug_key" ON "apartments"("slug");

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_apartment_id_fkey" FOREIGN KEY ("apartment_id") REFERENCES "apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
