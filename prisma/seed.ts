import { PrismaClient, TeamMember } from "@prisma/client"

const teamMembers: Pick<
  TeamMember,
  "name" | "designation" | "imageUrl" | "isTrainee"
>[] = [
  {
    name: "Aerol Allauigan",
    designation: "Head/Drummer",
    isTrainee: false,
    imageUrl:
      "https://res.cloudinary.com/abide-in-the-vine/image/upload/v1733285278/gcc/gccworshipnotesapp/aerolallauigan_afpz0v.jpg",
  },
  {
    name: "Carlo Rosal",
    designation: "Bassist",
    isTrainee: false,
    imageUrl:
      "https://res.cloudinary.com/abide-in-the-vine/image/upload/v1733285219/gcc/gccworshipnotesapp/carlorosal_gn5ogy.jpg",
  },
  {
    name: "Nathaniel Ablan",
    designation: "Lead Guitarist",
    isTrainee: false,
    imageUrl: "",
  },
  {
    name: "Sied Pajes",
    designation: "Guitarist",
    isTrainee: false,
    imageUrl:
      "https://res.cloudinary.com/abide-in-the-vine/image/upload/v1733285732/gcc/gccworshipnotesapp/siedpajes_m7rtn4.jpg",
  },
  {
    name: "Eugene Ababa",
    designation: "Vocalist",
    isTrainee: false,
    imageUrl:
      "https://res.cloudinary.com/abide-in-the-vine/image/upload/v1733285218/gcc/gccworshipnotesapp/eugeneababa_li8ogf.jpg",
  },
  {
    name: "Leslie Henoguin",
    designation: "Vocalist",
    isTrainee: false,
    imageUrl:
      "https://res.cloudinary.com/abide-in-the-vine/image/upload/v1733285218/gcc/gccworshipnotesapp/lesliepena_cuewdj.jpg",
  },
  {
    name: "Rosa Sahagun",
    designation: "Vocalist",
    isTrainee: false,
    imageUrl:
      "https://res.cloudinary.com/abide-in-the-vine/image/upload/v1733285217/gcc/gccworshipnotesapp/rosasahagun_n0aahc.jpg",
  },
  {
    name: "Pastor John",
    designation: "Vocalist",
    isTrainee: false,
    imageUrl:
      "https://res.cloudinary.com/abide-in-the-vine/image/upload/v1733285217/gcc/gccworshipnotesapp/pasjohn_kp40jl.jpg",
  },
  {
    name: "Kim Lopez",
    designation: "Vocalist",
    isTrainee: true,
    imageUrl:
      "https://res.cloudinary.com/abide-in-the-vine/image/upload/v1733285217/gcc/gccworshipnotesapp/kimlopez_tgd8fq.jpg",
  },
  {
    name: "Daniel John Baja",
    designation: "Vocalist",
    isTrainee: true,
    imageUrl:
      "https://res.cloudinary.com/abide-in-the-vine/image/upload/v1733285216/gcc/gccworshipnotesapp/danielbaja_pflqgy.jpg",
  },
  {
    name: "Chris Bernardo",
    designation: "Drummer",
    isTrainee: true,
    imageUrl:
      "https://res.cloudinary.com/abide-in-the-vine/image/upload/v1733285939/gcc/gccworshipnotesapp/chrisbernardo_zprla4.jpg",
  },
]

const prisma = new PrismaClient()

async function main() {
  // seed team members
  const members = await prisma.teamMember.createMany({
    data: teamMembers,
  })

  console.log(`Successfully seeded ${members.count} team members`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    if (e instanceof Error) {
      console.error(e.message)
    } else {
      console.error(e)
    }

    await prisma.$disconnect()
    process.exit(1)
  })
