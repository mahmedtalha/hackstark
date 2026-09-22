(() => {
  "use strict";

  const courseName = "Ethical Hacking Course for Beginners";
  const coursePricePkr = 1999;
  const coursePriceUsd = 7.99;
  const coursePriceInr = 799;
  const courseId = "ethical-hacking-beginners";
  const whatsappNumber = "923023070227";
  const dialog = document.querySelector("#payment-dialog");
  const status = document.querySelector("[data-enrollment-status]");
  const featuredStatus = document.querySelector("[data-featured-course-status]");
  const whatsappLink = document.querySelector("[data-payment-whatsapp]");
  const instructions = document.querySelector("[data-payment-instructions]");
  const currentPrice = document.querySelector("[data-payment-current-price]");
  const couponPanel = document.querySelector("[data-payment-coupon]");
  const couponInput = document.querySelector("[data-coupon-input]");
  const couponApply = document.querySelector("[data-coupon-apply]");
  const couponStatus = document.querySelector("[data-coupon-status]");
  let waitingForSignIn = false;
  let activeCoupon = null;

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
      inr: Math.round(coursePriceInr * multiplier),
      usd: Number((coursePriceUsd * multiplier).toFixed(2))
    };
  };

  const formatAmount = ({ pkr, inr, usd }) =>
    `PKR ${pkr.toLocaleString("en-PK")} · ₹${inr.toLocaleString("en-IN")} INR · USD $${usd.toFixed(2)}`;

  const updatePayment = () => {
    if (!dialog || !instructions || !whatsappLink) return;
    const method = selectedMethod();
    const amount = formatAmount(calculatedPrices());
    if (currentPrice) currentPrice.textContent = amount;
    const details = method === "JazzCash"
      ? `<span>Pay via JazzCash</span><dl><div><dt>Account Title</dt><dd>Muhammad Ahmed Talha</dd></div><div><dt>JazzCash Number</dt><dd>03238621733</dd></div><div><dt>Amount to Pay</dt><dd>${amount}</dd></div></dl>`
      : `<span>Pay via Easypaisa</span><dl><div><dt>Easypaisa Number</dt><dd>03023070227</dd></div><div><dt>Amount to Pay</dt><dd>${amount}</dd></div></dl>`;
    instructions.innerHTML = details;

    const account = accountDetails();
    const message = [
      "Assalam o Alaikum.",
      "",
      "I have completed payment for my HackStark course enrollment.",
      "",
      `Course: ${courseName}`,
      `Course fee: ${amount}`,
      ...(activeCoupon ? [`Coupon: ${activeCoupon.code} (${activeCoupon.discount}% off)`] : []),
      `Payment Method: ${method}`,
      `Account Name: ${account.name}`,
      `Account Email: ${account.email}`,
      "",
      "I am attaching my successful payment screenshot for manual verification.",
      "Please verify the payment and provide course access."
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
      if (status) status.textContent = "Account service is still loading. Please try again in a moment.";
      return;
    }
    if (!window.Clerk.isSignedIn) {
      waitingForSignIn = true;
      if (status) status.textContent = "Sign in with your existing HackStark account to continue.";
      if (typeof window.hackstarkOpenAuth === "function") window.hackstarkOpenAuth("signIn");
      else window.Clerk.openSignIn();
      return;
    }
    waitingForSignIn = false;
    if (status) status.textContent = "";
    openPayment();
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-featured-course-cta], [data-course-enroll], [data-request-course]");
    if (!trigger) return;
    const state = accessState();
    if (state === "active") {
      document.querySelector("#curriculum")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (state === "pending") {
      if (status) status.textContent = "Payment verification is pending. Course access will activate after approval.";
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
