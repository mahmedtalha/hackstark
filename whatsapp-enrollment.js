(() => {
  "use strict";

  const courseName = "Ethical Hacking Course for Beginners";
  const coursePricePkr = 1999;
  const coursePriceUsd = 7.99;
  const courseId = "ethical-hacking-beginners";
  const whatsappNumber = "923023070227";
  const dialog = document.querySelector("#payment-dialog");
  const status = document.querySelector("[data-enrollment-status]");
  const featuredStatus = document.querySelector("[data-featured-course-status]");
  const whatsappLink = document.querySelector("[data-payment-whatsapp]");
  const instructions = document.querySelector("[data-payment-instructions]");
  const currentPrices = document.querySelectorAll("[data-payment-current-price]");
  const paymentHelp = document.querySelector("[data-payment-help]");
  const couponPanel = document.querySelector("[data-payment-coupon]");
  const couponInput = document.querySelector("[data-coupon-input]");
  const couponApply = document.querySelector("[data-coupon-apply]");
  const couponStatus = document.querySelector("[data-coupon-status]");
  let waitingForSignIn = false;
  let activeCoupon = null;

  const setEnrollmentStatus = (message) => {
    [status, featuredStatus].forEach((element) => {
      if (element) element.textContent = message;
    });
  };

  const accessState = () => {
    const metadata = window.Clerk?.user?.publicMetadata || {};
    const exposed = window.hackstarkCourseAccess;
    const value = exposed?.[courseId]
      ?? metadata.courseAccess?.[courseId]
      ?? metadata.enrollments?.[courseId]?.status
      ?? metadata.courseStatus;
    const normalized = String(value?.status || value || "").trim().toLowerCase().replace(/[ _-]+/g, " ");
    if (["active", "approved", "paid", "course active", "payment approved", "completed"].includes(normalized)) return "active";
    if (["pending", "awaiting payment", "payment submitted", "under verification", "verification pending"].includes(normalized)) return "pending";
    return "available";
  };

  const buttonMarkup = (label, icon) => `${label} <svg aria-hidden="true"><use href="#icon-${icon}"></use></svg>`;

  const renderCourseActions = () => {
    const state = accessState();
    document.querySelectorAll("[data-featured-course-cta], [data-course-enroll]").forEach((button) => {
      button.dataset.courseAccessState = state;
      button.disabled = state === "pending";
      button.setAttribute("aria-disabled", String(state === "pending"));
      if (state === "active") button.innerHTML = buttonMarkup("Continue Learning", "arrow");
      else if (state === "pending") button.innerHTML = buttonMarkup("Payment Verification Pending", "lock");
      else button.innerHTML = buttonMarkup("Enroll Now", button.hasAttribute("data-featured-course-cta") ? "arrow" : "phone");
    });
    if (featuredStatus) {
      featuredStatus.textContent = state === "active"
        ? "Course access active. Continue where you left off."
        : state === "pending"
          ? "Your payment is under manual verification."
          : "";
    }
  };

  const accountDetails = () => {
    const user = window.Clerk?.user;
    const name = user?.fullName || user?.firstName || "Not provided";
    const email = user?.primaryEmailAddress?.emailAddress || "Not provided";
    return { name, email };
  };

  const selectedMethod = () => dialog?.querySelector('input[name="payment-method"]:checked')?.value || "JazzCash";

  const calculatedPrices = () => {
    const discount = activeCoupon?.discount || 0;
    const multiplier = 1 - discount / 100;
    return {
      pkr: Math.round(coursePricePkr * multiplier),
      usd: Number((coursePriceUsd * multiplier).toFixed(2))
    };
  };

  const internationalMethods = {
    "PayPal": { currency: "USD", details: "the PayPal recipient and exact USD amount" },
    "Binance Pay": { currency: "USDT", details: "the Binance Pay ID and exact USDT amount" },
    "USDT": { currency: "USDT", details: "the USDT wallet address, supported network and exact USDT amount" },
    "Bitcoin (BTC)": { currency: "BTC", details: "the Bitcoin wallet address, network and quoted BTC amount" },
    "Other Crypto": { currency: "crypto", details: "the supported coin, wallet address, network and quoted crypto amount" }
  };

  const renderInstructions = (title, rows) => {
    const heading = document.createElement("span");
    heading.textContent = title;
    const list = document.createElement("dl");
    rows.forEach(([label, value]) => {
      const row = document.createElement("div");
      const term = document.createElement("dt");
      const definition = document.createElement("dd");
      term.textContent = label;
      definition.textContent = value;
      row.append(term, definition);
      list.append(row);
    });
    instructions.replaceChildren(heading, list);
  };

  const updateWhatsAppLabel = (label) => {
    const icon = whatsappLink.querySelector("svg");
    whatsappLink.replaceChildren(...(icon ? [icon] : []), document.createTextNode(` ${label}`));
  };

  const updatePayment = () => {
    if (!dialog || !instructions || !whatsappLink) return;
    const method = selectedMethod();
    const prices = calculatedPrices();
    const usdAmount = `USD $${prices.usd.toFixed(2)}`;
    const international = Object.prototype.hasOwnProperty.call(internationalMethods, method)
      ? internationalMethods[method]
      : null;
    const amount = international
      ? international.currency === "USD"
        ? usdAmount
        : `${usdAmount} reference · ${international.currency === "crypto" ? "Crypto" : international.currency} quote required`
      : `PKR ${prices.pkr.toLocaleString("en-PK")}`;
    currentPrices.forEach((price) => { price.textContent = amount; });

    if (international) {
      renderInstructions(`Request ${method} payment details`, [
        [international.currency === "USD" ? "Course Fee" : "Course Fee Reference", usdAmount],
        ["Payment Currency", international.currency === "crypto" ? "Choose a supported coin with us" : international.currency],
        ["Before You Pay", `Request ${international.details} on WhatsApp.`],
        ["After Payment", "Send your payment receipt or transaction ID for manual verification."]
      ]);
    } else {
      renderInstructions(`Pay via ${method}`, [
        ...(method === "JazzCash" ? [["Account Title", "Muhammad Ahmed Talha"]] : []),
        [`${method} Number`, method === "JazzCash" ? "03238621733" : "03023070227"],
        ["Amount to Pay", amount]
      ]);
    }
    if (paymentHelp) {
      paymentHelp.textContent = international
        ? "Request the recipient, exact amount and any required network before paying. Access activates after manual payment approval."
        : "Pay the PKR amount above, then send your receipt on WhatsApp. Access activates after manual payment approval.";
    }
    updateWhatsAppLabel(international ? "Request Payment Details on WhatsApp" : "Send Receipt on WhatsApp");

    const account = accountDetails();
    const message = [
      "Assalam o Alaikum.",
      "",
      international
        ? "I would like the international payment details for my HackStark course enrollment. I have not paid yet."
        : "I have completed payment for my HackStark course enrollment.",
      "",
      `Course: ${courseName}`,
      `Course fee${international && international.currency !== "USD" ? " reference" : ""}: ${international ? usdAmount : amount}`,
      ...(activeCoupon ? [`Coupon: ${activeCoupon.code} (${activeCoupon.discount}% off)`] : []),
      `Payment Method: ${method}`,
      `Account Name: ${account.name}`,
      `Account Email: ${account.email}`,
      "",
      ...(international
        ? [
          `Please confirm ${international.details} before I send payment.`,
          "Please also confirm any payment fees and how to submit my receipt or transaction ID for course access."
        ]
        : [
          "I am attaching my successful payment receipt for manual verification.",
          "Please verify the payment and provide course access."
        ])
    ].join("\n");
    whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const applyCoupon = () => {
    if (!couponInput || !couponStatus || !couponPanel) return;
    const enteredCode = couponInput.value.trim();
    couponPanel.classList.remove("is-applied", "has-error");

    if (!enteredCode) {
      activeCoupon = null;
      couponStatus.textContent = "Enter a coupon code.";
      updatePayment();
      return;
    }

    const coupon = window.hackstarkCoupons?.find(enteredCode);
    if (!coupon) {
      activeCoupon = null;
      couponPanel.classList.add("has-error");
      couponStatus.textContent = "Coupon code is not valid.";
      updatePayment();
      return;
    }

    activeCoupon = coupon;
    couponInput.value = coupon.code;
    couponPanel.classList.add("is-applied");
    couponStatus.textContent = `${coupon.discount}% coupon applied. Prices have been updated.`;
    updatePayment();
  };

  const openPayment = () => {
    if (!dialog) return;
    updatePayment();
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  };

  const beginEnrollment = () => {
    if (!window.Clerk) {
      setEnrollmentStatus("Account service is still loading. Please try again in a moment, or contact us on WhatsApp.");
      return;
    }
    if (!window.Clerk.isSignedIn) {
      waitingForSignIn = true;
      setEnrollmentStatus("Create a HackStark account or sign in to continue.");
      if (typeof window.hackstarkOpenAuth === "function") window.hackstarkOpenAuth("signIn");
      else window.Clerk.openSignIn();
      return;
    }
    waitingForSignIn = false;
    setEnrollmentStatus("");
    openPayment();
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-featured-course-cta], [data-course-enroll], [data-request-course]");
    if (!trigger) return;
    const state = accessState();
    if (state === "active") {
      const curriculum = document.querySelector("#curriculum");
      if (curriculum) curriculum.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.location.href = "ethical-hacking-course.html#curriculum";
      return;
    }
    if (state === "pending") {
      setEnrollmentStatus("Payment verification is pending. Course access will activate after approval.");
      return;
    }
    beginEnrollment();
  });

  dialog?.addEventListener("change", (event) => {
    if (event.target.matches('input[name="payment-method"]')) updatePayment();
  });

  couponApply?.addEventListener("click", applyCoupon);
  couponInput?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    applyCoupon();
  });

  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  window.addEventListener("hackstark:auth-change", (event) => {
    renderCourseActions();
    if (waitingForSignIn && event.detail?.signedIn) openPayment();
  });

  window.addEventListener("hackstark:course-access-change", renderCourseActions);
  renderCourseActions();
})();
