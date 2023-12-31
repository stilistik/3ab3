export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: any;
};

export type Chat = Node & {
  __typename?: 'Chat';
  id: Scalars['ID'];
  title: Scalars['String'];
  creator: User;
  members: Array<User>;
  messages: MessageConnection;
  lastMessage?: Maybe<Message>;
  lastSeen?: Maybe<Scalars['JSON']>;
  usersTyping?: Maybe<Scalars['JSON']>;
};


export type ChatMessagesArgs = {
  first: Scalars['Int'];
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};

export type ChatEdge = Edge & {
  __typename?: 'ChatEdge';
  cursor: Scalars['String'];
  node?: Maybe<Chat>;
};

export type ChatInput = {
  title: Scalars['String'];
  creatorId: Scalars['ID'];
  memberIds: Array<Scalars['ID']>;
};

export type ChatsConnection = Connection & {
  __typename?: 'ChatsConnection';
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<ChatEdge>>>;
};

export type Client = {
  __typename?: 'Client';
  id: Scalars['ID'];
  name: Scalars['String'];
  trusted: Scalars['Boolean'];
  secret: Scalars['String'];
};

export type Comment = Node & {
  __typename?: 'Comment';
  id: Scalars['ID'];
  text: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  author: User;
  likedBy: Array<User>;
  date: Scalars['DateTime'];
  post?: Maybe<Post>;
  event?: Maybe<Event>;
};

export type CommentEdge = Edge & {
  __typename?: 'CommentEdge';
  cursor: Scalars['String'];
  node?: Maybe<Comment>;
};

export type CommentsConnection = Connection & {
  __typename?: 'CommentsConnection';
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<CommentEdge>>>;
};

export type Connection = {
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<Edge>>>;
};



export type Debt = {
  __typename?: 'Debt';
  id: Scalars['ID'];
  transaction: Transaction;
  amount: Scalars['Float'];
  user: User;
  description: Scalars['String'];
  date: Scalars['DateTime'];
};

export type DebtInput = {
  amount: Scalars['Float'];
  description: Scalars['String'];
};

export type Document = {
  __typename?: 'Document';
  id: Scalars['ID'];
  file: File;
  name: Scalars['String'];
  createdAt: Scalars['DateTime'];
  owner: User;
  thumbnail?: Maybe<Scalars['String']>;
};

export type Edge = {
  cursor: Scalars['String'];
  node?: Maybe<Node>;
};

export type EditDocumentInput = {
  name?: Maybe<Scalars['String']>;
};

export type EditSelfInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  birthdate?: Maybe<Scalars['DateTime']>;
  avatar?: Maybe<Scalars['Upload']>;
  language?: Maybe<Scalars['String']>;
};

export type EmailInput = {
  to: Scalars['String'];
  from: Scalars['String'];
  subject: Scalars['String'];
  text: Scalars['String'];
};

export type Event = Node & {
  __typename?: 'Event';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  date: Scalars['DateTime'];
  subtitle?: Maybe<Scalars['String']>;
  spotify?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  soundcloud?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  place?: Maybe<Scalars['String']>;
  flyer?: Maybe<Scalars['String']>;
  comments: Array<Comment>;
  supporters: Array<User>;
  committee: Array<User>;
  likedBy: Array<User>;
  owner: User;
  todos: Array<Todo>;
  published: Scalars['Boolean'];
};

export type EventEdge = Edge & {
  __typename?: 'EventEdge';
  cursor: Scalars['String'];
  node?: Maybe<Event>;
};

export type EventInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  place?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['Upload']>;
  flyer?: Maybe<Scalars['Upload']>;
  subtitle?: Maybe<Scalars['String']>;
  spotify?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  soundcloud?: Maybe<Scalars['String']>;
};

export type EventsConnection = Connection & {
  __typename?: 'EventsConnection';
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<EventEdge>>>;
};

export type File = {
  __typename?: 'File';
  id: Scalars['ID'];
  filename: Scalars['String'];
  path: Scalars['String'];
  uri: Scalars['String'];
  mimetype: Scalars['String'];
  extension: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['ID'];
  product: Product;
  user: User;
  amount: Scalars['Int'];
  price: Scalars['Float'];
};


