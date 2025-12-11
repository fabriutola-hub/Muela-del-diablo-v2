from playwright.sync_api import sync_playwright

def verify_mobile_responsiveness():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)

        # Create a mobile context (iPhone 12 Pro)
        iphone_12 = p.devices['iPhone 12 Pro']
        context = browser.new_context(**iphone_12)
        page = context.new_page()

        try:
            # Navigate to the local server
            page.goto("http://localhost:5173")

            # Wait for the hero section to load
            page.wait_for_selector('h1')

            # Take a screenshot of the top part (Hero Section)
            page.screenshot(path="verification/mobile_hero.png")
            print("Screenshot saved to verification/mobile_hero.png")

            # Scroll down to Stats Section
            page.evaluate("window.scrollBy(0, window.innerHeight)")
            page.wait_for_timeout(1000) # Wait for animations
            page.screenshot(path="verification/mobile_stats.png")
            print("Screenshot saved to verification/mobile_stats.png")

            # Scroll down to Intro Section
            page.evaluate("window.scrollBy(0, window.innerHeight)")
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/mobile_intro.png")
            print("Screenshot saved to verification/mobile_intro.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_mobile_responsiveness()
