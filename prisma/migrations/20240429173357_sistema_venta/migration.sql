/*
  Warnings:

  - Added the required column `fecha_creacion` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `fecha_creacion` DATETIME(3) NOT NULL,
    ADD COLUMN `fecha_modificacion` DATETIME(3) NULL;
