"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Client",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "UserRole",
    embedded: false
  },
  {
    name: "Product",
    embedded: false
  },
  {
    name: "Item",
    embedded: false
  },
  {
    name: "Purchase",
    embedded: false
  },
  {
    name: "Payment",
    embedded: false
  },
  {
    name: "Transaction",
    embedded: false
  },
  {
    name: "TransactionType",
    embedded: false
  },
  {
    name: "Event",
    embedded: false
  },
  {
    name: "Production",
    embedded: false
  },
  {
    name: "File",
    embedded: false
  },
  {
    name: "Post",
    embedded: false
  },
  {
    name: "Comment",
    embedded: false
  },
  {
    name: "Committee",
    embedded: false
  },
  {
    name: "Invitation",
    embedded: false
  },
  {
    name: "InvitationStatus",
    embedded: false
  },
  {
    name: "Todo",
    embedded: false
  },
  {
    name: "Question",
    embedded: false
  },
  {
    name: "TodoTemplate",
    embedded: false
  },
  {
    name: "Message",
    embedded: false
  },
  {
    name: "Chat",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`,
  secret: `${process.env["PRISMA_SERVICE_SECRET"]}`
});
exports.prisma = new exports.Prisma();
