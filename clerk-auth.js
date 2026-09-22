(() => {
  "use strict";

  const signedInGroup = document.querySelector("[data-clerk-signed-in]");
  const loadingIndicator = document.querySelector("[data-clerk-loading]");
  const status = document.querySelector("[data-clerk-status]");
  const userButton = document.querySelector("#clerk-user-button");
  const authDialog = document.querySelector("#auth-dialog");
  const authMount = document.querySelector("#clerk-auth-mount");
  let userButtonMounted = false;
  let clerkReady = false;
  let pendingAuthRequest = null;
  let pendingAuthTimer = 0;
  let authOpenToken = 0;
  let mountedAuthView = "";

  const accountAnimationDuration = 280;

  const setStatus = (message = "", isError = false) => {
    if (!status) return;
    status.textContent = message;
    status.hidden = !message;
    status.classList.toggle("is-error", isError);
  };

  const renderAuthState = () => {
    const signedIn = Boolean(window.Clerk?.isSignedIn);

    if (loadingIndicator) loadingIndicator.hidden = signedIn;
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

    if (signedIn && authDialog?.open) authDialog.close();

    window.dispatchEvent(new CustomEvent("hackstark:auth-change", { detail: { signedIn } }));
  };

  const unmountAuthView = async () => {
    if (!authMount || !mountedAuthView || !window.Clerk) return;
    const unmountResult = mountedAuthView === "signUp"
      ? window.Clerk.unmountSignUp(authMount)
      : window.Clerk.unmountSignIn(authMount);
    mountedAuthView = "";
    if (unmountResult && typeof unmountResult.then === "function") await unmountResult;
    await new Promise((resolve) => requestAnimationFrame(resolve));
  };

  const setAccountLoading = (isLoading) => {
    if (!loadingIndicator) return;
    loadingIndicator.classList.toggle("is-pending", isLoading);
    loadingIndicator.setAttribute("aria-busy", String(isLoading));
    loadingIndicator.setAttribute("aria-label", isLoading ? "Opening account" : "Open account");
  };

  const updateAuthSwitcher = (view) => {
    document.querySelectorAll("[data-auth-view]").forEach((button) => {
      const isActive = button.dataset.authView === view;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  const waitForAuthMarkup = (token) => new Promise((resolve) => {
    if (!authMount || authMount.childElementCount) {
      resolve(Boolean(authMount?.childElementCount));
      return;
    }

    const observer = new MutationObserver(() => {
      if (token !== authOpenToken || !authMount.childElementCount) return;
      observer.disconnect();
      clearTimeout(timeout);
      resolve(true);
    });
    observer.observe(authMount, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => {
      observer.disconnect();
      resolve(Boolean(authMount.childElementCount));
    }, 4000);
  });

  const openAuthDialog = async (view = "signIn") => {
    if (!authDialog || !authMount || !window.Clerk || !clerkReady) return false;
    const token = ++authOpenToken;
    authDialog.classList.add("is-switching");
    await unmountAuthView();
    updateAuthSwitcher(view);
    mountedAuthView = view;
    const options = { routing: "virtual" };
    if (view === "signUp") window.Clerk.mountSignUp(authMount, options);
    else window.Clerk.mountSignIn(authMount, options);
    const hasMarkup = await waitForAuthMarkup(token);
    if (token !== authOpenToken || !hasMarkup || window.Clerk.isSignedIn) return false;
    authDialog.classList.remove("is-switching");
    if (!authDialog.open) authDialog.showModal();
    return true;
  };

  const tryOpenPendingAuth = async () => {
    if (!pendingAuthRequest?.animationComplete || !clerkReady) return;
    const request = pendingAuthRequest;
    pendingAuthRequest = null;
    const opened = await openAuthDialog(request.view);
    if (request.animate) setAccountLoading(false);
    if (!opened && !window.Clerk?.isSignedIn) setStatus("Account form unavailable. Please try again.", true);
  };

  const requestAuthDialog = (view = "signIn", { animate = false } = {}) => {
    window.clearTimeout(pendingAuthTimer);
    pendingAuthRequest = { view, animate, animationComplete: !animate };
    if (animate) {
      setStatus();
      setAccountLoading(true);
      pendingAuthTimer = window.setTimeout(() => {
        if (!pendingAuthRequest) return;
        pendingAuthRequest.animationComplete = true;
        tryOpenPendingAuth();
      }, accountAnimationDuration);
    } else {
      tryOpenPendingAuth();
    }
  };

  window.hackstarkOpenAuth = (view = "signIn") => requestAuthDialog(view);
  document.querySelector("[data-auth-dialog-close]")?.addEventListener("click", () => authDialog?.close());
  authDialog?.addEventListener("click", (event) => {
    if (event.target === authDialog) authDialog.close();
  });
  authDialog?.addEventListener("close", () => {
    authOpenToken += 1;
    authDialog.classList.remove("is-switching");
    void unmountAuthView();
  });
  document.querySelectorAll("[data-auth-view]").forEach((button) => {
    button.addEventListener("click", () => requestAuthDialog(button.dataset.authView || "signIn"));
  });

  const initialize = async () => {
    if (!window.Clerk || !window.__internal_ClerkUICtor) {
      if (loadingIndicator) {
        loadingIndicator.setAttribute("aria-busy", "false");
        loadingIndicator.setAttribute("aria-label", "Account unavailable");
        loadingIndicator.title = "Account unavailable";
      }
      setStatus("Sign in unavailable", true);
      return;
    }

    try {
      await window.Clerk.load({
        ui: { ClerkUI: window.__internal_ClerkUICtor },
        appearance: {
          options: {
            logoImageUrl: new URL("hackstark-brand.webp", window.location.href).href,
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
            card: { gap: ".7rem", padding: "1.15rem 1.2rem", marginInline: "auto" },
            header: { display: "flex", width: "100%", flexDirection: "column", gap: ".25rem", alignItems: "center", justifyContent: "center", textAlign: "center" },
            headerTitle: {
              width: "100%",
              margin: "0",
              alignSelf: "center",
              whiteSpace: "nowrap",
              fontSize: "clamp(1.05rem, 5vw, 1.35rem)",
              lineHeight: "1.15",
              textAlign: "center"
            },
            headerSubtitle: { display: "none" },
            logoBox: { display: "flex", width: "100%", height: "3rem", margin: "0 auto .1rem", alignItems: "center", justifyContent: "center" },
            logoImage: { width: "3rem", height: "3rem", objectFit: "contain" },
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

      clerkReady = true;
      setStatus();
      renderAuthState();
      window.Clerk.addListener(renderAuthState);
      tryOpenPendingAuth();
    } catch (error) {
      console.error("Clerk authentication failed to initialize.", error);
      clerkReady = false;
      pendingAuthRequest = null;
      window.clearTimeout(pendingAuthTimer);
      setAccountLoading(false);
      if (loadingIndicator) {
        loadingIndicator.hidden = false;
        loadingIndicator.setAttribute("aria-busy", "false");
        loadingIndicator.setAttribute("aria-label", "Account unavailable");
        loadingIndicator.title = "Account unavailable";
      }
      setStatus("Sign in unavailable", true);
    }
  };

  loadingIndicator?.addEventListener("click", () => {
    requestAuthDialog("signIn", { animate: true });
  });

  initialize();
})();
