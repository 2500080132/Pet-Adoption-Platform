/* ==========================================================
   PAWFECT HOME - RESCUE & ADOPTION APPLICATION
   Technologies: Native HTML5, CSS3, ES6+ JavaScript
   Storage: HTML5 LocalStorage Database Engine
   ========================================================== */

const STORAGE_KEY_DOGS = "rescue_dogs_v18";
const STORAGE_KEY_APPS = "rescue_apps_v18";
const STORAGE_KEY_USERS = "rescue_users_v18";
const STORAGE_KEY_CURRENT_USER = "rescue_active_user_v18";
const STORAGE_KEY_FAVS = "rescue_favorites_v18";
const STORAGE_KEY_INQUIRIES = "rescue_inquiries_v18";

// --- 1. INITIALIZE PERSISTENT DATABASE ---
function initDatabase() {
  const initialDogs = [
    {
      id: 101,
      name: "Buddy",
      breed: "Golden Retriever",
      age: "7 Months",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80",
      parents: {
        sire: "Champion Max (Purebred Pedigree Verified)",
        dam: "Bella (Golden Retriever, Family Pet)",
        notes: "Both parents certified clear of hip dysplasia."
      },
      health: {
        vaccines: ["Rabies: Done", "DHPP: Done", "Deworming: Completed"],
        neutered: "Yes",
        microchip: "CHIP-IND-99201",
        diet: "Puppy formula with Omega-3 supplements"
      },
      tags: ["👶 Good with Kids", "🏢 Apartment Friendly", "⚡ Medium Energy"],
      space: "apartment",
      energy: "relaxed",
      petFriendly: "kids"
    },
    {
      id: 102,
      name: "Rocky",
      breed: "Welsh Corgi",
      age: "1.5 Years",
      image: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80",
      parents: {
        sire: "Arthur of Pembroke (Imported Line)",
        dam: "Lady Cleo (Red & White Corgi)",
        notes: "Pedigree certified working lineage."
      },
      health: {
        vaccines: ["Rabies: Done", "DHPP: Done", "Bordetella: Done"],
        neutered: "Yes",
        microchip: "CHIP-IND-88412",
        diet: "High protein adult kibble"
      },
      tags: ["🐱 Cat Friendly", "🏡 Needs Yard", "⚡ High Energy"],
      space: "house",
      energy: "active",
      petFriendly: "cats"
    },
    {
      id: 103,
      name: "Charlie",
      breed: "Chow Chow",
      age: "1 Year",
      image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=600&q=80",
      parents: {
        sire: "Bear (Cinnamon Rough Coat)",
        dam: "Ruby (Black Chow Chow)",
        notes: "Gentle home companion background."
      },
      health: {
        vaccines: ["Rabies: Done", "DHPP: Done", "Deworming: Completed"],
        neutered: "No",
        microchip: "CHIP-IND-77194",
        diet: "Grain-free poultry diet"
      },
      tags: ["🔈 Quiet Dog", "🛋️ Couch Potato", "⚡ Low Energy"],
      space: "apartment",
      energy: "relaxed",
      petFriendly: "none"
    },
    {
      id: 104,
      name: "Bruno",
      breed: "French Bulldog",
      age: "2 Years",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80",
      parents: {
        sire: "Titan (Brindle Frenchie)",
        dam: "Luna (Fawn Frenchie)",
        notes: "Veterinary airway checked & cleared."
      },
      health: {
        vaccines: ["Rabies: Done", "DHPP: Done", "Deworming: Completed"],
        neutered: "Yes",
        microchip: "CHIP-IND-66023",
        diet: "Hypoallergenic salmon recipe"
      },
      tags: ["🏢 Apartment Friendly", "👶 Good with Kids", "⚡ Low Energy"],
      space: "apartment",
      energy: "relaxed",
      petFriendly: "kids"
    }
  ];

  if (!localStorage.getItem(STORAGE_KEY_DOGS)) {
    localStorage.setItem(STORAGE_KEY_DOGS, JSON.stringify(initialDogs));
  }

  if (!localStorage.getItem(STORAGE_KEY_APPS)) {
    localStorage.setItem(STORAGE_KEY_APPS, JSON.stringify([]));
  }

  if (!localStorage.getItem(STORAGE_KEY_FAVS)) {
    localStorage.setItem(STORAGE_KEY_FAVS, JSON.stringify({}));
  }

  if (!localStorage.getItem(STORAGE_KEY_INQUIRIES)) {
    localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify([
      {
        ticketId: 501,
        userId: "customer1",
        userName: "Jane Doe",
        userEmail: "jane@example.com",
        subject: "Diet & Kibble query for Buddy",
        message: "Does Buddy require any special hypoallergenic supplements?",
        date: "2026-09-18",
        status: "Replied",
        reply: "Buddy thrives on standard puppy kibble with occasional salmon oil drops!"
      }
    ]));
  }

  if (!localStorage.getItem(STORAGE_KEY_USERS)) {
    const initialUsers = [
      {
        userId: "admin",
        fullName: "System Admin",
        email: "admin@pawfect.org",
        password: "admin123",
        role: "admin"
      },
      {
        userId: "customer1",
        fullName: "Jane Doe",
        email: "jane@example.com",
        password: "cust123",
        role: "customer"
      }
    ];
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(initialUsers));
  }
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_CURRENT_USER)) || null;
}

