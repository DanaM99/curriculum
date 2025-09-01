// Inicialización cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  initializeCV()
})

function initializeCV() {
  // Inicializar tema
  initializeTheme()

  // Inicializar animaciones
  initializeAnimations()

  // Inicializar barras de habilidades
  initializeSkillBars()

  // Inicializar botones
  initializeButtons()

  // Inicializar efectos de hover
  initializeHoverEffects()

  // Inicializar foto de perfil (opcional)
  initializeProfilePhoto()

  // Inicializar impresión/exportación
  initializePrintExport()
}

// Gestión de temas
function initializeTheme() {
  const themeToggle = document.getElementById("theme-toggle")
  const body = document.body

  // Cargar tema guardado
  const savedTheme = localStorage.getItem("cv-theme") || "light"
  body.setAttribute("data-theme", savedTheme)
  updateThemeIcon(savedTheme)

  // Event listener para cambio de tema
  themeToggle.addEventListener("click", function () {
    const currentTheme = body.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    body.setAttribute("data-theme", newTheme)
    localStorage.setItem("cv-theme", newTheme)
    updateThemeIcon(newTheme)

    // Animación del botón
    this.style.transform = "rotate(360deg)"
    setTimeout(() => {
      this.style.transform = "rotate(0deg)"
    }, 300)
  })
}

function updateThemeIcon(theme) {
  const icon = document.querySelector("#theme-toggle i")
  icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon"
}

// Animaciones de entrada
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observar secciones
  const sections = document.querySelectorAll(".section, .experience-item, .education-item, .project-item")
  sections.forEach((section) => {
    observer.observe(section)
  })
}

// Barras de habilidades animadas
function initializeSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBar = entry.target
          const width = skillBar.getAttribute("data-width")

          // Animación con retraso
          setTimeout(() => {
            skillBar.style.width = width
          }, 200)

          skillObserver.unobserve(skillBar)
        }
      })
    },
    { threshold: 0.5 },
  )

  skillBars.forEach((bar) => {
    skillObserver.observe(bar)
  })
}

// Inicializar botones
function initializeButtons() {
  const downloadBtn = document.getElementById("download-btn")

  downloadBtn.addEventListener("click", function () {
    // Simular descarga de CV
    downloadCV()

    // Feedback visual
    const originalText = this.innerHTML
    this.innerHTML = '<i class="fas fa-check"></i> ¡Descargado!'
    this.style.background = "#27ae60"

    setTimeout(() => {
      this.innerHTML = originalText
      this.style.background = ""
    }, 2000)
  })
}

// Función de descarga simulada
function downloadCV() {
  // En un caso real, aquí generarías un PDF o descargarías un archivo
  console.log("[v0] Simulando descarga de CV...")

  // Crear un enlace temporal para simular descarga
  const link = document.createElement("a")
  link.href = "#"
  link.download = "CV-Tu-Nombre.pdf"

  // Mostrar mensaje
  showNotification("CV descargado correctamente", "success")
}

// Sistema de notificaciones
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"}"></i>
        <span>${message}</span>
    `

  // Estilos de la notificación
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: type === "success" ? "#27ae60" : "#3498db",
    color: "white",
    padding: "12px 20px",
    borderRadius: "25px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: "9999",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "500",
  })

  document.body.appendChild(notification)

  // Animación de entrada
  notification.style.opacity = "0"
  notification.style.transform = "translateX(-50%) translateY(-20px)"

  setTimeout(() => {
    notification.style.transition = "all 0.3s ease"
    notification.style.opacity = "1"
    notification.style.transform = "translateX(-50%) translateY(0)"
  }, 10)

  // Remover después de 3 segundos
  setTimeout(() => {
    notification.style.opacity = "0"
    notification.style.transform = "translateX(-50%) translateY(-20px)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Efectos de hover mejorados
function initializeHoverEffects() {
  // Efecto hover en items de experiencia
  const experienceItems = document.querySelectorAll(".experience-item")
  experienceItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(5px)"
      this.style.transition = "transform 0.3s ease"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)"
    })
  })

  // Efecto hover en proyectos
  const projectItems = document.querySelectorAll(".project-item")
  projectItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
      this.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)"
      this.style.transition = "all 0.3s ease"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
      this.style.boxShadow = ""
    })
  })

  // Efecto en tags de tecnología
  const techTags = document.querySelectorAll(".tech-tag")
  techTags.forEach((tag) => {
    tag.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)"
      this.style.transition = "transform 0.2s ease"
    })

    tag.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
    })
  })
}

// Función para cambiar la foto de perfil (opcional)
function initializeProfilePhoto() {
  const profileImg = document.getElementById("profile-img")
  profileImg.addEventListener("dblclick", changeProfilePhoto)
}

function changeProfilePhoto() {
  const profileImg = document.getElementById("profile-img")
  const input = document.createElement("input")
  input.type = "file"
  input.accept = "image/*"

  input.addEventListener("change", (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        profileImg.src = e.target.result
        showNotification("Foto de perfil actualizada", "success")
      }
      reader.readAsDataURL(file)
    }
  })

  input.click()
}

// Función para imprimir/exportar
function initializePrintExport() {
  document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + P para imprimir
    if ((e.ctrlKey || e.metaKey) && e.key === "p") {
      e.preventDefault()
      printCV()
    }

    // Ctrl/Cmd + D para descargar
    if ((e.ctrlKey || e.metaKey) && e.key === "d") {
      e.preventDefault()
      document.getElementById("download-btn").click()
    }

    // T para cambiar tema
    if (e.key === "t" || e.key === "T") {
      document.getElementById("theme-toggle").click()
    }
  })

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

function printCV() {
  // Configurar estilos para impresión
  const skillBars = document.querySelectorAll(".skill-progress")
  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width")
    bar.style.setProperty("--print-width", width)
  })

  window.print()
}

console.log("[v0] CV inicializado correctamente")
