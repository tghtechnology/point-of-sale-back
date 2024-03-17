/*
  Warnings:

  - You are about to drop the column `eliminadoTemporalFecha` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `eliminadoTemporalFecha`,
    ADD COLUMN `eliminado_temporal_fecha` DATETIME(3) NULL;