// --- 2. AUTHENTICATION & SESSION HANDLING (REQ 5) ---
function renderAuthStatus() {
  const user = getCurrentUser();
  const loginScreen = document.getElementById("loginScreen");
  const mainWebsite = document.getElementById("mainWebsite");

  if (!user) {
    loginScreen.classList.remove("hidden");
    mainWebsite.classList.add("hidden");
  } else {
    loginScreen.classList.add("hidden");
    mainWebsite.classList.remove("hidden");
    setupWebsiteForUser(user);
  }
}

function quickFill(userId, pass) {
  document.getElementById("loginUserId").value = userId;
  document.getElementById("loginPassword").value = pass;
}

function switchAuthTab(tab) {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const tabLoginBtn = document.getElementById("tabLoginBtn");
  const tabRegisterBtn = document.getElementById("tabRegisterBtn");

  if (tab === "login") {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    tabLoginBtn.classList.add("active");
    tabRegisterBtn.classList.remove("active");
  } else {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    tabLoginBtn.classList.remove("active");
    tabRegisterBtn.classList.add("active");
  }
}

function handleLogin(e) {
  e.preventDefault();
  const userId = document.getElementById("loginUserId").value.trim();
  const pass = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS)) || [];
  const found = users.find(u => u.userId.toLowerCase() === userId.toLowerCase() && u.password === pass);

  if (!found) {
    alert("Incorrect User ID or Password! Please verify your input.");
    return;
  }

  localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(found));
  alert(`Login successful! Welcome back, ${found.fullName}.`);
  renderAuthStatus();
}

function handleRegister(e) {
  e.preventDefault();
  const userId = document.getElementById("regUserId").value.trim();
  const fullName = document.getElementById("regFullName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;

  const users = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS)) || [];

  if (users.some(u => u.userId.toLowerCase() === userId.toLowerCase())) {
    alert(`The User ID "${userId}" is already registered. Please choose another.`);
    return;
  }

  if (users.some(u => u.fullName.toLowerCase() === fullName.toLowerCase())) {
    alert(`The Name "${fullName}" is already registered. Please provide your distinct name.`);
    return;
  }

  const newCustomer = {
    userId: userId,
    fullName: fullName,
    email: email,
    password: password,
    role: "customer"
  };

  users.push(newCustomer);
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(newCustomer));

  alert(`Account successfully created! Welcome, ${fullName}!`);
  renderAuthStatus();
}

