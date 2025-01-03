-- CreateEnum
CREATE TYPE "FinancialRecordCategoryType" AS ENUM ('EXPENSE', 'INCOME');

-- CreateTable
CREATE TABLE "financial_record_categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "category_type" "FinancialRecordCategoryType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "tax_informable" BOOLEAN NOT NULL,

    CONSTRAINT "financial_record_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_records" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "amount" DOUBLE PRECISION NOT NULL,
    "apartment_id" UUID NOT NULL,
    "attachment_id" TEXT,
    "category_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "record_date" TIMESTAMP(3) NOT NULL,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "financial_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "financial_record_categories_name_key" ON "financial_record_categories"("name");

-- AddForeignKey
ALTER TABLE "financial_records" ADD CONSTRAINT "financial_records_apartment_id_fkey" FOREIGN KEY ("apartment_id") REFERENCES "apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial_records" ADD CONSTRAINT "financial_records_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "financial_record_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

insert into financial_record_categories (category_type, description, modified_at, "name", tax_informable)
values ('INCOME', 'The earnings a property owner receives from leasing out their property, such as apartments, houses, or commercial spaces, to tenants.', NOW(), 'Rental income', true );

insert into financial_record_categories (category_type, description, modified_at, "name", tax_informable)
values ('EXPENSE', 'The fee that is paid for the upkeep and maintenance of common areas and services in a building.', NOW(), 'Maintenance fee', true );

insert into financial_record_categories (category_type, description, modified_at, "name", tax_informable)
values ('EXPENSE', 'The fee that is paid for the financing costs of major renovations or other significant investments in the property.', NOW(), 'Financing fee', true );

insert into financial_record_categories (category_type, description, modified_at, "name", tax_informable)
values ('EXPENSE', 'The interest expenses associated with loans that are taken out to generate income, such as investment property loans.', NOW(), 'Loan interest', true );

insert into financial_record_categories (category_type, description, modified_at, "name", tax_informable)
values ('EXPENSE', 'The costs associated with obtaining a loan, such as application fees, legal fees, and other related expenses.', NOW(), 'Loan expenses', true );

insert into financial_record_categories (category_type, description, modified_at, "name", tax_informable)
values ('EXPENSE', 'The money that is expected to be paid back with interest, typically used for purposes such as purchasing property.', NOW(), 'Loan', false );

insert into financial_record_categories (category_type, description, modified_at, "name", tax_informable)
values ('EXPENSE', 'The fee paid for water usage in a property, typically covering the cost of supplying and maintaining water services.', NOW(), 'Water fee', true );

insert into financial_record_categories (category_type, description, modified_at, "name", tax_informable)
values ('EXPENSE', 'A designated area where a vehicle can be parked, typically within a residential or commercial property.', NOW(), 'Parking space', true );

insert into financial_record_categories (category_type, description, modified_at, "name", tax_informable)
values ('EXPENSE', 'Various additional costs that may not fit into other specific categories.', NOW(), 'Other expenses, tax informable', true );

insert into financial_record_categories (category_type, description, modified_at, "name", tax_informable)
values ('EXPENSE', 'Various additional costs that may not fit into other specific categories and aren''t tax informable .', NOW(), 'Other expenses, non tax informable', false );
