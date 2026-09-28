# PROJECT.md --- AgentPay

## 1. Project Identity

**Name:** AgentPay  
**Category:** AI Growth & Agentic Commerce  
**Primary Goal:** Help merchants increase revenue through AI-assisted discovery and recommendations while making transactions safe, explainable and bounded.

## 2. Executive Summary

AgentPay is an agentic commerce platform where customers can interact with a merchant using natural language instead of navigating a traditional storefront.

The AI Commerce Agent interprets customer intent, searches a structured merchant catalog, recommends suitable products, proposes relevant add-ons, manages the cart and prepares checkout.

The financial boundary is deliberately outside the LLM. A server-side Commerce Policy Gateway validates the cart, prices, inventory, transaction limits and approval state before any payment operation is sent to Razorpay test mode.

This creates a complete closed-loop product:

```text
Discover → Recommend → Upsell → Cart → Approve → Pay → Verify → Order → Audit
```

## 3. Problem Statement

Merchants face two related problems:

1. Customers have to perform too much work during product discovery.
2. Traditional checkout flows often miss opportunities for relevant upsell/cross-sell.

At the same time, allowing autonomous AI to perform financial actions without controls creates trust and safety risks.

AgentPay addresses both sides by combining:

- conversational discovery,
- merchant catalog intelligence,
- recommendation and revenue optimization,
- policy-controlled transactions,
- explicit customer approval,
- payment verification,
- and auditability.

## 4. Target Users

### Primary: Merchant
Small and medium-sized merchants who want an AI-assisted sales layer over their existing catalog.

### Secondary: Customer
A buyer who wants to describe what they need naturally and receive concise, relevant recommendations.

### Internal/Operations User
A merchant operator who reviews orders, AI decisions, revenue metrics and exceptions.

## 5. User Stories

### Customer
- As a customer, I want to describe what I need in natural language.
- As a customer, I want the agent to recommend products that fit my budget.
- As a customer, I want to know why a product was recommended.
- As a customer, I want relevant add-on suggestions without being spammed.
- As a customer, I want to see the exact final amount before payment.
- As a customer, I want to approve payment explicitly.
- As a customer, I want clear confirmation after payment.

### Merchant
- As a merchant, I want to add and manage products.
- As a merchant, I want AI-assisted sales to increase average order value.
- As a merchant, I want to understand which recommendations generate revenue.
- As a merchant, I want to define transaction limits.
- As a merchant, I want to inspect the audit trail for financial actions.
- As a merchant, I want failed payments to be handled safely.

## 6. Goals

### MVP Goals
1. Complete one end-to-end AI-assisted purchase.
2. Demonstrate measurable revenue impact from recommendations.
3. Demonstrate a server-side financial policy boundary.
4. Demonstrate Razorpay test-mode payment.
5. Demonstrate auditability.
6. Demonstrate one graceful failure path.

### Non-Goals for MVP
- Real-money production payments.
- Full ERP/accounting system.
- Autonomous purchases without customer approval.
- Open-ended autonomous campaign spending.
- Complex multi-merchant settlement.
- Production-grade fraud detection.
- Full protocol implementation for every emerging agentic-commerce standard.

## 7. Product Differentiator

The differentiator is not "chatbot checkout."

The product is:

> **A revenue-oriented commerce agent with a hard financial-control boundary.**

The AI can reason and recommend. The policy gateway controls money.

## 8. Core Product Loop

```text
Customer Intent
      ↓
Intent Extraction
      ↓
Catalog Retrieval
      ↓
Recommendation
      ↓
Revenue Opportunity Detection
      ↓
Upsell/Cross-sell Proposal
      ↓
Customer Decision
      ↓
Server-side Cart Validation
      ↓
Price + Stock + Policy Validation
      ↓
Explicit Approval
      ↓
Razorpay Test Payment
      ↓
Server-side Verification
      ↓
Order Confirmation
      ↓
Audit Trail
      ↓
Merchant Analytics
```

## 9. Example Scenario

Customer:
> "Mujhe gym aur running dono ke liye ₹2500 ke andar shoes chahiye."

Agent identifies:
- activity: gym + running,
- budget: ₹2,500,
- category: sports/running shoes.

It retrieves candidates and recommends the best match.

Then it may say:
> "Campus Runner ₹1,999 budget ke andar hai aur running ke liye suitable hai. Sports socks ₹300 ka relevant add-on hai. Add karna hai?"

If customer says yes:
```text
Shoes = ₹1,999
Socks = ₹300
Total = ₹2,299
Limit = ₹2,500
```

The backend validates the amount and approval state before creating the payment.

## 10. Business Model --- Future

Possible monetization:
- monthly merchant SaaS subscription,
- usage-based agent fee,
- premium analytics,
- campaign automation tier,
- revenue-based pricing for larger merchants.

Monetization is outside the hackathon MVP.

## 11. Success Definition

The product is successful when a reviewer can see:
1. a real customer intent,
2. an AI decision,
3. a measurable revenue intervention,
4. a safe payment boundary,
5. a successful test transaction,
6. an auditable action trail,
7. and a gracefully handled failure.

## 12. Product Principles

### Principle 1 --- Server is authoritative
The server owns prices, totals, inventory, order state and payment state.

### Principle 2 --- AI proposes; policy authorizes
The LLM can request actions but cannot bypass the policy gateway.

### Principle 3 --- Explain money
Every transaction-related action should have a reason and traceable source.

### Principle 4 --- No silent financial actions
Payment requires explicit approval.

### Principle 5 --- Fail closed
When uncertain, invalid, unauthorized or inconsistent, do not execute the financial action.

### Principle 6 --- Measure real impact
Report actual experimental results and disclose limitations.

## 13. Future Product Expansion
- AI-readable merchant catalog API
- AI buyer API
- conversational checkout
- personalized offers
- campaign orchestrator
- customer segmentation
- voice commerce
- multilingual commerce
- protocol adapters
- merchant CRM integration
- inventory-aware promotions
- subscription commerce
- agent-to-agent commerce
