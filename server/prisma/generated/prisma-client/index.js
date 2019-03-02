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
    name: "UserRole",
    embedded: false
  },
  {
    name: "TransactionType",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
});
exports.prisma = new exports.Prisma();
