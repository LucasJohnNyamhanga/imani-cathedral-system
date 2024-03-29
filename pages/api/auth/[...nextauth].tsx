import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../db/prisma";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const userFromServer = await prisma.user.findFirst({
          where: {
            userName: credentials?.username,
          },
          select: {
            id: true,
            name: true,
            userName: true,
            nenoLaSiri: true,
          },
        });
        const userfound = await JSON.parse(JSON.stringify(userFromServer));

        let comaparison = credentials!.password === userfound.nenoLaSiri;

        if (comaparison) {
          const user = {
            id: userfound.id,
            name: `${userfound.name}`,
            email: userfound.userName,
            image: userfound.image,
          };

          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: {
    signIn: "/Auth/SignIn",
  },
  callbacks: {
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      //   const userFromServer = await prisma.user.findFirst({
      //     where: {
      //       bahasha: token.email,
      //     },
      //     select: {
      //       id: true,
      //     },
      //   });
      //   const userfound = await JSON.parse(JSON.stringify(userFromServer));
      //   if (userfound) {
      //     //userfound
      //   } else {
      //     //create user
      //     await prisma.user.create({
      //       data: {
      //         name: token.name!,
      //         image: token.picture,
      //         username: token.email,
      //         password: `googleHasIt`,
      //         vifurushi: {
      //           create: [
      //             { name: "notesDownload", value: 0 },
      //             { name: "quizExcercises", value: 0 },
      //             { name: "examsUnsolvedDownload", value: 0 },
      //             { name: "examsSolvedDownload", value: 0 },
      //             { name: "examAccess", value: 0 },
      //             { name: "booksDownload", value: 0 },
      //           ],
      //         },
      //       },
      //     });
      //   }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