function handleLogout() {
  localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
  renderAuthStatus();
}

// --- 3. MODULE-WISE NAVIGATION & REDIRECTION (REQ 6) ---
function setupWebsiteForUser(user) {
  const userGreeting = document.getElementById("userGreeting");
  const bannerMessage = document.getElementById("bannerMessage");
  const navApps = document.getElementById("navApps");
  const navSupport = document.getElementById("navSupport");
  const navFavorites = document.getElementById("navFavorites");
  const navAdmin = document.getElementById("navAdmin");

  updateFavoriteCountBadge();

  if (user.role === "admin") {
    userGreeting.innerHTML = `Signed in: <strong>${user.fullName}</strong> [ADMIN]`;
    bannerMessage.innerHTML = `⚡ Administrator Mode: You have administrative access to add listings, approve requests, and reply to inquiries.`;

    navAdmin.classList.remove("hidden");
    navApps.classList.add("hidden");
    navSupport.classList.add("hidden");
    navFavorites.classList.add("hidden");

    switchPage("admin");
  } else {
    userGreeting.innerHTML = `Customer: <strong>${user.fullName}</strong>`;
    bannerMessage.innerHTML = `Welcome ${user.fullName}! Shortlist your favorites ❤️, track support tickets, or take the Matchmaker Quiz.`;

    navAdmin.classList.add("hidden");
    navApps.classList.remove("hidden");
    navSupport.classList.remove("hidden");
    navFavorites.classList.remove("hidden");

    switchPage("dogs");
  }
}

function switchPage(pageId) {
  document.querySelectorAll(".page-view").forEach(el => el.classList.add("hidden"));
  document.querySelectorAll(".nav-btn").forEach(el => el.classList.remove("active"));

  const target = document.getElementById("page-" + pageId);
  if (target) target.classList.remove("hidden");

  const mapping = {
    dogs: "navDogs",
    favorites: "navFavorites",
    applications: "navApps",
    support: "navSupport",
    admin: "navAdmin"
  };
  const activeBtn = document.getElementById(mapping[pageId]);
  if (activeBtn) activeBtn.classList.add("active");

  if (pageId === "dogs") renderDogGrid();
  if (pageId === "favorites") renderFavoritesGrid();
  if (pageId === "applications") renderUserApplications();
  if (pageId === "support") renderUserInquiries();
  if (pageId === "admin") renderAdminDashboard();
}

// --- 4. ❤️ FAVORITES & WISHLIST MODULE ---
function getUserFavorites() {
  const user = getCurrentUser();
  if (!user) return [];
  const allFavs = JSON.parse(localStorage.getItem(STORAGE_KEY_FAVS)) || {};
  return allFavs[user.userId] || [];
}

function toggleFavorite(e, dogId) {
  e.stopPropagation();
  const user = getCurrentUser();
  if (!user) return;

  const allFavs = JSON.parse(localStorage.getItem(STORAGE_KEY_FAVS)) || {};
  let userFavs = allFavs[user.userId] || [];

  if (userFavs.includes(dogId)) {
    userFavs = userFavs.filter(id => id !== dogId);
  } else {
    userFavs.push(dogId);
  }

  allFavs[user.userId] = userFavs;
  localStorage.setItem(STORAGE_KEY_FAVS, JSON.stringify(allFavs));

  updateFavoriteCountBadge();
  renderDogGrid();
  renderFavoritesGrid();
}

function updateFavoriteCountBadge() {
  const badge = document.getElementById("favCount");
  if (badge) {
    badge.innerText = getUserFavorites().length;
  }
}

