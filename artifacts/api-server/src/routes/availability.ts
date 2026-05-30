import { Router } from "express";

const router = Router();

const TIME_SLOTS = [
  "08:00-10:00",
  "10:00-12:00",
  "12:00-14:00",
  "14:00-16:00",
  "16:00-18:00",
];

function getDaysBetween(from: string, to: string): string[] {
  const days: string[] = [];
  const start = new Date(from);
  const end = new Date(to);
  const current = new Date(start);

  while (current <= end && days.length < 14) {
    days.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }
  return days;
}

router.get("/availability", (req, res) => {
  const { from, to } = req.query as { from?: string; to?: string };

  if (!from || !to) {
    res.status(400).json({ error: "from and to query params are required" });
    return;
  }

  const days = getDaysBetween(from, to);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const availability = days.map((date) => {
    const d = new Date(date);
    const dayOfWeek = d.getDay();

    if (dayOfWeek === 0) {
      return { date, slots: [] };
    }

    const seedVal = d.getTime() % 7;
    const slots = TIME_SLOTS.filter((_, i) => (i + seedVal) % 3 !== 0);

    return { date, slots };
  });

  res.json(availability);
});

export default router;
