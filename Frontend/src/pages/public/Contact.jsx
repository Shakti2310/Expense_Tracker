import { Mail, MapPin, MessageSquare, Send } from "lucide-react";

function Contact() {
  const contactDetails = [
    {
      icon: Mail,
      label: "Email us",
      value: "hello@xsetrack.com",
      href: "mailto:hello@xsetrack.com",
    },
    {
      icon: MessageSquare,
      label: "Support",
      value: "We usually reply within 1 business day",
    },
    {
      icon: MapPin,
      label: "Based online",
      value: "Helping you manage money, wherever you are",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <section className="mb-10 text-center sm:mb-14">
          <p className="font-semibold uppercase tracking-[0.2em] text-myGreenMD">
            Contact XseTrack
          </p>
          <h1 className="mt-3 font-poppins text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            We&apos;re here to help
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-400 sm:text-lg sm:leading-8">
            Have a question, an idea, or feedback about your finance journey?
            Send us a message and our team will get back to you.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          <aside className="rounded-3xl bg-gradient-to-br from-myGreenMD to-myGreenSM p-6 text-white shadow-xl sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <MessageSquare size={25} />
            </div>
            <h2 className="mt-6 font-poppins text-2xl font-bold sm:text-3xl">
              Let&apos;s talk
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-green-50 sm:text-base">
              Whether you&apos;re getting started or looking for a better way to
              track your expenses, we&apos;d love to hear from you.
            </p>

            <div className="mt-8 space-y-5 border-t border-white/20 pt-6">
              {contactDetails.map(({ icon: Icon, label, value, href }) => {
                const detail = (
                  <>
                    <p className="text-sm font-semibold text-white">{label}</p>
                    <p className="mt-1 text-sm leading-5 text-green-50">
                      {value}
                    </p>
                  </>
                );

                return (
                  <div key={label} className="flex gap-3">
                    <Icon
                      className="mt-0.5 shrink-0 text-green-100"
                      size={19}
                    />
                    <div className="min-w-0">
                      {href ? (
                        <a
                          href={href}
                          className="rounded-sm transition-colors hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white/70"
                        >
                          {detail}
                        </a>
                      ) : (
                        detail
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:p-8">
            <div className="mb-6 sm:mb-8">
              <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-white">
                Send us a message
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Fill in the details below and we&apos;ll be in touch.
              </p>
            </div>

            <form className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
                  >
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Alex Johnson"
                    autoComplete="name"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-myGreenMD focus:ring-2 focus:ring-myGreenMD/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
                  >
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="alex@example.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-myGreenMD focus:ring-2 focus:ring-myGreenMD/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="How can we help?"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-myGreenMD focus:ring-2 focus:ring-myGreenMD/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="Tell us a little more..."
                  required
                  className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-myGreenMD focus:ring-2 focus:ring-myGreenMD/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-myGreenMD to-myGreenSM px-6 py-3.5 font-semibold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-lg active:scale-95"
              >
                Send message
                <Send size={17} />
              </button>
            </form>
          </div>
        </section>

        <footer className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500 sm:mt-12 sm:pt-8 dark:border-gray-800 dark:text-gray-400">
          We&apos;re always happy to hear from you.
        </footer>
      </div>
    </main>
  );
}

export default Contact;
