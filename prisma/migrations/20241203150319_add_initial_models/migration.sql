-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "chordKey" TEXT NOT NULL,
    "lyrics" TEXT NOT NULL,
    "sources" TEXT[],
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "userAccountId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SongCollection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SongCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SongToTeamMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SongToTeamMember_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_SongToSongCollection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SongToSongCollection_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Song_title_idx" ON "Song"("title");

-- CreateIndex
CREATE INDEX "Song_createdBy_idx" ON "Song"("createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "Song_title_chordKey_key" ON "Song"("title", "chordKey");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_name_key" ON "TeamMember"("name");

-- CreateIndex
CREATE INDEX "TeamMember_userAccountId_idx" ON "TeamMember"("userAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "SongCollection_name_key" ON "SongCollection"("name");

-- CreateIndex
CREATE INDEX "_SongToTeamMember_B_index" ON "_SongToTeamMember"("B");

-- CreateIndex
CREATE INDEX "_SongToSongCollection_B_index" ON "_SongToSongCollection"("B");

-- AddForeignKey
ALTER TABLE "_SongToTeamMember" ADD CONSTRAINT "_SongToTeamMember_A_fkey" FOREIGN KEY ("A") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SongToTeamMember" ADD CONSTRAINT "_SongToTeamMember_B_fkey" FOREIGN KEY ("B") REFERENCES "TeamMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SongToSongCollection" ADD CONSTRAINT "_SongToSongCollection_A_fkey" FOREIGN KEY ("A") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SongToSongCollection" ADD CONSTRAINT "_SongToSongCollection_B_fkey" FOREIGN KEY ("B") REFERENCES "SongCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
