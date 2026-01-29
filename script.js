const $ = (q) => document.querySelector(q);

function showView(route) {
  document.querySelectorAll(".menu a").forEach(a => a.classList.toggle("active", a.dataset.route === route));
  document.querySelectorAll(".view").forEach(v => v.style.display = "none");
  const target = $("#view-" + route);
  if (target) target.style.display = "block";
}

async function handleRegistration(e) {
  if(e) e.preventDefault();

  const name = $("#c_name").value.trim();
  const email = $("#c_email").value.trim();
  const consent = $("#c_consent").checked;

  if (!name || !email) {
    toast("Error", "El nombre y el correo son obligatorios.", "error");
    return;
  }

  if (!consent) {
    toast("Aviso", "Debes aceptar los términos para continuar.", "error");
    return;
  }

  const btn = $("#btnSubmitClient");
  btn.disabled = true;
  btn.textContent = "Guardando...";

  // Simulación de guardado
  await new Promise(r => setTimeout(r, 1000));

  toast("Éxito", "Cliente registrado correctamente.", "success");
  $("#clientForm").reset();
  btn.disabled = false;
  btn.textContent = "Registrar Cliente";
}

function toast(title, msg, type = "info") {
  const t = $("#toast");
  $("#toastTitle").textContent = title;
  $("#toastMsg").textContent = msg;
  t.className = `toast ${type}`;
  t.style.display = "block";
  setTimeout(() => t.style.display = "none", 4000);
}

function init() {
  // Navegación
  window.addEventListener("hashchange", () => showView(location.hash.replace("#", "") || "dashboard"));
  showView(location.hash.replace("#", "") || "dashboard");

  // Eventos
  $("#btnSubmitClient").addEventListener("click", handleRegistration);
  
  $("#btnCancelClient").addEventListener("click", () => {
    if(confirm("¿Deseas limpiar todos los campos?")) {
      $("#clientForm").reset();
    }
  });

  // Rellenar tabla inicial
  const tbody = $("#activityTbody");
  if(tbody) {
    tbody.innerHTML = `<tr><td>Inicio de sistema</td><td>Sistema</td><td><span style="color:green">OK</span></td><td>Listo para operar</td></tr>`;
  }
}

document.addEventListener("DOMContentLoaded", init);