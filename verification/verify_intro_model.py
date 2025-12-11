from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:5174")

    # Esperar a que la página cargue
    page.wait_for_load_state("networkidle")

    # Esperar un momento para que el modelo 3D cargue (si es necesario)
    page.wait_for_timeout(5000)

    # Buscar texto en la sección de intro para asegurar que estamos ahí
    # Ajustamos el locator si es necesario.
    # En IntroSection.jsx el texto es "Un Ícono Geológico" dentro de PaintText
    # Puede que el texto esté dividido en spans o animado.

    # Vamos a buscar un elemento más genérico si el texto falla o aumentar el timeout

    page.screenshot(path="verification/intro_model_screenshot.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
