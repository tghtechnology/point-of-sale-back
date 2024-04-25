/*
  Warnings:

  - You are about to drop the column `codigo_postal` on the `cliente` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cliente` DROP COLUMN `codigo_postal`,
    MODIFY `direccion` VARCHAR(255) NULL,
    MODIFY `ciudad` VARCHAR(255) NULL,
    MODIFY `region` VARCHAR(255) NULL,
    MODIFY `pais` VARCHAR(255) NULL;
