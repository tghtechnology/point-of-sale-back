/*
  Warnings:

  - Added the required column `nombreNegocio` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `nombreNegocio` VARCHAR(255) NOT NULL;
