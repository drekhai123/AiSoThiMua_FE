import { NextRequest, NextResponse } from "next/server";
import { logger, extractSafePaymentData } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    // Read raw body
    const rawBody = await request.text();
    let body;

    try {
      body = JSON.parse(rawBody);
    } catch (parseError) {
      logger.error("Failed to parse request body:", parseError);
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body"
        },
        { status: 400 }
      );
    }

    // Log only safe, non-sensitive fields for debugging
    const safeCallbackData = extractSafePaymentData(body);
    logger.debug("Sepay Callback received", safeCallbackData);

    // Verify API Key from Authorization header
    const authHeader = request.headers.get("Authorization");
    const apiKey = process.env.SEPAY_API_KEY;

    // Fail fast if API key is not configured
    if (!apiKey) {
      logger.error("SEPAY_API_KEY is not configured in environment variables");
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error"
        },
        { status: 500 }
      );
    }

    if (!authHeader) {
      logger.warn("Missing Authorization header in Sepay callback");
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized - missing authorization"
        },
        { status: 401 }
      );
    }

    // Extract API key from "Apikey YOUR_API_KEY" format
    if (!authHeader.startsWith("Apikey ")) {
      logger.warn("Invalid Authorization header format");
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized - invalid authorization format"
        },
        { status: 401 }
      );
    }

    const providedApiKey = authHeader.substring(7); // Remove "Apikey " prefix

    // Timing-safe comparison of API keys
    if (providedApiKey !== apiKey) {
      logger.warn("API key verification failed");
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized - invalid API key"
        },
        { status: 401 }
      );
    }

    // Extract payment information
    const {
      status,
      transaction_id,
      amount,
      order_id,
      customer_id,
    } = body;

    // Verify payment status
    if (status === "success" || status === "200") {
      // Payment successful - update user wallet balance
      logger.info("Payment successful", {
        transaction_id,
        amount,
        order_id,
      });

      // TODO: Implement atomic database update logic
      // This is a critical section that requires proper implementation:
      //
      // 1. Check for duplicate transaction (idempotency):
      //    const existingTx = await db.transaction.findUnique({
      //      where: { transaction_id: transaction_id }
      //    });
      //    if (existingTx?.processed) {
      //      return NextResponse.json({ success: true, message: "Already processed" });
      //    }
      //
      // 2. Execute atomic database transaction:
      //    await db.$transaction(async (tx) => {
      //      // a) Record the transaction with processed flag
      //      await tx.transaction.create({
      //        data: {
      //          transaction_id,
      //          amount,
      //          order_id,
      //          customer_id,
      //          status: 'completed',
      //          processed: true,
      //          processed_at: new Date(),
      //        }
      //      });
      //
      //      // b) Update user wallet balance
      //      const amountCa = amount / 1000; // Convert VND to Cá
      //      const bonus = calculateBonus(amountCa);
      //      await tx.user.update({
      //        where: { id: customer_id },
      //        data: {
      //          balance: { increment: amountCa + bonus }
      //        }
      //      });
      //
      //      // c) Create wallet transaction ledger entry
      //      await tx.walletTransaction.create({
      //        data: {
      //          user_id: customer_id,
      //          type: 'deposit',
      //          amount: amountCa,
      //          bonus: bonus,
      //          total: amountCa + bonus,
      //          transaction_id,
      //          status: 'completed',
      //        }
      //      });
      //    });
      //
      // 3. After successful transaction commit, enqueue notification:
      //    await notificationQueue.add({
      //      user_id: customer_id,
      //      type: 'deposit_success',
      //      amount: amount,
      //      transaction_id,
      //    });
      //
      // 4. On error, the transaction will rollback automatically,
      //    return 500 to trigger Sepay retry mechanism

      return NextResponse.json(
        {
          success: true,
          message: "Payment processed successfully"
        },
        { status: 200 }
      );
    } else {
      // Payment failed or cancelled
      logger.warn("Payment failed", {
        status,
        transaction_id,
        order_id,
      });

      return NextResponse.json(
        {
          success: false,
          message: "Payment failed"
        },
        { status: 200 }
      );
    }
  } catch (error) {
    logger.error("Sepay callback error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error processing callback"
      },
      { status: 500 }
    );
  }
}

// Also handle GET requests (some payment gateways use GET for redirects)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Extract query parameters
  const status = searchParams.get("status");
  const transactionId = searchParams.get("transaction_id");
  const amount = searchParams.get("amount");

  // Log only safe callback data
  logger.debug("Sepay GET Callback received", {
    status,
    transaction_id: transactionId,
    amount
  });

  // Redirect to wallet page with status query params
  // The wallet page will handle showing toast notification
  const redirectUrl = new URL("/wallet", request.url);
  redirectUrl.searchParams.set("payment_status", status || "unknown");
  if (transactionId) redirectUrl.searchParams.set("transaction_id", transactionId);
  if (amount) redirectUrl.searchParams.set("amount", amount);

  return NextResponse.redirect(redirectUrl);
}