function renderFavoritesGrid() {
  const grid = document.getElementById("favoritesGrid");
  if (!grid) return;

  const favIds = getUserFavorites();
  const allDogs = JSON.parse(localStorage.getItem(STORAGE_KEY_DOGS)) || [];
  const favoriteDogs = allDogs.filter(d => favIds.includes(d.id));

  if (favoriteDogs.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 40px 0;">You haven't saved any favorite dogs yet. Click the 🤍 icon on any dog to shortlist them here!</p>`;
    return;
  }

  grid.innerHTML = generateDogCardsHTML(favoriteDogs);
}

// --- 5. SEARCH & FILTER DOGS ---
function generateDogCardsHTML(dogsList) {
  const favs = getUserFavorites();
  const user = getCurrentUser();
  return dogsList.map(dog => {
    const isFav = favs.includes(dog.id);
    return `
      <div class="dog-card" onclick="openDogModal(${dog.id})">
        <div class="dog-card-image-wrap">
          <img src="${dog.image}" alt="${dog.name}" onerror="this.src='https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80'" />
          ${user && user.role !== "admin" ? `
            <button class="fav-heart-btn" type="button" title="Toggle Favorite" onclick="toggleFavorite(event, ${dog.id})">
              ${isFav ? "❤️" : "🤍"}
            </button>
          ` : ""}
        </div>
        <div class="dog-card-body">
          <div>
            <h3>${dog.name} (${dog.age})</h3>
            <p style="color: #4f46e5; font-weight: 600; font-size: 13px;">${dog.breed}</p>
            <div class="tag-container">
              ${dog.tags ? dog.tags.map(t => `<span class="tag">${t}</span>`).join("") : ""}
            </div>
          </div>
          <button class="btn primary-btn" type="button" style="width: 100%;">View Passport & Apply</button>
        </div>
      </div>
    `;
  }).join("");
}

function renderDogGrid(customList = null) {
  const dogs = customList || JSON.parse(localStorage.getItem(STORAGE_KEY_DOGS)) || [];
  const grid = document.getElementById("dogGrid");
  if (!grid) return;

  if (dogs.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 40px 0;">No rescue dogs match your filters.</p>`;
    return;
  }

  grid.innerHTML = generateDogCardsHTML(dogs);
}

function filterDogs() {
  const searchInput = document.getElementById("searchFilter");
  const breedSelect = document.getElementById("breedFilter");
  if (!searchInput || !breedSelect) return;

  const search = searchInput.value.toLowerCase().trim();
  const breed = breedSelect.value;
  const dogs = JSON.parse(localStorage.getItem(STORAGE_KEY_DOGS)) || [];

  const results = dogs.filter(dog => {
    const matchesSearch = dog.name.toLowerCase().includes(search) || dog.breed.toLowerCase().includes(search);
    const matchesBreed = (breed === "all") || (dog.breed.toLowerCase() === breed.toLowerCase());
    return matchesSearch && matchesBreed;
  });

  renderDogGrid(results);
}

// --- 6. ⚖️ DOG MATCHMAKER QUIZ ALGORITHM ---
function openQuizModal() {
  document.getElementById("quizModal").classList.remove("hidden");
  resetQuiz();
}

function closeQuizModal() {
  document.getElementById("quizModal").classList.add("hidden");
}

function closeQuizOnBackdrop(e) {
  if (e.target.id === "quizModal") closeQuizModal();
}

function resetQuiz() {
  document.getElementById("quizForm").classList.remove("hidden");
  document.getElementById("quizResults").classList.add("hidden");
  document.getElementById("quizForm").reset();
}

