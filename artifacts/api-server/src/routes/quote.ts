import { Router } from "express";
import { SERVICE_ITEMS, ADDONS, MINIMUM_BOOKING_FEE } from "../lib/services-data";
import { db, couponsTable } from "@workspace/db";
import { eq, and, gt, or, isNull } from "drizzle-orm";

const router = Router();

router.post("/quote", async (req, res) => {
  const { serviceId, items = [], addons = [], couponCode } = req.body;

  const allItems = SERVICE_ITEMS[serviceId] ?? [];
  const lines: Array<{ name: string; quantity: number; unitPrice: number; lineTotal: number }> = [];

  let subtotal = 0;

  for (const lineItem of items) {
    const found = allItems.find((i) => i.id === lineItem.itemId);
    if (found && lineItem.quantity > 0) {
      const lineTotal = found.priceGbp * lineItem.quantity;
      subtotal += lineTotal;
      lines.push({
        name: found.name,
        quantity: lineItem.quantity,
        unitPrice: found.priceGbp,
        lineTotal,
      });
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
  if (couponCode) {
    const [coupon] = await db
      .select()
      .from(couponsTable)
      .where(
        and(
          eq(couponsTable.code, couponCode.toUpperCase()),
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
    }
  }

  const rawTotal = subtotal - discount;
  const minimumApplied = rawTotal < MINIMUM_BOOKING_FEE && rawTotal > 0;
  const total = minimumApplied ? MINIMUM_BOOKING_FEE : rawTotal;
  const savedAmount = subtotal - total;

  res.json({
    subtotal,
    discount,
    total,
    minimumApplied,
    savedAmount: savedAmount > 0 ? savedAmount : 0,
    lines,
  });
});

export default router;
