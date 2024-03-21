/*
  Warnings:

  - The primary key for the `categoria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `categoria` table. All the data in the column will be lost.
  - Added the required column `text_id` to the `categoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categoria` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `text_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`text_id`);