export type Message = Node & {
  __typename?: 'Message';
  id: Scalars['ID'];
  text: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  from: User;
  chat: Chat;
  date: Scalars['DateTime'];
};

export type MessageConnection = Connection & {
  __typename?: 'MessageConnection';
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<MessageEdge>>>;
};

export type MessageEdge = Edge & {
  __typename?: 'MessageEdge';
  cursor: Scalars['String'];
  node?: Maybe<Message>;
};

export type MessageInput = {
  chatId: Scalars['ID'];
  fromId: Scalars['ID'];
  text: Scalars['String'];
  link?: Maybe<Scalars['String']>;
};

export type MessageSubscriptionPayload = {
  __typename?: 'MessageSubscriptionPayload';
  mutation: MutationType;
  node?: Maybe<Message>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  editSelf: User;
  uploadAvatar: User;
  setOnlineStatus: User;
  createUser: User;
  editUser: User;
  deleteUser: User;
  restoreUser: User;
  createProduct: Product;
  updateProduct: Product;
  deleteProduct: Product;
  createPurchase: Purchase;
  editPurchase: Purchase;
  deletePurchase: Purchase;
  createPayment: Payment;
  editPayment: Payment;
  deletePayment: Payment;
  verifyPayment: Payment;
  deleteTransaction: Transaction;
  createEvent: Event;
  editEvent: Event;
  addCommitteeMembers: Event;
  removeCommitteeMember: Event;
  likeEvent: Event;
  unlikeEvent: Event;
  commentEvent: Event;
  supportEvent: Event;
  unsupportEvent: Event;
  deleteEvent: Event;
  setEventPublished: Event;
  uploadFile: File;
  deleteFile: File;
  sendEmail: Scalars['Boolean'];
  sendPaymentReminder: Scalars['Boolean'];
  createPost: Post;
  deletePost: Post;
  likePost: Post;
  unlikePost: Post;
  commentPost: Post;
  likeComment: Comment;
  unlikeComment: Comment;
  deleteComment: Comment;
  createTodo: Todo;
  createManyTodos: Array<Todo>;
  deleteTodo: Todo;
  checkTodo: Todo;
  uncheckTodo: Todo;
  assignUser: Todo;
  createMessage: Message;
  createChat: Chat;
  userLastSeen: Chat;
  uploadDocument: Document;
  editDocument: Document;
  createDebt: Debt;
  editDebt: Debt;
  createSecret: Secret;
  editSecret: Secret;
  deleteSecret: Secret;
};


export type MutationEditSelfArgs = {
  input: EditSelfInput;
};


export type MutationUploadAvatarArgs = {
  file: Scalars['Upload'];
};


