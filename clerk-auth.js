(() => {
  "use strict";

  const signedOutGroups = () => document.querySelectorAll("[data-clerk-signed-out]");
  const signedInGroup = document.querySelector("[data-clerk-signed-in]");
  const status = document.querySelector("[data-clerk-status]");
  const userButton = document.querySelector("#clerk-user-button");
  let userButtonMounted = false;

  const setStatus = (message = "", isError = false) => {
    if (!status) return;
    status.textContent = message;
    status.hidden = !message;
    status.classList.toggle("is-error", isError);
  };

  const renderAuthState = () => {
    const signedIn = Boolean(window.Clerk?.isSignedIn);

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
  };

  const initialize = async () => {
    if (!window.Clerk || !window.__internal_ClerkUICtor) {
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
            header: { alignItems: "center", textAlign: "center" },
            headerTitle: { width: "100%", textAlign: "center" },
            headerSubtitle: { width: "100%", textAlign: "center" },
            logoBox: { marginInline: "auto" }
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
    } catch (error) {
      console.error("Clerk authentication failed to initialize.", error);
      setStatus("Sign-in unavailable", true);
    }
  };

  window.addEventListener("load", initialize, { once: true });
})();
