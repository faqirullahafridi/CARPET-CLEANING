import { Router, type IRouter } from "express";
import healthRouter from "./health";
import servicesRouter from "./services";
import quoteRouter from "./quote";
import couponsRouter from "./coupons";
import bookingsRouter from "./bookings";
import availabilityRouter from "./availability";
import contactRouter from "./contact";
import addressesRouter from "./addresses";

const router: IRouter = Router();

router.use(healthRouter);
router.use(servicesRouter);
router.use(quoteRouter);
router.use(couponsRouter);
router.use(bookingsRouter);
router.use(availabilityRouter);
router.use(contactRouter);
router.use(addressesRouter);

export default router;
