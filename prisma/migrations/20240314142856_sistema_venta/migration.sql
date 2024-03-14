/*
  Warnings:

  - You are about to drop the column `eliminadoTemporalFecha` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `sesiones` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `sesiones` DROP FOREIGN KEY `sesiones_usuario_id_fkey`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `eliminadoTemporalFecha`,
    ADD COLUMN `eliminado_temporal_fecha` DATETIME(3) NULL;

-- DropTable
DROP TABLE `sesiones`;

-- CreateTable
CREATE TABLE `sesion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `expiracion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sesion` ADD CONSTRAINT `sesion_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
