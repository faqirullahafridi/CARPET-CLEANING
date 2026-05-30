import type { Response } from "express";

export function mapDbError(err: unknown): { status: number; error: string } {
  const message = err instanceof Error ? err.message : String(err);

  if (message.includes("DATABASE_URL")) {
    return {
      status: 503,
      error:
        "Database is not configured. Set DATABASE_URL in your deployment environment.",
    };
  }

  if (
    message.includes("does not exist") ||
    message.includes('relation "') ||
    message.includes("42P01")
  ) {
    return {
      status: 503,
      error:
        "Database tables are missing. Run the schema push against your production database.",
    };
  }

  if (
    message.includes("SSL") ||
    message.includes("ECONNREFUSED") ||
    message.includes("ENOTFOUND") ||
    message.includes("timeout") ||
    message.includes("Connection terminated")
  ) {
    return {
      status: 503,
      error: "Unable to connect to the database. Check DATABASE_URL and SSL settings.",
    };
  }

  return {
    status: 500,
    error: "A server error occurred. Please try again.",
  };
}

export function respondWithDbError(res: Response, err: unknown): void {
  const { status, error } = mapDbError(err);
  res.status(status).json({ error });
}
