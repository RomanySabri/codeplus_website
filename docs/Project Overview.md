📄 Project Overview: Code Plus Digital HQ (codeplusdev.com)
1. Executive Summary
بناء المقر الرقمي (Digital HQ) لشركة Code Plus. الموقع سيعمل كواجهة احترافية تعكس قدرات الشركة في تقديم حلول برمجية متكاملة، ويستعرض الـ Portfolio الخاص بها (مثل أنظمة הـ ERP، منصات الرعاية الصحية، والبنية التحتية للمؤسسات التعليمية) من خلال دراسات حالة (Case Studies) مفصلة. الهدف هو بناء ثقة فورية مع عملاء الـ B2B وتوضيح الثقل التقني للفريق.

2. Brand Identity & Design System (الهوية البصرية)
التصميم سيستلهم روح منصات مثل resend.com و shadcn/ui، مع توظيف ألوان اللوجو بشكل يبرز الاحترافية:

Colors (Color Palette):

Primary Brand: درجة الـ Deep Blue المستوحاة من اللوجو (ستُستخدم في الـ Call-to-Actions، والـ Hover effects الدقيقة، ولمسات الإضاءة في الـ Dark Mode).

Backgrounds & Neutrals: الاعتماد على درجات الـ Zinc أو الـ Slate من Tailwind. الـ Dark Mode سيكون هو البطل (خلفيات شديدة السواد مثل #09090b مع نصوص بيضاء/رمادية لتباين عالي High Contrast).

Typography: استخدام خطوط هندسية نظيفة مثل Geist أو Inter لتعكس الطابع البرمجي الصارم والحديث.

Components: استخدام أنماط الـ Bento Grids لعرض الخدمات، مع Micro-interactions ناعمة (Borders خفيفة تضيء عند مرور الماوس).

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