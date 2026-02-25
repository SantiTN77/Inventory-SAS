# Cloudflare Security Configuration for Inventory SAS

This document provides recommended Cloudflare security settings to protect the Inventory SAS application in production.

---

## 1. DNS & Proxy

- **Proxy all A/AAAA/CNAME records** through Cloudflare (orange cloud enabled).
- This hides the origin server IP and enables all Cloudflare security features.

## 2. SSL/TLS

| Setting | Value |
|---------|-------|
| SSL mode | **Full (Strict)** |
| Always Use HTTPS | **On** |
| Minimum TLS Version | **TLS 1.2** |
| Automatic HTTPS Rewrites | **On** |
| HSTS | **Enabled** (max-age 6 months, includeSubDomains) |

> The backend already sends HSTS headers via `helmet()`. Cloudflare's HSTS setting acts as a secondary enforcement layer.

## 3. WAF (Web Application Firewall)

### Managed Rulesets (enable all)

| Ruleset | Purpose |
|---------|---------|
| Cloudflare Managed Ruleset | General web attack protection (SQLi, XSS, RCE) |
| Cloudflare OWASP Core Ruleset | OWASP Top 10 coverage |
| Cloudflare Leaked Credentials Detection | Alert on known-breached credential usage |

### Custom WAF Rules

```
Rule 1: Block non-JSON POST/PUT requests to API
  Expression: (http.request.uri.path contains "/api/" or http.request.uri.path contains "/auth/")
              and http.request.method in {"POST" "PUT" "PATCH"}
              and not http.request.headers["content-type"] contains "application/json"
  Action: Block

Rule 2: Block requests with excessively large bodies
  Expression: http.request.body.size > 1048576
  Action: Block

Rule 3: Block known bad user agents
  Expression: http.user_agent contains "sqlmap"
              or http.user_agent contains "nikto"
              or http.user_agent contains "nmap"
  Action: Block
```

## 4. Rate Limiting

The application already implements rate limiting via `express-rate-limit`:
- **Global**: 200 requests/minute per IP
- **Auth endpoints** (`/auth/*`): 10 requests/15 minutes per IP

For additional protection at the edge (before requests reach the origin):

```
Rule 1: Login brute-force protection
  Expression: http.request.uri.path eq "/auth/login" and http.request.method eq "POST"
  Rate: 5 requests per 10 minutes per IP
  Action: Challenge (CAPTCHA)
  Duration: 10 minutes

Rule 2: API abuse protection
  Expression: http.request.uri.path contains "/api/"
  Rate: 100 requests per minute per IP
  Action: Challenge
  Duration: 5 minutes
```

## 5. Bot Management

| Setting | Value |
|---------|-------|
| Bot Fight Mode | **On** |
| JavaScript Detections | **On** |
| Super Bot Fight Mode (if available) | **Definitely automated → Block** |
| Super Bot Fight Mode | **Likely automated → Challenge** |
| Verified bots | **Allow** |

### Custom rule for API endpoints:

```
Expression: http.request.uri.path contains "/api/"
            and cf.bot_management.score lt 30
Action: Challenge
```

## 6. DDoS Protection

Cloudflare provides automatic L3/L4 DDoS protection. For L7:

| Setting | Value |
|---------|-------|
| HTTP DDoS Attack Protection | **High sensitivity** |
| Override action | **Challenge** for medium-confidence, **Block** for high-confidence |

## 7. Page Rules (or Cache Rules)

```
Rule 1: Cache static frontend assets
  URL: *example.com/assets/*
  Setting: Cache Level = Cache Everything, Edge TTL = 1 month

Rule 2: Bypass cache for API
  URL: *example.com/api/*
  Setting: Cache Level = Bypass

Rule 3: Bypass cache for auth
  URL: *example.com/auth/*
  Setting: Cache Level = Bypass
```

## 8. Security Headers (via Transform Rules)

While `helmet()` already sets security headers from the backend, you can add additional headers at the edge:

```
Add Response Header: Permissions-Policy = camera=(), microphone=(), geolocation=()
Add Response Header: X-Robots-Tag = noindex, nofollow (for staging environments)
```

## 9. Firewall Rules — Geo-blocking (Optional)

If the application only serves specific regions:

```
Expression: not ip.geoip.country in {"AR" "US" "CL" "UY" "BR" "MX" "CO" "PE" "ES"}
Action: Challenge
```

> Adjust country codes based on your actual user base.

## 10. Zero Trust (Optional, for admin access)

For admin panel access (`/api/usuarios`, `/api/roles`), consider:

- **Cloudflare Access**: Require authentication (email, SSO) before reaching admin endpoints
- Create an Access Policy for admin routes that requires a valid Cloudflare Access JWT

---

## Implementation Checklist

- [ ] Enable Cloudflare proxy on DNS records
- [ ] Set SSL to Full (Strict)
- [ ] Enable HSTS
- [ ] Enable Managed WAF rulesets
- [ ] Add custom WAF rules
- [ ] Configure rate limiting rules
- [ ] Enable Bot Fight Mode
- [ ] Set up page/cache rules
- [ ] Test all endpoints after enabling rules
- [ ] Monitor Cloudflare Analytics for false positives (first 48h)
