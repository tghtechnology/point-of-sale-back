/*
  Warnings:

  - You are about to drop the column `tasa_impuesto` on the `impuesto` table. All the data in the column will be lost.
  - Added the required column `estado` to the `Impuesto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tasa` to the `Impuesto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `impuesto` DROP COLUMN `tasa_impuesto`,
    ADD COLUMN `estado` BOOLEAN NOT NULL,
    ADD COLUMN `tasa` DECIMAL(10, 2) NOT NULL;
