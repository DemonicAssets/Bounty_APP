using System.Diagnostics;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

namespace Bounty_APP;

public sealed class MainForm : Form
{
    private readonly WebView2 _webView = new();
    private readonly Panel _loadingPanel = new();
    private readonly Label _loadingTitle = new();
    private readonly Label _loadingText = new();

    public MainForm()
    {
        Text = "HSC // Human Systems Check";
        StartPosition = FormStartPosition.CenterScreen;
        WindowState = FormWindowState.Maximized;
        MinimumSize = new Size(1180, 760);
        BackColor = Color.FromArgb(4, 12, 20);
        KeyPreview = true;

        _webView.Dock = DockStyle.Fill;
        _webView.DefaultBackgroundColor = Color.FromArgb(4, 12, 20);
        Controls.Add(_webView);

        BuildLoadingScreen();

        Shown += async (_, _) => await InitializeWebViewAsync();
        FormClosing += (_, _) => _webView.Dispose();
        KeyDown += MainForm_KeyDown;
    }

    private void BuildLoadingScreen()
    {
        _loadingPanel.Dock = DockStyle.Fill;
        _loadingPanel.BackColor = Color.FromArgb(4, 12, 20);

        _loadingTitle.AutoSize = true;
        _loadingTitle.Text = "HSC";
        _loadingTitle.ForeColor = Color.FromArgb(64, 221, 255);
        _loadingTitle.Font = new Font("Segoe UI", 34F, FontStyle.Bold);

        _loadingText.AutoSize = true;
        _loadingText.Text = "INITIALIZING HUMAN SYSTEMS CHECK...";
        _loadingText.ForeColor = Color.FromArgb(150, 200, 215);
        _loadingText.Font = new Font("Consolas", 12F, FontStyle.Bold);

        _loadingPanel.Controls.Add(_loadingTitle);
        _loadingPanel.Controls.Add(_loadingText);
        _loadingPanel.Resize += (_, _) => CenterLoadingControls();

        Controls.Add(_loadingPanel);
        _loadingPanel.BringToFront();
        CenterLoadingControls();
    }

    private void CenterLoadingControls()
    {
        _loadingTitle.Left = Math.Max(20, (_loadingPanel.ClientSize.Width - _loadingTitle.Width) / 2);
        _loadingTitle.Top = Math.Max(20, (_loadingPanel.ClientSize.Height - 110) / 2);

        _loadingText.Left = Math.Max(20, (_loadingPanel.ClientSize.Width - _loadingText.Width) / 2);
        _loadingText.Top = _loadingTitle.Bottom + 12;
    }

    private async Task InitializeWebViewAsync()
    {
        try
        {
            string webRoot = Path.Combine(AppContext.BaseDirectory, "Web");
            string indexPath = Path.Combine(webRoot, "index.html");

            if (!File.Exists(indexPath))
            {
                throw new FileNotFoundException(
                    "The bundled HSC website could not be found.", indexPath);
            }

            string userDataFolder = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "Bounty_APP",
                "WebView2");

            Directory.CreateDirectory(userDataFolder);

            CoreWebView2Environment environment =
                await CoreWebView2Environment.CreateAsync(null, userDataFolder);

            await _webView.EnsureCoreWebView2Async(environment);

            CoreWebView2 core = _webView.CoreWebView2;
            core.SetVirtualHostNameToFolderMapping(
                "hsc.local",
                webRoot,
                CoreWebView2HostResourceAccessKind.Allow);

            core.Settings.AreDevToolsEnabled = true;
            core.Settings.AreDefaultContextMenusEnabled = true;
            core.Settings.IsStatusBarEnabled = false;
            core.Settings.IsZoomControlEnabled = true;

            core.NewWindowRequested += Core_NewWindowRequested;
            core.NavigationStarting += Core_NavigationStarting;
            core.NavigationCompleted += (_, _) =>
            {
                _loadingPanel.Visible = false;
                _webView.Focus();
            };

            // Start at the same secure login screen used by the website.
            _webView.Source = new Uri("https://hsc.local/index.html#login");
        }
        catch (WebView2RuntimeNotFoundException)
        {
            ShowStartupError(
                "Microsoft Edge WebView2 Runtime is not installed.\n\n" +
                "Install the WebView2 Runtime, then reopen Bounty_APP.");
        }
        catch (Exception ex)
        {
            ShowStartupError($"Bounty_APP could not start.\n\n{ex.Message}");
        }
    }

    private static void Core_NewWindowRequested(
        object? sender,
        CoreWebView2NewWindowRequestedEventArgs e)
    {
        if (TryOpenExternal(e.Uri))
        {
            e.Handled = true;
        }
    }

    private static void Core_NavigationStarting(
        object? sender,
        CoreWebView2NavigationStartingEventArgs e)
    {
        if (e.Uri.StartsWith("mailto:", StringComparison.OrdinalIgnoreCase) ||
            e.Uri.StartsWith("tel:", StringComparison.OrdinalIgnoreCase))
        {
            e.Cancel = true;
            TryOpenExternal(e.Uri);
        }
    }

    private static bool TryOpenExternal(string uri)
    {
        try
        {
            Process.Start(new ProcessStartInfo
            {
                FileName = uri,
                UseShellExecute = true
            });
            return true;
        }
        catch
        {
            return false;
        }
    }

    private void MainForm_KeyDown(object? sender, KeyEventArgs e)
    {
        if (e.KeyCode == Keys.F11)
        {
            FormBorderStyle = FormBorderStyle == FormBorderStyle.None
                ? FormBorderStyle.Sizable
                : FormBorderStyle.None;

            WindowState = FormWindowState.Maximized;
            e.Handled = true;
        }

        if (e.Control && e.KeyCode == Keys.R && _webView.CoreWebView2 is not null)
        {
            _webView.Reload();
            e.Handled = true;
        }
    }

    private void ShowStartupError(string message)
    {
        _loadingPanel.Visible = false;
        MessageBox.Show(
            this,
            message,
            "HSC Startup Error",
            MessageBoxButtons.OK,
            MessageBoxIcon.Error);
    }
}
