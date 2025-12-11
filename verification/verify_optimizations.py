from playwright.sync_api import sync_playwright

def verify_optimizations():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)

        # Test Desktop
        page = browser.new_page()
        try:
            page.goto("http://localhost:5173")
            page.wait_for_selector('h1')
            page.screenshot(path="verification/desktop_optimized.png")
            print("Desktop screenshot saved.")
        except Exception as e:
            print(f"Desktop Error: {e}")

        # Test Mobile
        iphone_12 = p.devices['iPhone 12 Pro']
        context = browser.new_context(**iphone_12)
        mobile_page = context.new_page()
        try:
            mobile_page.goto("http://localhost:5173")
            mobile_page.wait_for_selector('h1')
            mobile_page.screenshot(path="verification/mobile_optimized.png")
            print("Mobile screenshot saved.")
        except Exception as e:
            print(f"Mobile Error: {e}")

        browser.close()

if __name__ == "__main__":
    verify_optimizations()
