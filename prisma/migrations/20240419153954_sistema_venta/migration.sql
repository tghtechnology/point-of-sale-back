/*
  Warnings:

  - You are about to drop the `imagen` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `articulo_imagen_fkey` ON `articulo`;

-- DropTable
DROP TABLE `imagen`;
