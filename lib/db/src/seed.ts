import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";
import * as schema from "./schema";

const { Pool } = pg;

async function seed() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL must be set");
  }

  const needsSsl =
    !/localhost|127\.0\.0\.1/i.test(connectionString) &&
    !/sslmode=disable/i.test(connectionString);

  const pool = new Pool({
    connectionString,
    ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
  });

  const db = drizzle(pool, { schema });

  await db.execute(sql`
    INSERT INTO coupons (code, discount_type, discount_value, description, is_active)
    VALUES
      ('WELCOME10', 'percentage', '10', '10% off', true),
      ('FRESHSTART', 'fixed', '20', '£20 off', true),
      ('BUNDLE15', 'percentage', '15', '15% off', true),
      ('NEWCUSTOMER', 'percentage', '20', '20% off', true),
      ('SAVE25', 'fixed', '25', '£25 off', true)
    ON CONFLICT (code) DO NOTHING
  `);

  await pool.end();
  console.log("Coupon codes seeded.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
