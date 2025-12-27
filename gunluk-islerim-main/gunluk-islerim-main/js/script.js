document.addEventListener("DOMContentLoaded", () => {
  
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });
  }

  
  const postJobForm = document.querySelector("form");
  
  if (postJobForm && window.location.href.includes("post-job.html")) {
   
    postJobForm.removeAttribute("onsubmit");

    postJobForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("title").value;
      const company = document.getElementById("company").value;
      const city = document.getElementById("city").value;
      const district = document.getElementById("district").value;
      const salary = document.getElementById("salary").value;
      const type = document.getElementById("type").value;
      const description = document.getElementById("description").value;
      const contactStr = document.getElementById("contact").value;

      
      if (!title || !company || !city || !district) return;

      const location = `${city} / ${district}`;

      const jobData = {
        title,
        company,
        location,
        salary,
        type,
        description,
        email: contactStr.includes("@") ? contactStr : "",
        phone: contactStr.includes("@") ? "" : contactStr,
      };

      localStorage.setItem("pendingJobData", JSON.stringify(jobData));
      localStorage.setItem("selectedPackage", "single"); 

      window.location.href = "payment.html";
    });
  }

  
  const paymentForm = document.getElementById("payment-form");
  if (paymentForm) {
    const storedJobData = localStorage.getItem("pendingJobData");
    if (!storedJobData) {
      alert("İlan bilgileri bulunamadı. Lütfen tekrar deneyin.");
      window.location.href = "post-job.html";
      return;
    }

    const jobData = JSON.parse(storedJobData);
    const pkgType = localStorage.getItem("selectedPackage") || "single";

   
    const summaryPackageName = document.getElementById("summary-package-name");
    const summaryDuration = document.getElementById("summary-package-duration");
    const summaryJobInfo = document.getElementById("summary-job-info");
    const summarySubtotal = document.getElementById("summary-subtotal");
    const summaryTax = document.getElementById("summary-tax");
    const summaryTotal = document.getElementById("summary-total");

    if (pkgType === "single") {
      summaryPackageName.innerText = "Tekli İlan";
      summaryDuration.innerText = "7 gün";
      summarySubtotal.innerText = "₺99";
      summaryTax.innerText = "₺19.80";
      summaryTotal.innerText = "₺118.80";
    } else {
      summaryPackageName.innerText = "Aylık Paket";
      summaryDuration.innerText = "30 gün / 10 ilan";
      summarySubtotal.innerText = "₺299";
      summaryTax.innerText = "₺59.80";
      summaryTotal.innerText = "₺358.80";
    }

    summaryJobInfo.innerHTML = `
          <p class="text-muted-foreground"><span class="font-medium text-foreground">Başlık:</span> ${jobData.title}</p>
          <p class="text-muted-foreground"><span class="font-medium text-foreground">Firma:</span> ${jobData.company}</p>
          <p class="text-muted-foreground"><span class="font-medium text-foreground">Konum:</span> ${jobData.location}</p>
      `;

    
    const cardNumInput = document.getElementById("cardNumber");
    const expiryInput = document.getElementById("expiryDate");
    const cardNameInput = document.getElementById("cardName");
    const cvvInput = document.getElementById("cvv");

    if (cardNumInput) {
      cardNumInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "");
        let formatted = value.match(/.{1,4}/g)?.join(" ") || value;
        e.target.value = formatted.substring(0, 19);
      });
    }
    if (expiryInput) {
      expiryInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length >= 2) {
          e.target.value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
        } else {
          e.target.value = value;
        }
      });
    }
    if (cardNameInput) {
      cardNameInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.toUpperCase();
      });
    }
    if (cvvInput) {
      cvvInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/g, "").substring(0, 3);
      });
    }

    
    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById("submit-btn");
      submitBtn.disabled = true;
      submitBtn.innerHTML = "İşleniyor...";

      setTimeout(() => {
       
        const storedJobs = JSON.parse(
          localStorage.getItem("postedJobs") || "[]"
        );
        const newJob = {
          id: Date.now(),
          ...jobData,
          date: "Bugün",
          contact: {
            email: jobData.email,
            phone: jobData.phone,
          },
        };
        storedJobs.unshift(newJob);
        localStorage.setItem("postedJobs", JSON.stringify(storedJobs));

        
        localStorage.removeItem("pendingJobData");
        localStorage.removeItem("selectedPackage");

        alert("Ödeme Başarılı! İlanınız yayınlandı.");
        window.location.href = "jobs.html";
      }, 2000);
    });
  }

  
  const featuredJobsContainer = document.getElementById(
    "featured-jobs-container"
  );
  if (featuredJobsContainer && typeof allJobs !== "undefined") {
   
    const localJobs = JSON.parse(localStorage.getItem("postedJobs") || "[]");
    const combinedJobs = [...localJobs, ...allJobs];

    const featuredJobs = combinedJobs.slice(0, 4);
    featuredJobsContainer.innerHTML = featuredJobs
      .map((job) => createJobCard(job))
      .join("");
    lucide.createIcons();
  }

  
  const jobsContainer = document.getElementById("jobs-container");
  if (jobsContainer && typeof allJobs !== "undefined") {
    const localJobs = JSON.parse(localStorage.getItem("postedJobs") || "[]");
    const combinedJobs = [...localJobs, ...allJobs];

    
    window.currentAllJobs = combinedJobs;

    renderJobs(combinedJobs);

    
    const searchInput = document.getElementById("search-input");
    const citySelect = document.getElementById("city-select");
    const districtSelect = document.getElementById("district-select");
    const typeSelect = document.getElementById("type-select");

    function filterJobs() {
      const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
      const cityValue = citySelect ? citySelect.value : "";
      const districtValue = districtSelect ? districtSelect.value : "";
      const typeValue = typeSelect ? typeSelect.value : "";

      const filtered = window.currentAllJobs.filter((job) => {
        const matchesSearch =
          job.title.toLowerCase().includes(searchTerm) ||
          job.company.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm);

        let matchesLocation = true;
        if (cityValue) {
          matchesLocation = job.location.includes(cityValue);
          if (matchesLocation && districtValue) {
            matchesLocation = job.location.includes(districtValue);
          }
        }

        const matchesType = typeValue === "" || job.type === typeValue;

        return matchesSearch && matchesLocation && matchesType;
      });

      renderJobs(filtered);
    }

    if (searchInput) searchInput.addEventListener("input", filterJobs);
    if (citySelect) citySelect.addEventListener("change", filterJobs);
    if (districtSelect) districtSelect.addEventListener("change", filterJobs);
    if (typeSelect) typeSelect.addEventListener("change", filterJobs);
  }

  
  const jobDetailContainer = document.getElementById("job-detail-container");
  if (jobDetailContainer && typeof allJobs !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = parseInt(urlParams.get("id"));

    const localJobs = JSON.parse(localStorage.getItem("postedJobs") || "[]");
    const combinedJobs = [...localJobs, ...allJobs];

    const job = combinedJobs.find((j) => j.id === jobId);

    if (job) {
      renderJobDetail(job);
    } else {
      jobDetailContainer.innerHTML = `
                <div class="text-center py-12">
                    <h2 class="text-2xl font-bold mb-4">İlan Bulunamadı</h2>
                    <a href="jobs.html" class="btn btn-primary">İlanlara Dön</a>
                </div>
            `;
    }
  }
});

