"use client";

import { useMemo, useState } from "react";
import Section from "@/components/ui/Section";
import { site } from "@/lib/site";

export default function Contact() {
  const [sent, setSent] = useState(() => {
    if (typeof window === "undefined") return false;
    const search =
      window.location.search || window.location.hash.split("?")[1] || "";
    const params = new URLSearchParams(
      search.startsWith("?") ? search : `?${search}`
    );
    return params.get("sent") === "1";
  });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    sqft: "",
    service: "Standard Clean",
    timing: "Next 2 weeks",
    message: "",
  });

  const mailto = useMemo(() => {
    const subject = "Minute Maids — Quote request";
    const body = `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nAddress/Area: ${form.address}\nSqft: ${form.sqft}\nService: ${form.service}\nTiming: ${form.timing}\n\nMessage:\n${form.message}`;
    return `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [form]);
  function clearSent() {
    if (typeof window === "undefined") return;
    window.history.replaceState(null, "", "/#contact");
    setSent(false);
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Request a confirmed quote"
      className="bg-zinc-50"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: friendly copy + direct contact */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-zinc-700">
            Tell Lacee what you need and she’ll reply with availability and a
            confirmed quote. You can also call or text for the fastest response.
          </p>

          <div className="mt-6 grid gap-3">
            <a
              href={`tel:${site.phoneTel}`}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100"
            >
              Call: {site.phoneDisplay}
            </a>
            <a
              href={`sms:${site.phoneTel}`}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100"
            >
              Text: {site.phoneDisplay}
            </a>
            <a
              href={mailto}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100"
            >
              Email: {site.email}
            </a>
          </div>

          <div className="mt-6 rounded-3xl border border-brand-200 bg-brand-50 p-5">
            <p className="text-sm font-semibold text-zinc-900">
              What helps Lacee quote fast
            </p>
            <ul className="mt-2 space-y-2 text-sm text-zinc-700">
              <li>• Approximate square footage</li>
              <li>• Standard vs Deep (or tell her your goal)</li>
              <li>• Any add-ons (fridge/oven/organization)</li>
              <li>• Pets + current condition (quick honest note)</li>
            </ul>
          </div>
        </div>

        {/* Right: Netlify form */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          {sent ? (
            <div className="rounded-3xl border border-brand-200 bg-brand-50 p-6">
              <p className="text-sm font-semibold text-brand-900">
                Message received ✅
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-zinc-900">
                Thanks! Lacee will reach out soon.
              </h3>
              <p className="mt-2 text-sm text-zinc-700">
                If you need a faster response, text or call:
                <span className="font-semibold"> {site.phoneDisplay}</span>
              </p>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <a
                  href={`sms:${site.phoneTel}`}
                  className="min-h-[44px] rounded-2xl bg-zinc-900 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  Text now
                </a>
                <button
                  type="button"
                  onClick={clearSent}
                  className="min-h-[44px] rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-center text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                >
                  Send another
                </button>
              </div>
            </div>
          ) : (
            <form
              name="quote"
              method="POST"
              action="/thank-you"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              className="grid gap-4"
            >
              {/* Netlify required hidden input */}
              <input type="hidden" name="form-name" value="quote" />

              {/* Honeypot */}
              <p className="hidden">
                <label>
                  Don’t fill this out: <input name="bot-field" />
                </label>
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-semibold text-zinc-900"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    required
                    className="mt-2 min-h-[44px] w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="text-sm font-semibold text-zinc-900"
                  >
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    placeholder="(971) 220-4371"
                    className="mt-2 min-h-[44px] w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-semibold text-zinc-900"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="mt-2 min-h-[44px] w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-sqft"
                    className="text-sm font-semibold text-zinc-900"
                  >
                    Sq ft (optional)
                  </label>
                  <input
                    id="contact-sqft"
                    name="sqft"
                    inputMode="numeric"
                    autoComplete="off"
                    value={form.sqft}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, sqft: e.target.value }))
                    }
                    className="mt-2 min-h-[44px] w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-address"
                  className="text-sm font-semibold text-zinc-900"
                >
                  Address / area (optional)
                </label>
                <input
                  id="contact-address"
                  name="address"
                  autoComplete="street-address"
                  value={form.address}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, address: e.target.value }))
                  }
                  className="mt-2 min-h-[44px] w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none focus:ring-2 focus:ring-brand-300"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-service"
                    className="text-sm font-semibold text-zinc-900"
                  >
                    Service
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={form.service}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, service: e.target.value }))
                    }
                    className="mt-2 min-h-[44px] w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 outline-none focus:ring-2 focus:ring-brand-300"
                  >
                    <option>Standard Clean</option>
                    <option>Deep Clean</option>
                    <option>Move In / Out</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-timing"
                    className="text-sm font-semibold text-zinc-900"
                  >
                    Timing
                  </label>
                  <select
                    id="contact-timing"
                    name="timing"
                    value={form.timing}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, timing: e.target.value }))
                    }
                    className="mt-2 min-h-[44px] w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 outline-none focus:ring-2 focus:ring-brand-300"
                  >
                    <option>Next 2 weeks</option>
                    <option>This month</option>
                    <option>Just researching</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="text-sm font-semibold text-zinc-900"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  rows={4}
                  className="mt-2 min-h-[120px] w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none focus:ring-2 focus:ring-brand-300"
                />
              </div>

              <button
                type="submit"
                className="min-h-[44px] rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Send request
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
