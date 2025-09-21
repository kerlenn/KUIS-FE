document.addEventListener("DOMContentLoaded", function () {
    // ========================
    // LOGIN PAGE
    // ========================
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();
            const msg = document.getElementById("loginMessage");

            msg.textContent = "";
            msg.style.color = "#b91c1c";

            if (!email || !password) {
                msg.textContent = "Email dan password are required!";
                return;
            }

            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!emailPattern.test(email)) {
                msg.textContent = "Email format is invalid!";
                return;
            }

            if (email === "kerlen@gmail.com" && password === "123456") {
                msg.style.color = "green";
                msg.textContent = "Login Successfully ✅";
                setTimeout(() => {
                    window.location.href = "purchase.html"; // redirect ke pembelian
                }, 1000);
            } else {
                msg.textContent = "Wrong email or password";
            }
        });
    }

    // ========================
    // SIGN UP PAGE
    // ========================
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("signupEmail").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const password = document.getElementById("signupPassword").value.trim();
            const confirmPassword = document.getElementById("confirmPassword").value.trim();
            const msg = document.getElementById("suMessage");

            msg.textContent = "";
            msg.style.color = "#b91c1c";

            if (!name || !email || !phone || !password || !confirmPassword) {
                msg.textContent = "All fields are required!";
                return;
            }

            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!emailPattern.test(email)) {
                msg.textContent = "Email format is invalid!";
                return;
            }

            if (password.length < 8) {
                msg.textContent = "Password must be at least 8 characters!";
                return;
            }

            if (password !== confirmPassword) {
                msg.textContent = "Confirmed password is not matching!";
                return;
            }

            const namePattern = /^[A-Za-z\s]{3,32}$/;
            if (!namePattern.test(name)) {
                msg.textContent = "Full name must be 3-32 letters only (no numbers)!";
                return;
            }

            const phonePattern = /^08[0-9]{8,14}$/;
            if (!phonePattern.test(phone)) {
                msg.textContent = "Phone must start with 08, 10-16 digits only!";
                return;
            }

            msg.style.color = "green";
            msg.textContent = "Sign Up Successfully ✅";
            setTimeout(() => {
                window.location.href = "login.html"; // redirect ke login
            }, 1000);
        });
    }

    // ========================
    // PURCHASE PAGE (ASURANSI JIWA)
    // ========================
    const purchaseForm = document.getElementById("purchaseForm");
    if (purchaseForm) {
        purchaseForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const fullName = document.getElementById("fullName").value.trim();
            const birthDate = document.getElementById("birthDate").value;
            const coverage = parseInt(document.getElementById("coverage").value);
            const msg = document.getElementById("purchaseMessage");
            const premiDisplay = document.getElementById("premiResult");

            msg.textContent = "";
            premiDisplay.textContent = "";
            msg.style.color = "#b91c1c";

            if (!fullName || !birthDate || !coverage) {
                msg.textContent = "Semua field wajib diisi!";
                return;
            }

            // Hitung umur
            const birth = new Date(birthDate);
            const today = new Date();
            let umur = today.getFullYear() - birth.getFullYear();
            const m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                umur--;
            }

            // Hitung tarif premi
            let tarif = 0;
            if (umur <= 30) {
                tarif = 0.002; // 0.2%
            } else if (umur <= 50) {
                tarif = 0.004; // 0.4%
            } else {
                tarif = 0.01; // 1%
            }

            const premi = tarif * coverage;
            premiDisplay.textContent = 
                `Premi bulanan yang harus dibayar: Rp${premi.toLocaleString("id-ID")}`;
            msg.style.color = "green";
            msg.textContent = "Data valid ✅";
        });

        // Checkout button
        const checkoutBtn = document.getElementById("checkoutBtn");
        if (checkoutBtn) {
            checkoutBtn.addEventListener("click", function () {
                window.location.href = "checkout.html";
            });
        }
    }
});
