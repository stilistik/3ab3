module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.27.1). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateClient {
  count: Int!
}

type AggregateConsumedItem {
  count: Int!
}

type AggregateItem {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Client {
  id: ID!
  identity: String!
  secret: String!
  name: String!
  trusted: Boolean!
}

type ClientConnection {
  pageInfo: PageInfo!
  edges: [ClientEdge]!
  aggregate: AggregateClient!
}

input ClientCreateInput {
  identity: String!
  secret: String!
  name: String!
  trusted: Boolean
}

type ClientEdge {
  node: Client!
  cursor: String!
}

enum ClientOrderByInput {
  id_ASC
  id_DESC
  identity_ASC
  identity_DESC
  secret_ASC
  secret_DESC
  name_ASC
  name_DESC
  trusted_ASC
  trusted_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ClientPreviousValues {
  id: ID!
  identity: String!
  secret: String!
  name: String!
  trusted: Boolean!
}

type ClientSubscriptionPayload {
  mutation: MutationType!
  node: Client
  updatedFields: [String!]
  previousValues: ClientPreviousValues
}

input ClientSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ClientWhereInput
  AND: [ClientSubscriptionWhereInput!]
  OR: [ClientSubscriptionWhereInput!]
  NOT: [ClientSubscriptionWhereInput!]
}

input ClientUpdateInput {
  identity: String
  secret: String
  name: String
  trusted: Boolean
}

input ClientUpdateManyMutationInput {
  identity: String
  secret: String
  name: String
  trusted: Boolean
}

input ClientWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  identity: String
  identity_not: String
  identity_in: [String!]
  identity_not_in: [String!]
  identity_lt: String
  identity_lte: String
  identity_gt: String
  identity_gte: String
  identity_contains: String
  identity_not_contains: String
  identity_starts_with: String
  identity_not_starts_with: String
  identity_ends_with: String
  identity_not_ends_with: String
  secret: String
  secret_not: String
  secret_in: [String!]
  secret_not_in: [String!]
  secret_lt: String
  secret_lte: String
  secret_gt: String
  secret_gte: String
  secret_contains: String
  secret_not_contains: String
  secret_starts_with: String
  secret_not_starts_with: String
  secret_ends_with: String
  secret_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  trusted: Boolean
  trusted_not: Boolean
  AND: [ClientWhereInput!]
  OR: [ClientWhereInput!]
  NOT: [ClientWhereInput!]
}

input ClientWhereUniqueInput {
  id: ID
  identity: String
}

type ConsumedItem {
  id: ID!
  item: Item!
  consumer: User!
  price: Float!
  amount: Int!
}

type ConsumedItemConnection {
  pageInfo: PageInfo!
  edges: [ConsumedItemEdge]!
  aggregate: AggregateConsumedItem!
}

input ConsumedItemCreateInput {
  item: ItemCreateOneInput!
  consumer: UserCreateOneWithoutConsumedItemsInput!
  price: Float!
  amount: Int!
}

input ConsumedItemCreateManyWithoutConsumerInput {
  create: [ConsumedItemCreateWithoutConsumerInput!]
  connect: [ConsumedItemWhereUniqueInput!]
}

input ConsumedItemCreateWithoutConsumerInput {
  item: ItemCreateOneInput!
  price: Float!
  amount: Int!
}

type ConsumedItemEdge {
  node: ConsumedItem!
  cursor: String!
}

enum ConsumedItemOrderByInput {
  id_ASC
  id_DESC
  price_ASC
  price_DESC
  amount_ASC
  amount_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ConsumedItemPreviousValues {
  id: ID!
  price: Float!
  amount: Int!
}

input ConsumedItemScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  price: Float
  price_not: Float
  price_in: [Float!]
  price_not_in: [Float!]
  price_lt: Float
  price_lte: Float
  price_gt: Float
  price_gte: Float
  amount: Int
  amount_not: Int
  amount_in: [Int!]
  amount_not_in: [Int!]
  amount_lt: Int
  amount_lte: Int
  amount_gt: Int
  amount_gte: Int
  AND: [ConsumedItemScalarWhereInput!]
  OR: [ConsumedItemScalarWhereInput!]
  NOT: [ConsumedItemScalarWhereInput!]
}

type ConsumedItemSubscriptionPayload {
  mutation: MutationType!
  node: ConsumedItem
  updatedFields: [String!]
  previousValues: ConsumedItemPreviousValues
}

input ConsumedItemSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ConsumedItemWhereInput
  AND: [ConsumedItemSubscriptionWhereInput!]
  OR: [ConsumedItemSubscriptionWhereInput!]
  NOT: [ConsumedItemSubscriptionWhereInput!]
}

