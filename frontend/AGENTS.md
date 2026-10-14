# Project guidance

- Prefer regular named functions over arrow functions throughout the project.
- Use arrow functions only when a framework or API requires an inline callback
  and a named function cannot be passed cleanly.

AGENTS.md — ChatHub Frontend
Project context
ChatHub is a real-time chat application with a React frontend and a Spring Boot backend. The backend uses PostgreSQL,
JWT authentication, REST APIs, and WebSocket messaging.
The current backend foundation includes user registration, login, profile retrieval, and direct-conversation
creation/retrieval. Build the frontend around these existing capabilities; do not invent backend endpoints or claim
unfinished features work.
Goals

- Build a professional, calm, developer-friendly chat interface.
- Prefer clarity, consistency, accessibility, and maintainability over decorative effects.
- Use responsive, mobile-first layouts.
- Keep components small and focused.
- Use TypeScript if the existing project is configured for it. Do not migrate JavaScript to TypeScript as part of an
  unrelated task.
- Follow the existing package manager, scripts, folder structure, and styling conventions. Inspect them before changing
  dependencies or configuration.
  Visual direction
  Use a restrained, modern dark interface: cool charcoal surfaces, light slate text, and a clear blue accent. Avoid
  neon colors, excessive gradients, heavy shadows, glassmorphism, unnecessary animation, and oversized rounded cards.
  Color tokens
  Use CSS variables as the single source of truth. Keep colors semantic; do not scatter raw hex values across
  components. Use Tailwind CSS v4's parenthesized CSS variable shorthand for utilities, such as
  `text-(--color-text-secondary)`, `bg-(--color-surface)`, `border-(--color-border)`, and
  `rounded-(--radius-control)`. Avoid bracketed `var()` syntax for theme-token utilities.
  :root {
  color-scheme: dark;

  /* Brand */
  --color-brand: #3B82F6;
  --color-brand-hover: #60A5FA;
  --color-brand-soft: #1E3A5F;
  --color-focus: #60A5FA;

  /* Surfaces */
  --color-app-bg: #0F172A;
  --color-surface: #1E293B;
  --color-surface-subtle: #172235;
  --color-surface-hover: #334155;
  --color-border: #334155;
  --color-border-strong: #475569;

  /* Text */
  --color-text: #F1F5F9;
  --color-text-secondary: #CBD5E1;
  --color-text-muted: #94A3B8;
  --color-text-on-brand: #FFFFFF;

  /* Status */
  --color-success: #15803D;
  --color-success-soft: #14532D;
  --color-warning: #B45309;
  --color-warning-soft: #713F12;
  --color-danger: #B91C1C;
  --color-danger-soft: #7F1D1D;
  --color-info: #0369A1;
  --color-info-soft: #164E63;

  /* Chat */
  --color-message-own: #1E3A5F;
  --color-message-other: #1E293B;
  --color-online: #22C55E;
  --color-offline: #64748B;

  /* Shape and elevation */
  --radius-control: 0.625rem;
  --radius-panel: 0.875rem;
  --shadow-panel: 0 1px 3px rgb(0 0 0 / 0.24);
  }
  Usage rules
- Primary buttons: --color-brand; hover: --color-brand-hover.
- App background: --color-app-bg.
- Main panels and dialogs: --color-surface.
- Secondary panels and selected navigation areas: --color-surface-subtle.
- Body text: --color-text; secondary copy: --color-text-secondary.
- Borders and dividers: --color-border.
- Online status: --color-online; offline status: --color-offline.
- Own message bubbles: --color-message-own; received bubbles: --color-message-other.
- Use status colors only when they communicate status. Do not rely on color alone to communicate meaning.
- Keep visible keyboard focus indicators. Verify contrast for text, controls, and status indicators.
  Layout guidance
  Desktop
  Use a full-height application shell:
- A compact top bar for ChatHub branding and account actions.
- A left conversation sidebar with search and recent conversations.
- A main conversation panel with conversation header, message history, and composer.
- An intentional empty state when no conversation is selected.
  Avoid adding a third panel unless a real product requirement needs it.
  Mobile
- Use a single primary view at a time: conversation list or active conversation.
- Provide an obvious back action from a conversation to the list.
- Prevent horizontal overflow.
- Keep the message composer and important actions usable with touch.
- Respect safe areas where relevant.
  Component and code conventions
- Reuse existing components and design tokens before introducing new ones.
- Prefer semantic HTML and accessible labels.
- Use buttons for actions and links for navigation.
- Provide loading, empty, success, and error states for asynchronous screens.
- Avoid giant components; separate UI, API access, and business logic.
- Keep API calls out of presentational components where practical.
- Use the existing routing and state-management choices. Do not add a library without a clear need.
- Avoid unnecessary global state. Keep local UI state local.
- Do not store secrets in frontend code or commit .env files containing credentials.
- Do not trust client-supplied user IDs to establish identity. The backend's authenticated principal is authoritative.
- Never expose JWTs, passwords, or sensitive message data in logs.
  Auth validation contract
- Registration name is required, 3–80 characters, and may contain only ASCII letters and spaces.
- Email is required and must be a valid email address; the backend normalizes it before validation.
- Registration password is required, 8–128 characters, contains no whitespace, and must include lowercase, uppercase,
  numeric, and special characters.
- Login requires a valid email and a nonblank password; do not apply registration password complexity to login.
- Keep client validation aligned with these rules, while treating backend responses as authoritative.
- Auth API errors use `{ success: false, message, code }`. Preserve backend codes such as `CONFLICT` and
  `INVALID_EMAIL_OR_PASSWORD` and display the returned message; do not replace them with generic client errors.
  Backend integration rules
- Inspect existing API contracts before implementing a frontend request.
- Keep the API base URL configurable through the project's existing environment-variable convention.
- Configure the public Axios instance with `VITE_API_BASE_URL`; local `.env` files stay untracked and `.env.example`
  documents the expected value.
- Normalize API results with `ApiResponse`: `status` is boolean, successful data is `payload`, and errors carry the
  backend's stable `code` and user-facing `message`.
- Handle 401, 403, validation errors, server errors, and network failures distinctly.
- Do not hardcode a user identity or fabricate successful API responses.
- Treat the backend as the source of truth for conversation membership and permissions.
- For real-time messaging, follow the backend's actual WebSocket/STOMP configuration and destinations. Do not guess
  endpoint paths or destinations.
- A WebSocket send is not proof that a message was persisted, delivered, or read. Reflect only states supported by
  backend acknowledgements.
- Ensure the UI can recover from disconnects and show a clear connection state when real-time functionality is
  implemented.
  Quality requirements
  Before finishing a task:

1. Inspect relevant files and existing conventions.
2. Make the smallest coherent change that satisfies the task.
3. Run the available lint, type-check, test, and build commands where applicable.
4. Fix errors introduced by the change.
5. Report what changed, which checks ran, and anything that remains incomplete.
6. Do not claim a command passed if it was not run.
   Codex working instructions

- Start by summarizing the relevant existing implementation and the intended change.
- Do not rewrite the project or replace established libraries without a specific reason.
- Ask before destructive changes, broad dependency migrations, or changes that alter established API contracts.
- If requirements are ambiguous, inspect the codebase first and ask a concise question only when the ambiguity blocks
  safe progress.
- Keep changes scoped; do not mix unrelated refactors into feature work.
