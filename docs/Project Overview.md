📄 Project Overview: Code Plus Digital HQ (codeplusdev.com)
1. Executive Summary
بناء المقر الرقمي (Digital HQ) لشركة Code Plus. الموقع سيعمل كواجهة احترافية تعكس قدرات الشركة في تقديم حلول برمجية متكاملة، ويستعرض الـ Portfolio الخاص بها (مثل أنظمة הـ ERP، منصات الرعاية الصحية، والبنية التحتية للمؤسسات التعليمية) من خلال دراسات حالة (Case Studies) مفصلة. الهدف هو بناء ثقة فورية مع عملاء الـ B2B وتوضيح الثقل التقني للفريق.

2. Brand Identity & Design System (الهوية البصرية الرسمية لـ Code Plus)
التصميم مبني بالكامل على السيستم ديزاين الرسمي للشركة (Official Brand Design System) مع تطبيق نسب توزيع الألوان وتجربة مستخدم عالمية فائقة الفخامة:

Colors & Palette:
- Primary Navy: `#0A1F3D` (RGB: 10, 31, 61) / `#0D1F38` — كحلي داكن عميق وراقي يمثل اللون الأساسي للعلامة والدارك مود.
- Primary Blue / Electric Blue: `#007BFF` (RGB: 0, 123, 255) / `#006BFD` — الأزرق الكهربائي الحيوي للأزرار والـ CTAs والإضاءات التفاعلية.
- Soft Blue: `#E6F0FF` (RGB: 230, 240, 255) — خلفيات الأيقونات واللمسات الهادئة في اللايت مود.
- Light Gray: `#F5F7FB` (RGB: 245, 247, 251) — خلفية اللايت مود وبطاقات الأزرار الثانوية.
- Gray: `#94A3B8` (RGB: 148, 163, 184) — نصوص الشرح والأوصاف والحدود الهادئة.
- Dark Gray: `#334155` (RGB: 51, 65, 85) — النصوص الداكنة والعناصر الثانوية.
- Pure White: `#FFFFFF` — النصوص البارزة في الدارك مود والخلفيات النظيفة.

Brand Color Usage Ratio:
- 60% Primary (Deep Navy `#0A1F3D`)
- 25% Secondary (Electric Blue `#007BFF`)
- 10% Background (`#F5F7FB` في اللايت مود / `#06101E` كحلي ملكي في الدارك مود)
- 5% Text & Accents

UI Elements:
- Buttons: أزرار أساسية صلبة بلون الـ Primary Blue `#007BFF` مع نص أبيض وحواف عصرية `rounded-lg` وظل إشعاعي ناعم `shadow-[0_4px_20px_var(--shadow-brand)]`.
- Secondary Buttons: لون بطاقة مائل للهوية (`#F5F7FB` أو كحلي بطاقات) مع نص أنيق.
- Logo: في الخلفيات الفاتحة حرف C كحلي وحرف P أزرق؛ وفي الخلفيات الداكنة حرف C أبيض وحرف P أزرق.

3. Tech Stack & Architecture (البنية التقنية)
بيئة عمل موحدة تعتمد على الـ Clean Architecture لضمان الأداء وسرعة التطوير:

Framework: Next.js 16 (App Router).

Runtime: Bun لسرعة فائقة في بيئة التطوير والـ Build.

Data Handling: الاعتماد بالكامل على React Server Actions لمعالجة البيانات والتواصل مع قاعدة البيانات دون الحاجة لـ Backend منفصل (No complex API layer).

Rendering: التركيز على الـ ISR (Incremental Static Regeneration) لضمان سرعة تحميل لحظية لصفحات المشاريع (SEO-friendly) مع بقاء المحتوى محدثاً.

Styling: Tailwind CSS + shadcn/ui لبناء واجهات متناسقة وقابلة لإعادة الاستخدام.

4. Core Structure & Information Architecture
الرئيسية (Home): رسالة واضحة (Hero Section) توضح القيمة المضافة لـ Code Plus، متبوعة بشريط لعملاء الشركة، ثم Bento Grid يبرز أهم الخدمات، ونظرة سريعة على أحدث المشاريع.

الأعمال (Portfolio/Case Studies): صفحات تعتمد على الـ ISR، كل صفحة تشرح مشروعاً بالتفصيل (المشكلة، التقنيات المستخدمة، والنتيجة النهائية).

الفريق (Team & Expertise): تسليط الضوء على الكفاءات الهندسية وأدوارهم، مما يضيف طابعاً إنسانياً ويعزز الثقة.

5. SEO & GEO Strategy
GEO (Generative Engine Optimization): هيكلة المحتوى ليكون واضحاً ومباشراً لنماذج الـ AI (مثل Perplexity و ChatGPT) لتسهيل ترشيح Code Plus عند البحث عن "شركة تطوير برمجيات متقدمة".

Technical SEO: استغلال الـ SSR والـ ISR من Next.js، مع تطبيق Semantic HTML و Schema.org بشكل صارم.