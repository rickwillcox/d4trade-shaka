import { prisma } from "@/server/db";

export async function getUserByName(name: string) {
  const user = await prisma.user.findFirst({
    where: {
      name: name,
    },
  });
  return user;
}

export async function updateUserImage(id: string, image: string) {
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      image: image,
    },
  });
  return user;
}
