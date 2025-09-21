document.addEventListener("DOMContentLoaded", function () {
  // ========================
  // LOGIN PAGE
  // ========================
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
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
          window.location.href = "index.html";
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
        window.location.href = "login.html";
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

      const fullName = document.getElementById("fullname").value.trim();
      const birthDate = document.getElementById("dob").value;
      const coverage = parseInt(document.getElementById("coverage").value);
      const premiDisplay = document.getElementById("premiumResult");

      premiDisplay.textContent = "";

      if (!fullName || !birthDate || !coverage) {
        premiDisplay.style.color = "#b91c1c";
        premiDisplay.textContent = "Semua field wajib diisi!";
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
        tarif = 0.002;
      } else if (umur <= 50) {
        tarif = 0.004;
      } else {
        tarif = 0.01;
      }

      const premi = tarif * coverage;
      premiDisplay.style.color = "green";
      premiDisplay.textContent =
        `Data valid ✅ Premi bulanan yang harus dibayar: Rp${premi.toLocaleString("id-ID")}`;
        
      const checkoutSection = document.getElementById("checkoutSection");
      if (checkoutSection) {
        checkoutSection.style.display = "block";
      }

      // simpan sementara info untuk histori
      localStorage.setItem("selectedProduct", "Asuransi Jiwa");
      localStorage.setItem("selectedType", "Jiwa");
      localStorage.setItem("selectedPrice", premi.toLocaleString("id-ID"));
    });
  }

  // ========================
  // PURCHASE PAGE (ASURANSI MOBIL)
  // ========================
  const carForm = document.getElementById("carForm");
  if (carForm) {
    carForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const merk = document.getElementById("merk").value.trim();
      const jenis = document.getElementById("jenis").value.trim();
      const tahun = parseInt(document.getElementById("tahun").value);
      const harga = parseInt(document.getElementById("harga").value);
      const plat = document.getElementById("plat").value.trim();
      const mesin = document.getElementById("mesin").value.trim();
      const rangka = document.getElementById("rangka").value.trim();
      const pemilik = document.getElementById("pemilik").value.trim();

      const premiDisplay = document.getElementById("carPremiumResult");

      if (!merk || !jenis || !tahun || !harga || !plat || !mesin || !rangka || !pemilik) {
        premiDisplay.style.color = "#b91c1c";
        premiDisplay.textContent = "Semua field wajib diisi!";
        return;
      }

      // hitung umur mobil
      const tahunSekarang = new Date().getFullYear();
      const umur = tahunSekarang - tahun;

      let tarif = 0;
      if (umur <= 3) {
        tarif = 0.025;
      } else if (umur <= 5 && harga < 200000000) {
        tarif = 0.04;
      } else if (umur <= 5 && harga >= 200000000) {
        tarif = 0.03;
      } else if (umur > 5) {
        tarif = 0.05;
      }

      const premi = tarif * harga;

      premiDisplay.style.color = "green";
      premiDisplay.textContent =
        `Premi tahunan untuk mobil ${merk} ${jenis} adalah: Rp${premi.toLocaleString("id-ID")}`;

      // ✅ tampilkan tombol checkout
      const checkoutSection = document.getElementById("carCheckoutSection");
      checkoutSection.style.display = "block";

      const carCheckoutBtn = document.getElementById("carCheckoutBtn");
      carCheckoutBtn.onclick = () => {
        // simpan sementara info untuk histori
        localStorage.setItem("selectedProduct", "Asuransi Mobil");
        localStorage.setItem("selectedType", `${merk} ${jenis}`);
        localStorage.setItem("selectedPrice", premi.toLocaleString("id-ID"));
        window.location.href = "checkout.html";
      };
    });
  }

  // ========================
  // PURCHASE PAGE (ASURANSI KESEHATAN)
  // ========================
  const healthForm = document.getElementById("healthForm");
  if (healthForm) {
    healthForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nama = document.getElementById("namaKtp").value.trim();
      const dob = document.getElementById("dobHealth").value;
      const pekerjaan = document.getElementById("pekerjaan").value.trim();
      const merokok = parseInt(document.getElementById("merokok").value);
      const hipertensi = parseInt(document.getElementById("hipertensi").value);
      const diabetes = parseInt(document.getElementById("diabetes").value);
      const resultDisplay = document.getElementById("healthPremiumResult");

      resultDisplay.textContent = "";

      if (!nama || !dob || !pekerjaan || isNaN(merokok) || isNaN(hipertensi) || isNaN(diabetes)) {
        resultDisplay.style.color = "#b91c1c";
        resultDisplay.textContent = "Semua field wajib diisi!";
        return;
      }

      // Hitung umur
      const birth = new Date(dob);
      const today = new Date();
      let umur = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        umur--;
      }

      // Faktor umur
      let faktorUmur = 0;
      if (umur <= 20) {
        faktorUmur = 0.1;
      } else if (umur <= 35) {
        faktorUmur = 0.2;
      } else if (umur <= 50) {
        faktorUmur = 0.25;
      } else {
        faktorUmur = 0.4;
      }

      const P = 2000000; // premi dasar
      const premi =
        P +
        (faktorUmur * P) +
        (merokok * 0.5 * P) +
        (hipertensi * 0.4 * P) +
        (diabetes * 0.5 * P);

      resultDisplay.style.color = "green";
      resultDisplay.textContent =
        `Data valid ✅ Premi tahunan yang harus dibayar: Rp${premi.toLocaleString("id-ID")}`;

      const checkoutSection = document.getElementById("healthCheckoutSection");
      if (checkoutSection) {
        checkoutSection.style.display = "block";
      }

      // simpan sementara info untuk histori
      localStorage.setItem("selectedProduct", "Asuransi Kesehatan");
      localStorage.setItem("selectedType", pekerjaan);
      localStorage.setItem("selectedPrice", premi.toLocaleString("id-ID"));
    });
  }

  // ========================
  // CHECKOUT PAGE
  // ========================
  const payButton = document.getElementById("payButton");
  if (payButton) {
    payButton.addEventListener("click", function () {
      const price = localStorage.getItem("selectedPrice") || "-";
      const product = localStorage.getItem("selectedProduct") || "Asuransi";
      const type = localStorage.getItem("selectedType") || "-";

      // Simpan histori ke localStorage
      const history = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
      const newRecord = {
        product: product,
        type: type,
        date: new Date().toLocaleDateString("id-ID"),
        price: "Rp" + price,
        status: "Lunas",
      };
      history.push(newRecord);
      localStorage.setItem("purchaseHistory", JSON.stringify(history));

      alert("Pembayaran berhasil! ✅");
      window.location.href = "history.html";
    });
  }

  // ========================
  // HISTORY PAGE
  // ========================
  const historyList = document.getElementById("historyList");
  if (historyList) {
    const history = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

    if (history.length === 0) {
      historyList.innerHTML = `<tr><td colspan="5">Belum ada histori pembelian.</td></tr>`;
    } else {
      history.forEach(item => {
        const row = `
          <tr>
            <td>${item.product}</td>
            <td>${item.type}</td>
            <td>${item.date}</td>
            <td>${item.price}</td>
            <td>${item.status}</td>
          </tr>
        `;
        historyList.innerHTML += row;
      });
    }
  }
});
