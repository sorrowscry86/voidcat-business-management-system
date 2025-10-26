from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Navigate to the projects page
    page.goto("http://localhost:3000/projects")
    page.screenshot(path="jules-scratch/verification/01_projects_list.png")

    # Click the "Create Project" button
    page.click("text=Create Project")
    page.wait_for_url("http://localhost:3000/projects/new")

    # Fill out the new project form
    page.fill("input[name='name']", "My New Project")
    page.fill("textarea[name='description']", "This is a test project.")
    page.fill("input[name='startDate']", "2025-01-01")
    page.fill("input[name='endDate']", "2025-12-31")
    page.screenshot(path="jules-scratch/verification/02_new_project_form.png")

    # Submit the form
    page.click("text=Create Project")
    page.wait_for_url("http://localhost:3000/projects")

    # Take a screenshot of the projects list with the new project
    page.screenshot(path="jules-scratch/verification/03_projects_list_with_new_project.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
