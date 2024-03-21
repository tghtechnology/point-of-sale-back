/*
  Warnings:

  - The primary key for the `articulo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `articulo` table. All the data in the column will be lost.
  - Added the required column `text_id` to the `articulo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `articulo` DROP FOREIGN KEY `articulo_nombre_categoria_fkey`;

-- AlterTable
ALTER TABLE `articulo` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `text_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`text_id`);

-- AddForeignKey
ALTER TABLE `articulo` ADD CONSTRAINT `articulo_nombre_categoria_fkey` FOREIGN KEY (`nombre_categoria`) REFERENCES `categoria`(`text_id`) ON DELETE SET NULL ON UPDATE CASCADE;
