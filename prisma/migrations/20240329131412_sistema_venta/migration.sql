/*
  Warnings:

  - The primary key for the `articulo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nombre_categoria` on the `articulo` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `articulo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `categoria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `categoria` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `articulo` DROP FOREIGN KEY `articulo_nombre_categoria_fkey`;

-- AlterTable
ALTER TABLE `articulo` DROP PRIMARY KEY,
    DROP COLUMN `nombre_categoria`,
    ADD COLUMN `id_categoria` INTEGER NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `categoria` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `articulo` ADD CONSTRAINT `articulo_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `categoria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
