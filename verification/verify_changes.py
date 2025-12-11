from playwright.sync_api import sync_playwright
import time

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a mobile viewport as requested in some memories, but desktop is fine for verifying image loading
        page = browser.new_page(viewport={"width": 1280, "height": 800})

        # Navigate to local dev server
        page.goto("http://localhost:5173")

        # Wait for hydration
        time.sleep(5)

        # 1. Verify Hero Section image (fondo-muela-1.avif)
        # We check if the image is loaded by selecting the img element
        # Note: selectors with spaces in attribute values need quotes
        hero_img = page.locator('img[src="/imagenes/fondo-muela-1.avif"]')
        try:
            hero_img.wait_for(state="visible", timeout=10000)
            print("Hero image found.")
        except Exception as e:
            print(f"Hero image not found: {e}")
            page.screenshot(path="verification/error_hero.png")


        # Take screenshot of Hero Section
        page.screenshot(path="verification/hero_verification.png")
        print("Hero screenshot saved.")

        # 2. Scroll down to find Gallery and Map sections
        page.evaluate("window.scrollTo(0, 2000)")
        time.sleep(2)

        # Check for Gallery image (foto-muela.avif)
        gallery_img = page.locator('img[src="/imagenes/foto-muela.avif"]')
        try:
             gallery_img.scroll_into_view_if_needed()
             gallery_img.wait_for(state="attached", timeout=5000) # Might not be visible if further down or in carousel
             print("Gallery image found in DOM.")
        except:
             print("Gallery image not immediately found.")

        # Scroll to Map Section
        page.evaluate("window.scrollTo(0, 4000)")
        time.sleep(2)

        # Take screenshot of Map Section
        page.screenshot(path="verification/map_verification.png")
        print("Map screenshot saved.")

        browser.close()

if __name__ == "__main__":
    verify_changes()
