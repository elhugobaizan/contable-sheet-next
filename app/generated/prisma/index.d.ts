
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model banco
 * 
 */
export type banco = $Result.DefaultSelection<Prisma.$bancoPayload>
/**
 * Model fijo
 * 
 */
export type fijo = $Result.DefaultSelection<Prisma.$fijoPayload>
/**
 * Model gasto
 * 
 */
export type gasto = $Result.DefaultSelection<Prisma.$gastoPayload>
/**
 * Model principal
 * 
 */
export type principal = $Result.DefaultSelection<Prisma.$principalPayload>
/**
 * Model wallet
 * 
 */
export type wallet = $Result.DefaultSelection<Prisma.$walletPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Bancos
 * const bancos = await prisma.banco.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Bancos
   * const bancos = await prisma.banco.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.banco`: Exposes CRUD operations for the **banco** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bancos
    * const bancos = await prisma.banco.findMany()
    * ```
    */
  get banco(): Prisma.bancoDelegate<ExtArgs>;

  /**
   * `prisma.fijo`: Exposes CRUD operations for the **fijo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Fijos
    * const fijos = await prisma.fijo.findMany()
    * ```
    */
  get fijo(): Prisma.fijoDelegate<ExtArgs>;

  /**
   * `prisma.gasto`: Exposes CRUD operations for the **gasto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Gastos
    * const gastos = await prisma.gasto.findMany()
    * ```
    */
  get gasto(): Prisma.gastoDelegate<ExtArgs>;

  /**
   * `prisma.principal`: Exposes CRUD operations for the **principal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Principals
    * const principals = await prisma.principal.findMany()
    * ```
    */
  get principal(): Prisma.principalDelegate<ExtArgs>;

  /**
   * `prisma.wallet`: Exposes CRUD operations for the **wallet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wallets
    * const wallets = await prisma.wallet.findMany()
    * ```
    */
  get wallet(): Prisma.walletDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    banco: 'banco',
    fijo: 'fijo',
    gasto: 'gasto',
    principal: 'principal',
    wallet: 'wallet'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "banco" | "fijo" | "gasto" | "principal" | "wallet"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      banco: {
        payload: Prisma.$bancoPayload<ExtArgs>
        fields: Prisma.bancoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.bancoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bancoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.bancoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bancoPayload>
          }
          findFirst: {
            args: Prisma.bancoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bancoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.bancoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bancoPayload>
          }
          findMany: {
            args: Prisma.bancoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bancoPayload>[]
          }
          create: {
            args: Prisma.bancoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bancoPayload>
          }
          createMany: {
            args: Prisma.bancoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.bancoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bancoPayload>
          }
          update: {
            args: Prisma.bancoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bancoPayload>
          }
          deleteMany: {
            args: Prisma.bancoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.bancoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.bancoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bancoPayload>
          }
          aggregate: {
            args: Prisma.BancoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBanco>
          }
          groupBy: {
            args: Prisma.bancoGroupByArgs<ExtArgs>
            result: $Utils.Optional<BancoGroupByOutputType>[]
          }
          count: {
            args: Prisma.bancoCountArgs<ExtArgs>
            result: $Utils.Optional<BancoCountAggregateOutputType> | number
          }
        }
      }
      fijo: {
        payload: Prisma.$fijoPayload<ExtArgs>
        fields: Prisma.fijoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.fijoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$fijoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.fijoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$fijoPayload>
          }
          findFirst: {
            args: Prisma.fijoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$fijoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.fijoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$fijoPayload>
          }
          findMany: {
            args: Prisma.fijoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$fijoPayload>[]
          }
          create: {
            args: Prisma.fijoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$fijoPayload>
          }
          createMany: {
            args: Prisma.fijoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.fijoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$fijoPayload>
          }
          update: {
            args: Prisma.fijoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$fijoPayload>
          }
          deleteMany: {
            args: Prisma.fijoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.fijoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.fijoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$fijoPayload>
          }
          aggregate: {
            args: Prisma.FijoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFijo>
          }
          groupBy: {
            args: Prisma.fijoGroupByArgs<ExtArgs>
            result: $Utils.Optional<FijoGroupByOutputType>[]
          }
          count: {
            args: Prisma.fijoCountArgs<ExtArgs>
            result: $Utils.Optional<FijoCountAggregateOutputType> | number
          }
        }
      }
      gasto: {
        payload: Prisma.$gastoPayload<ExtArgs>
        fields: Prisma.gastoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.gastoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gastoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.gastoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gastoPayload>
          }
          findFirst: {
            args: Prisma.gastoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gastoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.gastoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gastoPayload>
          }
          findMany: {
            args: Prisma.gastoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gastoPayload>[]
          }
          create: {
            args: Prisma.gastoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gastoPayload>
          }
          createMany: {
            args: Prisma.gastoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.gastoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gastoPayload>
          }
          update: {
            args: Prisma.gastoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gastoPayload>
          }
          deleteMany: {
            args: Prisma.gastoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.gastoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.gastoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gastoPayload>
          }
          aggregate: {
            args: Prisma.GastoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGasto>
          }
          groupBy: {
            args: Prisma.gastoGroupByArgs<ExtArgs>
            result: $Utils.Optional<GastoGroupByOutputType>[]
          }
          count: {
            args: Prisma.gastoCountArgs<ExtArgs>
            result: $Utils.Optional<GastoCountAggregateOutputType> | number
          }
        }
      }
      principal: {
        payload: Prisma.$principalPayload<ExtArgs>
        fields: Prisma.principalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.principalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$principalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.principalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$principalPayload>
          }
          findFirst: {
            args: Prisma.principalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$principalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.principalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$principalPayload>
          }
          findMany: {
            args: Prisma.principalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$principalPayload>[]
          }
          create: {
            args: Prisma.principalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$principalPayload>
          }
          createMany: {
            args: Prisma.principalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.principalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$principalPayload>
          }
          update: {
            args: Prisma.principalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$principalPayload>
          }
          deleteMany: {
            args: Prisma.principalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.principalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.principalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$principalPayload>
          }
          aggregate: {
            args: Prisma.PrincipalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrincipal>
          }
          groupBy: {
            args: Prisma.principalGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrincipalGroupByOutputType>[]
          }
          count: {
            args: Prisma.principalCountArgs<ExtArgs>
            result: $Utils.Optional<PrincipalCountAggregateOutputType> | number
          }
        }
      }
      wallet: {
        payload: Prisma.$walletPayload<ExtArgs>
        fields: Prisma.walletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.walletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$walletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.walletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$walletPayload>
          }
          findFirst: {
            args: Prisma.walletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$walletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.walletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$walletPayload>
          }
          findMany: {
            args: Prisma.walletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$walletPayload>[]
          }
          create: {
            args: Prisma.walletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$walletPayload>
          }
          createMany: {
            args: Prisma.walletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.walletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$walletPayload>
          }
          update: {
            args: Prisma.walletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$walletPayload>
          }
          deleteMany: {
            args: Prisma.walletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.walletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.walletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$walletPayload>
          }
          aggregate: {
            args: Prisma.WalletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWallet>
          }
          groupBy: {
            args: Prisma.walletGroupByArgs<ExtArgs>
            result: $Utils.Optional<WalletGroupByOutputType>[]
          }
          count: {
            args: Prisma.walletCountArgs<ExtArgs>
            result: $Utils.Optional<WalletCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model banco
   */

  export type AggregateBanco = {
    _count: BancoCountAggregateOutputType | null
    _avg: BancoAvgAggregateOutputType | null
    _sum: BancoSumAggregateOutputType | null
    _min: BancoMinAggregateOutputType | null
    _max: BancoMaxAggregateOutputType | null
  }

  export type BancoAvgAggregateOutputType = {
    id: number | null
    capital: Decimal | null
    tna: number | null
  }

  export type BancoSumAggregateOutputType = {
    id: number | null
    capital: Decimal | null
    tna: number | null
  }

  export type BancoMinAggregateOutputType = {
    id: number | null
    capital: Decimal | null
    duedate: Date | null
    logo: string | null
    name: string | null
    period: Date | null
    tna: number | null
  }

  export type BancoMaxAggregateOutputType = {
    id: number | null
    capital: Decimal | null
    duedate: Date | null
    logo: string | null
    name: string | null
    period: Date | null
    tna: number | null
  }

  export type BancoCountAggregateOutputType = {
    id: number
    capital: number
    duedate: number
    logo: number
    name: number
    period: number
    tna: number
    _all: number
  }


  export type BancoAvgAggregateInputType = {
    id?: true
    capital?: true
    tna?: true
  }

  export type BancoSumAggregateInputType = {
    id?: true
    capital?: true
    tna?: true
  }

  export type BancoMinAggregateInputType = {
    id?: true
    capital?: true
    duedate?: true
    logo?: true
    name?: true
    period?: true
    tna?: true
  }

  export type BancoMaxAggregateInputType = {
    id?: true
    capital?: true
    duedate?: true
    logo?: true
    name?: true
    period?: true
    tna?: true
  }

  export type BancoCountAggregateInputType = {
    id?: true
    capital?: true
    duedate?: true
    logo?: true
    name?: true
    period?: true
    tna?: true
    _all?: true
  }

  export type BancoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which banco to aggregate.
     */
    where?: bancoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bancos to fetch.
     */
    orderBy?: bancoOrderByWithRelationInput | bancoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: bancoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bancos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bancos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned bancos
    **/
    _count?: true | BancoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BancoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BancoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BancoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BancoMaxAggregateInputType
  }

  export type GetBancoAggregateType<T extends BancoAggregateArgs> = {
        [P in keyof T & keyof AggregateBanco]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBanco[P]>
      : GetScalarType<T[P], AggregateBanco[P]>
  }




  export type bancoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bancoWhereInput
    orderBy?: bancoOrderByWithAggregationInput | bancoOrderByWithAggregationInput[]
    by: BancoScalarFieldEnum[] | BancoScalarFieldEnum
    having?: bancoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BancoCountAggregateInputType | true
    _avg?: BancoAvgAggregateInputType
    _sum?: BancoSumAggregateInputType
    _min?: BancoMinAggregateInputType
    _max?: BancoMaxAggregateInputType
  }

  export type BancoGroupByOutputType = {
    id: number
    capital: Decimal
    duedate: Date
    logo: string
    name: string
    period: Date
    tna: number
    _count: BancoCountAggregateOutputType | null
    _avg: BancoAvgAggregateOutputType | null
    _sum: BancoSumAggregateOutputType | null
    _min: BancoMinAggregateOutputType | null
    _max: BancoMaxAggregateOutputType | null
  }

  type GetBancoGroupByPayload<T extends bancoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BancoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BancoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BancoGroupByOutputType[P]>
            : GetScalarType<T[P], BancoGroupByOutputType[P]>
        }
      >
    >


  export type bancoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    capital?: boolean
    duedate?: boolean
    logo?: boolean
    name?: boolean
    period?: boolean
    tna?: boolean
  }, ExtArgs["result"]["banco"]>


  export type bancoSelectScalar = {
    id?: boolean
    capital?: boolean
    duedate?: boolean
    logo?: boolean
    name?: boolean
    period?: boolean
    tna?: boolean
  }


  export type $bancoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "banco"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      capital: Prisma.Decimal
      duedate: Date
      logo: string
      name: string
      period: Date
      tna: number
    }, ExtArgs["result"]["banco"]>
    composites: {}
  }

  type bancoGetPayload<S extends boolean | null | undefined | bancoDefaultArgs> = $Result.GetResult<Prisma.$bancoPayload, S>

  type bancoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<bancoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BancoCountAggregateInputType | true
    }

  export interface bancoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['banco'], meta: { name: 'banco' } }
    /**
     * Find zero or one Banco that matches the filter.
     * @param {bancoFindUniqueArgs} args - Arguments to find a Banco
     * @example
     * // Get one Banco
     * const banco = await prisma.banco.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends bancoFindUniqueArgs>(args: SelectSubset<T, bancoFindUniqueArgs<ExtArgs>>): Prisma__bancoClient<$Result.GetResult<Prisma.$bancoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Banco that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {bancoFindUniqueOrThrowArgs} args - Arguments to find a Banco
     * @example
     * // Get one Banco
     * const banco = await prisma.banco.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends bancoFindUniqueOrThrowArgs>(args: SelectSubset<T, bancoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__bancoClient<$Result.GetResult<Prisma.$bancoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Banco that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bancoFindFirstArgs} args - Arguments to find a Banco
     * @example
     * // Get one Banco
     * const banco = await prisma.banco.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends bancoFindFirstArgs>(args?: SelectSubset<T, bancoFindFirstArgs<ExtArgs>>): Prisma__bancoClient<$Result.GetResult<Prisma.$bancoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Banco that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bancoFindFirstOrThrowArgs} args - Arguments to find a Banco
     * @example
     * // Get one Banco
     * const banco = await prisma.banco.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends bancoFindFirstOrThrowArgs>(args?: SelectSubset<T, bancoFindFirstOrThrowArgs<ExtArgs>>): Prisma__bancoClient<$Result.GetResult<Prisma.$bancoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Bancos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bancoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bancos
     * const bancos = await prisma.banco.findMany()
     * 
     * // Get first 10 Bancos
     * const bancos = await prisma.banco.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bancoWithIdOnly = await prisma.banco.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends bancoFindManyArgs>(args?: SelectSubset<T, bancoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bancoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Banco.
     * @param {bancoCreateArgs} args - Arguments to create a Banco.
     * @example
     * // Create one Banco
     * const Banco = await prisma.banco.create({
     *   data: {
     *     // ... data to create a Banco
     *   }
     * })
     * 
     */
    create<T extends bancoCreateArgs>(args: SelectSubset<T, bancoCreateArgs<ExtArgs>>): Prisma__bancoClient<$Result.GetResult<Prisma.$bancoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Bancos.
     * @param {bancoCreateManyArgs} args - Arguments to create many Bancos.
     * @example
     * // Create many Bancos
     * const banco = await prisma.banco.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends bancoCreateManyArgs>(args?: SelectSubset<T, bancoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Banco.
     * @param {bancoDeleteArgs} args - Arguments to delete one Banco.
     * @example
     * // Delete one Banco
     * const Banco = await prisma.banco.delete({
     *   where: {
     *     // ... filter to delete one Banco
     *   }
     * })
     * 
     */
    delete<T extends bancoDeleteArgs>(args: SelectSubset<T, bancoDeleteArgs<ExtArgs>>): Prisma__bancoClient<$Result.GetResult<Prisma.$bancoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Banco.
     * @param {bancoUpdateArgs} args - Arguments to update one Banco.
     * @example
     * // Update one Banco
     * const banco = await prisma.banco.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends bancoUpdateArgs>(args: SelectSubset<T, bancoUpdateArgs<ExtArgs>>): Prisma__bancoClient<$Result.GetResult<Prisma.$bancoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Bancos.
     * @param {bancoDeleteManyArgs} args - Arguments to filter Bancos to delete.
     * @example
     * // Delete a few Bancos
     * const { count } = await prisma.banco.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends bancoDeleteManyArgs>(args?: SelectSubset<T, bancoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bancos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bancoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bancos
     * const banco = await prisma.banco.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends bancoUpdateManyArgs>(args: SelectSubset<T, bancoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Banco.
     * @param {bancoUpsertArgs} args - Arguments to update or create a Banco.
     * @example
     * // Update or create a Banco
     * const banco = await prisma.banco.upsert({
     *   create: {
     *     // ... data to create a Banco
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Banco we want to update
     *   }
     * })
     */
    upsert<T extends bancoUpsertArgs>(args: SelectSubset<T, bancoUpsertArgs<ExtArgs>>): Prisma__bancoClient<$Result.GetResult<Prisma.$bancoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Bancos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bancoCountArgs} args - Arguments to filter Bancos to count.
     * @example
     * // Count the number of Bancos
     * const count = await prisma.banco.count({
     *   where: {
     *     // ... the filter for the Bancos we want to count
     *   }
     * })
    **/
    count<T extends bancoCountArgs>(
      args?: Subset<T, bancoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BancoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Banco.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BancoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BancoAggregateArgs>(args: Subset<T, BancoAggregateArgs>): Prisma.PrismaPromise<GetBancoAggregateType<T>>

    /**
     * Group by Banco.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bancoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends bancoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: bancoGroupByArgs['orderBy'] }
        : { orderBy?: bancoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, bancoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBancoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the banco model
   */
  readonly fields: bancoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for banco.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__bancoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the banco model
   */ 
  interface bancoFieldRefs {
    readonly id: FieldRef<"banco", 'Int'>
    readonly capital: FieldRef<"banco", 'Decimal'>
    readonly duedate: FieldRef<"banco", 'DateTime'>
    readonly logo: FieldRef<"banco", 'String'>
    readonly name: FieldRef<"banco", 'String'>
    readonly period: FieldRef<"banco", 'DateTime'>
    readonly tna: FieldRef<"banco", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * banco findUnique
   */
  export type bancoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the banco
     */
    select?: bancoSelect<ExtArgs> | null
    /**
     * Filter, which banco to fetch.
     */
    where: bancoWhereUniqueInput
  }

  /**
   * banco findUniqueOrThrow
   */
  export type bancoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the banco
     */
    select?: bancoSelect<ExtArgs> | null
    /**
     * Filter, which banco to fetch.
     */
    where: bancoWhereUniqueInput
  }

  /**
   * banco findFirst
   */
  export type bancoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the banco
     */
    select?: bancoSelect<ExtArgs> | null
    /**
     * Filter, which banco to fetch.
     */
    where?: bancoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bancos to fetch.
     */
    orderBy?: bancoOrderByWithRelationInput | bancoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bancos.
     */
    cursor?: bancoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bancos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bancos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bancos.
     */
    distinct?: BancoScalarFieldEnum | BancoScalarFieldEnum[]
  }

  /**
   * banco findFirstOrThrow
   */
  export type bancoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the banco
     */
    select?: bancoSelect<ExtArgs> | null
    /**
     * Filter, which banco to fetch.
     */
    where?: bancoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bancos to fetch.
     */
    orderBy?: bancoOrderByWithRelationInput | bancoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bancos.
     */
    cursor?: bancoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bancos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bancos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bancos.
     */
    distinct?: BancoScalarFieldEnum | BancoScalarFieldEnum[]
  }

  /**
   * banco findMany
   */
  export type bancoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the banco
     */
    select?: bancoSelect<ExtArgs> | null
    /**
     * Filter, which bancos to fetch.
     */
    where?: bancoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bancos to fetch.
     */
    orderBy?: bancoOrderByWithRelationInput | bancoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing bancos.
     */
    cursor?: bancoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bancos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bancos.
     */
    skip?: number
    distinct?: BancoScalarFieldEnum | BancoScalarFieldEnum[]
  }

  /**
   * banco create
   */
  export type bancoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the banco
     */
    select?: bancoSelect<ExtArgs> | null
    /**
     * The data needed to create a banco.
     */
    data: XOR<bancoCreateInput, bancoUncheckedCreateInput>
  }

  /**
   * banco createMany
   */
  export type bancoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many bancos.
     */
    data: bancoCreateManyInput | bancoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * banco update
   */
  export type bancoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the banco
     */
    select?: bancoSelect<ExtArgs> | null
    /**
     * The data needed to update a banco.
     */
    data: XOR<bancoUpdateInput, bancoUncheckedUpdateInput>
    /**
     * Choose, which banco to update.
     */
    where: bancoWhereUniqueInput
  }

  /**
   * banco updateMany
   */
  export type bancoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update bancos.
     */
    data: XOR<bancoUpdateManyMutationInput, bancoUncheckedUpdateManyInput>
    /**
     * Filter which bancos to update
     */
    where?: bancoWhereInput
  }

  /**
   * banco upsert
   */
  export type bancoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the banco
     */
    select?: bancoSelect<ExtArgs> | null
    /**
     * The filter to search for the banco to update in case it exists.
     */
    where: bancoWhereUniqueInput
    /**
     * In case the banco found by the `where` argument doesn't exist, create a new banco with this data.
     */
    create: XOR<bancoCreateInput, bancoUncheckedCreateInput>
    /**
     * In case the banco was found with the provided `where` argument, update it with this data.
     */
    update: XOR<bancoUpdateInput, bancoUncheckedUpdateInput>
  }

  /**
   * banco delete
   */
  export type bancoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the banco
     */
    select?: bancoSelect<ExtArgs> | null
    /**
     * Filter which banco to delete.
     */
    where: bancoWhereUniqueInput
  }

  /**
   * banco deleteMany
   */
  export type bancoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bancos to delete
     */
    where?: bancoWhereInput
  }

  /**
   * banco without action
   */
  export type bancoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the banco
     */
    select?: bancoSelect<ExtArgs> | null
  }


  /**
   * Model fijo
   */

  export type AggregateFijo = {
    _count: FijoCountAggregateOutputType | null
    _avg: FijoAvgAggregateOutputType | null
    _sum: FijoSumAggregateOutputType | null
    _min: FijoMinAggregateOutputType | null
    _max: FijoMaxAggregateOutputType | null
  }

  export type FijoAvgAggregateOutputType = {
    id: number | null
    capital: Decimal | null
  }

  export type FijoSumAggregateOutputType = {
    id: number | null
    capital: Decimal | null
  }

  export type FijoMinAggregateOutputType = {
    id: number | null
    capital: Decimal | null
    client: string | null
    logo: string | null
    name: string | null
    period: Date | null
    url: string | null
  }

  export type FijoMaxAggregateOutputType = {
    id: number | null
    capital: Decimal | null
    client: string | null
    logo: string | null
    name: string | null
    period: Date | null
    url: string | null
  }

  export type FijoCountAggregateOutputType = {
    id: number
    capital: number
    client: number
    logo: number
    name: number
    period: number
    url: number
    _all: number
  }


  export type FijoAvgAggregateInputType = {
    id?: true
    capital?: true
  }

  export type FijoSumAggregateInputType = {
    id?: true
    capital?: true
  }

  export type FijoMinAggregateInputType = {
    id?: true
    capital?: true
    client?: true
    logo?: true
    name?: true
    period?: true
    url?: true
  }

  export type FijoMaxAggregateInputType = {
    id?: true
    capital?: true
    client?: true
    logo?: true
    name?: true
    period?: true
    url?: true
  }

  export type FijoCountAggregateInputType = {
    id?: true
    capital?: true
    client?: true
    logo?: true
    name?: true
    period?: true
    url?: true
    _all?: true
  }

  export type FijoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which fijo to aggregate.
     */
    where?: fijoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of fijos to fetch.
     */
    orderBy?: fijoOrderByWithRelationInput | fijoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: fijoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` fijos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` fijos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned fijos
    **/
    _count?: true | FijoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FijoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FijoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FijoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FijoMaxAggregateInputType
  }

  export type GetFijoAggregateType<T extends FijoAggregateArgs> = {
        [P in keyof T & keyof AggregateFijo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFijo[P]>
      : GetScalarType<T[P], AggregateFijo[P]>
  }




  export type fijoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: fijoWhereInput
    orderBy?: fijoOrderByWithAggregationInput | fijoOrderByWithAggregationInput[]
    by: FijoScalarFieldEnum[] | FijoScalarFieldEnum
    having?: fijoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FijoCountAggregateInputType | true
    _avg?: FijoAvgAggregateInputType
    _sum?: FijoSumAggregateInputType
    _min?: FijoMinAggregateInputType
    _max?: FijoMaxAggregateInputType
  }

  export type FijoGroupByOutputType = {
    id: number
    capital: Decimal
    client: string
    logo: string
    name: string
    period: Date
    url: string
    _count: FijoCountAggregateOutputType | null
    _avg: FijoAvgAggregateOutputType | null
    _sum: FijoSumAggregateOutputType | null
    _min: FijoMinAggregateOutputType | null
    _max: FijoMaxAggregateOutputType | null
  }

  type GetFijoGroupByPayload<T extends fijoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FijoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FijoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FijoGroupByOutputType[P]>
            : GetScalarType<T[P], FijoGroupByOutputType[P]>
        }
      >
    >


  export type fijoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    capital?: boolean
    client?: boolean
    logo?: boolean
    name?: boolean
    period?: boolean
    url?: boolean
  }, ExtArgs["result"]["fijo"]>


  export type fijoSelectScalar = {
    id?: boolean
    capital?: boolean
    client?: boolean
    logo?: boolean
    name?: boolean
    period?: boolean
    url?: boolean
  }


  export type $fijoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "fijo"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      capital: Prisma.Decimal
      client: string
      logo: string
      name: string
      period: Date
      url: string
    }, ExtArgs["result"]["fijo"]>
    composites: {}
  }

  type fijoGetPayload<S extends boolean | null | undefined | fijoDefaultArgs> = $Result.GetResult<Prisma.$fijoPayload, S>

  type fijoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<fijoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FijoCountAggregateInputType | true
    }

  export interface fijoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['fijo'], meta: { name: 'fijo' } }
    /**
     * Find zero or one Fijo that matches the filter.
     * @param {fijoFindUniqueArgs} args - Arguments to find a Fijo
     * @example
     * // Get one Fijo
     * const fijo = await prisma.fijo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends fijoFindUniqueArgs>(args: SelectSubset<T, fijoFindUniqueArgs<ExtArgs>>): Prisma__fijoClient<$Result.GetResult<Prisma.$fijoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Fijo that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {fijoFindUniqueOrThrowArgs} args - Arguments to find a Fijo
     * @example
     * // Get one Fijo
     * const fijo = await prisma.fijo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends fijoFindUniqueOrThrowArgs>(args: SelectSubset<T, fijoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__fijoClient<$Result.GetResult<Prisma.$fijoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Fijo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {fijoFindFirstArgs} args - Arguments to find a Fijo
     * @example
     * // Get one Fijo
     * const fijo = await prisma.fijo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends fijoFindFirstArgs>(args?: SelectSubset<T, fijoFindFirstArgs<ExtArgs>>): Prisma__fijoClient<$Result.GetResult<Prisma.$fijoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Fijo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {fijoFindFirstOrThrowArgs} args - Arguments to find a Fijo
     * @example
     * // Get one Fijo
     * const fijo = await prisma.fijo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends fijoFindFirstOrThrowArgs>(args?: SelectSubset<T, fijoFindFirstOrThrowArgs<ExtArgs>>): Prisma__fijoClient<$Result.GetResult<Prisma.$fijoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Fijos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {fijoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Fijos
     * const fijos = await prisma.fijo.findMany()
     * 
     * // Get first 10 Fijos
     * const fijos = await prisma.fijo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fijoWithIdOnly = await prisma.fijo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends fijoFindManyArgs>(args?: SelectSubset<T, fijoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$fijoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Fijo.
     * @param {fijoCreateArgs} args - Arguments to create a Fijo.
     * @example
     * // Create one Fijo
     * const Fijo = await prisma.fijo.create({
     *   data: {
     *     // ... data to create a Fijo
     *   }
     * })
     * 
     */
    create<T extends fijoCreateArgs>(args: SelectSubset<T, fijoCreateArgs<ExtArgs>>): Prisma__fijoClient<$Result.GetResult<Prisma.$fijoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Fijos.
     * @param {fijoCreateManyArgs} args - Arguments to create many Fijos.
     * @example
     * // Create many Fijos
     * const fijo = await prisma.fijo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends fijoCreateManyArgs>(args?: SelectSubset<T, fijoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Fijo.
     * @param {fijoDeleteArgs} args - Arguments to delete one Fijo.
     * @example
     * // Delete one Fijo
     * const Fijo = await prisma.fijo.delete({
     *   where: {
     *     // ... filter to delete one Fijo
     *   }
     * })
     * 
     */
    delete<T extends fijoDeleteArgs>(args: SelectSubset<T, fijoDeleteArgs<ExtArgs>>): Prisma__fijoClient<$Result.GetResult<Prisma.$fijoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Fijo.
     * @param {fijoUpdateArgs} args - Arguments to update one Fijo.
     * @example
     * // Update one Fijo
     * const fijo = await prisma.fijo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends fijoUpdateArgs>(args: SelectSubset<T, fijoUpdateArgs<ExtArgs>>): Prisma__fijoClient<$Result.GetResult<Prisma.$fijoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Fijos.
     * @param {fijoDeleteManyArgs} args - Arguments to filter Fijos to delete.
     * @example
     * // Delete a few Fijos
     * const { count } = await prisma.fijo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends fijoDeleteManyArgs>(args?: SelectSubset<T, fijoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fijos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {fijoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Fijos
     * const fijo = await prisma.fijo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends fijoUpdateManyArgs>(args: SelectSubset<T, fijoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Fijo.
     * @param {fijoUpsertArgs} args - Arguments to update or create a Fijo.
     * @example
     * // Update or create a Fijo
     * const fijo = await prisma.fijo.upsert({
     *   create: {
     *     // ... data to create a Fijo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Fijo we want to update
     *   }
     * })
     */
    upsert<T extends fijoUpsertArgs>(args: SelectSubset<T, fijoUpsertArgs<ExtArgs>>): Prisma__fijoClient<$Result.GetResult<Prisma.$fijoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Fijos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {fijoCountArgs} args - Arguments to filter Fijos to count.
     * @example
     * // Count the number of Fijos
     * const count = await prisma.fijo.count({
     *   where: {
     *     // ... the filter for the Fijos we want to count
     *   }
     * })
    **/
    count<T extends fijoCountArgs>(
      args?: Subset<T, fijoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FijoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Fijo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FijoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FijoAggregateArgs>(args: Subset<T, FijoAggregateArgs>): Prisma.PrismaPromise<GetFijoAggregateType<T>>

    /**
     * Group by Fijo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {fijoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends fijoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: fijoGroupByArgs['orderBy'] }
        : { orderBy?: fijoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, fijoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFijoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the fijo model
   */
  readonly fields: fijoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for fijo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__fijoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the fijo model
   */ 
  interface fijoFieldRefs {
    readonly id: FieldRef<"fijo", 'Int'>
    readonly capital: FieldRef<"fijo", 'Decimal'>
    readonly client: FieldRef<"fijo", 'String'>
    readonly logo: FieldRef<"fijo", 'String'>
    readonly name: FieldRef<"fijo", 'String'>
    readonly period: FieldRef<"fijo", 'DateTime'>
    readonly url: FieldRef<"fijo", 'String'>
  }
    

  // Custom InputTypes
  /**
   * fijo findUnique
   */
  export type fijoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fijo
     */
    select?: fijoSelect<ExtArgs> | null
    /**
     * Filter, which fijo to fetch.
     */
    where: fijoWhereUniqueInput
  }

  /**
   * fijo findUniqueOrThrow
   */
  export type fijoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fijo
     */
    select?: fijoSelect<ExtArgs> | null
    /**
     * Filter, which fijo to fetch.
     */
    where: fijoWhereUniqueInput
  }

  /**
   * fijo findFirst
   */
  export type fijoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fijo
     */
    select?: fijoSelect<ExtArgs> | null
    /**
     * Filter, which fijo to fetch.
     */
    where?: fijoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of fijos to fetch.
     */
    orderBy?: fijoOrderByWithRelationInput | fijoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for fijos.
     */
    cursor?: fijoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` fijos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` fijos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of fijos.
     */
    distinct?: FijoScalarFieldEnum | FijoScalarFieldEnum[]
  }

  /**
   * fijo findFirstOrThrow
   */
  export type fijoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fijo
     */
    select?: fijoSelect<ExtArgs> | null
    /**
     * Filter, which fijo to fetch.
     */
    where?: fijoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of fijos to fetch.
     */
    orderBy?: fijoOrderByWithRelationInput | fijoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for fijos.
     */
    cursor?: fijoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` fijos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` fijos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of fijos.
     */
    distinct?: FijoScalarFieldEnum | FijoScalarFieldEnum[]
  }

  /**
   * fijo findMany
   */
  export type fijoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fijo
     */
    select?: fijoSelect<ExtArgs> | null
    /**
     * Filter, which fijos to fetch.
     */
    where?: fijoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of fijos to fetch.
     */
    orderBy?: fijoOrderByWithRelationInput | fijoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing fijos.
     */
    cursor?: fijoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` fijos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` fijos.
     */
    skip?: number
    distinct?: FijoScalarFieldEnum | FijoScalarFieldEnum[]
  }

  /**
   * fijo create
   */
  export type fijoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fijo
     */
    select?: fijoSelect<ExtArgs> | null
    /**
     * The data needed to create a fijo.
     */
    data: XOR<fijoCreateInput, fijoUncheckedCreateInput>
  }

  /**
   * fijo createMany
   */
  export type fijoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many fijos.
     */
    data: fijoCreateManyInput | fijoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * fijo update
   */
  export type fijoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fijo
     */
    select?: fijoSelect<ExtArgs> | null
    /**
     * The data needed to update a fijo.
     */
    data: XOR<fijoUpdateInput, fijoUncheckedUpdateInput>
    /**
     * Choose, which fijo to update.
     */
    where: fijoWhereUniqueInput
  }

  /**
   * fijo updateMany
   */
  export type fijoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update fijos.
     */
    data: XOR<fijoUpdateManyMutationInput, fijoUncheckedUpdateManyInput>
    /**
     * Filter which fijos to update
     */
    where?: fijoWhereInput
  }

  /**
   * fijo upsert
   */
  export type fijoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fijo
     */
    select?: fijoSelect<ExtArgs> | null
    /**
     * The filter to search for the fijo to update in case it exists.
     */
    where: fijoWhereUniqueInput
    /**
     * In case the fijo found by the `where` argument doesn't exist, create a new fijo with this data.
     */
    create: XOR<fijoCreateInput, fijoUncheckedCreateInput>
    /**
     * In case the fijo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<fijoUpdateInput, fijoUncheckedUpdateInput>
  }

  /**
   * fijo delete
   */
  export type fijoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fijo
     */
    select?: fijoSelect<ExtArgs> | null
    /**
     * Filter which fijo to delete.
     */
    where: fijoWhereUniqueInput
  }

  /**
   * fijo deleteMany
   */
  export type fijoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which fijos to delete
     */
    where?: fijoWhereInput
  }

  /**
   * fijo without action
   */
  export type fijoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fijo
     */
    select?: fijoSelect<ExtArgs> | null
  }


  /**
   * Model gasto
   */

  export type AggregateGasto = {
    _count: GastoCountAggregateOutputType | null
    _avg: GastoAvgAggregateOutputType | null
    _sum: GastoSumAggregateOutputType | null
    _min: GastoMinAggregateOutputType | null
    _max: GastoMaxAggregateOutputType | null
  }

  export type GastoAvgAggregateOutputType = {
    id: number | null
    amount: Decimal | null
    type: number | null
  }

  export type GastoSumAggregateOutputType = {
    id: number | null
    amount: Decimal | null
    type: number | null
  }

  export type GastoMinAggregateOutputType = {
    id: number | null
    amount: Decimal | null
    date: Date | null
    detail: string | null
    type: number | null
  }

  export type GastoMaxAggregateOutputType = {
    id: number | null
    amount: Decimal | null
    date: Date | null
    detail: string | null
    type: number | null
  }

  export type GastoCountAggregateOutputType = {
    id: number
    amount: number
    date: number
    detail: number
    type: number
    _all: number
  }


  export type GastoAvgAggregateInputType = {
    id?: true
    amount?: true
    type?: true
  }

  export type GastoSumAggregateInputType = {
    id?: true
    amount?: true
    type?: true
  }

  export type GastoMinAggregateInputType = {
    id?: true
    amount?: true
    date?: true
    detail?: true
    type?: true
  }

  export type GastoMaxAggregateInputType = {
    id?: true
    amount?: true
    date?: true
    detail?: true
    type?: true
  }

  export type GastoCountAggregateInputType = {
    id?: true
    amount?: true
    date?: true
    detail?: true
    type?: true
    _all?: true
  }

  export type GastoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which gasto to aggregate.
     */
    where?: gastoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of gastos to fetch.
     */
    orderBy?: gastoOrderByWithRelationInput | gastoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: gastoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` gastos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` gastos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned gastos
    **/
    _count?: true | GastoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GastoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GastoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GastoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GastoMaxAggregateInputType
  }

  export type GetGastoAggregateType<T extends GastoAggregateArgs> = {
        [P in keyof T & keyof AggregateGasto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGasto[P]>
      : GetScalarType<T[P], AggregateGasto[P]>
  }




  export type gastoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: gastoWhereInput
    orderBy?: gastoOrderByWithAggregationInput | gastoOrderByWithAggregationInput[]
    by: GastoScalarFieldEnum[] | GastoScalarFieldEnum
    having?: gastoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GastoCountAggregateInputType | true
    _avg?: GastoAvgAggregateInputType
    _sum?: GastoSumAggregateInputType
    _min?: GastoMinAggregateInputType
    _max?: GastoMaxAggregateInputType
  }

  export type GastoGroupByOutputType = {
    id: number
    amount: Decimal
    date: Date
    detail: string
    type: number
    _count: GastoCountAggregateOutputType | null
    _avg: GastoAvgAggregateOutputType | null
    _sum: GastoSumAggregateOutputType | null
    _min: GastoMinAggregateOutputType | null
    _max: GastoMaxAggregateOutputType | null
  }

  type GetGastoGroupByPayload<T extends gastoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GastoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GastoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GastoGroupByOutputType[P]>
            : GetScalarType<T[P], GastoGroupByOutputType[P]>
        }
      >
    >


  export type gastoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    date?: boolean
    detail?: boolean
    type?: boolean
  }, ExtArgs["result"]["gasto"]>


  export type gastoSelectScalar = {
    id?: boolean
    amount?: boolean
    date?: boolean
    detail?: boolean
    type?: boolean
  }


  export type $gastoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "gasto"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      amount: Prisma.Decimal
      date: Date
      detail: string
      type: number
    }, ExtArgs["result"]["gasto"]>
    composites: {}
  }

  type gastoGetPayload<S extends boolean | null | undefined | gastoDefaultArgs> = $Result.GetResult<Prisma.$gastoPayload, S>

  type gastoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<gastoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GastoCountAggregateInputType | true
    }

  export interface gastoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['gasto'], meta: { name: 'gasto' } }
    /**
     * Find zero or one Gasto that matches the filter.
     * @param {gastoFindUniqueArgs} args - Arguments to find a Gasto
     * @example
     * // Get one Gasto
     * const gasto = await prisma.gasto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends gastoFindUniqueArgs>(args: SelectSubset<T, gastoFindUniqueArgs<ExtArgs>>): Prisma__gastoClient<$Result.GetResult<Prisma.$gastoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Gasto that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {gastoFindUniqueOrThrowArgs} args - Arguments to find a Gasto
     * @example
     * // Get one Gasto
     * const gasto = await prisma.gasto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends gastoFindUniqueOrThrowArgs>(args: SelectSubset<T, gastoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__gastoClient<$Result.GetResult<Prisma.$gastoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Gasto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gastoFindFirstArgs} args - Arguments to find a Gasto
     * @example
     * // Get one Gasto
     * const gasto = await prisma.gasto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends gastoFindFirstArgs>(args?: SelectSubset<T, gastoFindFirstArgs<ExtArgs>>): Prisma__gastoClient<$Result.GetResult<Prisma.$gastoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Gasto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gastoFindFirstOrThrowArgs} args - Arguments to find a Gasto
     * @example
     * // Get one Gasto
     * const gasto = await prisma.gasto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends gastoFindFirstOrThrowArgs>(args?: SelectSubset<T, gastoFindFirstOrThrowArgs<ExtArgs>>): Prisma__gastoClient<$Result.GetResult<Prisma.$gastoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Gastos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gastoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Gastos
     * const gastos = await prisma.gasto.findMany()
     * 
     * // Get first 10 Gastos
     * const gastos = await prisma.gasto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gastoWithIdOnly = await prisma.gasto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends gastoFindManyArgs>(args?: SelectSubset<T, gastoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$gastoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Gasto.
     * @param {gastoCreateArgs} args - Arguments to create a Gasto.
     * @example
     * // Create one Gasto
     * const Gasto = await prisma.gasto.create({
     *   data: {
     *     // ... data to create a Gasto
     *   }
     * })
     * 
     */
    create<T extends gastoCreateArgs>(args: SelectSubset<T, gastoCreateArgs<ExtArgs>>): Prisma__gastoClient<$Result.GetResult<Prisma.$gastoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Gastos.
     * @param {gastoCreateManyArgs} args - Arguments to create many Gastos.
     * @example
     * // Create many Gastos
     * const gasto = await prisma.gasto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends gastoCreateManyArgs>(args?: SelectSubset<T, gastoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Gasto.
     * @param {gastoDeleteArgs} args - Arguments to delete one Gasto.
     * @example
     * // Delete one Gasto
     * const Gasto = await prisma.gasto.delete({
     *   where: {
     *     // ... filter to delete one Gasto
     *   }
     * })
     * 
     */
    delete<T extends gastoDeleteArgs>(args: SelectSubset<T, gastoDeleteArgs<ExtArgs>>): Prisma__gastoClient<$Result.GetResult<Prisma.$gastoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Gasto.
     * @param {gastoUpdateArgs} args - Arguments to update one Gasto.
     * @example
     * // Update one Gasto
     * const gasto = await prisma.gasto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends gastoUpdateArgs>(args: SelectSubset<T, gastoUpdateArgs<ExtArgs>>): Prisma__gastoClient<$Result.GetResult<Prisma.$gastoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Gastos.
     * @param {gastoDeleteManyArgs} args - Arguments to filter Gastos to delete.
     * @example
     * // Delete a few Gastos
     * const { count } = await prisma.gasto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends gastoDeleteManyArgs>(args?: SelectSubset<T, gastoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gastos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gastoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Gastos
     * const gasto = await prisma.gasto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends gastoUpdateManyArgs>(args: SelectSubset<T, gastoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Gasto.
     * @param {gastoUpsertArgs} args - Arguments to update or create a Gasto.
     * @example
     * // Update or create a Gasto
     * const gasto = await prisma.gasto.upsert({
     *   create: {
     *     // ... data to create a Gasto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Gasto we want to update
     *   }
     * })
     */
    upsert<T extends gastoUpsertArgs>(args: SelectSubset<T, gastoUpsertArgs<ExtArgs>>): Prisma__gastoClient<$Result.GetResult<Prisma.$gastoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Gastos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gastoCountArgs} args - Arguments to filter Gastos to count.
     * @example
     * // Count the number of Gastos
     * const count = await prisma.gasto.count({
     *   where: {
     *     // ... the filter for the Gastos we want to count
     *   }
     * })
    **/
    count<T extends gastoCountArgs>(
      args?: Subset<T, gastoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GastoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Gasto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GastoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GastoAggregateArgs>(args: Subset<T, GastoAggregateArgs>): Prisma.PrismaPromise<GetGastoAggregateType<T>>

    /**
     * Group by Gasto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gastoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends gastoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: gastoGroupByArgs['orderBy'] }
        : { orderBy?: gastoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, gastoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGastoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the gasto model
   */
  readonly fields: gastoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for gasto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__gastoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the gasto model
   */ 
  interface gastoFieldRefs {
    readonly id: FieldRef<"gasto", 'Int'>
    readonly amount: FieldRef<"gasto", 'Decimal'>
    readonly date: FieldRef<"gasto", 'DateTime'>
    readonly detail: FieldRef<"gasto", 'String'>
    readonly type: FieldRef<"gasto", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * gasto findUnique
   */
  export type gastoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto
     */
    select?: gastoSelect<ExtArgs> | null
    /**
     * Filter, which gasto to fetch.
     */
    where: gastoWhereUniqueInput
  }

  /**
   * gasto findUniqueOrThrow
   */
  export type gastoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto
     */
    select?: gastoSelect<ExtArgs> | null
    /**
     * Filter, which gasto to fetch.
     */
    where: gastoWhereUniqueInput
  }

  /**
   * gasto findFirst
   */
  export type gastoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto
     */
    select?: gastoSelect<ExtArgs> | null
    /**
     * Filter, which gasto to fetch.
     */
    where?: gastoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of gastos to fetch.
     */
    orderBy?: gastoOrderByWithRelationInput | gastoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for gastos.
     */
    cursor?: gastoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` gastos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` gastos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of gastos.
     */
    distinct?: GastoScalarFieldEnum | GastoScalarFieldEnum[]
  }

  /**
   * gasto findFirstOrThrow
   */
  export type gastoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto
     */
    select?: gastoSelect<ExtArgs> | null
    /**
     * Filter, which gasto to fetch.
     */
    where?: gastoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of gastos to fetch.
     */
    orderBy?: gastoOrderByWithRelationInput | gastoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for gastos.
     */
    cursor?: gastoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` gastos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` gastos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of gastos.
     */
    distinct?: GastoScalarFieldEnum | GastoScalarFieldEnum[]
  }

  /**
   * gasto findMany
   */
  export type gastoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto
     */
    select?: gastoSelect<ExtArgs> | null
    /**
     * Filter, which gastos to fetch.
     */
    where?: gastoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of gastos to fetch.
     */
    orderBy?: gastoOrderByWithRelationInput | gastoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing gastos.
     */
    cursor?: gastoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` gastos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` gastos.
     */
    skip?: number
    distinct?: GastoScalarFieldEnum | GastoScalarFieldEnum[]
  }

  /**
   * gasto create
   */
  export type gastoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto
     */
    select?: gastoSelect<ExtArgs> | null
    /**
     * The data needed to create a gasto.
     */
    data: XOR<gastoCreateInput, gastoUncheckedCreateInput>
  }

  /**
   * gasto createMany
   */
  export type gastoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many gastos.
     */
    data: gastoCreateManyInput | gastoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * gasto update
   */
  export type gastoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto
     */
    select?: gastoSelect<ExtArgs> | null
    /**
     * The data needed to update a gasto.
     */
    data: XOR<gastoUpdateInput, gastoUncheckedUpdateInput>
    /**
     * Choose, which gasto to update.
     */
    where: gastoWhereUniqueInput
  }

  /**
   * gasto updateMany
   */
  export type gastoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update gastos.
     */
    data: XOR<gastoUpdateManyMutationInput, gastoUncheckedUpdateManyInput>
    /**
     * Filter which gastos to update
     */
    where?: gastoWhereInput
  }

  /**
   * gasto upsert
   */
  export type gastoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto
     */
    select?: gastoSelect<ExtArgs> | null
    /**
     * The filter to search for the gasto to update in case it exists.
     */
    where: gastoWhereUniqueInput
    /**
     * In case the gasto found by the `where` argument doesn't exist, create a new gasto with this data.
     */
    create: XOR<gastoCreateInput, gastoUncheckedCreateInput>
    /**
     * In case the gasto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<gastoUpdateInput, gastoUncheckedUpdateInput>
  }

  /**
   * gasto delete
   */
  export type gastoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto
     */
    select?: gastoSelect<ExtArgs> | null
    /**
     * Filter which gasto to delete.
     */
    where: gastoWhereUniqueInput
  }

  /**
   * gasto deleteMany
   */
  export type gastoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which gastos to delete
     */
    where?: gastoWhereInput
  }

  /**
   * gasto without action
   */
  export type gastoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto
     */
    select?: gastoSelect<ExtArgs> | null
  }


  /**
   * Model principal
   */

  export type AggregatePrincipal = {
    _count: PrincipalCountAggregateOutputType | null
    _avg: PrincipalAvgAggregateOutputType | null
    _sum: PrincipalSumAggregateOutputType | null
    _min: PrincipalMinAggregateOutputType | null
    _max: PrincipalMaxAggregateOutputType | null
  }

  export type PrincipalAvgAggregateOutputType = {
    id: number | null
    available: number | null
    expenses: number | null
    inbanks: number | null
    indebt: number | null
    investments: number | null
    max: number | null
    monthly: number | null
    nextmonth: number | null
  }

  export type PrincipalSumAggregateOutputType = {
    id: number | null
    available: number | null
    expenses: number | null
    inbanks: number | null
    indebt: number | null
    investments: number | null
    max: number | null
    monthly: number | null
    nextmonth: number | null
  }

  export type PrincipalMinAggregateOutputType = {
    id: number | null
    available: number | null
    expenses: number | null
    inbanks: number | null
    indebt: number | null
    investments: number | null
    max: number | null
    monthly: number | null
    nextmonth: number | null
  }

  export type PrincipalMaxAggregateOutputType = {
    id: number | null
    available: number | null
    expenses: number | null
    inbanks: number | null
    indebt: number | null
    investments: number | null
    max: number | null
    monthly: number | null
    nextmonth: number | null
  }

  export type PrincipalCountAggregateOutputType = {
    id: number
    available: number
    expenses: number
    inbanks: number
    indebt: number
    investments: number
    max: number
    monthly: number
    nextmonth: number
    _all: number
  }


  export type PrincipalAvgAggregateInputType = {
    id?: true
    available?: true
    expenses?: true
    inbanks?: true
    indebt?: true
    investments?: true
    max?: true
    monthly?: true
    nextmonth?: true
  }

  export type PrincipalSumAggregateInputType = {
    id?: true
    available?: true
    expenses?: true
    inbanks?: true
    indebt?: true
    investments?: true
    max?: true
    monthly?: true
    nextmonth?: true
  }

  export type PrincipalMinAggregateInputType = {
    id?: true
    available?: true
    expenses?: true
    inbanks?: true
    indebt?: true
    investments?: true
    max?: true
    monthly?: true
    nextmonth?: true
  }

  export type PrincipalMaxAggregateInputType = {
    id?: true
    available?: true
    expenses?: true
    inbanks?: true
    indebt?: true
    investments?: true
    max?: true
    monthly?: true
    nextmonth?: true
  }

  export type PrincipalCountAggregateInputType = {
    id?: true
    available?: true
    expenses?: true
    inbanks?: true
    indebt?: true
    investments?: true
    max?: true
    monthly?: true
    nextmonth?: true
    _all?: true
  }

  export type PrincipalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which principal to aggregate.
     */
    where?: principalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of principals to fetch.
     */
    orderBy?: principalOrderByWithRelationInput | principalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: principalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` principals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` principals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned principals
    **/
    _count?: true | PrincipalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PrincipalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PrincipalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrincipalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrincipalMaxAggregateInputType
  }

  export type GetPrincipalAggregateType<T extends PrincipalAggregateArgs> = {
        [P in keyof T & keyof AggregatePrincipal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrincipal[P]>
      : GetScalarType<T[P], AggregatePrincipal[P]>
  }




  export type principalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: principalWhereInput
    orderBy?: principalOrderByWithAggregationInput | principalOrderByWithAggregationInput[]
    by: PrincipalScalarFieldEnum[] | PrincipalScalarFieldEnum
    having?: principalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrincipalCountAggregateInputType | true
    _avg?: PrincipalAvgAggregateInputType
    _sum?: PrincipalSumAggregateInputType
    _min?: PrincipalMinAggregateInputType
    _max?: PrincipalMaxAggregateInputType
  }

  export type PrincipalGroupByOutputType = {
    id: number
    available: number
    expenses: number
    inbanks: number
    indebt: number
    investments: number
    max: number
    monthly: number
    nextmonth: number
    _count: PrincipalCountAggregateOutputType | null
    _avg: PrincipalAvgAggregateOutputType | null
    _sum: PrincipalSumAggregateOutputType | null
    _min: PrincipalMinAggregateOutputType | null
    _max: PrincipalMaxAggregateOutputType | null
  }

  type GetPrincipalGroupByPayload<T extends principalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrincipalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrincipalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrincipalGroupByOutputType[P]>
            : GetScalarType<T[P], PrincipalGroupByOutputType[P]>
        }
      >
    >


  export type principalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    available?: boolean
    expenses?: boolean
    inbanks?: boolean
    indebt?: boolean
    investments?: boolean
    max?: boolean
    monthly?: boolean
    nextmonth?: boolean
  }, ExtArgs["result"]["principal"]>


  export type principalSelectScalar = {
    id?: boolean
    available?: boolean
    expenses?: boolean
    inbanks?: boolean
    indebt?: boolean
    investments?: boolean
    max?: boolean
    monthly?: boolean
    nextmonth?: boolean
  }


  export type $principalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "principal"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      available: number
      expenses: number
      inbanks: number
      indebt: number
      investments: number
      max: number
      monthly: number
      nextmonth: number
    }, ExtArgs["result"]["principal"]>
    composites: {}
  }

  type principalGetPayload<S extends boolean | null | undefined | principalDefaultArgs> = $Result.GetResult<Prisma.$principalPayload, S>

  type principalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<principalFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PrincipalCountAggregateInputType | true
    }

  export interface principalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['principal'], meta: { name: 'principal' } }
    /**
     * Find zero or one Principal that matches the filter.
     * @param {principalFindUniqueArgs} args - Arguments to find a Principal
     * @example
     * // Get one Principal
     * const principal = await prisma.principal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends principalFindUniqueArgs>(args: SelectSubset<T, principalFindUniqueArgs<ExtArgs>>): Prisma__principalClient<$Result.GetResult<Prisma.$principalPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Principal that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {principalFindUniqueOrThrowArgs} args - Arguments to find a Principal
     * @example
     * // Get one Principal
     * const principal = await prisma.principal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends principalFindUniqueOrThrowArgs>(args: SelectSubset<T, principalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__principalClient<$Result.GetResult<Prisma.$principalPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Principal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {principalFindFirstArgs} args - Arguments to find a Principal
     * @example
     * // Get one Principal
     * const principal = await prisma.principal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends principalFindFirstArgs>(args?: SelectSubset<T, principalFindFirstArgs<ExtArgs>>): Prisma__principalClient<$Result.GetResult<Prisma.$principalPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Principal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {principalFindFirstOrThrowArgs} args - Arguments to find a Principal
     * @example
     * // Get one Principal
     * const principal = await prisma.principal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends principalFindFirstOrThrowArgs>(args?: SelectSubset<T, principalFindFirstOrThrowArgs<ExtArgs>>): Prisma__principalClient<$Result.GetResult<Prisma.$principalPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Principals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {principalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Principals
     * const principals = await prisma.principal.findMany()
     * 
     * // Get first 10 Principals
     * const principals = await prisma.principal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const principalWithIdOnly = await prisma.principal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends principalFindManyArgs>(args?: SelectSubset<T, principalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$principalPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Principal.
     * @param {principalCreateArgs} args - Arguments to create a Principal.
     * @example
     * // Create one Principal
     * const Principal = await prisma.principal.create({
     *   data: {
     *     // ... data to create a Principal
     *   }
     * })
     * 
     */
    create<T extends principalCreateArgs>(args: SelectSubset<T, principalCreateArgs<ExtArgs>>): Prisma__principalClient<$Result.GetResult<Prisma.$principalPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Principals.
     * @param {principalCreateManyArgs} args - Arguments to create many Principals.
     * @example
     * // Create many Principals
     * const principal = await prisma.principal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends principalCreateManyArgs>(args?: SelectSubset<T, principalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Principal.
     * @param {principalDeleteArgs} args - Arguments to delete one Principal.
     * @example
     * // Delete one Principal
     * const Principal = await prisma.principal.delete({
     *   where: {
     *     // ... filter to delete one Principal
     *   }
     * })
     * 
     */
    delete<T extends principalDeleteArgs>(args: SelectSubset<T, principalDeleteArgs<ExtArgs>>): Prisma__principalClient<$Result.GetResult<Prisma.$principalPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Principal.
     * @param {principalUpdateArgs} args - Arguments to update one Principal.
     * @example
     * // Update one Principal
     * const principal = await prisma.principal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends principalUpdateArgs>(args: SelectSubset<T, principalUpdateArgs<ExtArgs>>): Prisma__principalClient<$Result.GetResult<Prisma.$principalPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Principals.
     * @param {principalDeleteManyArgs} args - Arguments to filter Principals to delete.
     * @example
     * // Delete a few Principals
     * const { count } = await prisma.principal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends principalDeleteManyArgs>(args?: SelectSubset<T, principalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Principals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {principalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Principals
     * const principal = await prisma.principal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends principalUpdateManyArgs>(args: SelectSubset<T, principalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Principal.
     * @param {principalUpsertArgs} args - Arguments to update or create a Principal.
     * @example
     * // Update or create a Principal
     * const principal = await prisma.principal.upsert({
     *   create: {
     *     // ... data to create a Principal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Principal we want to update
     *   }
     * })
     */
    upsert<T extends principalUpsertArgs>(args: SelectSubset<T, principalUpsertArgs<ExtArgs>>): Prisma__principalClient<$Result.GetResult<Prisma.$principalPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Principals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {principalCountArgs} args - Arguments to filter Principals to count.
     * @example
     * // Count the number of Principals
     * const count = await prisma.principal.count({
     *   where: {
     *     // ... the filter for the Principals we want to count
     *   }
     * })
    **/
    count<T extends principalCountArgs>(
      args?: Subset<T, principalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrincipalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Principal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrincipalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PrincipalAggregateArgs>(args: Subset<T, PrincipalAggregateArgs>): Prisma.PrismaPromise<GetPrincipalAggregateType<T>>

    /**
     * Group by Principal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {principalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends principalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: principalGroupByArgs['orderBy'] }
        : { orderBy?: principalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, principalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrincipalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the principal model
   */
  readonly fields: principalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for principal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__principalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the principal model
   */ 
  interface principalFieldRefs {
    readonly id: FieldRef<"principal", 'Int'>
    readonly available: FieldRef<"principal", 'Int'>
    readonly expenses: FieldRef<"principal", 'Int'>
    readonly inbanks: FieldRef<"principal", 'Int'>
    readonly indebt: FieldRef<"principal", 'Int'>
    readonly investments: FieldRef<"principal", 'Int'>
    readonly max: FieldRef<"principal", 'Int'>
    readonly monthly: FieldRef<"principal", 'Int'>
    readonly nextmonth: FieldRef<"principal", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * principal findUnique
   */
  export type principalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the principal
     */
    select?: principalSelect<ExtArgs> | null
    /**
     * Filter, which principal to fetch.
     */
    where: principalWhereUniqueInput
  }

  /**
   * principal findUniqueOrThrow
   */
  export type principalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the principal
     */
    select?: principalSelect<ExtArgs> | null
    /**
     * Filter, which principal to fetch.
     */
    where: principalWhereUniqueInput
  }

  /**
   * principal findFirst
   */
  export type principalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the principal
     */
    select?: principalSelect<ExtArgs> | null
    /**
     * Filter, which principal to fetch.
     */
    where?: principalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of principals to fetch.
     */
    orderBy?: principalOrderByWithRelationInput | principalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for principals.
     */
    cursor?: principalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` principals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` principals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of principals.
     */
    distinct?: PrincipalScalarFieldEnum | PrincipalScalarFieldEnum[]
  }

  /**
   * principal findFirstOrThrow
   */
  export type principalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the principal
     */
    select?: principalSelect<ExtArgs> | null
    /**
     * Filter, which principal to fetch.
     */
    where?: principalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of principals to fetch.
     */
    orderBy?: principalOrderByWithRelationInput | principalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for principals.
     */
    cursor?: principalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` principals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` principals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of principals.
     */
    distinct?: PrincipalScalarFieldEnum | PrincipalScalarFieldEnum[]
  }

  /**
   * principal findMany
   */
  export type principalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the principal
     */
    select?: principalSelect<ExtArgs> | null
    /**
     * Filter, which principals to fetch.
     */
    where?: principalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of principals to fetch.
     */
    orderBy?: principalOrderByWithRelationInput | principalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing principals.
     */
    cursor?: principalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` principals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` principals.
     */
    skip?: number
    distinct?: PrincipalScalarFieldEnum | PrincipalScalarFieldEnum[]
  }

  /**
   * principal create
   */
  export type principalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the principal
     */
    select?: principalSelect<ExtArgs> | null
    /**
     * The data needed to create a principal.
     */
    data: XOR<principalCreateInput, principalUncheckedCreateInput>
  }

  /**
   * principal createMany
   */
  export type principalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many principals.
     */
    data: principalCreateManyInput | principalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * principal update
   */
  export type principalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the principal
     */
    select?: principalSelect<ExtArgs> | null
    /**
     * The data needed to update a principal.
     */
    data: XOR<principalUpdateInput, principalUncheckedUpdateInput>
    /**
     * Choose, which principal to update.
     */
    where: principalWhereUniqueInput
  }

  /**
   * principal updateMany
   */
  export type principalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update principals.
     */
    data: XOR<principalUpdateManyMutationInput, principalUncheckedUpdateManyInput>
    /**
     * Filter which principals to update
     */
    where?: principalWhereInput
  }

  /**
   * principal upsert
   */
  export type principalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the principal
     */
    select?: principalSelect<ExtArgs> | null
    /**
     * The filter to search for the principal to update in case it exists.
     */
    where: principalWhereUniqueInput
    /**
     * In case the principal found by the `where` argument doesn't exist, create a new principal with this data.
     */
    create: XOR<principalCreateInput, principalUncheckedCreateInput>
    /**
     * In case the principal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<principalUpdateInput, principalUncheckedUpdateInput>
  }

  /**
   * principal delete
   */
  export type principalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the principal
     */
    select?: principalSelect<ExtArgs> | null
    /**
     * Filter which principal to delete.
     */
    where: principalWhereUniqueInput
  }

  /**
   * principal deleteMany
   */
  export type principalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which principals to delete
     */
    where?: principalWhereInput
  }

  /**
   * principal without action
   */
  export type principalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the principal
     */
    select?: principalSelect<ExtArgs> | null
  }


  /**
   * Model wallet
   */

  export type AggregateWallet = {
    _count: WalletCountAggregateOutputType | null
    _avg: WalletAvgAggregateOutputType | null
    _sum: WalletSumAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  export type WalletAvgAggregateOutputType = {
    id: number | null
    capital: Decimal | null
    tna: Decimal | null
  }

  export type WalletSumAggregateOutputType = {
    id: number | null
    capital: Decimal | null
    tna: Decimal | null
  }

  export type WalletMinAggregateOutputType = {
    id: number | null
    capital: Decimal | null
    logo: string | null
    name: string | null
    period: Date | null
    tna: Decimal | null
  }

  export type WalletMaxAggregateOutputType = {
    id: number | null
    capital: Decimal | null
    logo: string | null
    name: string | null
    period: Date | null
    tna: Decimal | null
  }

  export type WalletCountAggregateOutputType = {
    id: number
    capital: number
    logo: number
    name: number
    period: number
    tna: number
    _all: number
  }


  export type WalletAvgAggregateInputType = {
    id?: true
    capital?: true
    tna?: true
  }

  export type WalletSumAggregateInputType = {
    id?: true
    capital?: true
    tna?: true
  }

  export type WalletMinAggregateInputType = {
    id?: true
    capital?: true
    logo?: true
    name?: true
    period?: true
    tna?: true
  }

  export type WalletMaxAggregateInputType = {
    id?: true
    capital?: true
    logo?: true
    name?: true
    period?: true
    tna?: true
  }

  export type WalletCountAggregateInputType = {
    id?: true
    capital?: true
    logo?: true
    name?: true
    period?: true
    tna?: true
    _all?: true
  }

  export type WalletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which wallet to aggregate.
     */
    where?: walletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of wallets to fetch.
     */
    orderBy?: walletOrderByWithRelationInput | walletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: walletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned wallets
    **/
    _count?: true | WalletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WalletAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WalletSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WalletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WalletMaxAggregateInputType
  }

  export type GetWalletAggregateType<T extends WalletAggregateArgs> = {
        [P in keyof T & keyof AggregateWallet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWallet[P]>
      : GetScalarType<T[P], AggregateWallet[P]>
  }




  export type walletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: walletWhereInput
    orderBy?: walletOrderByWithAggregationInput | walletOrderByWithAggregationInput[]
    by: WalletScalarFieldEnum[] | WalletScalarFieldEnum
    having?: walletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WalletCountAggregateInputType | true
    _avg?: WalletAvgAggregateInputType
    _sum?: WalletSumAggregateInputType
    _min?: WalletMinAggregateInputType
    _max?: WalletMaxAggregateInputType
  }

  export type WalletGroupByOutputType = {
    id: number
    capital: Decimal
    logo: string
    name: string
    period: Date
    tna: Decimal
    _count: WalletCountAggregateOutputType | null
    _avg: WalletAvgAggregateOutputType | null
    _sum: WalletSumAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  type GetWalletGroupByPayload<T extends walletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WalletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WalletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WalletGroupByOutputType[P]>
            : GetScalarType<T[P], WalletGroupByOutputType[P]>
        }
      >
    >


  export type walletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    capital?: boolean
    logo?: boolean
    name?: boolean
    period?: boolean
    tna?: boolean
  }, ExtArgs["result"]["wallet"]>


  export type walletSelectScalar = {
    id?: boolean
    capital?: boolean
    logo?: boolean
    name?: boolean
    period?: boolean
    tna?: boolean
  }


  export type $walletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "wallet"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      capital: Prisma.Decimal
      logo: string
      name: string
      period: Date
      tna: Prisma.Decimal
    }, ExtArgs["result"]["wallet"]>
    composites: {}
  }

  type walletGetPayload<S extends boolean | null | undefined | walletDefaultArgs> = $Result.GetResult<Prisma.$walletPayload, S>

  type walletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<walletFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WalletCountAggregateInputType | true
    }

  export interface walletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['wallet'], meta: { name: 'wallet' } }
    /**
     * Find zero or one Wallet that matches the filter.
     * @param {walletFindUniqueArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends walletFindUniqueArgs>(args: SelectSubset<T, walletFindUniqueArgs<ExtArgs>>): Prisma__walletClient<$Result.GetResult<Prisma.$walletPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Wallet that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {walletFindUniqueOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends walletFindUniqueOrThrowArgs>(args: SelectSubset<T, walletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__walletClient<$Result.GetResult<Prisma.$walletPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Wallet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {walletFindFirstArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends walletFindFirstArgs>(args?: SelectSubset<T, walletFindFirstArgs<ExtArgs>>): Prisma__walletClient<$Result.GetResult<Prisma.$walletPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Wallet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {walletFindFirstOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends walletFindFirstOrThrowArgs>(args?: SelectSubset<T, walletFindFirstOrThrowArgs<ExtArgs>>): Prisma__walletClient<$Result.GetResult<Prisma.$walletPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Wallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {walletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wallets
     * const wallets = await prisma.wallet.findMany()
     * 
     * // Get first 10 Wallets
     * const wallets = await prisma.wallet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const walletWithIdOnly = await prisma.wallet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends walletFindManyArgs>(args?: SelectSubset<T, walletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$walletPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Wallet.
     * @param {walletCreateArgs} args - Arguments to create a Wallet.
     * @example
     * // Create one Wallet
     * const Wallet = await prisma.wallet.create({
     *   data: {
     *     // ... data to create a Wallet
     *   }
     * })
     * 
     */
    create<T extends walletCreateArgs>(args: SelectSubset<T, walletCreateArgs<ExtArgs>>): Prisma__walletClient<$Result.GetResult<Prisma.$walletPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Wallets.
     * @param {walletCreateManyArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends walletCreateManyArgs>(args?: SelectSubset<T, walletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Wallet.
     * @param {walletDeleteArgs} args - Arguments to delete one Wallet.
     * @example
     * // Delete one Wallet
     * const Wallet = await prisma.wallet.delete({
     *   where: {
     *     // ... filter to delete one Wallet
     *   }
     * })
     * 
     */
    delete<T extends walletDeleteArgs>(args: SelectSubset<T, walletDeleteArgs<ExtArgs>>): Prisma__walletClient<$Result.GetResult<Prisma.$walletPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Wallet.
     * @param {walletUpdateArgs} args - Arguments to update one Wallet.
     * @example
     * // Update one Wallet
     * const wallet = await prisma.wallet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends walletUpdateArgs>(args: SelectSubset<T, walletUpdateArgs<ExtArgs>>): Prisma__walletClient<$Result.GetResult<Prisma.$walletPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Wallets.
     * @param {walletDeleteManyArgs} args - Arguments to filter Wallets to delete.
     * @example
     * // Delete a few Wallets
     * const { count } = await prisma.wallet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends walletDeleteManyArgs>(args?: SelectSubset<T, walletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {walletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends walletUpdateManyArgs>(args: SelectSubset<T, walletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Wallet.
     * @param {walletUpsertArgs} args - Arguments to update or create a Wallet.
     * @example
     * // Update or create a Wallet
     * const wallet = await prisma.wallet.upsert({
     *   create: {
     *     // ... data to create a Wallet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wallet we want to update
     *   }
     * })
     */
    upsert<T extends walletUpsertArgs>(args: SelectSubset<T, walletUpsertArgs<ExtArgs>>): Prisma__walletClient<$Result.GetResult<Prisma.$walletPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {walletCountArgs} args - Arguments to filter Wallets to count.
     * @example
     * // Count the number of Wallets
     * const count = await prisma.wallet.count({
     *   where: {
     *     // ... the filter for the Wallets we want to count
     *   }
     * })
    **/
    count<T extends walletCountArgs>(
      args?: Subset<T, walletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WalletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WalletAggregateArgs>(args: Subset<T, WalletAggregateArgs>): Prisma.PrismaPromise<GetWalletAggregateType<T>>

    /**
     * Group by Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {walletGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends walletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: walletGroupByArgs['orderBy'] }
        : { orderBy?: walletGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, walletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the wallet model
   */
  readonly fields: walletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for wallet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__walletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the wallet model
   */ 
  interface walletFieldRefs {
    readonly id: FieldRef<"wallet", 'Int'>
    readonly capital: FieldRef<"wallet", 'Decimal'>
    readonly logo: FieldRef<"wallet", 'String'>
    readonly name: FieldRef<"wallet", 'String'>
    readonly period: FieldRef<"wallet", 'DateTime'>
    readonly tna: FieldRef<"wallet", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * wallet findUnique
   */
  export type walletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallet
     */
    select?: walletSelect<ExtArgs> | null
    /**
     * Filter, which wallet to fetch.
     */
    where: walletWhereUniqueInput
  }

  /**
   * wallet findUniqueOrThrow
   */
  export type walletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallet
     */
    select?: walletSelect<ExtArgs> | null
    /**
     * Filter, which wallet to fetch.
     */
    where: walletWhereUniqueInput
  }

  /**
   * wallet findFirst
   */
  export type walletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallet
     */
    select?: walletSelect<ExtArgs> | null
    /**
     * Filter, which wallet to fetch.
     */
    where?: walletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of wallets to fetch.
     */
    orderBy?: walletOrderByWithRelationInput | walletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for wallets.
     */
    cursor?: walletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * wallet findFirstOrThrow
   */
  export type walletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallet
     */
    select?: walletSelect<ExtArgs> | null
    /**
     * Filter, which wallet to fetch.
     */
    where?: walletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of wallets to fetch.
     */
    orderBy?: walletOrderByWithRelationInput | walletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for wallets.
     */
    cursor?: walletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * wallet findMany
   */
  export type walletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallet
     */
    select?: walletSelect<ExtArgs> | null
    /**
     * Filter, which wallets to fetch.
     */
    where?: walletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of wallets to fetch.
     */
    orderBy?: walletOrderByWithRelationInput | walletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing wallets.
     */
    cursor?: walletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` wallets.
     */
    skip?: number
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * wallet create
   */
  export type walletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallet
     */
    select?: walletSelect<ExtArgs> | null
    /**
     * The data needed to create a wallet.
     */
    data: XOR<walletCreateInput, walletUncheckedCreateInput>
  }

  /**
   * wallet createMany
   */
  export type walletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many wallets.
     */
    data: walletCreateManyInput | walletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * wallet update
   */
  export type walletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallet
     */
    select?: walletSelect<ExtArgs> | null
    /**
     * The data needed to update a wallet.
     */
    data: XOR<walletUpdateInput, walletUncheckedUpdateInput>
    /**
     * Choose, which wallet to update.
     */
    where: walletWhereUniqueInput
  }

  /**
   * wallet updateMany
   */
  export type walletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update wallets.
     */
    data: XOR<walletUpdateManyMutationInput, walletUncheckedUpdateManyInput>
    /**
     * Filter which wallets to update
     */
    where?: walletWhereInput
  }

  /**
   * wallet upsert
   */
  export type walletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallet
     */
    select?: walletSelect<ExtArgs> | null
    /**
     * The filter to search for the wallet to update in case it exists.
     */
    where: walletWhereUniqueInput
    /**
     * In case the wallet found by the `where` argument doesn't exist, create a new wallet with this data.
     */
    create: XOR<walletCreateInput, walletUncheckedCreateInput>
    /**
     * In case the wallet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<walletUpdateInput, walletUncheckedUpdateInput>
  }

  /**
   * wallet delete
   */
  export type walletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallet
     */
    select?: walletSelect<ExtArgs> | null
    /**
     * Filter which wallet to delete.
     */
    where: walletWhereUniqueInput
  }

  /**
   * wallet deleteMany
   */
  export type walletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which wallets to delete
     */
    where?: walletWhereInput
  }

  /**
   * wallet without action
   */
  export type walletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallet
     */
    select?: walletSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const BancoScalarFieldEnum: {
    id: 'id',
    capital: 'capital',
    duedate: 'duedate',
    logo: 'logo',
    name: 'name',
    period: 'period',
    tna: 'tna'
  };

  export type BancoScalarFieldEnum = (typeof BancoScalarFieldEnum)[keyof typeof BancoScalarFieldEnum]


  export const FijoScalarFieldEnum: {
    id: 'id',
    capital: 'capital',
    client: 'client',
    logo: 'logo',
    name: 'name',
    period: 'period',
    url: 'url'
  };

  export type FijoScalarFieldEnum = (typeof FijoScalarFieldEnum)[keyof typeof FijoScalarFieldEnum]


  export const GastoScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    date: 'date',
    detail: 'detail',
    type: 'type'
  };

  export type GastoScalarFieldEnum = (typeof GastoScalarFieldEnum)[keyof typeof GastoScalarFieldEnum]


  export const PrincipalScalarFieldEnum: {
    id: 'id',
    available: 'available',
    expenses: 'expenses',
    inbanks: 'inbanks',
    indebt: 'indebt',
    investments: 'investments',
    max: 'max',
    monthly: 'monthly',
    nextmonth: 'nextmonth'
  };

  export type PrincipalScalarFieldEnum = (typeof PrincipalScalarFieldEnum)[keyof typeof PrincipalScalarFieldEnum]


  export const WalletScalarFieldEnum: {
    id: 'id',
    capital: 'capital',
    logo: 'logo',
    name: 'name',
    period: 'period',
    tna: 'tna'
  };

  export type WalletScalarFieldEnum = (typeof WalletScalarFieldEnum)[keyof typeof WalletScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type bancoWhereInput = {
    AND?: bancoWhereInput | bancoWhereInput[]
    OR?: bancoWhereInput[]
    NOT?: bancoWhereInput | bancoWhereInput[]
    id?: IntFilter<"banco"> | number
    capital?: DecimalFilter<"banco"> | Decimal | DecimalJsLike | number | string
    duedate?: DateTimeFilter<"banco"> | Date | string
    logo?: StringFilter<"banco"> | string
    name?: StringFilter<"banco"> | string
    period?: DateTimeFilter<"banco"> | Date | string
    tna?: FloatFilter<"banco"> | number
  }

  export type bancoOrderByWithRelationInput = {
    id?: SortOrder
    capital?: SortOrder
    duedate?: SortOrder
    logo?: SortOrder
    name?: SortOrder
    period?: SortOrder
    tna?: SortOrder
  }

  export type bancoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: bancoWhereInput | bancoWhereInput[]
    OR?: bancoWhereInput[]
    NOT?: bancoWhereInput | bancoWhereInput[]
    capital?: DecimalFilter<"banco"> | Decimal | DecimalJsLike | number | string
    duedate?: DateTimeFilter<"banco"> | Date | string
    logo?: StringFilter<"banco"> | string
    name?: StringFilter<"banco"> | string
    period?: DateTimeFilter<"banco"> | Date | string
    tna?: FloatFilter<"banco"> | number
  }, "id">

  export type bancoOrderByWithAggregationInput = {
    id?: SortOrder
    capital?: SortOrder
    duedate?: SortOrder
    logo?: SortOrder
    name?: SortOrder
    period?: SortOrder
    tna?: SortOrder
    _count?: bancoCountOrderByAggregateInput
    _avg?: bancoAvgOrderByAggregateInput
    _max?: bancoMaxOrderByAggregateInput
    _min?: bancoMinOrderByAggregateInput
    _sum?: bancoSumOrderByAggregateInput
  }

  export type bancoScalarWhereWithAggregatesInput = {
    AND?: bancoScalarWhereWithAggregatesInput | bancoScalarWhereWithAggregatesInput[]
    OR?: bancoScalarWhereWithAggregatesInput[]
    NOT?: bancoScalarWhereWithAggregatesInput | bancoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"banco"> | number
    capital?: DecimalWithAggregatesFilter<"banco"> | Decimal | DecimalJsLike | number | string
    duedate?: DateTimeWithAggregatesFilter<"banco"> | Date | string
    logo?: StringWithAggregatesFilter<"banco"> | string
    name?: StringWithAggregatesFilter<"banco"> | string
    period?: DateTimeWithAggregatesFilter<"banco"> | Date | string
    tna?: FloatWithAggregatesFilter<"banco"> | number
  }

  export type fijoWhereInput = {
    AND?: fijoWhereInput | fijoWhereInput[]
    OR?: fijoWhereInput[]
    NOT?: fijoWhereInput | fijoWhereInput[]
    id?: IntFilter<"fijo"> | number
    capital?: DecimalFilter<"fijo"> | Decimal | DecimalJsLike | number | string
    client?: StringFilter<"fijo"> | string
    logo?: StringFilter<"fijo"> | string
    name?: StringFilter<"fijo"> | string
    period?: DateTimeFilter<"fijo"> | Date | string
    url?: StringFilter<"fijo"> | string
  }

  export type fijoOrderByWithRelationInput = {
    id?: SortOrder
    capital?: SortOrder
    client?: SortOrder
    logo?: SortOrder
    name?: SortOrder
    period?: SortOrder
    url?: SortOrder
  }

  export type fijoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: fijoWhereInput | fijoWhereInput[]
    OR?: fijoWhereInput[]
    NOT?: fijoWhereInput | fijoWhereInput[]
    capital?: DecimalFilter<"fijo"> | Decimal | DecimalJsLike | number | string
    client?: StringFilter<"fijo"> | string
    logo?: StringFilter<"fijo"> | string
    name?: StringFilter<"fijo"> | string
    period?: DateTimeFilter<"fijo"> | Date | string
    url?: StringFilter<"fijo"> | string
  }, "id">

  export type fijoOrderByWithAggregationInput = {
    id?: SortOrder
    capital?: SortOrder
    client?: SortOrder
    logo?: SortOrder
    name?: SortOrder
    period?: SortOrder
    url?: SortOrder
    _count?: fijoCountOrderByAggregateInput
    _avg?: fijoAvgOrderByAggregateInput
    _max?: fijoMaxOrderByAggregateInput
    _min?: fijoMinOrderByAggregateInput
    _sum?: fijoSumOrderByAggregateInput
  }

  export type fijoScalarWhereWithAggregatesInput = {
    AND?: fijoScalarWhereWithAggregatesInput | fijoScalarWhereWithAggregatesInput[]
    OR?: fijoScalarWhereWithAggregatesInput[]
    NOT?: fijoScalarWhereWithAggregatesInput | fijoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"fijo"> | number
    capital?: DecimalWithAggregatesFilter<"fijo"> | Decimal | DecimalJsLike | number | string
    client?: StringWithAggregatesFilter<"fijo"> | string
    logo?: StringWithAggregatesFilter<"fijo"> | string
    name?: StringWithAggregatesFilter<"fijo"> | string
    period?: DateTimeWithAggregatesFilter<"fijo"> | Date | string
    url?: StringWithAggregatesFilter<"fijo"> | string
  }

  export type gastoWhereInput = {
    AND?: gastoWhereInput | gastoWhereInput[]
    OR?: gastoWhereInput[]
    NOT?: gastoWhereInput | gastoWhereInput[]
    id?: IntFilter<"gasto"> | number
    amount?: DecimalFilter<"gasto"> | Decimal | DecimalJsLike | number | string
    date?: DateTimeFilter<"gasto"> | Date | string
    detail?: StringFilter<"gasto"> | string
    type?: IntFilter<"gasto"> | number
  }

  export type gastoOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    detail?: SortOrder
    type?: SortOrder
  }

  export type gastoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: gastoWhereInput | gastoWhereInput[]
    OR?: gastoWhereInput[]
    NOT?: gastoWhereInput | gastoWhereInput[]
    amount?: DecimalFilter<"gasto"> | Decimal | DecimalJsLike | number | string
    date?: DateTimeFilter<"gasto"> | Date | string
    detail?: StringFilter<"gasto"> | string
    type?: IntFilter<"gasto"> | number
  }, "id">

  export type gastoOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    detail?: SortOrder
    type?: SortOrder
    _count?: gastoCountOrderByAggregateInput
    _avg?: gastoAvgOrderByAggregateInput
    _max?: gastoMaxOrderByAggregateInput
    _min?: gastoMinOrderByAggregateInput
    _sum?: gastoSumOrderByAggregateInput
  }

  export type gastoScalarWhereWithAggregatesInput = {
    AND?: gastoScalarWhereWithAggregatesInput | gastoScalarWhereWithAggregatesInput[]
    OR?: gastoScalarWhereWithAggregatesInput[]
    NOT?: gastoScalarWhereWithAggregatesInput | gastoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"gasto"> | number
    amount?: DecimalWithAggregatesFilter<"gasto"> | Decimal | DecimalJsLike | number | string
    date?: DateTimeWithAggregatesFilter<"gasto"> | Date | string
    detail?: StringWithAggregatesFilter<"gasto"> | string
    type?: IntWithAggregatesFilter<"gasto"> | number
  }

  export type principalWhereInput = {
    AND?: principalWhereInput | principalWhereInput[]
    OR?: principalWhereInput[]
    NOT?: principalWhereInput | principalWhereInput[]
    id?: IntFilter<"principal"> | number
    available?: IntFilter<"principal"> | number
    expenses?: IntFilter<"principal"> | number
    inbanks?: IntFilter<"principal"> | number
    indebt?: IntFilter<"principal"> | number
    investments?: IntFilter<"principal"> | number
    max?: IntFilter<"principal"> | number
    monthly?: IntFilter<"principal"> | number
    nextmonth?: IntFilter<"principal"> | number
  }

  export type principalOrderByWithRelationInput = {
    id?: SortOrder
    available?: SortOrder
    expenses?: SortOrder
    inbanks?: SortOrder
    indebt?: SortOrder
    investments?: SortOrder
    max?: SortOrder
    monthly?: SortOrder
    nextmonth?: SortOrder
  }

  export type principalWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: principalWhereInput | principalWhereInput[]
    OR?: principalWhereInput[]
    NOT?: principalWhereInput | principalWhereInput[]
    available?: IntFilter<"principal"> | number
    expenses?: IntFilter<"principal"> | number
    inbanks?: IntFilter<"principal"> | number
    indebt?: IntFilter<"principal"> | number
    investments?: IntFilter<"principal"> | number
    max?: IntFilter<"principal"> | number
    monthly?: IntFilter<"principal"> | number
    nextmonth?: IntFilter<"principal"> | number
  }, "id">

  export type principalOrderByWithAggregationInput = {
    id?: SortOrder
    available?: SortOrder
    expenses?: SortOrder
    inbanks?: SortOrder
    indebt?: SortOrder
    investments?: SortOrder
    max?: SortOrder
    monthly?: SortOrder
    nextmonth?: SortOrder
    _count?: principalCountOrderByAggregateInput
    _avg?: principalAvgOrderByAggregateInput
    _max?: principalMaxOrderByAggregateInput
    _min?: principalMinOrderByAggregateInput
    _sum?: principalSumOrderByAggregateInput
  }

  export type principalScalarWhereWithAggregatesInput = {
    AND?: principalScalarWhereWithAggregatesInput | principalScalarWhereWithAggregatesInput[]
    OR?: principalScalarWhereWithAggregatesInput[]
    NOT?: principalScalarWhereWithAggregatesInput | principalScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"principal"> | number
    available?: IntWithAggregatesFilter<"principal"> | number
    expenses?: IntWithAggregatesFilter<"principal"> | number
    inbanks?: IntWithAggregatesFilter<"principal"> | number
    indebt?: IntWithAggregatesFilter<"principal"> | number
    investments?: IntWithAggregatesFilter<"principal"> | number
    max?: IntWithAggregatesFilter<"principal"> | number
    monthly?: IntWithAggregatesFilter<"principal"> | number
    nextmonth?: IntWithAggregatesFilter<"principal"> | number
  }

  export type walletWhereInput = {
    AND?: walletWhereInput | walletWhereInput[]
    OR?: walletWhereInput[]
    NOT?: walletWhereInput | walletWhereInput[]
    id?: IntFilter<"wallet"> | number
    capital?: DecimalFilter<"wallet"> | Decimal | DecimalJsLike | number | string
    logo?: StringFilter<"wallet"> | string
    name?: StringFilter<"wallet"> | string
    period?: DateTimeFilter<"wallet"> | Date | string
    tna?: DecimalFilter<"wallet"> | Decimal | DecimalJsLike | number | string
  }

  export type walletOrderByWithRelationInput = {
    id?: SortOrder
    capital?: SortOrder
    logo?: SortOrder
    name?: SortOrder
    period?: SortOrder
    tna?: SortOrder
  }

  export type walletWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: walletWhereInput | walletWhereInput[]
    OR?: walletWhereInput[]
    NOT?: walletWhereInput | walletWhereInput[]
    capital?: DecimalFilter<"wallet"> | Decimal | DecimalJsLike | number | string
    logo?: StringFilter<"wallet"> | string
    name?: StringFilter<"wallet"> | string
    period?: DateTimeFilter<"wallet"> | Date | string
    tna?: DecimalFilter<"wallet"> | Decimal | DecimalJsLike | number | string
  }, "id">

  export type walletOrderByWithAggregationInput = {
    id?: SortOrder
    capital?: SortOrder
    logo?: SortOrder
    name?: SortOrder
    period?: SortOrder
    tna?: SortOrder
    _count?: walletCountOrderByAggregateInput
    _avg?: walletAvgOrderByAggregateInput
    _max?: walletMaxOrderByAggregateInput
    _min?: walletMinOrderByAggregateInput
    _sum?: walletSumOrderByAggregateInput
  }

  export type walletScalarWhereWithAggregatesInput = {
    AND?: walletScalarWhereWithAggregatesInput | walletScalarWhereWithAggregatesInput[]
    OR?: walletScalarWhereWithAggregatesInput[]
    NOT?: walletScalarWhereWithAggregatesInput | walletScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"wallet"> | number
    capital?: DecimalWithAggregatesFilter<"wallet"> | Decimal | DecimalJsLike | number | string
    logo?: StringWithAggregatesFilter<"wallet"> | string
    name?: StringWithAggregatesFilter<"wallet"> | string
    period?: DateTimeWithAggregatesFilter<"wallet"> | Date | string
    tna?: DecimalWithAggregatesFilter<"wallet"> | Decimal | DecimalJsLike | number | string
  }

  export type bancoCreateInput = {
    capital?: Decimal | DecimalJsLike | number | string
    duedate: Date | string
    logo: string
    name: string
    period: Date | string
    tna: number
  }

  export type bancoUncheckedCreateInput = {
    id?: number
    capital?: Decimal | DecimalJsLike | number | string
    duedate: Date | string
    logo: string
    name: string
    period: Date | string
    tna: number
  }

  export type bancoUpdateInput = {
    capital?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    duedate?: DateTimeFieldUpdateOperationsInput | Date | string
    logo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    period?: DateTimeFieldUpdateOperationsInput | Date | string
    tna?: FloatFieldUpdateOperationsInput | number
  }

  export type bancoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    capital?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    duedate?: DateTimeFieldUpdateOperationsInput | Date | string
    logo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    period?: DateTimeFieldUpdateOperationsInput | Date | string
    tna?: FloatFieldUpdateOperationsInput | number
  }

  export type bancoCreateManyInput = {
    id?: number
    capital?: Decimal | DecimalJsLike | number | string
    duedate: Date | string
    logo: string
    name: string
    period: Date | string
    tna: number
  }

  export type bancoUpdateManyMutationInput = {
    capital?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    duedate?: DateTimeFieldUpdateOperationsInput | Date | string
    logo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    period?: DateTimeFieldUpdateOperationsInput | Date | string
    tna?: FloatFieldUpdateOperationsInput | number
  }

  export type bancoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    capital?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    duedate?: DateTimeFieldUpdateOperationsInput | Date | string
    logo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    period?: DateTimeFieldUpdateOperationsInput | Date | string
    tna?: FloatFieldUpdateOperationsInput | number
  }

  export type fijoCreateInput = {
    capital?: Decimal | DecimalJsLike | number | string
    client: string
    logo: string
    name: string
    period: Date | string
    url: string
  }

  export type fijoUncheckedCreateInput = {
    id?: number
    capital?: Decimal | DecimalJsLike | number | string
    client: string
    logo: string
    name: string
    period: Date | string
    url: string
  }

  export type fijoUpdateInput = {
    capital?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    client?: StringFieldUpdateOperationsInput | string
    logo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    period?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type fijoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    capital?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    client?: StringFieldUpdateOperationsInput | string
    logo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    period?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type fijoCreateManyInput = {
    id?: number
    capital?: Decimal | DecimalJsLike | number | string
    client: string
    logo: string
    name: string
    period: Date | string
    url: string
  }

  export type fijoUpdateManyMutationInput = {
    capital?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    client?: StringFieldUpdateOperationsInput | string
    logo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    period?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type fijoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    capital?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    client?: StringFieldUpdateOperationsInput | string
    logo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    period?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type gastoCreateInput = {
    amount?: Decimal | DecimalJsLike | number | string
    date: Date | string
    detail: string
    type: number
  }

  export type gastoUncheckedCreateInput = {
    id?: number
    amount?: Decimal | DecimalJsLike | number | string
    date: Date | string
    detail: string
    type: number
  }

  export type gastoUpdateInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    detail?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
  }

  export type gastoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    detail?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
  }

  export type gastoCreateManyInput = {
    id?: number
    amount?: Decimal | DecimalJsLike | number | string
    date: Date | string
    detail: string
    type: number
  }

  export type gastoUpdateManyMutationInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    detail?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
  }

  export type gastoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    detail?: StringFieldUpdateOperationsInput | string
    type?: IntFieldUpdateOperationsInput | number
  }

  export type principalCreateInput = {
    available: number
    expenses: number
    inbanks: number
    indebt: number
    investments: number
    max: number
    monthly: number
    nextmonth: number
  }

  export type principalUncheckedCreateInput = {
    id?: number
    available: number
    expenses: number
    inbanks: number
    indebt: number
    investments: number
    max: number
    monthly: number
    nextmonth: number
  }

  export type principalUpdateInput = {
    available?: IntFieldUpdateOperationsInput | number
    expenses?: IntFieldUpdateOperationsInput | number
    inbanks?: IntFieldUpdateOperationsInput | number
    indebt?: IntFieldUpdateOperationsInput | number
    investments?: IntFieldUpdateOperationsInput | number
    max?: IntFieldUpdateOperationsInput | number
    monthly?: IntFieldUpdateOperationsInput | number
    nextmonth?: IntFieldUpdateOperationsInput | number
  }

  export type principalUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    available?: IntFieldUpdateOperationsInput | number
    expenses?: IntFieldUpdateOperationsInput | number
    inbanks?: IntFieldUpdateOperationsInput | number
    indebt?: IntFieldUpdateOperationsInput | number
    investments?: IntFieldUpdateOperationsInput | number
    max?: IntFieldUpdateOperationsInput | number
    monthly?: IntFieldUpdateOperationsInput | number
    nextmonth?: IntFieldUpdateOperationsInput | number
  }

  export type principalCreateManyInput = {
    id?: number
    available: number
    expenses: number
    inbanks: number
    indebt: number
    investments: number
    max: number
    monthly: number
    nextmonth: number
  }

  export type principalUpdateManyMutationInput = {
    available?: IntFieldUpdateOperationsInput | number
    expenses?: IntFieldUpdateOperationsInput | number
    inbanks?: IntFieldUpdateOperationsInput | number
    indebt?: IntFieldUpdateOperationsInput | number
    investments?: IntFieldUpdateOperationsInput | number
    max?: IntFieldUpdateOperationsInput | number
    monthly?: IntFieldUpdateOperationsInput | number
    nextmonth?: IntFieldUpdateOperationsInput | number
  }

  export type principalUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    available?: IntFieldUpdateOperationsInput | number
    expenses?: IntFieldUpdateOperationsInput | number
    inbanks?: IntFieldUpdateOperationsInput | number
    indebt?: IntFieldUpdateOperationsInput | number
    investments?: IntFieldUpdateOperationsInput | number
    max?: IntFieldUpdateOperationsInput | number
    monthly?: IntFieldUpdateOperationsInput | number
    nextmonth?: IntFieldUpdateOperationsInput | number
  }

  export type walletCreateInput = {
    capital?: Decimal | DecimalJsLike | number | string
    logo: string
    name: string
    period: Date | string
    tna?: Decimal | DecimalJsLike | number | string
  }

  export type walletUncheckedCreateInput = {
    id?: number
    capital?: Decimal | DecimalJsLike | number | string
    logo: string
    name: string
    period: Date | string
    tna?: Decimal | DecimalJsLike | number | string
  }

  export type walletUpdateInput = {
    capital?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    logo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    period?: DateTimeFieldUpdateOperationsInput | Date | string
    tna?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type walletUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    capital?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    logo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    period?: DateTimeFieldUpdateOperationsInput | Date | string
    tna?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type walletCreateManyInput = {
    id?: number
    capital?: Decimal | DecimalJsLike | number | string
    logo: string
    name: string
    period: Date | string
    tna?: Decimal | DecimalJsLike | number | string
  }

  export type walletUpdateManyMutationInput = {
    capital?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    logo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    period?: DateTimeFieldUpdateOperationsInput | Date | string
    tna?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type walletUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    capital?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    logo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    period?: DateTimeFieldUpdateOperationsInput | Date | string
    tna?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type bancoCountOrderByAggregateInput = {
    id?: SortOrder
    capital?: SortOrder
    duedate?: SortOrder
    logo?: SortOrder
    name?: SortOrder
    period?: SortOrder
    tna?: SortOrder
  }

  export type bancoAvgOrderByAggregateInput = {
    id?: SortOrder
    capital?: SortOrder
    tna?: SortOrder
  }

  export type bancoMaxOrderByAggregateInput = {
    id?: SortOrder
    capital?: SortOrder
    duedate?: SortOrder
    logo?: SortOrder
    name?: SortOrder
    period?: SortOrder
    tna?: SortOrder
  }

  export type bancoMinOrderByAggregateInput = {
    id?: SortOrder
    capital?: SortOrder
    duedate?: SortOrder
    logo?: SortOrder
    name?: SortOrder
    period?: SortOrder
    tna?: SortOrder
  }

  export type bancoSumOrderByAggregateInput = {
    id?: SortOrder
    capital?: SortOrder
    tna?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type fijoCountOrderByAggregateInput = {
    id?: SortOrder
    capital?: SortOrder
    client?: SortOrder
    logo?: SortOrder
    name?: SortOrder
    period?: SortOrder
    url?: SortOrder
  }

  export type fijoAvgOrderByAggregateInput = {
    id?: SortOrder
    capital?: SortOrder
  }

  export type fijoMaxOrderByAggregateInput = {
    id?: SortOrder
    capital?: SortOrder
    client?: SortOrder
    logo?: SortOrder
    name?: SortOrder
    period?: SortOrder
    url?: SortOrder
  }

  export type fijoMinOrderByAggregateInput = {
    id?: SortOrder
    capital?: SortOrder
    client?: SortOrder
    logo?: SortOrder
    name?: SortOrder
    period?: SortOrder
    url?: SortOrder
  }

  export type fijoSumOrderByAggregateInput = {
    id?: SortOrder
    capital?: SortOrder
  }

  export type gastoCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    detail?: SortOrder
    type?: SortOrder
  }

  export type gastoAvgOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
  }

  export type gastoMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    detail?: SortOrder
    type?: SortOrder
  }

  export type gastoMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    detail?: SortOrder
    type?: SortOrder
  }

  export type gastoSumOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
  }

  export type principalCountOrderByAggregateInput = {
    id?: SortOrder
    available?: SortOrder
    expenses?: SortOrder
    inbanks?: SortOrder
    indebt?: SortOrder
    investments?: SortOrder
    max?: SortOrder
    monthly?: SortOrder
    nextmonth?: SortOrder
  }

  export type principalAvgOrderByAggregateInput = {
    id?: SortOrder
    available?: SortOrder
    expenses?: SortOrder
    inbanks?: SortOrder
    indebt?: SortOrder
    investments?: SortOrder
    max?: SortOrder
    monthly?: SortOrder
    nextmonth?: SortOrder
  }

  export type principalMaxOrderByAggregateInput = {
    id?: SortOrder
    available?: SortOrder
    expenses?: SortOrder
    inbanks?: SortOrder
    indebt?: SortOrder
    investments?: SortOrder
    max?: SortOrder
    monthly?: SortOrder
    nextmonth?: SortOrder
  }

  export type principalMinOrderByAggregateInput = {
    id?: SortOrder
    available?: SortOrder
    expenses?: SortOrder
    inbanks?: SortOrder
    indebt?: SortOrder
    investments?: SortOrder
    max?: SortOrder
    monthly?: SortOrder
    nextmonth?: SortOrder
  }

  export type principalSumOrderByAggregateInput = {
    id?: SortOrder
    available?: SortOrder
    expenses?: SortOrder
    inbanks?: SortOrder
    indebt?: SortOrder
    investments?: SortOrder
    max?: SortOrder
    monthly?: SortOrder
    nextmonth?: SortOrder
  }

  export type walletCountOrderByAggregateInput = {
    id?: SortOrder
    capital?: SortOrder
    logo?: SortOrder
    name?: SortOrder
    period?: SortOrder
    tna?: SortOrder
  }

  export type walletAvgOrderByAggregateInput = {
    id?: SortOrder
    capital?: SortOrder
    tna?: SortOrder
  }

  export type walletMaxOrderByAggregateInput = {
    id?: SortOrder
    capital?: SortOrder
    logo?: SortOrder
    name?: SortOrder
    period?: SortOrder
    tna?: SortOrder
  }

  export type walletMinOrderByAggregateInput = {
    id?: SortOrder
    capital?: SortOrder
    logo?: SortOrder
    name?: SortOrder
    period?: SortOrder
    tna?: SortOrder
  }

  export type walletSumOrderByAggregateInput = {
    id?: SortOrder
    capital?: SortOrder
    tna?: SortOrder
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use bancoDefaultArgs instead
     */
    export type bancoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = bancoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use fijoDefaultArgs instead
     */
    export type fijoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = fijoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use gastoDefaultArgs instead
     */
    export type gastoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = gastoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use principalDefaultArgs instead
     */
    export type principalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = principalDefaultArgs<ExtArgs>
    /**
     * @deprecated Use walletDefaultArgs instead
     */
    export type walletArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = walletDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}