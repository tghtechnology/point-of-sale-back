/*
  Warnings:

  - The values [porcentaje,monto] on the enum `descuento_tipo_descuento` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `descuento` MODIFY `tipo_descuento` ENUM('PORCENTAJE', 'MONTO') NOT NULL;
