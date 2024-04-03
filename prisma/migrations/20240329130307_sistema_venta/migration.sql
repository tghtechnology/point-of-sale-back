/*
  Warnings:

  - The primary key for the `articulo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `text_id` on the `articulo` table. All the data in the column will be lost.
  - The primary key for the `categoria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `text_id` on the `categoria` table. All the data in the column will be lost.
  - Added the required column `id` to the `articulo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `categoria` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `articulo` DROP FOREIGN KEY `articulo_nombre_categoria_fkey`;

-- AlterTable
ALTER TABLE `articulo` DROP PRIMARY KEY,
    DROP COLUMN `text_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `categoria` DROP PRIMARY KEY,
    DROP COLUMN `text_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `articulo` ADD CONSTRAINT `articulo_nombre_categoria_fkey` FOREIGN KEY (`nombre_categoria`) REFERENCES `categoria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
