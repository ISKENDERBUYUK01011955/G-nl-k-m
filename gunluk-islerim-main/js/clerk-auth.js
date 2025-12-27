const clerkPublishableKey =
  "pk_test_c3VidGxlLWZlbGluZS02LmNsZXJrLmFjY291bnRzLmRldiQ";

const script = document.createElement("script");
script.setAttribute("data-clerk-publishable-key", clerkPublishableKey);
script.async = true;
script.src = `https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js`;
script.crossOrigin = "anonymous";

script.addEventListener("load", async function () {
  try {
    await window.Clerk.load();

    const userButtonDiv = document.getElementById("user-button");
    const authLinks = document.getElementById("auth-links");
    const mobileMenu = document.getElementById("mobile-menu");

    if (window.Clerk.user) {
      
      if (userButtonDiv) {
        window.Clerk.mountUserButton(userButtonDiv);
        userButtonDiv.classList.remove("hidden");
      }
      if (authLinks) authLinks.classList.add("hidden");

      
      const mobileAuthButtons = document.querySelectorAll(".mobile-menu .btn");
      mobileAuthButtons.forEach((btn) => (btn.style.display = "none"));
    } else {
      
      if (authLinks) authLinks.classList.remove("hidden");
      if (userButtonDiv) userButtonDiv.classList.add("hidden");
    }

   
    const signInDiv = document.getElementById("sign-in");
    const signUpDiv = document.getElementById("sign-up");
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get("mode");

    if (signInDiv && signUpDiv) {
      if (mode === "register") {
        signInDiv.classList.add("hidden");
        signUpDiv.classList.remove("hidden");
        window.Clerk.mountSignUp(signUpDiv, {
          signInUrl: "auth.html",
          afterSignUpUrl: "index.html",
          afterSignInUrl: "index.html",
        });
      } else {
        signInDiv.classList.remove("hidden");
        signUpDiv.classList.add("hidden");
        window.Clerk.mountSignIn(signInDiv, {
          signUpUrl: "auth.html?mode=register",
          afterSignInUrl: "index.html",
          afterSignUpUrl: "index.html",
        });
      }
    }
  } catch (err) {
    console.error("Clerk load error:", err);
  }
});

document.body.appendChild(script);
