
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:3000")

    # Check if the "R2k Challenge" link is visible
    link = page.locator('a:has-text("R2k Challenge")')
    assert link.is_visible()

    page.screenshot(path="jules-scratch/verification/homepage.png")

    # Check the pricing page
    page.goto("http://localhost:3000/pricing")
    pro_tier = page.locator('h3:has-text("Pro")')
    assert pro_tier.is_visible()

    page.screenshot(path="jules-scratch/verification/pricing.png")

    # Check the creator pass page
    page.goto("http://localhost:3000/creator-pass")
    page.screenshot(path="jules-scratch/verification/creator-pass.png")

    # Check the r2k challenge page
    page.goto("http://localhost:3000/r2k-challenge")
    page.screenshot(path="jules-scratch/verification/r2k-challenge.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
