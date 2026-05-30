import {
  pgTable,
  text,
  serial,
  timestamp,
  numeric,
  boolean,
  jsonb,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const bookingsTable = pgTable("bookings", {
  id: serial("id").primaryKey(),
  bookingNumber: text("booking_number").notNull().unique(),
  serviceId: text("service_id").notNull(),
  serviceName: text("service_name").notNull(),
  date: text("date").notNull(),
  timeSlot: text("time_slot").notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  address: text("address").notNull(),
  postcode: text("postcode").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("pending"),
  totalGbp: numeric("total_gbp", { precision: 10, scale: 2 }).notNull(),
  subtotalGbp: numeric("subtotal_gbp", { precision: 10, scale: 2 }).notNull().default("0"),
  discountGbp: numeric("discount_gbp", { precision: 10, scale: 2 }).notNull().default("0"),
  couponCode: text("coupon_code"),
  propertyType: text("property_type"),
  items: jsonb("items").notNull().default("[]"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertBookingSchema = createInsertSchema(bookingsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookingsTable.$inferSelect;