function calculateDogMatches(e) {
  e.preventDefault();
  const space = document.getElementById("quizSpace").value;
  const activity = document.getElementById("quizActivity").value;
  const pets = document.getElementById("quizPets").value;

  const dogs = JSON.parse(localStorage.getItem(STORAGE_KEY_DOGS)) || [];

  const scoredDogs = dogs.map(dog => {
    let score = 0;
    if (dog.space === "both" || dog.space === space) score += 3;
    if (dog.energy === activity) score += 3;
    if (dog.petFriendly === pets || dog.petFriendly === "both") score += 3;
    return { ...dog, score };
  });

  scoredDogs.sort((a, b) => b.score - a.score);
  const topMatches = scoredDogs.slice(0, 2);

  const matchedContainer = document.getElementById("matchedDogsList");
  matchedContainer.innerHTML = topMatches.map(dog => `
    <div class="match-item-card">
      <img src="${dog.image}" alt="${dog.name}" />
      <div style="flex: 1;">
        <h4 style="color: #0f172a; margin-bottom: 2px;">${dog.name} (${dog.breed})</h4>
        <p style="font-size: 12px; color: #059669; font-weight: 700;">★ 95% Compatibility Match</p>
        <p style="font-size: 11px; color: #64748b;">${dog.tags ? dog.tags.join(" • ") : ""}</p>
      </div>
      <button class="btn primary-btn" type="button" style="padding: 6px 10px; font-size: 12px;" onclick="closeQuizModal(); openDogModal(${dog.id});">Inspect</button>
    </div>
  `).join("");

  document.getElementById("quizForm").classList.add("hidden");
  document.getElementById("quizResults").classList.remove("hidden");
}

// --- 7. DIGITAL HEALTH PASSPORT & APPLICATION POPUP ---
function openDogModal(dogId) {
  const dogs = JSON.parse(localStorage.getItem(STORAGE_KEY_DOGS)) || [];
  const dog = dogs.find(d => d.id === dogId);
  if (!dog) return;

  const user = getCurrentUser();
  const modalBody = document.getElementById("modalBody");
  if (!modalBody || !user) return;

  let applySection = "";

  if (user.role === "admin") {
    applySection = `<p style="color: #64748b; font-style: italic; margin-top: 15px;">Administrators manage listings and cannot submit adoption applications.</p>`;
  } else {
    applySection = `
      <h3 style="margin-top: 16px;">Adopt or Meet ${dog.name}</h3>
      <form onsubmit="submitAdoption(event, ${dog.id}, '${dog.name}')">
        <div class="input-group" style="margin-top: 10px;">
          <label for="requestType">Request Type</label>
          <select id="requestType" required>
            <option value="Adoption Application">Full Adoption Application</option>
            <option value="Meet & Greet Visit">Schedule a Meet & Greet Visit</option>
          </select>
        </div>
        <div class="input-group">
          <label>Customer Name</label>
          <input type="text" value="${user.fullName}" readonly style="background: #f1f5f9;" />
        </div>
        <div class="input-group">
          <label>Email Address</label>
          <input type="email" value="${user.email}" readonly style="background: #f1f5f9;" />
        </div>
        <button type="submit" class="btn success-btn" style="width: 100%; margin-top: 6px;">Submit Request</button>
      </form>
    `;
  }

  modalBody.innerHTML = `
    <img src="${dog.image}" alt="${dog.name}" style="width: 100%; max-height: 230px; object-fit: cover; border-radius: 10px;" />
    <h2 style="margin-top: 12px;">${dog.name} (#${dog.id})</h2>
    <p><strong>Breed:</strong> ${dog.breed} | <strong>Age:</strong> ${dog.age}</p>
    
    <div class="passport-card">
      <h4>📋 Digital Health Passport</h4>
      <p>💉 <strong>Vaccines:</strong> ${dog.health ? dog.health.vaccines.join(", ") : "Up to date"}</p>
      <p>✂️ <strong>Spayed / Neutered:</strong> ${dog.health ? dog.health.neutered : "Yes"}</p>
      <p>🏷️ <strong>Microchip ID:</strong> ${dog.health ? dog.health.microchip : "Registered"}</p>
      <p>🥣 <strong>Diet Notes:</strong> ${dog.health ? dog.health.diet : "Standard diet"}</p>
    </div>

    <div class="parents-card">
      <h4>🧬 Parentage & Heritage Lineage</h4>
      <p>🐕 <strong>Father (Sire):</strong> ${dog.parents ? dog.parents.sire : "Verified Purebred"}</p>
      <p>🐕 <strong>Mother (Dam):</strong> ${dog.parents ? dog.parents.dam : "Family Rescue"}</p>
      <p style="font-size: 12px; color: #475569; margin-top: 4px;"><em>${dog.parents ? dog.parents.notes : ""}</em></p>
    </div>

    ${applySection}
  `;

  document.getElementById("dogModal").classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("dogModal");
  if (modal) modal.classList.add("hidden");
}

