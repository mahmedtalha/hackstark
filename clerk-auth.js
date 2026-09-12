(() => {
  "use strict";

  const signedOutGroups = () => document.querySelectorAll("[data-clerk-signed-out]");
  const signedInGroup = document.querySelector("[data-clerk-signed-in]");
  const loadingIndicator = document.querySelector("[data-clerk-loading]");
  const status = document.querySelector("[data-clerk-status]");
  const userButton = document.querySelector("#clerk-user-button");
  let userButtonMounted = false;
  let pendingAuthAction = false;

  const setStatus = (message = "", isError = false) => {
    if (!status) return;
    status.textContent = message;
    status.hidden = !message;
    status.classList.toggle("is-error", isError);
  };

  const renderAuthState = () => {
    const signedIn = Boolean(window.Clerk?.isSignedIn);

    if (loadingIndicator) loadingIndicator.hidden = true;
    signedOutGroups().forEach((group) => { group.hidden = signedIn; });
    if (signedInGroup) signedInGroup.hidden = !signedIn;

    if (signedIn && userButton && !userButtonMounted) {
      window.Clerk.mountUserButton(userButton, {
        appearance: {
          variables: { colorPrimary: "#00d68f" }
        }
      });
      userButtonMounted = true;
    } else if (!signedIn && userButton && userButtonMounted) {
      window.Clerk.unmountUserButton(userButton);
      userButtonMounted = false;
    }

    window.dispatchEvent(new CustomEvent("hackstark:auth-change", { detail: { signedIn } }));
  };

  const initialize = async () => {
    if (!window.Clerk || !window.__internal_ClerkUICtor) {
      if (loadingIndicator) {
        loadingIndicator.setAttribute("aria-busy", "false");
        loadingIndicator.setAttribute("aria-label", "Account unavailable");
        loadingIndicator.title = "Account unavailable";
      }
      setStatus("Sign-in unavailable", true);
      return;
    }

    try {
      await window.Clerk.load({
        ui: { ClerkUI: window.__internal_ClerkUICtor },
        appearance: {
          options: {
            logoImageUrl: new URL("hackstark-logo.svg", window.location.href).href,
            logoLinkUrl: window.location.origin,
            logoPlacement: "inside",
            privacyPageUrl: new URL("privacy.html", document.baseURI).href,
            termsPageUrl: new URL("terms.html", document.baseURI).href,
            unsafe_disableDevelopmentModeWarnings: true
          },
          variables: {
            colorPrimary: "#00d68f",
            colorBackground: "#0b1118",
            colorText: "#f5f7fb",
            colorTextSecondary: "#9aa8ba",
            borderRadius: "0.8rem"
          },
          elements: {
            rootBox: { width: "min(92vw, 23.5rem)" },
            cardBox: { width: "100%", maxWidth: "23.5rem" },
            card: { gap: ".7rem", padding: "1.15rem 1.2rem" },
            header: { gap: ".25rem", alignItems: "center", textAlign: "center" },
            headerTitle: {
              width: "100%",
              margin: "0",
              whiteSpace: "nowrap",
              fontSize: "clamp(1.05rem, 5vw, 1.35rem)",
              lineHeight: "1.15",
              textAlign: "center"
            },
            headerSubtitle: { display: "none" },
            logoBox: { height: "2.15rem", margin: "0 auto .1rem" },
            logoImage: { maxWidth: "8.5rem", maxHeight: "2.15rem" },
            main: { gap: ".7rem" },
            socialButtons: { gap: ".45rem" },
            socialButtonsBlockButton: { minHeight: "2.45rem" },
            dividerRow: { margin: ".05rem 0" },
            form: { gap: ".65rem" },
            formFieldRow: { gap: ".25rem" },
            formFieldLabel: { fontSize: ".72rem" },
            formFieldInput: { minHeight: "2.5rem" },
            formButtonPrimary: { minHeight: "2.5rem" },
            footer: { paddingTop: ".5rem" },
            footerAction: { marginTop: "0" }
          }
        }
      });

      document.querySelectorAll("[data-clerk-sign-in]").forEach((button) => {
        button.addEventListener("click", () => window.Clerk.openSignIn());
      });
      document.querySelectorAll("[data-clerk-sign-up]").forEach((button) => {
        button.addEventListener("click", () => window.Clerk.openSignUp());
      });

      setStatus();
      renderAuthState();
      window.Clerk.addListener(renderAuthState);

      if (pendingAuthAction && !window.Clerk.isSignedIn) {
        pendingAuthAction = false;
        window.Clerk.openSignIn();
      }
    } catch (error) {
      console.error("Clerk authentication failed to initialize.", error);
      if (loadingIndicator) {
        loadingIndicator.hidden = false;
        loadingIndicator.setAttribute("aria-busy", "false");
        loadingIndicator.setAttribute("aria-label", "Account unavailable");
        loadingIndicator.title = "Account unavailable";
      }
      setStatus("Sign-in unavailable", true);
    }
  };

  loadingIndicator?.addEventListener("click", () => {
    pendingAuthAction = true;
    loadingIndicator.classList.add("is-pending");
    loadingIndicator.setAttribute("aria-label", "Opening account");
  });

  initialize();
})();
