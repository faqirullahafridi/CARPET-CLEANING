import { Router } from "express";
import { db, bookingsTable, couponsTable } from "@workspace/db";
import { eq, and, gt, or, isNull, sql } from "drizzle-orm";
import { SERVICE_ITEMS, ADDONS, MINIMUM_BOOKING_FEE, SERVICES } from "../lib/services-data";
import {
  sendBookingConfirmationToCustomer,
  sendBookingNotificationToAdmin,
} from "../lib/email";
import { respondWithDbError } from "../lib/db-errors";
import { fireBookingWhatsAppNotification } from "../lib/booking-notifications";

const router = Router();

function generateBookingNumber(): string {
  const prefix = "CCP";
  const timestamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${rand}`;
}

router.post("/bookings", async (req, res) => {
  try {
    const {
      serviceId,
      items = [],
      addons = [],
      date,
      timeSlot,
      customerName,
      customerEmail,
      customerPhone,
      address,
      postcode,
      notes,
      couponCode,
      propertyType,
    } = req.body;

    if (!serviceId || !date || !timeSlot || !customerName || !customerEmail || !customerPhone || !address || !postcode) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const service = SERVICES.find((s) => s.id === serviceId);
    if (!service) {
      res.status(400).json({ error: "Invalid service" });
      return;
    }

    const allItems = SERVICE_ITEMS[serviceId] ?? [];
    const lines: Array<{ name: string; quantity: number; unitPrice: number; lineTotal: number }> = [];
    let subtotal = 0;

    for (const lineItem of items) {
      const found = allItems.find((i) => i.id === lineItem.itemId);
      if (found && lineItem.quantity > 0) {
        const lineTotal = found.priceGbp * lineItem.quantity;
        subtotal += lineTotal;
        lines.push({ name: found.name, quantity: lineItem.quantity, unitPrice: found.priceGbp, lineTotal });
      }
    }

    for (const addonId of addons) {
      const addon = ADDONS.find((a) => a.id === addonId);
      if (addon) {
        subtotal += addon.priceGbp;
        lines.push({ name: addon.name, quantity: 1, unitPrice: addon.priceGbp, lineTotal: addon.priceGbp });
      }
    }

    let discount = 0;
    let appliedCoupon: string | null = null;

    if (couponCode) {
      const [coupon] = await db
        .select()
        .from(couponsTable)
        .where(
          and(
            eq(couponsTable.code, couponCode.toUpperCase().trim()),
            eq(couponsTable.isActive, true),
            or(isNull(couponsTable.expiresAt), gt(couponsTable.expiresAt, new Date()))
          )
        )
        .limit(1);

      if (coupon) {
        if (coupon.discountType === "percentage") {
          discount = subtotal * (Number(coupon.discountValue) / 100);
        } else {
          discount = Math.min(Number(coupon.discountValue), subtotal);
        }
        appliedCoupon = coupon.code;
        await db
          .update(couponsTable)
          .set({ usedCount: sql`${couponsTable.usedCount} + 1` })
          .where(eq(couponsTable.id, coupon.id));
      }
    }

    const afterDiscount = Math.max(subtotal - discount, 0);
    const total =
      afterDiscount === 0 || afterDiscount < MINIMUM_BOOKING_FEE
        ? MINIMUM_BOOKING_FEE
        : afterDiscount;
    const bookingNumber = generateBookingNumber();

    const [booking] = await db
      .insert(bookingsTable)
      .values({
        bookingNumber,
        serviceId,
        serviceName: service.name,
        date,
        timeSlot,
        customerName,
        customerEmail,
        customerPhone,
        address,
        postcode,
        notes: notes || null,
        status: "pending",
        totalGbp: total.toFixed(2),
        subtotalGbp: subtotal.toFixed(2),
        discountGbp: discount.toFixed(2),
        couponCode: appliedCoupon,
        propertyType: propertyType || null,
        items: lines,
      })
      .returning();

    const emailData = {
      bookingNumber,
      customerName,
      customerEmail,
      serviceName: service.name,
      date,
      timeSlot,
      address,
      postcode,
      totalGbp: total,
      subtotalGbp: subtotal,
      discountGbp: discount,
      items: lines,
      notes,
      couponCode: appliedCoupon,
    };

    Promise.all([
      sendBookingConfirmationToCustomer(emailData),
      sendBookingNotificationToAdmin(emailData),
    ]).catch((err) => req.log.error({ err }, "Failed to send booking emails"));

    fireBookingWhatsAppNotification(
      {
        bookingNumber,
        serviceName: service.name,
        propertyType: propertyType || null,
        date,
        timeSlot,
        address,
        postcode,
        customerName,
        customerEmail,
        customerPhone,
        notes,
        items: lines.map((line) => ({
          name: line.name,
          quantity: line.quantity,
        })),
      },
      req.log,
    );

    res.status(201).json({
      id: booking.id,
      bookingNumber: booking.bookingNumber,
      serviceId: booking.serviceId,
      serviceName: booking.serviceName,
      date: booking.date,
      timeSlot: booking.timeSlot,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone,
      address: booking.address,
      postcode: booking.postcode,
      notes: booking.notes,
      status: booking.status,
      totalGbp: Number(booking.totalGbp),
      subtotalGbp: Number(booking.subtotalGbp),
      discountGbp: Number(booking.discountGbp),
      couponCode: booking.couponCode,
      propertyType: booking.propertyType,
      items: booking.items as typeof lines,
      createdAt: booking.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create booking");
    respondWithDbError(res, err);
  }
});

router.get("/bookings/:bookingNumber", async (req, res) => {
  try {
    const { bookingNumber } = req.params;

    const [booking] = await db
      .select()
      .from(bookingsTable)
      .where(eq(bookingsTable.bookingNumber, bookingNumber))
      .limit(1);

    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }

    res.json({
    id: booking.id,
    bookingNumber: booking.bookingNumber,
    serviceId: booking.serviceId,
    serviceName: booking.serviceName,
    date: booking.date,
    timeSlot: booking.timeSlot,
    customerName: booking.customerName,
    customerEmail: booking.customerEmail,
    customerPhone: booking.customerPhone,
    address: booking.address,
    postcode: booking.postcode,
    notes: booking.notes,
    status: booking.status,
    totalGbp: Number(booking.totalGbp),
    subtotalGbp: Number(booking.subtotalGbp),
    discountGbp: Number(booking.discountGbp),
    couponCode: booking.couponCode,
    propertyType: booking.propertyType,
    items: booking.items,
    createdAt: booking.createdAt.toISOString(),
  });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch booking");
    respondWithDbError(res, err);
  }
});

export default router;
