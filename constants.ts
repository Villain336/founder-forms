import { DocumentTemplate, TemplateCategory } from './types';
import React from 'react';

export const TEMPLATES: DocumentTemplate[] = [
  {
    id: 'nda-standard',
    name: 'Mutual NDA',
    category: TemplateCategory.LEGAL,
    description: 'Institutional-grade Mutual Non-Disclosure Agreement (NVCA Style).',
    defaultPrompt: 'Draft a FULL, COMPREHENSIVE Mutual Non-Disclosure Agreement based on the NVCA (National Venture Capital Association) model.\n\nPARTIES:\n- [Company Name] ("Disclosing Party")\n- [Counterparty Name] ("Receiving Party")\n\nREQUIRED CLAUSES:\n- Definition of "Confidential Information" (broad inclusion).\n- Standard Exceptions (publicly known, independent development).\n- Term: 2 years.\n- Non-Solicitation of Employees (12 months).\n- Governing Law: State of Delaware.\n- Remedies: Injunctive Relief + Specific Performance.\n\nOutput the full legal text.',
  },
  {
    id: 'founders-agreement',
    name: 'Co-Founders Agreement',
    category: TemplateCategory.LEGAL,
    description: 'Pre-incorporation collaboration and equity split agreement.',
    defaultPrompt: 'Draft a PRE-INCORPORATION FOUNDERS COLLABORATION AGREEMENT.\n\nPARTIES:\n- Founders: [List Names]\n\nKEY TERMS:\n- Ownership Split: [Percentages] subject to vesting.\n- Roles & Responsibilities: CEO, CTO, etc.\n- IP Assignment: All work belongs to the future Entity.\n- Vesting: Standard 4-year vesting with 1-year cliff.\n- Departure: Buyback rights at cost if a founder leaves early.\n- Decision Making: Unanimous vs Majority vote.\n- Dispute Resolution: Mediation then Arbitration.',
  },
  {
    id: 'offer-letter',
    name: 'Executive Offer Letter',
    category: TemplateCategory.HR,
    description: 'Formal executive offer letter compliant with CA Labor Code.',
    defaultPrompt: 'Draft a FORMAL Executive Offer Letter for [Candidate Name] as [Title] at [Company Name].\n\nSTRUCTURE:\n- Position & Duties (reporting to CEO/Board).\n- Compensation: $[Salary] base salary.\n- Equity: [Number] options, vesting over 4 years (1 yr cliff), subject to the Company\'s Stock Incentive Plan.\n- Benefits: Participation in standard benefit plans.\n- At-Will Employment Clause (Standard CA specific language).\n- PIIA Requirement (Proprietary Information and Inventions Agreement).\n- Dispute Resolution: Arbitration Agreement attached.\n\nTone: Professional, BigLaw standard.',
  },
  {
    id: 'standard-employment-agreement',
    name: 'Employment Agreement',
    category: TemplateCategory.HR,
    description: 'Comprehensive employment contract for full-time staff.',
    defaultPrompt: 'Draft a STANDARD EMPLOYMENT AGREEMENT for a full-time employee.\n\nDETAILS:\n- Employer: [Company Name]\n- Employee: [Employee Name]\n- Role: [Job Title]\n\nKEY SECTIONS:\n- At-Will Employment Status (Primary Clause).\n- Compensation: Base Salary $[Amount] and standard payroll practices.\n- Benefits: Health, Dental, 401k eligibility.\n- Duties and Exclusive Service: Employee must devote full business time to Company.\n- Confidentiality & IP Assignment: Reference to separate PIIA.\n- Termination: Protocol for termination with or without cause.\n- Governing Law: [State].\n\nStyle: Formal and protective of Employer.',
  },
  {
    id: 'advisor-agreement',
    name: 'FAST Advisor Agreement',
    category: TemplateCategory.HR,
    description: 'Founder Institute / FAST standard advisor agreement.',
    defaultPrompt: 'Draft a COMPLETE Advisor Agreement based on the Founder Institute "FAST" Agreement v2.\n\nDETAILS:\n- Company: [Company Name]\n- Advisor: [Advisor Name]\n- Services: Strategic consulting and mentorship.\n- Compensation: [Percent]% Equity (NSO).\n- Vesting: 24 months, monthly vesting.\n- IP Assignment: Comprehensive assignment of all inventions/ideas to Company.\n- Independent Contractor relationship (no employment benefits).\n- Governing Law: Delaware.',
  },
  {
    id: 'safe-note',
    name: 'YC SAFE (Post-Money)',
    category: TemplateCategory.FUNDRAISING,
    description: 'Y Combinator Post-Money Valuation Cap SAFE.',
    defaultPrompt: 'Draft a COMPLETE Simple Agreement for Future Equity (SAFE) strictly adhering to the Y Combinator "Post-Money Valuation Cap" standard form.\n\nTERMS:\n- Investor: [Investor Name]\n- Company: [Company Name]\n- Purchase Amount: $[Amount]\n- Post-Money Valuation Cap: $[Cap Amount]\n- Discount Rate: None.\n\nSECTIONS MUST INCLUDE:\n- Events: Equity Financing, Liquidity Event, Dissolution Event.\n- Definitions: Strictly use YC standard definitions for "Company Capitalization".\n- "MFN" (Most Favored Nation) Clause: No.',
  },
  {
    id: 'convertible-note',
    name: 'Convertible Note',
    category: TemplateCategory.FUNDRAISING,
    description: 'Debt instrument converting to equity.',
    defaultPrompt: 'Draft a CONVERTIBLE PROMISSORY NOTE PURCHASE AGREEMENT.\n\nTERMS:\n- Amount: $[Investment Amount].\n- Interest Rate: [X]% per annum.\n- Maturity Date: [Date] (typically 18-24 months).\n- Conversion: Automatic conversion at Qualified Financing (Series A).\n- Valuation Cap: $[Amount].\n- Discount Rate: [Percent]%.\n- Liquidity Preference: 1x repayment upon sale.\n- Amendment: Majority consent.\n\nOutput the full legal instrument.',
  },
  {
    id: 'board-resolution',
    name: 'Board Consent (DGCL)',
    category: TemplateCategory.LEGAL,
    description: 'Section 141(f) DGCL Unanimous Written Consent.',
    defaultPrompt: 'Draft a UNANIMOUS WRITTEN CONSENT OF THE BOARD OF DIRECTORS of [Company Name], a Delaware corporation, in lieu of a meeting pursuant to Section 141(f) of the Delaware General Corporation Law (DGCL).\n\nRESOLUTIONS TO ADOPT:\n1. APPROVAL OF OPTION GRANT: Granting [Number] options to [Name].\n2. BANKING: Authorizing opening of accounts at [Bank Name].\n3. GENERAL AUTHORIZATION: Empowering officers to execute all related documents.\n\nFormat: Traditional Board Resolutions ("WHEREAS...", "NOW, THEREFORE, BE IT RESOLVED...").',
  },
  {
    id: 'general-affidavit',
    name: 'General Affidavit',
    category: TemplateCategory.LEGAL,
    description: 'Formal sworn statement with notary block.',
    defaultPrompt: 'Draft a formal GENERAL AFFIDAVIT for [Affiant Name] to be filed in [State/County].\n\nCONTENT:\n- The Affiant solemnly swears that: [Insert Facts Here].\n- Language: "Under penalty of perjury".\n- Formatting: Pleading paper style is not required, but formal legal structure is.\n- MUST INCLUDE: A compliant Jurat/Notary Block at the bottom.',
  },
  {
    id: 'terms-of-service',
    name: 'Terms of Service',
    category: TemplateCategory.LEGAL,
    description: 'Standard Terms of Use for SaaS/Websites.',
    defaultPrompt: 'Draft a COMPREHENSIVE TERMS OF SERVICE (Terms of Use) for a SaaS platform.\n\nSECTIONS:\n- Acceptance of Terms: By accessing the site.\n- Account Registration: User responsibility for security.\n- Acceptable Use Policy: No illegal activities, no reverse engineering.\n- Intellectual Property: Platform owns all code/content; User owns User Data.\n- Termination: Right to ban users.\n- Disclaimers: "AS IS" and "AS AVAILABLE" warranties.\n- Limitation of Liability: Capped at amount paid in last 12 months.\n- Governing Law: Delaware/California.\n\nStyle: Protects the Company.',
  },
  {
    id: 'privacy-policy',
    name: 'Website Privacy Policy',
    category: TemplateCategory.LEGAL,
    description: 'GDPR & CCPA compliant policy for digital products.',
    defaultPrompt: 'Draft a MODERN, COMPREHENSIVE PRIVACY POLICY for [Company Name/Website URL].\n\nCOMPLIANCE:\n- GDPR (General Data Protection Regulation) for EU users.\n- CCPA/CPRA (California Consumer Privacy Act).\n\nSECTIONS:\n- Data Collection: What is collected (Cookies, PII, Analytics, Device Info).\n- Usage: How data is used (Service improvement, Marketing).\n- Sharing: Third-party service providers (AWS, Stripe, Google Analytics).\n- User Rights: Right to access, delete, and opt-out.\n- Cookies Policy: Detailed explanation of tracking technologies.\n- Contact Info: DPO (Data Protection Officer) email.\n\nTone: Transparent, clear, and compliant.',
  },
  {
    id: 'saas-terms',
    name: 'SaaS Master Services Agreement',
    category: TemplateCategory.SALES,
    description: 'Enterprise B2B SaaS agreement.',
    defaultPrompt: 'Draft a FULL Enterprise B2B SaaS Master Services Agreement (MSA) between [Provider Name] and [Customer Name].\n\nKEY SECTIONS:\n- License Grant (Non-exclusive, non-transferable).\n- Service Level Agreement (SLA) reference.\n- Data Ownership: Customer owns Customer Data; Provider owns Aggregated/Anonymized Data.\n- Confidentiality: Mutual strict confidence.\n- Indemnification: IP Indemnity by Provider.\n- Limitation of Liability: Capped at 12 months fees (super cap for gross negligence).\n- Style: Vendor-favorable but balanced for enterprise sales.',
  },
  {
    id: 'dpa-agreement',
    name: 'Data Processing Addendum',
    category: TemplateCategory.SALES,
    description: 'GDPR/CCPA compliant DPA for B2B contracts.',
    defaultPrompt: 'Draft a GDPR & CCPA COMPLIANT DATA PROCESSING ADDENDUM (DPA).\n\nCONTEXT:\n- To be attached to a SaaS MSA.\n- Controller: Customer.\n- Processor: Vendor/Company.\n\nCLAUSES:\n- Processing Instructions: Only on written instructions.\n- Confidentiality: Personnel bound by confidentiality.\n- Security Measures: Appropriate technical/organizational measures.\n- Sub-processors: Authorization required.\n- Data Subject Rights: Assistance with requests.\n- Data Breach Notification: Within 48-72 hours.\n- Standard Contractual Clauses (SCCs): Reference EU SCCs for transfer.',
  },
  {
    id: 'referral-agreement',
    name: 'Referral Partner Agreement',
    category: TemplateCategory.SALES,
    description: 'Commission agreement for partners.',
    defaultPrompt: 'Draft a REFERRAL PARTNER AGREEMENT.\n\nTERMS:\n- Relationship: Non-exclusive referral partner.\n- Qualified Lead: Definition of accepted customer.\n- Commission: [Percent]% of first year revenue OR Flat Fee $[Amount].\n- Payment Terms: Net 30 days after Company receives payment.\n- Term: 1 year, auto-renewing.\n- Independent Contractor: No agency relationship.\n- Termination: 30 days notice.',
  },
  {
    id: 'general-consulting-agreement',
    name: 'Consulting Services Agreement',
    category: TemplateCategory.OPERATIONS,
    description: 'Standard B2B or freelance consulting contract.',
    defaultPrompt: 'Draft a MASTER CONSULTING SERVICES AGREEMENT.\n\nPARTIES:\n- Client: [Client Company Name]\n- Consultant: [Consultant Name or Entity]\n\nTERMS:\n- Scope of Services: Detailed in Statement of Work (Exhibit A).\n- Fees: $[Rate] per hour OR Flat Fee of $[Amount].\n- Expenses: Reimbursable upon written approval.\n- Independent Contractor Status: Explicit disclaimer of employment relationship (no withholding, no benefits).\n- Intellectual Property: "Work Made for Hire" - Client owns all deliverables.\n- Confidentiality: Standard non-disclosure obligations.\n- Governing Law: Delaware.',
  },
  {
    id: 'consulting-agreement',
    name: 'IP Transfer Agreement',
    category: TemplateCategory.OPERATIONS,
    description: 'Contractor agreement focused on IP assignment.',
    defaultPrompt: 'Draft a CONSULTING AND IP ASSIGNMENT AGREEMENT for a software developer.\n\nFOCUS:\n- "Work Made for Hire" provisions under US Copyright Law.\n- Irrevocable assignment of all past, present, and future IP related to company business.\n- Moral Rights waiver.\n- Non-Solicitation of staff.\n- No-Moonlighting clause (if applicable).\n- Output the full legal instrument.',
  },
  {
    id: 'founder-agreement',
    name: 'Stock Purchase Agreement',
    category: TemplateCategory.LEGAL,
    description: 'Restricted Stock Purchase Agreement (RSPA).',
    defaultPrompt: 'Draft a RESTRICTED STOCK PURCHASE AGREEMENT (RSPA) for a Founder/Early Employee.\n\nTERMS:\n- Purchaser: [Name]\n- Shares: [Number] Common Stock.\n- Price: Par value ($0.00001/share).\n- Vesting: Standard 4-year monthly vesting with 1-year cliff.\n- Unvested Share Repurchase Option: Company has right to buy back unvested shares upon termination.\n- 83(b) Election Reminder: Include a specific clause or exhibit regarding the Section 83(b) election filing requirement.\n- Style: Fenwick & West / Cooley standard.',
  },
  {
    id: '83b-election',
    name: '83(b) Election Form',
    category: TemplateCategory.LEGAL,
    description: 'IRS tax form for early equity exercise.',
    defaultPrompt: 'Draft a SECTION 83(b) ELECTION FORM for the Internal Revenue Service.\n\nCONTENT:\n- Taxpayer Name & Address.\n- Tax Year.\n- Description of Property: [Number] shares of Common Stock of [Company].\n- Date of Transfer: [Date].\n- Nature of Restriction: Repurchase option upon termination.\n- Fair Market Value: $[Amount] (Par value).\n- Amount Paid: $[Amount].\n- Statement: "The undersigned hereby makes an election pursuant to Section 83(b) of the Internal Revenue Code..."\n\nInclude instructions for filing (Send to IRS within 30 days).',
  }
];

export const ICONS: Record<string, React.ReactNode> = {
  [TemplateCategory.LEGAL]: '⚖️',
  [TemplateCategory.HR]: '👥',
  [TemplateCategory.FUNDRAISING]: '💰',
  [TemplateCategory.OPERATIONS]: '⚙️',
  [TemplateCategory.SALES]: '📈',
};