export type MutationSetOnlineStatusArgs = {
  userId: Scalars['ID'];
  isOnline: Scalars['Boolean'];
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationEditUserArgs = {
  userId: Scalars['ID'];
  input: UserInput;
};


export type MutationDeleteUserArgs = {
  userId: Scalars['ID'];
};


export type MutationRestoreUserArgs = {
  userId: Scalars['ID'];
};


export type MutationCreateProductArgs = {
  input: ProductInput;
};


export type MutationUpdateProductArgs = {
  productId: Scalars['ID'];
  input: ProductInput;
};


export type MutationDeleteProductArgs = {
  productId: Scalars['ID'];
};


export type MutationCreatePurchaseArgs = {
  input: PurchaseInput;
};


export type MutationEditPurchaseArgs = {
  purchaseId: Scalars['ID'];
  input: PurchaseInput;
};


export type MutationDeletePurchaseArgs = {
  purchaseId: Scalars['ID'];
};


export type MutationCreatePaymentArgs = {
  input: PaymentInput;
};


export type MutationEditPaymentArgs = {
  paymentId: Scalars['ID'];
  input: PaymentInput;
};


export type MutationDeletePaymentArgs = {
  paymentId: Scalars['ID'];
};


export type MutationVerifyPaymentArgs = {
  paymentId: Scalars['ID'];
};


export type MutationDeleteTransactionArgs = {
  transactionId: Scalars['ID'];
};


export type MutationCreateEventArgs = {
  input: EventInput;
};


export type MutationEditEventArgs = {
  eventId: Scalars['ID'];
  input: EventInput;
};


export type MutationAddCommitteeMembersArgs = {
  eventId?: Maybe<Scalars['ID']>;
  memberIds: Array<Scalars['ID']>;
};


export type MutationRemoveCommitteeMemberArgs = {
  eventId?: Maybe<Scalars['ID']>;
  memberId: Scalars['ID'];
};


export type MutationLikeEventArgs = {
  eventId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationUnlikeEventArgs = {
  eventId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationCommentEventArgs = {
  eventId: Scalars['ID'];
  text: Scalars['String'];
  link?: Maybe<Scalars['String']>;
};


export type MutationSupportEventArgs = {
  eventId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationUnsupportEventArgs = {
  eventId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationDeleteEventArgs = {
  eventId: Scalars['ID'];
};


export type MutationSetEventPublishedArgs = {
  eventId?: Maybe<Scalars['ID']>;
  published: Scalars['Boolean'];
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};


export type MutationDeleteFileArgs = {
  fileId: Scalars['ID'];
};


export type MutationSendEmailArgs = {
  input: EmailInput;
};


export type MutationSendPaymentReminderArgs = {
  userIds: Array<Scalars['ID']>;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationDeletePostArgs = {
  postId: Scalars['ID'];
};


export type MutationLikePostArgs = {
  userId: Scalars['ID'];
  postId: Scalars['ID'];
};


export type MutationUnlikePostArgs = {
  userId: Scalars['ID'];
  postId: Scalars['ID'];
};


export type MutationCommentPostArgs = {
  postId: Scalars['ID'];
  text: Scalars['String'];
  link?: Maybe<Scalars['String']>;
};


export type MutationLikeCommentArgs = {
  userId: Scalars['ID'];
  commentId: Scalars['ID'];
};


export type MutationUnlikeCommentArgs = {
  userId: Scalars['ID'];
  commentId: Scalars['ID'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID'];
};


export type MutationCreateTodoArgs = {
  input: TodoInput;
};


export type MutationCreateManyTodosArgs = {
  input: Array<TodoInput>;
};


export type MutationDeleteTodoArgs = {
  todoId: Scalars['ID'];
};


export type MutationCheckTodoArgs = {
  todoId: Scalars['ID'];
};


export type MutationUncheckTodoArgs = {
  todoId: Scalars['ID'];
};


export type MutationAssignUserArgs = {
  todoId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationCreateMessageArgs = {
  input?: Maybe<MessageInput>;
};


export type MutationCreateChatArgs = {
  input: ChatInput;
};


export type MutationUserLastSeenArgs = {
  userId: Scalars['ID'];
  chatId: Scalars['ID'];
};


export type MutationUploadDocumentArgs = {
  input: UploadDocumentInput;
};


export type MutationEditDocumentArgs = {
  documentId: Scalars['ID'];
  input: EditDocumentInput;
};


export type MutationCreateDebtArgs = {
  userId: Scalars['ID'];
  input: DebtInput;
};


export type MutationEditDebtArgs = {
  userId: Scalars['ID'];
  debtId: Scalars['ID'];
  input: DebtInput;
};


export type MutationCreateSecretArgs = {
  input: SecretInput;
};


export type MutationEditSecretArgs = {
  secretId: Scalars['ID'];
  input: SecretInput;
};


export type MutationDeleteSecretArgs = {
  secretId: Scalars['ID'];
};

export enum MutationType {
  Created = 'CREATED',
  Updated = 'UPDATED',
  Deleted = 'DELETED'
}

export type Node = {
  id?: Maybe<Scalars['ID']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type Payment = {
  __typename?: 'Payment';
  id: Scalars['ID'];
  transaction: Transaction;
  amount: Scalars['Float'];
  user: User;
  verified: Scalars['Boolean'];
  date: Scalars['DateTime'];
};

export type PaymentInput = {
  userId: Scalars['ID'];
  date?: Maybe<Scalars['DateTime']>;
  amount: Scalars['Float'];
};

export type Post = Node & {
  __typename?: 'Post';
  id: Scalars['ID'];
  text: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  author: User;
  likedBy: Array<User>;
  comments: Array<Comment>;
  date: Scalars['DateTime'];
};

export type PostEdge = Edge & {
  __typename?: 'PostEdge';
  cursor: Scalars['String'];
  node?: Maybe<Post>;
};

export type PostInput = {
  userId: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['Upload']>;
  link?: Maybe<Scalars['String']>;
};

export type PostsConnection = Connection & {
  __typename?: 'PostsConnection';
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<PostEdge>>>;
};

export type PostSubscriptionPayload = {
  __typename?: 'PostSubscriptionPayload';
  mutation: MutationType;
  node?: Maybe<Post>;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  index: Scalars['Int'];
  thumbnail?: Maybe<Scalars['String']>;
  deleted: Scalars['Boolean'];
};

export type ProductConsumption = {
  __typename?: 'ProductConsumption';
  count: Scalars['Int'];
  product: Product;
};

export type ProductInput = {
  name: Scalars['String'];
  price: Scalars['Float'];
  index: Scalars['Int'];
  thumbnail?: Maybe<Scalars['Upload']>;
  deleted?: Maybe<Scalars['Boolean']>;
};

export type Purchase = {
  __typename?: 'Purchase';
  id: Scalars['ID'];
  transaction: Transaction;
  items: Array<Item>;
  total: Scalars['Float'];
  user: User;
  date: Scalars['DateTime'];
};

export type PurchaseInput = {
  userId: Scalars['ID'];
  date?: Maybe<Scalars['DateTime']>;
  items: Array<PurchaseItemInput>;
};

export type PurchaseItemInput = {
  productId: Scalars['ID'];
  amount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  users: Array<User>;
  roles: Array<Scalars['String']>;
  user: User;
  currentUser: User;
  usersWithDebt: Array<User>;
  deletedUsers: Array<User>;
  clients: Array<Client>;
  client: Client;
  products: Array<Product>;
  currentProducts: Array<Product>;
  product: Product;
  consumption: ProductConsumption;
  consumptions: Array<Maybe<ProductConsumption>>;
  items: Array<Item>;
  item: Item;
  purchases: Array<Purchase>;
  purchase: Purchase;
  userPurchases: Array<Purchase>;
  payments: Array<Payment>;
  payment: Payment;
  transaction: Transaction;
  transactions?: Maybe<TransactionConnection>;
  event: Event;
  events: EventsConnection;
  futureEvents: EventsConnection;
  pastEvents: EventsConnection;
  futurePublishedEvents: EventsConnection;
  pastPublishedEvents: EventsConnection;
  files: Array<File>;
  file: File;
  posts: Array<Post>;
  post: Post;
  feed?: Maybe<PostsConnection>;
  comments: Array<Comment>;
  comment: Comment;
  postComments?: Maybe<CommentsConnection>;
  postCommentCount: Scalars['Int'];
  eventComments?: Maybe<CommentsConnection>;
  eventCommentCount: Scalars['Int'];
  messages: MessageConnection;
  chats: ChatsConnection;
  unreadMessagesCount: Scalars['Int'];
  documents: Array<Document>;
  secrets: Array<Secret>;
};


export type QueryUserArgs = {
  userId: Scalars['ID'];
};


export type QueryUsersWithDebtArgs = {
  threshold: Scalars['Int'];
};


export type QueryClientArgs = {
  clientId: Scalars['ID'];
};


export type QueryProductArgs = {
  productId: Scalars['ID'];
};


export type QueryConsumptionArgs = {
  productId: Scalars['ID'];
};


export type QueryItemArgs = {
  itemId: Scalars['ID'];
};


export type QueryPurchaseArgs = {
  purchaseId: Scalars['ID'];
};


export type QueryUserPurchasesArgs = {
  userId: Scalars['ID'];
};


export type QueryPaymentArgs = {
  paymentId: Scalars['ID'];
};


export type QueryTransactionArgs = {
  transactionId: Scalars['ID'];
};


export type QueryTransactionsArgs = {
  type?: Maybe<TransactionType>;
  where?: Maybe<Scalars['JSON']>;
  orderBy?: Maybe<Scalars['String']>;
  first: Scalars['Int'];
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};


export type QueryEventArgs = {
  eventId: Scalars['ID'];
};


export type QueryEventsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};


export type QueryFutureEventsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};


export type QueryPastEventsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};


export type QueryFuturePublishedEventsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};


export type QueryPastPublishedEventsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};


export type QueryFileArgs = {
  fileId: Scalars['ID'];
};


export type QueryPostArgs = {
  postId: Scalars['ID'];
};


export type QueryFeedArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};


export type QueryCommentArgs = {
  commentId: Scalars['ID'];
};


export type QueryPostCommentsArgs = {
  postId: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};


export type QueryPostCommentCountArgs = {
  postId: Scalars['ID'];
};


export type QueryEventCommentsArgs = {
  eventId: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};


export type QueryEventCommentCountArgs = {
  eventId: Scalars['ID'];
};


export type QueryMessagesArgs = {
  chatId: Scalars['ID'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryChatsArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryUnreadMessagesCountArgs = {
  userId: Scalars['ID'];
  chatId: Scalars['ID'];
};

export type Secret = {
  __typename?: 'Secret';
  id: Scalars['ID'];
  title: Scalars['String'];
  front: Scalars['String'];
  back?: Maybe<Scalars['String']>;
  creator: User;
};

export type SecretInput = {
  title?: Maybe<Scalars['String']>;
  front?: Maybe<Scalars['String']>;
  back?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']>;
  postCreated: PostSubscriptionPayload;
  onNewMessage: MessageSubscriptionPayload;
};


export type SubscriptionOnNewMessageArgs = {
  chatId?: Maybe<Scalars['ID']>;
  toId?: Maybe<Scalars['ID']>;
};


export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  due: Scalars['DateTime'];
  text: Scalars['String'];
  done: Scalars['Boolean'];
  link?: Maybe<Scalars['String']>;
  assigned?: Maybe<User>;
  doneBy?: Maybe<User>;
  doneAt?: Maybe<Scalars['DateTime']>;
  event: Event;
};

export type TodoInput = {
  due: Scalars['DateTime'];
  text: Scalars['String'];
  eventId: Scalars['ID'];
};

export type Transaction = Node & {
  __typename?: 'Transaction';
  id: Scalars['ID'];
  user: User;
  date: Scalars['DateTime'];
  change: Scalars['Float'];
  type: TransactionType;
  purchase?: Maybe<Purchase>;
  payment?: Maybe<Payment>;
  debt?: Maybe<Debt>;
};

export type TransactionConnection = Connection & {
  __typename?: 'TransactionConnection';
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<TransactionEdge>>>;
};

export type TransactionEdge = Edge & {
  __typename?: 'TransactionEdge';
  cursor: Scalars['String'];
  node?: Maybe<Transaction>;
};

export enum TransactionType {
  Payment = 'PAYMENT',
  Purchase = 'PURCHASE',
  Debt = 'DEBT'
}


export type UploadDocumentInput = {
  file: Scalars['Upload'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  birthdate?: Maybe<Scalars['DateTime']>;
  language?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  purchases: Array<Purchase>;
  payments: Array<Payment>;
  transactions?: Maybe<TransactionConnection>;
  transactionCount: Scalars['Int'];
  items: Array<Item>;
  balance: Scalars['Float'];
  role: UserRole;
  posts: Array<Post>;
  events: Array<Event>;
  likedPosts: Array<Post>;
  likedEvents: Array<Event>;
  supportedEvents: Array<Event>;
  comments: Array<Comment>;
  likedComments: Array<Comment>;
  isOnline: Scalars['Boolean'];
  lastOnline?: Maybe<Scalars['DateTime']>;
  chats: Array<Chat>;
  unreadMessages: Scalars['Int'];
  consumptions: Array<ProductConsumption>;
  deleted: Scalars['Boolean'];
};


export type UserTransactionsArgs = {
  type?: Maybe<TransactionType>;
  first: Scalars['Int'];
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};

export type UserInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  phone?: Maybe<Scalars['String']>;
  birthdate?: Maybe<Scalars['DateTime']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export enum UserRole {
  Super = 'SUPER',
  Admin = 'ADMIN',
  Member = 'MEMBER'
}
