# FLCRC Registration & Ticket Flow Specification

This document itemizes the backend and content requirements for future registration systems (like the Summer Enrichment Camp and the Annual Banquet).

## 1. Summer Enrichment Camp Registration

### Required Content & Form Fields
*   **Student Information:** First Name, Last Name, Date of Birth, Grade Level, School Name.
*   **Parent/Guardian Information:** First Name, Last Name, Phone Number, Email Address, Relationship to Student.
*   **Emergency Contact:** Name, Phone Number, Alternative Phone.
*   **Medical Information:** Dietary restrictions, allergies, required medications, special accommodations.
*   **Permissions & Waivers:** 
    *   Media/Photo Release (Yes/No)
    *   Medical Treatment Authorization (Signature)
    *   Field Trip Permission Waiver
*   **Payment Details:** Camp Fee ($TBD), Payment Method (Credit Card/Stripe).

### Automation & Notifications
*   **Admin Email:** Notification to `info@familylifecrc.org` containing the student's full profile and payment status.
*   **Parent Email:** Confirmation email thanking them for registering, including a receipt for the camp fee, camp dates/times, a packing list, and the drop-off/pick-up location.

---

## 2. 2026 Annual Banquet Ticket Flow

### Ticket Tiers (As currently built in the UI)
*   **Individual Ticket ($100):** General admission seating for one.
*   **Reserved Table ($800):** Dedicated table for 8 guests.
*   **VIP/Sponsor Table ($1,500):** Premium table location, half-page ad in the program booklet, special recognition.

### Required Content & Form Fields
*   **Primary Contact:** Full Name or Company Name, Email Address, Phone Number.
*   **Ticket Details:** Selected Tier, Quantity (if Individual).
*   **Guest Information:** 
    *   For Individual: Name(s) of attendees.
    *   For Tables: Ability to input names of all 8 guests (can be optional at checkout and submitted later via a link).
*   **Special Accommodations:** Dietary restrictions (Vegan, Gluten-Free, etc.) for any guests at the table.
*   **Sponsorship Assets (VIP only):** Logo upload field or instruction to email the logo for the program booklet.

### Automation & Notifications
*   **Payment Gateway:** Stripe integration capturing the exact amount based on tier * quantity.
*   **Admin Email:** Notification of a new ticket sale/sponsorship, including the tier purchased and any dietary restrictions.
*   **Attendee Email:** 
    *   Subject: *Your Tickets for the 2026 FLCRC Annual Banquet*
    *   Body: Thank you message, tax-deductible receipt, event date/time/location (Safari Texas Ranch), dress code reminder (Formal/Black Tie), and a QR code or registration ID for check-in.
    *   *If Table Sponsor:* Instructions on how to submit the names of their 8 guests and their ad artwork before the deadline.

---

## 3. General Event Infrastructure Needs (Next.js / Supabase)
*   **Database Schema:** A new `registrations` table in Supabase linked to the `events` table via `event_id`.
*   **Stripe Webhooks:** To ensure the database status changes from "Pending" to "Paid" only after successful checkout.
*   **Email Provider:** Setup Resend or SendGrid to handle transactional emails automatically via a Next.js API route (`/api/webhooks/stripe`).
*   **Check-in System:** A simple admin view where staff can see a list of paid attendees and check them off at the door using a tablet.