input ConsumedItemUpdateInput {
  item: ItemUpdateOneRequiredInput
  consumer: UserUpdateOneRequiredWithoutConsumedItemsInput
  price: Float
  amount: Int
}

input ConsumedItemUpdateManyDataInput {
  price: Float
  amount: Int
}

input ConsumedItemUpdateManyMutationInput {
  price: Float
  amount: Int
}

input ConsumedItemUpdateManyWithoutConsumerInput {
  create: [ConsumedItemCreateWithoutConsumerInput!]
  delete: [ConsumedItemWhereUniqueInput!]
  connect: [ConsumedItemWhereUniqueInput!]
  set: [ConsumedItemWhereUniqueInput!]
  disconnect: [ConsumedItemWhereUniqueInput!]
  update: [ConsumedItemUpdateWithWhereUniqueWithoutConsumerInput!]
  upsert: [ConsumedItemUpsertWithWhereUniqueWithoutConsumerInput!]
  deleteMany: [ConsumedItemScalarWhereInput!]
  updateMany: [ConsumedItemUpdateManyWithWhereNestedInput!]
}

input ConsumedItemUpdateManyWithWhereNestedInput {
  where: ConsumedItemScalarWhereInput!
  data: ConsumedItemUpdateManyDataInput!
}

input ConsumedItemUpdateWithoutConsumerDataInput {
  item: ItemUpdateOneRequiredInput
  price: Float
  amount: Int
}

input ConsumedItemUpdateWithWhereUniqueWithoutConsumerInput {
  where: ConsumedItemWhereUniqueInput!
  data: ConsumedItemUpdateWithoutConsumerDataInput!
}

input ConsumedItemUpsertWithWhereUniqueWithoutConsumerInput {
  where: ConsumedItemWhereUniqueInput!
  update: ConsumedItemUpdateWithoutConsumerDataInput!
  create: ConsumedItemCreateWithoutConsumerInput!
}

input ConsumedItemWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  item: ItemWhereInput
  consumer: UserWhereInput
  price: Float
  price_not: Float
  price_in: [Float!]
  price_not_in: [Float!]
  price_lt: Float
  price_lte: Float
  price_gt: Float
  price_gte: Float
  amount: Int
  amount_not: Int
  amount_in: [Int!]
  amount_not_in: [Int!]
  amount_lt: Int
  amount_lte: Int
  amount_gt: Int
  amount_gte: Int
  AND: [ConsumedItemWhereInput!]
  OR: [ConsumedItemWhereInput!]
  NOT: [ConsumedItemWhereInput!]
}

input ConsumedItemWhereUniqueInput {
  id: ID
}

type Item {
  id: ID!
  name: String!
  price: Float!
  index: Int!
  show: Boolean!
}

type ItemConnection {
  pageInfo: PageInfo!
  edges: [ItemEdge]!
  aggregate: AggregateItem!
}

input ItemCreateInput {
  name: String!
  price: Float!
  index: Int!
  show: Boolean
}

input ItemCreateOneInput {
  create: ItemCreateInput
  connect: ItemWhereUniqueInput
}

type ItemEdge {
  node: Item!
  cursor: String!
}

enum ItemOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  price_ASC
  price_DESC
  index_ASC
  index_DESC
  show_ASC
  show_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ItemPreviousValues {
  id: ID!
  name: String!
  price: Float!
  index: Int!
  show: Boolean!
}

type ItemSubscriptionPayload {
  mutation: MutationType!
  node: Item
  updatedFields: [String!]
  previousValues: ItemPreviousValues
}

input ItemSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ItemWhereInput
  AND: [ItemSubscriptionWhereInput!]
  OR: [ItemSubscriptionWhereInput!]
  NOT: [ItemSubscriptionWhereInput!]
}

input ItemUpdateDataInput {
  name: String
  price: Float
  index: Int
  show: Boolean
}

input ItemUpdateInput {
  name: String
  price: Float
  index: Int
  show: Boolean
}

input ItemUpdateManyMutationInput {
  name: String
  price: Float
  index: Int
  show: Boolean
}

input ItemUpdateOneRequiredInput {
  create: ItemCreateInput
  update: ItemUpdateDataInput
  upsert: ItemUpsertNestedInput
  connect: ItemWhereUniqueInput
}

input ItemUpsertNestedInput {
  update: ItemUpdateDataInput!
  create: ItemCreateInput!
}

input ItemWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  price: Float
  price_not: Float
  price_in: [Float!]
  price_not_in: [Float!]
  price_lt: Float
  price_lte: Float
  price_gt: Float
  price_gte: Float
  index: Int
  index_not: Int
  index_in: [Int!]
  index_not_in: [Int!]
  index_lt: Int
  index_lte: Int
  index_gt: Int
  index_gte: Int
  show: Boolean
  show_not: Boolean
  AND: [ItemWhereInput!]
  OR: [ItemWhereInput!]
  NOT: [ItemWhereInput!]
}

input ItemWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createClient(data: ClientCreateInput!): Client!
  updateClient(data: ClientUpdateInput!, where: ClientWhereUniqueInput!): Client
  updateManyClients(data: ClientUpdateManyMutationInput!, where: ClientWhereInput): BatchPayload!
  upsertClient(where: ClientWhereUniqueInput!, create: ClientCreateInput!, update: ClientUpdateInput!): Client!
  deleteClient(where: ClientWhereUniqueInput!): Client
  deleteManyClients(where: ClientWhereInput): BatchPayload!
  createConsumedItem(data: ConsumedItemCreateInput!): ConsumedItem!
  updateConsumedItem(data: ConsumedItemUpdateInput!, where: ConsumedItemWhereUniqueInput!): ConsumedItem
  updateManyConsumedItems(data: ConsumedItemUpdateManyMutationInput!, where: ConsumedItemWhereInput): BatchPayload!
  upsertConsumedItem(where: ConsumedItemWhereUniqueInput!, create: ConsumedItemCreateInput!, update: ConsumedItemUpdateInput!): ConsumedItem!
  deleteConsumedItem(where: ConsumedItemWhereUniqueInput!): ConsumedItem
  deleteManyConsumedItems(where: ConsumedItemWhereInput): BatchPayload!
  createItem(data: ItemCreateInput!): Item!
  updateItem(data: ItemUpdateInput!, where: ItemWhereUniqueInput!): Item
  updateManyItems(data: ItemUpdateManyMutationInput!, where: ItemWhereInput): BatchPayload!
  upsertItem(where: ItemWhereUniqueInput!, create: ItemCreateInput!, update: ItemUpdateInput!): Item!
  deleteItem(where: ItemWhereUniqueInput!): Item
  deleteManyItems(where: ItemWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  client(where: ClientWhereUniqueInput!): Client
  clients(where: ClientWhereInput, orderBy: ClientOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Client]!
  clientsConnection(where: ClientWhereInput, orderBy: ClientOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ClientConnection!
  consumedItem(where: ConsumedItemWhereUniqueInput!): ConsumedItem
  consumedItems(where: ConsumedItemWhereInput, orderBy: ConsumedItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ConsumedItem]!
  consumedItemsConnection(where: ConsumedItemWhereInput, orderBy: ConsumedItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ConsumedItemConnection!
  item(where: ItemWhereUniqueInput!): Item
  items(where: ItemWhereInput, orderBy: ItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Item]!
  itemsConnection(where: ItemWhereInput, orderBy: ItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ItemConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  client(where: ClientSubscriptionWhereInput): ClientSubscriptionPayload
  consumedItem(where: ConsumedItemSubscriptionWhereInput): ConsumedItemSubscriptionPayload
  item(where: ItemSubscriptionWhereInput): ItemSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  consumedItems(where: ConsumedItemWhereInput, orderBy: ConsumedItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ConsumedItem!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
  email: String!
  password: String!
  consumedItems: ConsumedItemCreateManyWithoutConsumerInput
}

input UserCreateOneWithoutConsumedItemsInput {
  create: UserCreateWithoutConsumedItemsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutConsumedItemsInput {
  name: String!
  email: String!
  password: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  email: String!
  password: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
  email: String
  password: String
  consumedItems: ConsumedItemUpdateManyWithoutConsumerInput
}

input UserUpdateManyMutationInput {
  name: String
  email: String
  password: String
}

input UserUpdateOneRequiredWithoutConsumedItemsInput {
  create: UserCreateWithoutConsumedItemsInput
  update: UserUpdateWithoutConsumedItemsDataInput
  upsert: UserUpsertWithoutConsumedItemsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutConsumedItemsDataInput {
  name: String
  email: String
  password: String
}

input UserUpsertWithoutConsumedItemsInput {
  update: UserUpdateWithoutConsumedItemsDataInput!
  create: UserCreateWithoutConsumedItemsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  consumedItems_every: ConsumedItemWhereInput
  consumedItems_some: ConsumedItemWhereInput
  consumedItems_none: ConsumedItemWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    