function createJobCard(job) {
  return `
        <div class="card h-full flex flex-col">
            <div class="mb-4 flex items-start justify-between gap-2">
                <div class="space-y-1 flex-1">
                    <h3 class="text-xl font-bold leading-none">${job.title}</h3>
                    <p class="text-base text-muted-foreground mb-0">${job.company}</p>
                </div>
                <span class="badge badge-secondary shrink-0">${job.type}</span>
            </div>
            
            <div class="flex-1 space-y-4">
                <p class="text-sm text-muted-foreground line-clamp-2" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    ${job.description}
                </p>
                
                <div class="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div class="flex items-center gap-2">
                        <i data-lucide="map-pin" class="w-4 h-4 text-primary"></i>
                        <span>${job.location}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i data-lucide="dollar-sign" class="w-4 h-4 text-primary"></i>
                        <span class="font-semibold text-foreground">${job.salary}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i data-lucide="calendar" class="w-4 h-4 text-primary"></i>
                        <span>${job.date}</span>
                    </div>
                </div>
            </div>

            <div class="mt-6 pt-4">
                <a href="job-detail.html?id=${job.id}" class="btn btn-primary w-full">Detayları Gör</a>
            </div>
        </div>
    `;
}

function renderJobs(jobs) {
  const container = document.getElementById("jobs-container");
  if (!container) return;

  if (jobs.length === 0) {
    container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-lg text-muted-foreground">Aradığınız kriterlere uygun ilan bulunamadı.</p>
            </div>
        `;
  } else {
    container.innerHTML = jobs.map((job) => createJobCard(job)).join("");
    lucide.createIcons();
  }
}

function renderJobDetail(job) {
  const container = document.getElementById("job-detail-container");
  if (!container) return;

  document.title = `${job.title} - Günlükçüm`;

  container.innerHTML = `
        <div class="grid gap-8 md:grid-cols-3">
            <!-- Main Content -->
            <div class="md:col-span-2 space-y-6">
                <div class="card">
                    <div class="flex items-start justify-between gap-4 mb-6">
                        <div>
                            <h1 class="text-3xl font-bold mb-2">${
                              job.title
                            }</h1>
                            <div class="flex items-center gap-2 text-muted-foreground">
                                <i data-lucide="building-2" class="w-5 h-5"></i>
                                <span class="text-lg">${job.company}</span>
                            </div>
                        </div>
                        <span class="badge badge-secondary text-lg px-4 py-1">${
                          job.type
                        }</span>
                    </div>

                    <div class="space-y-6">
                        <div>
                            <h3 class="text-xl font-bold mb-3">İş Tanımı</h3>
                            <div class="prose text-muted-foreground whitespace-pre-line">
                                ${job.fullDescription || job.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">
                <div class="card">
                    <h3 class="text-lg font-bold mb-4">İlan Detayları</h3>
                    <div class="space-y-4">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-primary/10 rounded-lg text-primary">
                                <i data-lucide="dollar-sign" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <p class="text-sm text-muted-foreground">Ücret</p>
                                <p class="font-semibold">${job.salary}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-primary/10 rounded-lg text-primary">
                                <i data-lucide="map-pin" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <p class="text-sm text-muted-foreground">Konum</p>
                                <p class="font-semibold">${job.location}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-primary/10 rounded-lg text-primary">
                                <i data-lucide="calendar" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <p class="text-sm text-muted-foreground">Yayın Tarihi</p>
                                <p class="font-semibold">${job.date}</p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 pt-6 border-t border-border">
                        <button onclick="alert('Başvurunuz alındı!')" class="btn btn-primary w-full btn-lg mb-3">
                            Hemen Başvur
                        </button>
                        <div class="text-center">
                            <p class="text-sm text-muted-foreground mb-2">veya iletişime geçin</p>
                            <a href="tel:${
                              job.contact?.phone
                            }" class="text-primary font-semibold hover:underline">
                                ${job.contact?.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  lucide.createIcons();
}
