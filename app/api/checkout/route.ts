import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { validateCheckoutPayload, ValidationError } from '@/lib/validation';

// Ensure the secret key is provided before initializing Stripe.
// If it's missing, we instantiate it but API calls will fail when actually checking out.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-03-25.dahlia',
});

const MAX_REQUEST_BODY_BYTES = 8 * 1024; // 8 KB — donations never need more

export async function POST(req: Request) {
  try {
    const contentLength = Number(req.headers.get('content-length') ?? '0');
    if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BODY_BYTES) {
      return NextResponse.json({ error: 'Request body is too large.' }, { status: 413 });
    }

    let raw: unknown;
    try {
      raw = await req.json();
    } catch {
      return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
    }

    let payload;
    try {
      payload = validateCheckoutPayload(raw);
    } catch (err) {
      if (err instanceof ValidationError) {
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
      throw err;
    }

    const { amount, currency, email, name, payMethod, isDedicated, dedicateName } = payload;

    // Convert amount to cents/pesewas (Stripe uses smallest currency unit)
    const unitAmount = Math.round(amount * 100);

    // Create Checkout Session
    // Define the base URL dynamically based on the request origin
    const origin = req.headers.get('origin') || 'http://localhost:3000';
    
    // Config Stripe Payment Methods based on user selection if needed.
    // For now, let Stripe handle the default methods configured in the dashboard.
    // We pass customer email if provided
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate`,
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: 'PerbiCubs Foundation Donation',
              description: isDedicated && dedicateName 
                ? `Dedicated to: ${dedicateName}` 
                : 'Digital Literacy Scholarship Fund',
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        donor_name: name || 'Anonymous',
        dedication: dedicateName || 'None',
        payment_preference: payMethod || 'card',
      },
      submit_type: 'donate',
    };

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error('Stripe Checkout Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error creating checkout session';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
