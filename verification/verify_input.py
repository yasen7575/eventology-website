from playwright.sync_api import sync_playwright

def verify_input_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to login page
        page.goto("http://localhost:3000/login")

        # Wait for content to load
        page.wait_for_selector("input")

        # Find input by label text - this verifies the accessibility connection
        # If the label is not correctly associated, this might fail or behavior might be different
        # but specifically we want to check attributes

        # Get the first input and its label
        label = page.locator("label").first
        input_element = page.locator("input").first

        label_for = label.get_attribute("for")
        input_id = input_element.get_attribute("id")

        print(f"Label for: {label_for}")
        print(f"Input id: {input_id}")

        if label_for and input_id and label_for == input_id:
            print("SUCCESS: Label is correctly associated with input via 'for' and 'id' attributes.")
        else:
            print("FAILURE: Label is NOT correctly associated with input.")

        page.screenshot(path="verification/login_page_inputs.png")
        browser.close()

if __name__ == "__main__":
    verify_input_accessibility()
