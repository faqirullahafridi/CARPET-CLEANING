import { Router } from "express";
import { db, couponsTable } from "@workspace/db";
import { eq, and, gt, or, isNull } from "drizzle-orm";

const router = Router();

router.post("/coupons/validate", async (req, res) => {
  const { code } = req.body;

  if (!code || typeof code !== "string") {
    res.status(400).json({ error: "Coupon code is required" });
    return;
  }

  const [coupon] = await db
    .select()
    .from(couponsTable)
    .where(
      and(
        eq(couponsTable.code, code.toUpperCase().trim()),
        eq(couponsTable.isActive, true),
        or(isNull(couponsTable.expiresAt), gt(couponsTable.expiresAt, new Date()))
      )
    )
    .limit(1);

  if (!coupon) {
    res.status(404).json({ error: "Coupon not found or expired" });
    return;
  }

  if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
    res.status(404).json({ error: "Coupon usage limit reached" });
    return;
  }

  res.json({
    code: coupon.code,
    discountType: coupon.discountType,
    discountValue: Number(coupon.discountValue),
    description: coupon.description,
  });
});

export default router;
