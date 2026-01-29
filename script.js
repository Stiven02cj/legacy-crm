/* =========================================================
  LEGACY CRM — JS CORREGIDO
========================================================= */

const state = {
  route: "dashboard",
  isProcessing: false
};

const $ = (q) => document.querySelector(q);

// --- NAVEGACIÓN (CORREGIDO) ---

function showView(route) {
  state.route = route;
  
  // Actualizar clases en el menú
  document.querySelectorAll(".menu a").forEach(a => {
    a.classList.toggle("active", a.dataset.route === route);
  });

  // Ocultar todas las vistas y mostrar la seleccionada
  document.querySelectorAll("main .view").forEach(v => {
    v.style.display = "none";
  });

  const targetView = $("#view-" + route);
  if (targetView) {
    targetView.style.display = "block";
  }
}

function routeFromHash() {
  return (location.hash || "#dashboard").replace("#", "");
}

// --- UTILIDADES ---

function toast(title, msg, type = "info") {
  const t = $("#toast");
  $("#toastTitle").textContent = title;
  $("#toastMsg").textContent = msg;
  t.style.display = "block";
  t.className = `toast ${type}`;
  setTimeout(() => t.style.display = "none", 4000);
}

function showLoading(btn, label) {
  btn.disabled = true;
  btn.dataset.oldText = btn.textContent;
  btn.textContent = label;
}

function hideLoading(btn) {
  btn.disabled = false;
  btn.textContent = btn.dataset.oldText;
}

// --- ACCIONES ---

async function handleRegistration() {
  const btn = $("#btnSubmitClient");
  
  // Validación básica
  const name = $("#c_name").value.trim();
  const email = $("#c_email").value.trim();
  const consent = $("#c_consent").checked;

  if (!name || !email) {
    toast("Campos incompletos", "Por favor llena los campos obligatorios.", "error");
    return;
  }
  if (!consent) {
    toast("Aviso", "Debes aceptar el tratamiento de datos.", "error");
    return;
  }

  showLoading(btn, "Guardando...");
  
  // Simular envío de datos
  await new Promise(r => setTimeout(r, 1500));
  
  hideLoading(btn);
  toast("Éxito", "Cliente registrado correctamente.", "success");
  
  // Limpiar formulario
  $("#c_name").value = "";
  $("#c_email").value = "";
  $("#c_consent").checked = false;
}

// --- INICIALIZACIÓN ---

function init() {
  // 1. Llenar tabla de ejemplo
  const tb = $("#activityTbody");
  if(tb) {
      tb.innerHTML = `<tr><td>Login exitoso</td><td>Admin</td><td><span class="tag ok">OK</span></td><td>Sesión iniciada</td></tr>`;
  }

  // 2. Manejar Navegación
  window.addEventListener("hashchange", () => showView(routeFromHash()));
  showView(routeFromHash()); // Carga inicial

  // 3. Listeners de Botones
  $("#btnSubmitClient").addEventListener("click", handleRegistration);
  
  $("#btnCancelClient").addEventListener("click", () => {
    if(confirm("¿Limpiar el formulario?")) {
        $("#c_name").value = "";
        $("#c_email").value = "";
    }
  });

  $("#btnSync").addEventListener("click", async (e) => {
    showLoading(e.target, "Sincronizando...");
    await new Promise(r => setTimeout(r, 2000));
    hideLoading(e.target);
    toast("Sincronizado", "Los datos están al día.");
  });

  // Modal (Cerrar)
  $("#modalX")?.addEventListener("click", () => $("#modalBackdrop").style.display = "none");
}

document.addEventListener("DOMContentLoaded", init);