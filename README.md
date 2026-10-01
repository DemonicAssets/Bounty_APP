# Bounty_APP Desktop

This is the desktop version of the supplied HSC / Human Systems Check website.
It uses **C# WinForms + Microsoft Edge WebView2** so the desktop application keeps
exactly the same HTML/CSS/JavaScript interface and features as the website.

## What is included

- HSC login screen
- User signup
- Officer and admin roles
- Wanted bounty board
- Subject portraits
- Subject story pages
- Babylon.js 3D subject viewer
- Admin-only case terminal
- Search and filters
- Local incident reports
- Inspiration page
- Customer service page
- Appointment request form
- Existing website images and styling

## Default accounts

The bundled website currently contains:

- Officer: `officer` / `officer`
- Admin: `admin` / `admin`

Change these in:

`Bounty_APP/Web/auth-config.js`

## Customer service configuration

Change the support contact information in:

`Bounty_APP/Web/customer-service-config.js`

The appointment form uses the same FormSubmit request that the website already uses.
An internet connection is required for that email request and for externally hosted
Babylon.js / Google Fonts resources in the current website.

## Open in Visual Studio

1. Open `Bounty_APP.sln`.
2. Allow Visual Studio/NuGet to restore `Microsoft.Web.WebView2`.
3. Build the solution.
4. Press F5.

Target framework: `.NET 8 for Windows`.

## Desktop shortcuts

- `F11` toggles borderless/full-screen mode.
- `Ctrl+R` reloads the HSC interface.

## Important

The original code you showed was an MSTest test class:

```csharp
[TestClass]
public sealed class Test1
{
    [TestMethod]
    public void TestMethod1() { }
}
```

That is not application startup code. This project replaces it with a proper
`Program.cs` entry point and `MainForm` desktop window.