function closeModalOnBackdrop(e) {
  if (e.target.id === "dogModal") closeModal();
}

function submitAdoption(e, dogId, dogName) {
  e.preventDefault();
  const user = getCurrentUser();
  if (!user) return;

  const type = document.getElementById("requestType").value;
  const apps = JSON.parse(localStorage.getItem(STORAGE_KEY_APPS)) || [];

  if (apps.some(a => a.dogId === dogId && a.userId === user.userId && a.type === type && a.status === "Pending")) {
    alert(`You already have a pending ${type} submitted for ${dogName}!`);
    return;
  }

  apps.push({
    appId: Date.now(),
    type: type,
    userId: user.userId,
    dogId: dogId,
    dogName: dogName,
    name: user.fullName,
    email: user.email,
    date: new Date().toLocaleDateString(),
    status: "Pending"
  });

  localStorage.setItem(STORAGE_KEY_APPS, JSON.stringify(apps));
  alert(`${type} successfully submitted for ${dogName}!`);
  closeModal();
  switchPage("applications");
}

// --- 8. CUSTOMER APPLICATION LISTING ---
function renderUserApplications() {
  const user = getCurrentUser();
  const container = document.getElementById("userApplicationsList");
  if (!container || !user) return;

  const apps = JSON.parse(localStorage.getItem(STORAGE_KEY_APPS)) || [];
  const myApps = apps.filter(a => a.userId === user.userId);

  if (myApps.length === 0) {
    container.innerHTML = `<p style="padding: 24px; color: #64748b; text-align: center;">You have not applied for any rescue dogs yet.</p>`;
    return;
  }

  container.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Application ID</th>
          <th>Type</th>
          <th>Dog</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${myApps.map(a => `
          <tr>
            <td>#${a.appId}</td>
            <td><strong>${a.type || "Adoption"}</strong></td>
            <td>${a.dogName} (#${a.dogId})</td>
            <td>${a.date}</td>
            <td><span class="badge badge-${a.status.toLowerCase()}">${a.status}</span></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

// --- 9. CUSTOMER SUPPORT & INQUIRY TICKETS ---
function submitSupportTicket(e) {
  e.preventDefault();
  const user = getCurrentUser();
  if (!user) return;

  const subject = document.getElementById("supportSubject").value.trim();
  const message = document.getElementById("supportMessage").value.trim();
  const inquiries = JSON.parse(localStorage.getItem(STORAGE_KEY_INQUIRIES)) || [];

  const newTicket = {
    ticketId: Date.now(),
    userId: user.userId,
    userName: user.fullName,
    userEmail: user.email,
    subject: subject,
    message: message,
    date: new Date().toLocaleDateString(),
    status: "Under Review by Shelter Manager",
    reply: "Our shelter medical staff has received your question and will provide verified advice here shortly."
  };

  inquiries.unshift(newTicket);
  localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));

  alert(`Inquiry #${newTicket.ticketId} submitted! You can track its status below.`);
  document.getElementById("supportSubject").value = "";
  document.getElementById("supportMessage").value = "";
  renderUserInquiries();
}

function renderUserInquiries() {
  const user = getCurrentUser();
  const container = document.getElementById("userInquiryList");
  if (!container || !user) return;

  const inquiries = JSON.parse(localStorage.getItem(STORAGE_KEY_INQUIRIES)) || [];
  const myInquiries = inquiries.filter(i => i.userId === user.userId);

  if (myInquiries.length === 0) {
    container.innerHTML = `<p style="padding: 24px; color: #64748b; text-align: center;">You have no active inquiries. Submit a message above anytime!</p>`;
    return;
  }

  container.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Ticket #</th>
          <th>Subject & Message</th>
          <th>Date</th>
          <th>Status</th>
          <th>Shelter Team Response</th>
        </tr>
      </thead>
      <tbody>
        ${myInquiries.map(item => `
          <tr>
            <td><strong>#${item.ticketId}</strong></td>
            <td>
              <strong>${item.subject}</strong>
              <p style="font-size: 12px; color: #64748b; margin-top: 3px;">"${item.message}"</p>
            </td>
            <td>${item.date}</td>
            <td>
              <span class="badge ${item.status === 'Replied' ? 'badge-answered' : 'badge-review'}">
                ${item.status}
              </span>
            </td>
            <td style="color: #0369a1; font-size: 13px;">
              ${item.reply || "<em>Awaiting coordinator review...</em>"}
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

// --- 10. ADMIN MODULE CONTROLS (REQ 2 & 7) ---
function handleAddDog(e) {
  e.preventDefault();

  const inputId = parseInt(document.getElementById("dogId").value.trim(), 10);
  const inputName = document.getElementById("dogName").value.trim();
  const inputBreed = document.getElementById("dogBreed").value.trim();
  const inputAge = document.getElementById("dogAge").value.trim();
  const inputFather = document.getElementById("dogFather").value.trim();
  const inputMother = document.getElementById("dogMother").value.trim();
  const inputVaccines = document.getElementById("dogVaccines").value.trim();
  const inputMicrochip = document.getElementById("dogMicrochip").value.trim();
  const inputImage = document.getElementById("dogImage").value.trim();

  const dogs = JSON.parse(localStorage.getItem(STORAGE_KEY_DOGS)) || [];

  if (dogs.some(d => d.id === inputId)) {
    alert(`Error: Dog ID #${inputId} already exists. Please choose another ID.`);
    return;
  }

  dogs.unshift({
    id: inputId,
    name: inputName,
    breed: inputBreed,
    age: inputAge,
    image: inputImage,
    parents: {
      sire: inputFather,
      dam: inputMother,
      notes: "Breeder and lineage verified by shelter veterinarian."
    },
    health: {
      vaccines: (inputVaccines || "Dewormed").split(",").map(v => v.trim()),
      neutered: "Yes",
      microchip: inputMicrochip,
      diet: "Shelter standard balanced nutrition"
    },
    tags: ["🏢 Apartment Friendly", "👶 Good with Kids", "⚡ Medium Energy"],
    space: "apartment",
    energy: "relaxed",
    petFriendly: "kids"
  });

  localStorage.setItem(STORAGE_KEY_DOGS, JSON.stringify(dogs));
  document.getElementById("addDogForm").reset();
  alert(`Successfully added ${inputName} to the catalog!`);
  renderAdminDashboard();
}

function deleteDog(dogId) {
  if (!confirm("Are you sure you want to remove this dog profile?")) return;
  let dogs = JSON.parse(localStorage.getItem(STORAGE_KEY_DOGS)) || [];
  dogs = dogs.filter(d => d.id !== dogId);
  localStorage.setItem(STORAGE_KEY_DOGS, JSON.stringify(dogs));
  renderAdminDashboard();
}

function updateStatus(appId, newStatus) {
  const apps = JSON.parse(localStorage.getItem(STORAGE_KEY_APPS)) || [];
  const target = apps.find(a => a.appId === appId);
  if (target) {
    target.status = newStatus;
    localStorage.setItem(STORAGE_KEY_APPS, JSON.stringify(apps));
    renderAdminDashboard();
  }
}

function replyInquiry(ticketId) {
  const response = prompt("Enter official shelter response for this customer inquiry:");
  if (!response || !response.trim()) return;

  const inquiries = JSON.parse(localStorage.getItem(STORAGE_KEY_INQUIRIES)) || [];
  const target = inquiries.find(i => i.ticketId === ticketId);
  if (target) {
    target.reply = response.trim();
    target.status = "Replied";
    localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
    alert("Response sent to customer successfully!");
    renderAdminDashboard();
  }
}

function renderAdminDashboard() {
  // 1. Directory
  const dogs = JSON.parse(localStorage.getItem(STORAGE_KEY_DOGS)) || [];
  const adminDogs = document.getElementById("adminDogList");
  if (adminDogs) {
    adminDogs.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Microchip</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${dogs.map(d => `
            <tr>
              <td>#${d.id}</td>
              <td><strong>${d.name}</strong></td>
              <td>${d.breed}</td>
              <td>${d.age}</td>
              <td>${d.health ? d.health.microchip : "N/A"}</td>
              <td>
                <button class="btn danger-btn" type="button" onclick="deleteDog(${d.id})">Delete</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  // 2. Applications
  const apps = JSON.parse(localStorage.getItem(STORAGE_KEY_APPS)) || [];
  const adminApps = document.getElementById("adminApplicationsList");
  if (adminApps) {
    if (apps.length === 0) {
      adminApps.innerHTML = `<p style="padding: 20px; color: #64748b; text-align: center;">No adoption applications submitted yet.</p>`;
    } else {
      adminApps.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Dog</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${apps.map(a => `
              <tr>
                <td><strong>${a.type || "Adoption"}</strong></td>
                <td>${a.dogName}</td>
                <td>${a.name} (ID: ${a.userId})<br><small>${a.email}</small></td>
                <td><span class="badge badge-${a.status.toLowerCase()}">${a.status}</span></td>
                <td>
                  ${a.status === "Pending" ? `
                    <button class="btn success-btn" type="button" style="padding: 4px 8px; font-size: 12px;" onclick="updateStatus(${a.appId}, 'Approved')">Approve</button>
                    <button class="btn danger-btn" type="button" style="padding: 4px 8px; font-size: 12px;" onclick="updateStatus(${a.appId}, 'Rejected')">Reject</button>
                  ` : `<em>Decided</em>`}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    }
  }

  // 3. Inquiries
  const inquiries = JSON.parse(localStorage.getItem(STORAGE_KEY_INQUIRIES)) || [];
  const adminInquiries = document.getElementById("adminInquiriesList");
  if (adminInquiries) {
    if (inquiries.length === 0) {
      adminInquiries.innerHTML = `<p style="padding: 20px; color: #64748b; text-align: center;">No support tickets submitted yet.</p>`;
    } else {
      adminInquiries.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Ticket #</th>
              <th>Customer</th>
              <th>Subject & Inquiry</th>
              <th>Status</th>
              <th>Admin Action</th>
            </tr>
          </thead>
          <tbody>
            ${inquiries.map(item => `
              <tr>
                <td>#${item.ticketId}</td>
                <td>${item.userName}<br><small>${item.userEmail}</small></td>
                <td>
                  <strong>${item.subject}</strong>
                  <p style="font-size: 12px; color: #475569;">"${item.message}"</p>
                </td>
                <td>
                  <span class="badge ${item.status === 'Replied' ? 'badge-answered' : 'badge-review'}">
                    ${item.status}
                  </span>
                </td>
                <td>
                  <button class="btn primary-btn" type="button" style="padding: 4px 10px; font-size: 12px;" onclick="replyInquiry(${item.ticketId})">
                    ${item.status === 'Replied' ? 'Update Reply' : 'Send Reply'}
                  </button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    }
  }
}

// --- 11. APPLICATION BOOTSTRAP ---
document.addEventListener("DOMContentLoaded", () => {
  initDatabase();
  renderAuthStatus();
});