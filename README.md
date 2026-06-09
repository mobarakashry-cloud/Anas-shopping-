# Anas Shopping

## وصف التطبيق بالعربي
Anas Shopping هو تطبيق تسوق ذكي وشامل داخل Pi Browser يتيح للمستخدم شراء وبيع المنتجات الجديدة والمستعملة بسهولة وأمان مع دعم كامل للدفع بعملة Pi. يوفر التطبيق واجهة سهلة الاستخدام مع أقسام متنوعة تشمل الإلكترونيات، الأدوات المنزلية، الملابس، الأثاث، السيارات، والمزيد. يمكن للبائعين إضافة منتجاتهم بالصور والفيديو والصوت مع وصف وسعر وتحديد طرق الدفع والموقع. التطبيق يدعم نظام الإعلانات المدفوعة (صور، فيديو، صوت، نص) لزيادة الأرباح والوصول لأكبر عدد من المستخدمين. يربح مالك التطبيق من العمولة على المبيعات، الإعلانات المدفوعة، والخدمات المميزة للبائعين مثل الترويج والظهور في الصفحة الرئيسية. التطبيق متعدد اللغات، سريع، متجاوب، ويدعم الإشعارات الفورية والتقييمات، ويمنح المالك تحكم كامل في الأقسام والألوان والإعدادات.

## Description in English
Anas Shopping is a smart and comprehensive marketplace app within Pi Browser that allows users to buy and sell new and used products easily and securely with full Pi Coin payment support. The app features a user-friendly interface with various categories including electronics, home appliances, clothing, furniture, cars, and more. Sellers can add their products with images, video, and audio along with descriptions, prices, and payment/location settings. The app also supports paid advertisements (images, video, audio, text) to increase revenue and reach more users. The owner earns from sales commissions, paid ads, and premium services for sellers such as promotion and homepage features. The app is multilingual, fast, responsive, supports instant notifications and reviews, and gives the owner full control over categories, colors, and settings.

## Features
- Buy & Sell new and used products
- Pi Coin payments
- Video, image, and audio ads
- Seller dashboard
- App Wallet support
- Multi-language support
- Instant notifications & reviews

## Owner Revenue
- Sales commissions
- Paid advertisements
- Featured listings / Promotions

## Repository Structure

## Quick Start

Install dependencies and run locally:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

Deployment

- Recommended: deploy to Vercel for zero-config Next.js hosting: https://vercel.com/new
- Docker option:

```bash
# build image
docker build -t anas-shopping:latest .

# run container
docker run -p 3000:3000 anas-shopping:latest
```

Local deploy scripts are provided in `scripts/` for convenience.

## Pi Authentication / Session

This app includes Pi Network authentication integration. Set the following environment variables in production:

- `SESSION_SECRET` — a strong secret used to HMAC-sign session IDs (required)
- `REDIS_URL` — optional Redis connection string to persist sessions across instances (optional)

You can copy `.env.example` to `.env` and fill values before running.

### Local development and sandboxing

If you're developing on `localhost` the Pi SDK may not behave as it does inside Pi Browser. For local testing you can:

- Use the mock sign-in UI (appears automatically on `localhost`) to create a fake user. The mock sign-in sends an access token of the form `mock:<username>` which the server accepts in non-production or when `ALLOW_MOCK_PI=1` is set.
- Or explicitly enable the mock UI by setting `NEXT_PUBLIC_PI_MOCK=1` in your environment.

Example `.env` additions for local testing:

```
NEXT_PUBLIC_PI_MOCK=1
ALLOW_MOCK_PI=1
SESSION_SECRET=dev_secret_for_local
```

Note: never use `ALLOW_MOCK_PI=1` or a weak `SESSION_SECRET` in production.
