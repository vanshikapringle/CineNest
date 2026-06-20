$envFile = ".env"

if (-Not (Test-Path $envFile)) {
    Write-Host "===========================================================" -ForegroundColor Red
    Write-Host "ERROR: .env file not found in the root directory!" -ForegroundColor Red
    Write-Host "Please copy .env.example to .env and configure your variables." -ForegroundColor Red
    Write-Host "===========================================================" -ForegroundColor Red
    exit 1
}

# Load environment variables from .env
Get-Content $envFile | Foreach-Object {
    if ($_ -match "^\s*([^#=]+)\s*=\s*(.*)") {
        $name = $matches[1].Trim()
        $value = $matches[2].Trim()
        [System.Environment]::SetEnvironmentVariable($name, $value, [System.EnvironmentVariableTarget]::Process)
    }
}

$supabaseUrl = [System.Environment]::GetEnvironmentVariable("SUPABASE_URL")
if ([string]::IsNullOrWhiteSpace($supabaseUrl)) {
    Write-Host "ERROR: SUPABASE_URL is missing in .env" -ForegroundColor Red
    exit 1
}

Write-Host "Environment variables loaded successfully. Starting services..." -ForegroundColor Green

$supabaseUrl = [System.Environment]::GetEnvironmentVariable("SUPABASE_URL")
$supabaseUser = [System.Environment]::GetEnvironmentVariable("SUPABASE_USER")
$supabasePassword = [System.Environment]::GetEnvironmentVariable("SUPABASE_PASSWORD")

# Start services in separate terminal windows using cmd.exe to avoid PowerShell escaping issues
Start-Process cmd -ArgumentList "/k title auth-service && cd backend\auth-service && set SUPABASE_URL=$supabaseUrl&& set SUPABASE_USER=$supabaseUser&& set SUPABASE_PASSWORD=$supabasePassword&& mvnw.cmd spring-boot:run -DskipTests"
Start-Process cmd -ArgumentList "/k title movie-service && cd backend\movie-service && set SUPABASE_URL=$supabaseUrl&& set SUPABASE_USER=$supabaseUser&& set SUPABASE_PASSWORD=$supabasePassword&& mvnw.cmd spring-boot:run -DskipTests"
Start-Process cmd -ArgumentList "/k title theatre-service && cd backend\theatre-service && set SUPABASE_URL=$supabaseUrl&& set SUPABASE_USER=$supabaseUser&& set SUPABASE_PASSWORD=$supabasePassword&& mvnw.cmd spring-boot:run -DskipTests"
Start-Process cmd -ArgumentList "/k title booking-service && cd backend\booking-service && set SUPABASE_URL=$supabaseUrl&& set SUPABASE_USER=$supabaseUser&& set SUPABASE_PASSWORD=$supabasePassword&& mvnw.cmd spring-boot:run -DskipTests"

Write-Host "All 4 backend services have been launched in new windows." -ForegroundColor Cyan
